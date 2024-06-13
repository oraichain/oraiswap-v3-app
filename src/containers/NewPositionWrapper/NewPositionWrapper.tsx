import { TokenAmount } from '@/sdk/OraiswapV3.types'
import { _newPoolKey, calculateSqrtPrice, getLiquidityByX, getLiquidityByY, getMinTick } from '../../wasm'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import NewPosition from '@components/NewPosition/NewPosition'

import {
  ALL_FEE_TIERS_DATA,
  PositionOpeningMethod,
  TokenPriceData,
  bestTiers,
  commonTokensForNetworks
} from '@store/consts/static'
import {
  calcPrice,
  calcYPerXPriceBySqrtPrice,
  createPlaceholderLiquidityPlot,
  poolKeyToString,
  printBigint
} from '@store/consts/utils'
import { actions as poolsActions } from '@store/reducers/pools'
import { TickPlotPositionData, actions as positionsActions } from '@store/reducers/positions'
import { actions as snackbarsActions } from '@store/reducers/snackbars'
import { Status } from '@store/reducers/wallet'
import { networkType } from '@store/selectors/connection'
import {
  isLoadingLatestPoolsForTransaction,
  isLoadingTicksAndTickMaps,
  poolKeys,
  pools,
  poolsArraySortedByFees
} from '@store/selectors/pools'
import { initPosition, plotTicks } from '@store/selectors/positions'
import { canCreateNewPool, canCreateNewPosition, status, swapTokens } from '@store/selectors/wallet'
import { openWalletSelectorModal } from '@utils/web3/selector'
import { VariantType } from 'notistack'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export interface IProps {
  initialTokenFrom: string
  initialTokenTo: string
  initialFee: string
}

