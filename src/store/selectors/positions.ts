import { Token } from '@store/consts/static'
import { poolKeyToString } from '@store/consts/utils'
import { createSelector } from 'reselect'
import { IPositionsStore, positionsSliceName } from '../reducers/positions'
import { AnyProps, keySelectors } from './helpers'
import { poolsArraySortedByFees } from './pools'
import { swapTokens } from './wallet'
import { PoolWithPoolKey } from '@/sdk/OraiswapV3.types'
import { Position } from '@wasm'

const store = (s: AnyProps) => s[positionsSliceName] as IPositionsStore

export const { lastPage, positionsList, plotTicks, currentPositionTicks, initPosition } =
  keySelectors(store, [
    'lastPage',
    'positionsList',
    'plotTicks',
    'currentPositionTicks',
    'initPosition'
  ])

export const lastPageSelector = createSelector(lastPage, s => s)

export const isLoadingPositionsList = createSelector(positionsList, s => s.loading)

export interface PoolWithPoolKeyAndIndex extends PoolWithPoolKey {
  poolIndex: number
}

export interface PositionWithPoolData extends Position {
  poolData: PoolWithPoolKeyAndIndex
  tokenX: Token
  tokenY: Token
  positionIndex: number
}

export const positionsWithPoolsData = createSelector(
  poolsArraySortedByFees,
  positionsList,
  swapTokens,
  (allPools, { list }, tokens) => {
    const poolsByKey: Record<string, PoolWithPoolKeyAndIndex> = {}
    allPools.forEach((pool, index) => {
      poolsByKey[poolKeyToString(pool.pool_key)] = {
        ...pool,
        poolIndex: index
      }
    })

    return list.map((position, index) => {
      const tokenX = tokens.find(token => token.assetAddress === position.pool_key.token_x)
      const tokenY = tokens.find(token => token.assetAddress === position.pool_key.token_y)

      if (!tokenX || !tokenY) {
        throw new Error(`Token not found for position: ${position}`)
      }

      return {
        ...position,
        poolData: poolsByKey[poolKeyToString(position.pool_key)],
        tokenX,
        tokenY,
        positionIndex: index
      }
    })
  }
)

export const singlePositionData = (id: bigint) =>
  createSelector(positionsWithPoolsData, positions =>
    positions.find(position => id === BigInt(position.positionIndex))
  )

export const positionsSelectors = {
  positionsList,
  plotTicks,
  currentPositionTicks,
  initPosition
}

export default positionsSelectors
