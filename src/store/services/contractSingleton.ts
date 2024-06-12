import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { OraiswapV3Client } from '../../sdk'
import { OraiswapTokenClient } from '@oraichain/oraidex-contracts-sdk'
import { Token } from '@store/consts/static'
import { PayloadAction } from '@reduxjs/toolkit'
import { _newPoolKey, toSqrtPrice } from '@/wasm/oraiswap_v3_wasm'
import { ArrayOfTupleOfUint16AndUint64, LiquidityTick, PoolKey, PoolWithPoolKey, Tick } from '@/sdk/OraiswapV3.types'
import {
  Tickmap,
  getLiquidityTicksLimit,
  getMaxTick,
  getMaxTickmapQuerySize,
  getMinTick,
  positionToTick
} from '@/wasm/oraiswap_v3_wasm'
import { CHUNK_SIZE } from '@store/consts/utils'

export const MAX_TICKMAP_QUERY_SIZE = getMaxTickmapQuerySize()

export const LIQUIDITY_TICKS_LIMIT = getLiquidityTicksLimit()

export const assert = (condition: boolean, message?: string) => {
  if (!condition) {
    throw new Error(message || 'assertion failed')
  }
}

export const integerSafeCast = (value: bigint): number => {
  if (value > BigInt(Number.MAX_SAFE_INTEGER) || value < BigInt(Number.MIN_SAFE_INTEGER)) {
    throw new Error('Integer value is outside the safe range for Numbers')
  }
  return Number(value)
}

export default class SingletonOraiswapV3 {
  private static _tokens: Record<string, Token> = {}
  private static pools: { [key in string]: PoolWithPoolKey } = {}
  private static poolKeys: { [key in string]: PoolKey } = {}
  private static poolTicks: { [key in string]: LiquidityTick[] } = {}
  private static nearestPoolTicksForPair: { [key in string]: Tick[] } = {}
  private static isLoadingLatestPoolsForTransaction: boolean = false
  private static isLoadingTicksAndTickMaps: boolean = false
  private static tickMaps: { [key in string]: string } = {}
  private static _dex: OraiswapV3Client

  private constructor() {}

  public static get dex() {
    return this._dex
  }

  public static get tokens() {
    return this._tokens
  }

  public static async load(signingClient: SigningCosmWasmClient, sender: string) {
    if (!this.dex || import.meta.env.VITE_CONTRACT_ADDRESS !== this.dex.contractAddress) {
      this._dex = new OraiswapV3Client(signingClient, sender, import.meta.env.VITE_CONTRACT_ADDRESS)
    }
  }

  public static async loadCw20(
    signingClient: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    return new OraiswapTokenClient(signingClient, sender, contractAddress)
  }

  public static async handleInitPool(action: PayloadAction<PoolKey>): Generator {
    try {
      const { token_x: tokenX, token_y: tokenY, fee_tier: feeTier } = action.payload

      const poolKey = _newPoolKey(tokenX, tokenY, feeTier)

      const initSqrtPrice = toSqrtPrice(1n, 0n)

      const tx = this._dex.createPool({
        feeTier,
        initSqrtPrice,
        initTick:
      })

      const signedTx =
        yield *
        call([tx, tx.signAsync], walletAddress, {
          signer: adapter.signer as Signer
        })

      const txResult = yield * call(sendTx, signedTx)
    } catch (error) {
      console.log(error)
    }
  }

  public static async getRawTickmap(
    poolKey: PoolKey,
    lowerTick: bigint,
    upperTick: bigint,
    xToY: boolean
  ): Promise<ArrayOfTupleOfUint16AndUint64> {
    const tickmaps = await this.dex.tickMap({
      lowerTickIndex: Number(lowerTick),
      upperTickIndex: Number(upperTick),
      xToY,
      poolKey
    })
    return tickmaps
  }

  public static async getFullTickmap(poolKey: PoolKey): Promise<Tickmap> {
    const maxTick = getMaxTick(poolKey.fee_tier.tick_spacing)
    let lowerTick = getMinTick(poolKey.fee_tier.tick_spacing)

    const xToY = false

    const promises = []
    const tickSpacing = BigInt(poolKey.fee_tier.tick_spacing)
    assert(tickSpacing <= 100)

    assert(MAX_TICKMAP_QUERY_SIZE > 3)
    assert(CHUNK_SIZE * 2n > tickSpacing)
    // move back 1 chunk since the range is inclusive
    // then move back additional 2 chunks to ensure that adding tickspacing won't exceed the query limit
    const jump = (MAX_TICKMAP_QUERY_SIZE - 3n) * CHUNK_SIZE

    while (lowerTick <= maxTick) {
      let nextTick = lowerTick + jump
      const remainder = nextTick % tickSpacing

      if (remainder > 0) {
        nextTick += tickSpacing - remainder
      } else if (remainder < 0) {
        nextTick -= remainder
      }

      let upperTick = nextTick

      if (upperTick > maxTick) {
        upperTick = maxTick
      }

      assert(upperTick % tickSpacing === 0n)
      assert(lowerTick % tickSpacing === 0n)

      const result = this.getRawTickmap(poolKey, lowerTick, upperTick, xToY).then(
        tickmap => tickmap.map(([a, b]) => [BigInt(a), BigInt(b)]) as [bigint, bigint][]
      )
      promises.push(result)

      lowerTick = upperTick + tickSpacing
    }

    const fullResult = (await Promise.all(promises)).flat(1)

    const storedTickmap = new Map<bigint, bigint>(fullResult)

    return { bitmap: storedTickmap }
  }

  public static async getAllLiquidityTicks(
    poolKey: PoolKey,
    tickmap: Tickmap
  ): Promise<LiquidityTick[]> {
    const tickIndexes: bigint[] = []
    for (const [chunkIndex, chunk] of tickmap.bitmap.entries()) {
      for (let bit = 0n; bit < CHUNK_SIZE; bit++) {
        const checkedBit = chunk & (1n << bit)
        if (checkedBit) {
          const tickIndex = positionToTick(chunkIndex, bit, poolKey.fee_tier.tick_spacing)
          tickIndexes.push(tickIndex)
        }
      }
    }
    const tickLimit = integerSafeCast(LIQUIDITY_TICKS_LIMIT)
    const promises: Promise<LiquidityTick[]>[] = []
    for (let i = 0; i < tickIndexes.length; i += tickLimit) {
      promises.push(
        this.dex.liquidityTicks({
          poolKey,
          tickIndexes: tickIndexes.slice(i, i + tickLimit).map(Number)
        })
      )
    }

    const tickResults = await Promise.all(promises)
    return tickResults.flat(1)
  }
}