export const NewPositionWrapper: React.FC<IProps> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee
}) => {
  const dispatch = useDispatch()
  const tokens = useSelector(swapTokens)
  const walletStatus = useSelector(status)
  const allPools = useSelector(poolsArraySortedByFees)
  const allPoolKeys = useSelector(poolKeys)
  const poolsData = useSelector(pools)
  const loadingTicksAndTickMaps = useSelector(isLoadingTicksAndTickMaps)

  const { success, inProgress } = useSelector(initPosition)
  const { data: ticksData, loading: ticksLoading, hasError: hasTicksError } = useSelector(plotTicks)
  const isFetchingNewPool = useSelector(isLoadingLatestPoolsForTransaction)
  const currentNetwork = useSelector(networkType)

  const canUserCreateNewPool = useSelector(canCreateNewPool())
  const canUserCreateNewPosition = useSelector(canCreateNewPosition())

  const [poolIndex, setPoolIndex] = useState<number | null>(null)

  const [poolKey, setPoolKey] = useState<string>('')
  const [progress, setProgress] = useState<ProgressState>('none')

  const [tokenAIndex, setTokenAIndex] = useState<number | null>(null)
  const [tokenBIndex, setTokenBIndex] = useState<number | null>(null)

  const [currentPairReversed, setCurrentPairReversed] = useState<boolean | null>(null)

  const isMountedRef = useRef(false)

  useEffect(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      const tokenFrom = isXtoY ? tokens[tokenAIndex].assetAddress : tokens[tokenBIndex].assetAddress
      const tokenTo = isXtoY ? tokens[tokenBIndex].assetAddress : tokens[tokenAIndex].assetAddress
      dispatch(poolsActions.getTicksAndTickMaps({ tokenFrom, tokenTo, allPools }))
    }
  }, [tokenAIndex, tokenBIndex, allPools])

  useEffect(() => {
    dispatch(poolsActions.getPoolKeys())
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const liquidityRef = useRef<any>(0n)

  useEffect(() => {
    setProgress('none')
  }, [poolIndex])

  useEffect(() => {
    let timeoutId1: NodeJS.Timeout
    let timeoutId2: NodeJS.Timeout

    if (!inProgress && progress === 'progress') {
      setProgress(success ? 'approvedWithSuccess' : 'approvedWithFail')

      timeoutId1 = setTimeout(() => {
        setProgress(success ? 'success' : 'failed')
      }, 1500)

      timeoutId2 = setTimeout(() => {
        setProgress('none')
      }, 3000)
    }

    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
    }
  }, [success, inProgress])

  useEffect(() => {
    if (
      success &&
      poolKey !== '' &&
      tokenAIndex !== null &&
      tokenBIndex !== null &&
      poolIndex !== null &&
      !loadingTicksAndTickMaps
    ) {
      dispatch(
        positionsActions.getCurrentPlotTicks({
          poolKey: allPoolKeys[poolKey],
          isXtoY:
            allPools[poolIndex].pool_key.token_x ===
            tokens[currentPairReversed === true ? tokenBIndex : tokenAIndex].assetAddress,
          disableLoading: true
        })
      )
    }
  }, [success, poolKey, tokenAIndex, tokenBIndex, poolIndex, loadingTicksAndTickMaps])

  const isXtoY = useMemo(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      return (
        tokens[tokenAIndex].assetAddress.toString() < tokens[tokenBIndex].assetAddress.toString()
      )
    }
    return true
  }, [tokenAIndex, tokenBIndex])

  const xDecimal = useMemo(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      return tokens[tokenAIndex].assetAddress.toString() <
        tokens[tokenBIndex].assetAddress.toString()
        ? tokens[tokenAIndex].decimals
        : tokens[tokenBIndex].decimals
    }
    return 0n
  }, [tokenAIndex, tokenBIndex, tokens])

  const yDecimal = useMemo(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      return tokens[tokenAIndex].assetAddress.toString() <
        tokens[tokenBIndex].assetAddress.toString()
        ? tokens[tokenBIndex].decimals
        : tokens[tokenAIndex].decimals
    }
    return 0n
  }, [tokenAIndex, tokenBIndex, tokens])

  const [feeIndex, setFeeIndex] = useState(0)

  const fee = useMemo(
    () => (ALL_FEE_TIERS_DATA[feeIndex] ? ALL_FEE_TIERS_DATA[feeIndex].tier.fee : 1n),
    [feeIndex]
  )

  const tickSpacing = useMemo(
    () => (ALL_FEE_TIERS_DATA[feeIndex] ? ALL_FEE_TIERS_DATA[feeIndex].tier.tick_spacing : 1n),
    [feeIndex]
  )

  const [midPrice, setMidPrice] = useState<TickPlotPositionData>({
    index: 0n,
    x: 1
  })

  const isWaitingForNewPool = useMemo(() => {
    if (poolKey !== '') {
      return false
    }

    return isFetchingNewPool
  }, [isFetchingNewPool, poolKey])

  useEffect(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      const tokenA = tokens[tokenAIndex].assetAddress.toString()
      const tokenB = tokens[tokenBIndex].assetAddress.toString()

      const keyStringified = poolKeyToString({
        token_x: isXtoY ? tokenA : tokenB,
        token_y: isXtoY ? tokenB : tokenA,
        fee_tier: ALL_FEE_TIERS_DATA[feeIndex].tier
      })

      if (allPoolKeys[keyStringified]) {
        setPoolKey(keyStringified)
      } else {
        setPoolKey('')
      }

      const index = allPools.findIndex(pool => {
        return (
          pool.pool_key.fee_tier.fee === fee &&
          ((pool.pool_key.token_x === tokens[tokenAIndex].assetAddress &&
            pool.pool_key.token_x === tokens[tokenBIndex].assetAddress) ||
            (pool.pool_key.token_y === tokens[tokenBIndex].assetAddress &&
              pool.pool_key.token_y === tokens[tokenAIndex].assetAddress))
        )
      })

      setPoolIndex(index !== -1 ? index : null)

      if (poolKey !== '') {
        dispatch(
          positionsActions.getCurrentPlotTicks({
            poolKey: allPoolKeys[poolKey],
            isXtoY
          })
        )
      }
    }
  }, [isWaitingForNewPool, tokenAIndex, tokenBIndex, feeIndex, poolIndex, poolKey])

  useEffect(() => {
    if (poolsData[poolKey]) {
      setMidPrice({
        index: BigInt(poolsData[poolKey].pool.current_tick_index),
        x:
          calcYPerXPriceBySqrtPrice(
            BigInt(poolsData[poolKey].pool.sqrt_price),
            xDecimal,
            yDecimal
          ) ** (isXtoY ? 1 : -1)
      })
    }
  }, [poolKey, isXtoY, xDecimal, yDecimal, poolsData])

  useEffect(() => {
    if (poolKey === '') {
      setMidPrice({
        index: 0n,
        x: calcPrice(0n, isXtoY, xDecimal, yDecimal)
      })
    }
  }, [poolIndex, isXtoY, xDecimal, yDecimal, poolKey])

  const data = useMemo(() => {
    if (ticksLoading) {
      return createPlaceholderLiquidityPlot(isXtoY, 10, BigInt(tickSpacing), xDecimal, yDecimal)
    }

    return ticksData
  }, [ticksData, ticksLoading, isXtoY, tickSpacing, xDecimal, yDecimal])

  useEffect(() => {
    if (
      tokenAIndex !== null &&
      tokenBIndex !== null &&
      poolIndex === null &&
      progress === 'approvedWithSuccess'
    ) {
      dispatch(
        poolsActions.getPoolData(
          _newPoolKey(
            tokens[tokenAIndex].assetAddress.toString(),
            tokens[tokenBIndex].assetAddress.toString(),
            ALL_FEE_TIERS_DATA[feeIndex].tier
          )
        )
      )
    }
  }, [progress])

  const initialIsDiscreteValue = localStorage.getItem('IS_PLOT_DISCRETE')
    ? localStorage.getItem('IS_PLOT_DISCRETE') === 'true'
    : true

  const setIsDiscreteValue = (val: boolean) => {
    localStorage.setItem('IS_PLOT_DISCRETE', val ? 'true' : 'false')
  }

  // const addTokenHandler = (address: string) => {
  //   if (
  //     connection !== null &&
  //     tokens.findIndex(token => token.address.toString() === address) === -1
  //   ) {
  //     getNewTokenOrThrow(address, connection)
  //       .then(data => {
  //         dispatch(poolsActions.addTokens(data))
  //         addNewTokenToLocalStorage(address, currentNetwork)
  //         dispatch(
  //           snackbarsActions.add({
  //             message: 'Token added to your list',
  //             variant: 'success',
  //             persist: false
  //           })
  //         )
  //       })
  //       .catch(() => {
  //         dispatch(
  //           snackbarsActions.add({
  //             message: 'Token adding failed,
  //             variant: 'error',
  //             persist: false
  //           })
  //         )
  //       })
  //   } else {
  //     dispatch(
  //       snackbarsActions.add({
  //         message: 'Token already exists on your list',
  //         variant: 'info',
  //         persist: false
  //       })
  //     )
  //   }
  // }

  const copyPoolAddressHandler = (message: string, variant: VariantType) => {
    dispatch(
      snackbarsActions.add({
        message,
        variant,
        persist: false
      })
    )
  }

  const initialIsConcentrationOpening =
    localStorage.getItem('OPENING_METHOD') === 'concentration' ||
    localStorage.getItem('OPENING_METHOD') === null

  const setPositionOpeningMethod = (val: PositionOpeningMethod) => {
    localStorage.setItem('OPENING_METHOD', val)
  }

  const initialHideUnknownTokensValue =
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === 'true' ||
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === null

  const setHideUnknownTokensValue = (val: boolean) => {
    localStorage.setItem('HIDE_UNKNOWN_TOKENS', val ? 'true' : 'false')
  }

  const [tokenAPriceData, setTokenAPriceData] = useState<TokenPriceData | undefined>(undefined)
  const [priceALoading, setPriceALoading] = useState(false)

  useEffect(() => {
    if (tokenAIndex === null) {
      return
    }

    const id = tokens[tokenAIndex].coingeckoId ?? ''
    // if (id.length) {
    //   setPriceALoading(true)
    //   getCoingeckoTokenPrice(id)
    //     .then(data => setTokenAPriceData(data))
    //     .catch(() =>
    //       setTokenAPriceData(getMockedTokenPrice(tokens[tokenAIndex].symbol, currentNetwork))
    //     )
    //     .finally(() => setPriceALoading(false))
    // } else {
    //   setTokenAPriceData(undefined)
    // }
  }, [tokenAIndex])

  const [tokenBPriceData, setTokenBPriceData] = useState<TokenPriceData | undefined>(undefined)
  const [priceBLoading, setPriceBLoading] = useState(false)

  useEffect(() => {
    if (tokenBIndex === null) {
      return
    }

    const id = tokens[tokenBIndex].coingeckoId ?? ''
    // if (id.length) {
    //   setPriceBLoading(true)
    //   getCoingeckoTokenPrice(id)
    //     .then(data => setTokenBPriceData(data))
    //     .catch(() =>
    //       setTokenBPriceData(getMockedTokenPrice(tokens[tokenBIndex].symbol, currentNetwork))
    //     )
    //     .finally(() => setPriceBLoading(false))
    // } else {
    //   setTokenBPriceData(undefined)
    // }
  }, [tokenBIndex])

  const initialSlippage = localStorage.getItem('INVARIANT_NEW_POSITION_SLIPPAGE') ?? '1'

  const onSlippageChange = (slippage: string) => {
    localStorage.setItem('INVARIANT_NEW_POSITION_SLIPPAGE', slippage)
  }

  const calcAmount = (amount: TokenAmount, left: number, right: number, tokenAddress: string) => {
    if (tokenAIndex === null || tokenBIndex === null || isNaN(left) || isNaN(right)) {
      return BigInt(0)
    }

    const byX =
      tokenAddress ===
      (isXtoY ? tokens[tokenAIndex].assetAddress : tokens[tokenBIndex].assetAddress)

    const lowerTick = BigInt(Math.min(left, right))
    const upperTick = BigInt(Math.max(left, right))

    try {
      if (byX) {
        const { amount: tokenYAmount, l: positionLiquidity } = getLiquidityByX(
          amount,
          lowerTick,
          upperTick,
          poolsData[poolKey]
            ? poolsData[poolKey].pool.sqrt_price
            : calculateSqrtPrice(midPrice.index),
          true
        )

        if (isMountedRef.current) {
          liquidityRef.current = positionLiquidity
        }

        return tokenYAmount
      }

      const { amount: tokenXAmount, l: positionLiquidity } = getLiquidityByY(
        amount,
        lowerTick,
        upperTick,
        poolsData[poolKey]
          ? poolsData[poolKey].pool.sqrt_price
          : calculateSqrtPrice(midPrice.index),
        true
      )

      if (isMountedRef.current) {
        liquidityRef.current = positionLiquidity
      }

      return tokenXAmount
    } catch (error) {
      const result = (byX ? getLiquidityByY : getLiquidityByX)(
        amount,
        lowerTick,
        upperTick,
        poolsData[poolKey]
          ? poolsData[poolKey].pool.sqrt_price
          : calculateSqrtPrice(midPrice.index),
        true
      )
      if (isMountedRef.current) {
        liquidityRef.current = result.liquidity
      }
    }

    return BigInt(0)
  }

  return (
    <NewPosition
      initialTokenFrom={initialTokenFrom}
      initialTokenTo={initialTokenTo}
      initialFee={initialFee}
      copyPoolAddressHandler={copyPoolAddressHandler}
      tokens={tokens}
      data={data}
      midPrice={midPrice}
      setMidPrice={setMidPrice}
      onChangePositionTokens={(tokenA, tokenB, feeTierIndex) => {
        if (
          tokenA !== null &&
          tokenB !== null &&
          tokenA !== tokenB &&
          !(
            tokenAIndex === tokenA &&
            tokenBIndex === tokenB &&
            fee === ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee
          )
        ) {
          const index = allPools.findIndex(
            pool =>
              pool.pool_key.fee_tier.fee === fee &&
              ((pool.pool_key.token_x === tokens[tokenA].assetAddress &&
                pool.pool_key.token_x === tokens[tokenB].assetAddress) ||
                (pool.pool_key.token_y === tokens[tokenB].assetAddress &&
                  pool.pool_key.token_y === tokens[tokenA].assetAddress))
          )

          if (
            index !== poolIndex &&
            !(
              tokenAIndex === tokenB &&
              tokenBIndex === tokenA &&
              fee === ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee
            )
          ) {
            if (isMountedRef.current) {
              setPoolIndex(index !== -1 ? index : null)
              setCurrentPairReversed(null)
            }
          } else if (
            tokenAIndex === tokenB &&
            tokenBIndex === tokenA &&
            fee === ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee
          ) {
            if (isMountedRef.current) {
              setCurrentPairReversed(currentPairReversed === null ? true : !currentPairReversed)
            }
          }
          if (poolKey.length > 0 && index !== poolIndex && tokenAIndex !== null) {
            dispatch(
              positionsActions.getCurrentPlotTicks({
                poolKey: allPoolKeys[poolKey],
                isXtoY: allPoolKeys[poolKey].token_x === tokens[tokenAIndex].assetAddress.toString()
              })
            )
          } else if (
            !(
              tokenAIndex === tokenB &&
              tokenBIndex === tokenA &&
              fee === ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee
            )
          ) {
            dispatch(
              poolsActions.getPoolData(
                _newPoolKey(
                  tokens[tokenA].address.toString(),
                  tokens[tokenB].address.toString(),
                  ALL_FEE_TIERS_DATA[feeTierIndex].tier
                )
              )
            )
          }
        }

        setTokenAIndex(tokenA)
        setTokenBIndex(tokenB)
        setFeeIndex(feeTierIndex)
      }}
      isCurrentPoolExisting={poolKey !== ''}
      calcAmount={calcAmount}
      feeTiers={ALL_FEE_TIERS_DATA.map(tier => {
        return {
          feeValue: +printBigint(BigInt(tier.tier.fee), 10n) //TODO replace 10n with DECIMAL - n
        }
      })}
      ticksLoading={ticksLoading}
      loadingTicksAndTickMaps={loadingTicksAndTickMaps}
      isXtoY={isXtoY}
      xDecimal={xDecimal}
      yDecimal={yDecimal}
      tickSpacing={BigInt(10)} 
      isWaitingForNewPool={isWaitingForNewPool}
      poolIndex={poolIndex}
      currentPairReversed={currentPairReversed}
      bestTiers={bestTiers[currentNetwork]}
      initialIsDiscreteValue={initialIsDiscreteValue}
      onDiscreteChange={setIsDiscreteValue}
      currentPriceSqrt={
        poolsData[poolKey] ? poolsData[poolKey].pool.sqrt_price : calculateSqrtPrice(midPrice.index)
      }
      canCreateNewPool={canUserCreateNewPool}
      canCreateNewPosition={canUserCreateNewPosition}
      handleAddToken={() => console.log('Add token mock function')} // TODO - add real data
      commonTokens={commonTokensForNetworks[currentNetwork]}
      initialOpeningPositionMethod={initialIsConcentrationOpening ? 'concentration' : 'range'}
      onPositionOpeningMethodChange={setPositionOpeningMethod}
      initialHideUnknownTokensValue={initialHideUnknownTokensValue}
      onHideUnknownTokensChange={setHideUnknownTokensValue}
      tokenAPriceData={tokenAPriceData}
      tokenBPriceData={tokenBPriceData}
      priceALoading={priceALoading}
      priceBLoading={priceBLoading}
      hasTicksError={hasTicksError}
      reloadHandler={() => {
        if (poolKey !== '' && tokenAIndex !== null && tokenBIndex !== null && poolIndex !== null) {
          dispatch(
            positionsActions.getCurrentPlotTicks({
              poolKey: allPoolKeys[poolKey],
              isXtoY:
                allPools[poolIndex].pool_key.token_x ===
                tokens[currentPairReversed === true ? tokenBIndex : tokenAIndex].assetAddress
            })
          )
        }
      }}
      currentFeeIndex={feeIndex}
      onSlippageChange={onSlippageChange}
      initialSlippage={initialSlippage}
      progress={progress}
      addLiquidityHandler={(leftTickIndex, rightTickIndex, xAmount, yAmount, slippage) => {
        if (tokenAIndex === null || tokenBIndex === null) {
          return
        }

        if (progress === 'none') {
          setProgress('progress')
        }

        const lowerTickIndex = leftTickIndex < rightTickIndex ? leftTickIndex : rightTickIndex
        const upperTickIndex = rightTickIndex > leftTickIndex ? rightTickIndex : leftTickIndex

        dispatch(
          positionsActions.initPosition({
            poolKeyData: _newPoolKey(
              tokens[tokenAIndex].assetAddress.toString(),
              tokens[tokenBIndex].assetAddress.toString(),
              ALL_FEE_TIERS_DATA[feeIndex].tier
            ),
            lowerTick: lowerTickIndex,
            upperTick: upperTickIndex,
            liquidityDelta: liquidityRef.current,
            spotSqrtPrice: poolsData[poolKey]
              ? poolsData[poolKey].pool.sqrt_price
              : calculateSqrtPrice(midPrice.index),
            slippageTolerance: slippage,
            tokenXAmount: xAmount,
            tokenYAmount: yAmount,
            initPool: poolKey === ''
          })
        )
      }}
      showNoConnected={walletStatus !== Status.Initialized}
      noConnectedBlockerProps={{
        onConnect: openWalletSelectorModal,
        descCustomText: 'Cannot add any liquidity.'
      }}
      poolKey={poolKey}
    />
  )
}

export default NewPositionWrapper
