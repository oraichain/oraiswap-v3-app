import AnimatedButton, { ProgressState } from '@components/AnimatedButton/AnimatedButton';
import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput';
import Select from '@components/Inputs/Select/Select';
import { Grid, Typography } from '@mui/material';
import SwapList from '@static/svg/ic_swap.svg';
import { PositionOpeningMethod } from '@store/consts/static';
import { parsePathFeeToFeeString, tickerToAddress } from '@store/consts/uiUtiils';
import { convertBalanceToBigint, getScaleFromString, printBigint } from '@store/consts/utils';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import FeeSwitch from '../FeeSwitch/FeeSwitch';
import { useStyles } from './style';
import { ALL_FEE_TIERS_DATA } from '@containers/NewPositionWrapper/NewPositionWrapper';
export interface InputState {
  value: string;
  setValue: (value: string) => void;
  blocked: boolean;
  blockerInfo?: string;
  decimalsLimit: number;
}

export interface IDepositSelector {
  initialTokenFrom: string;
  initialTokenTo: string;
  initialFee: string;
  // tokens: SwapToken[]
  tokens: any[];
  setPositionTokens: (
    tokenAIndex: number | null,
    tokenBindex: number | null,
    feeTierIndex: number
  ) => void;
  onAddLiquidity: () => void;
  tokenAInputState: InputState;
  tokenBInputState: InputState;
  feeTiers: number[];
  className?: string;
  progress: ProgressState;
  priceA?: number;
  priceB?: number;
  onReverseTokens: () => void;
  poolIndex: number | null;
  bestTierIndex?: number;
  canCreateNewPool: boolean;
  canCreateNewPosition: boolean;
  handleAddToken: (address: string) => void;
  // commonTokens: PublicKey[]
  commonTokens: any[];
  initialHideUnknownTokensValue: boolean;
  onHideUnknownTokensChange: (val: boolean) => void;
  priceALoading?: boolean;
  priceBLoading?: boolean;
  feeTierIndex: number;
  concentrationArray: number[];
  concentrationIndex: number;
  minimumSliderIndex: number;
  positionOpeningMethod: PositionOpeningMethod;
}

export const DepositSelector: React.FC<IDepositSelector> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee,
  tokens,
  setPositionTokens,
  onAddLiquidity,
  tokenAInputState,
  tokenBInputState,
  feeTiers,
  className,
  progress,
  priceA,
  priceB,
  onReverseTokens,
  poolIndex,
  bestTierIndex,
  canCreateNewPool,
  canCreateNewPosition,
  handleAddToken,
  commonTokens,
  initialHideUnknownTokensValue,
  onHideUnknownTokensChange,
  priceALoading,
  priceBLoading,
  feeTierIndex,
  concentrationArray,
  concentrationIndex,
  minimumSliderIndex,
  positionOpeningMethod
}) => {
  const { classes } = useStyles();

  const [tokenAIndex, setTokenAIndex] = useState<number | null>(null);
  const [tokenBIndex, setTokenBIndex] = useState<number | null>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded || tokens.length === 0 || ALL_FEE_TIERS_DATA.length === 0) {
      return;
    }

    let tokenAIndexFromPath = null;
    let tokenBIndexFromPath = null;
    let feeTierIndexFromPath = 0;

    tokens.forEach((token, index) => {
      if (token.assetAddress.toString() === tickerToAddress(initialTokenFrom)) {
        tokenAIndexFromPath = index;
      }

      if (token.assetAddress.toString() === tickerToAddress(initialTokenTo)) {
        tokenBIndexFromPath = index;
      }
    });

    const parsedFee = parsePathFeeToFeeString(initialFee);

    ALL_FEE_TIERS_DATA.forEach((feeTierData, index) => {
      if (feeTierData.fee.toString() === parsedFee) {
        feeTierIndexFromPath = index;
      }
    });

    setTokenAIndex(tokenAIndexFromPath);
    setTokenBIndex(tokenBIndexFromPath);
    setPositionTokens(tokenAIndexFromPath, tokenBIndexFromPath, feeTierIndexFromPath);

    setIsLoaded(true);
  }, [tokens]);

  const getButtonMessage = useCallback(() => {
    if (tokenAIndex === null || tokenBIndex === null) {
      return 'Select tokens';
    }

    if (tokenAIndex === tokenBIndex) {
      return 'Select different tokens';
    }

    if (![tokens[tokenAIndex].symbol, tokens[tokenBIndex].symbol].includes('USDT')) {
      return 'Not support pair';
    }

    if (positionOpeningMethod === 'concentration' && concentrationIndex < minimumSliderIndex) {
      return concentrationArray[minimumSliderIndex]
        ? `Set concentration to at least ${concentrationArray[minimumSliderIndex].toFixed(0)}x`
        : 'Set higher fee tier';
    }

    if (
      (poolIndex === null && !canCreateNewPool) ||
      (poolIndex !== null && !canCreateNewPosition)
    ) {
      return 'Insufficient AZERO';
    }

    if (
      !tokenAInputState.blocked &&
      convertBalanceToBigint(tokenAInputState.value, tokens[tokenAIndex].decimals) >
        tokens[tokenAIndex].balance
    ) {
      return "You don't have enough token A";
    }

    if (
      !tokenBInputState.blocked &&
      convertBalanceToBigint(tokenBInputState.value, tokens[tokenBIndex].decimals) >
        tokens[tokenBIndex].balance
    ) {
      return "You don't have enough token B";
    }

    if (
      !tokenAInputState.blocked &&
      +tokenAInputState.value === 0 &&
      !tokenBInputState.blocked &&
      +tokenBInputState.value === 0
    ) {
      return 'Liquidity must be greater than 0';
    }

    return 'Add Liquidity';
  }, [
    tokenAIndex,
    tokenBIndex,
    tokenAInputState.value,
    tokenBInputState.value,
    tokens,
    positionOpeningMethod,
    concentrationIndex,
    feeTierIndex,
    minimumSliderIndex
  ]);

  useEffect(() => {
    if (tokenAIndex !== null) {
      if (getScaleFromString(tokenAInputState.value) > Number(tokens[tokenAIndex].decimals)) {
        const parts = tokenAInputState.value.split('.');

        tokenAInputState.setValue(
          parts[0] + '.' + parts[1].slice(0, Number(tokens[tokenAIndex].decimals))
        );
      }
    }

    if (tokenBIndex !== null) {
      if (getScaleFromString(tokenBInputState.value) > Number(tokens[tokenBIndex].decimals)) {
        const parts = tokenBInputState.value.split('.');

        tokenAInputState.setValue(
          parts[0] + '.' + parts[1].slice(0, Number(tokens[tokenBIndex].decimals))
        );
      }
    }
  }, [poolIndex]);

  return (
    <Grid container direction='column' className={classNames(classes.wrapper, className)}>
      <Typography className={classes.sectionTitle}>Tokens</Typography>

      <Grid container className={classes.sectionWrapper} style={{ marginBottom: 40 }}>
        <Grid
          container
          className={classes.selects}
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <Grid className={classes.selectWrapper}>
            <Select
              tokens={tokens}
              current={tokenAIndex !== null ? tokens[tokenAIndex] : null}
              onSelect={index => {
                const tokenAIndexs = tokens[index];
                const tokenBIndexs = tokens[tokenBIndex];
                if (tokenAIndex !== null && tokenAIndexs.symbol === tokenBIndexs.symbol) {
                  if (!tokenBInputState.blocked) {
                    tokenAInputState.setValue(tokenBInputState.value);
                  } else {
                    tokenBInputState.setValue(tokenAInputState.value);
                  }
                  const pom = tokenAIndex;
                  setTokenAIndex(tokenBIndex);
                  setTokenBIndex(pom);
                  onReverseTokens();
                  return;
                }
                setTokenAIndex(index);
                setPositionTokens(index, tokenBIndex, feeTierIndex);
              }}
              centered
              className={classes.customSelect}
              handleAddToken={handleAddToken}
              sliceName
              commonTokens={commonTokens}
              initialHideUnknownTokensValue={initialHideUnknownTokensValue}
              onHideUnknownTokensChange={onHideUnknownTokensChange}
            />
          </Grid>

          <img
            className={classes.arrows}
            src={SwapList}
            width={24}
            height={24}
            alt='Arrow'
            onClick={() => {
              if (!tokenBInputState.blocked) {
                tokenAInputState.setValue(tokenBInputState.value);
              } else {
                tokenBInputState.setValue(tokenAInputState.value);
              }
              const pom = tokenAIndex;
              setTokenAIndex(tokenBIndex);
              setTokenBIndex(pom);
              onReverseTokens();
            }}
          />

          <Grid className={classes.selectWrapper}>
            <Select
              tokens={tokens}
              current={tokenBIndex !== null ? tokens[tokenBIndex] : null}
              onSelect={index => {
                const tokenAIndexs = tokens[tokenAIndex];
                const tokenBIndexs = tokens[index];
                if (tokenBIndex !== null && tokenAIndexs.symbol === tokenBIndexs.symbol) {
                  if (!tokenBInputState.blocked) {
                    tokenAInputState.setValue(tokenBInputState.value);
                  } else {
                    tokenBInputState.setValue(tokenAInputState.value);
                  }
                  const pom = tokenBIndex;
                  setTokenAIndex(pom);
                  setTokenBIndex(tokenAIndex);
                  onReverseTokens();
                  return;
                }
                setTokenBIndex(index);
                setPositionTokens(tokenAIndex, index, feeTierIndex);
              }}
              centered
              className={classes.customSelect}
              handleAddToken={handleAddToken}
              sliceName
              commonTokens={commonTokens}
              initialHideUnknownTokensValue={initialHideUnknownTokensValue}
              onHideUnknownTokensChange={onHideUnknownTokensChange}
            />
          </Grid>
        </Grid>

        <FeeSwitch
          onSelect={fee => {
            setPositionTokens(tokenAIndex, tokenBIndex, fee);
          }}
          feeTiers={feeTiers}
          showOnlyPercents
          bestTierIndex={bestTierIndex}
          currentValue={feeTierIndex}
        />
      </Grid>

      <Typography className={classes.sectionTitle}>Deposit Amount</Typography>
      <Grid container className={classes.sectionWrapper}>
        <DepositAmountInput
          tokenPrice={priceA}
          currency={tokenAIndex !== null ? tokens[tokenAIndex].symbol : null}
          currencyIconSrc={tokenAIndex !== null ? tokens[tokenAIndex].logoURI : undefined}
          placeholder='0.0'
          onMaxClick={() => {
            if (tokenAIndex === null) {
              return;
            }
            tokenAInputState.setValue(
              printBigint(tokens[tokenAIndex].balance, tokens[tokenAIndex].decimals)
            );
          }}
          balanceValue={
            tokenAIndex !== null
              ? printBigint(tokens[tokenAIndex].balance, tokens[tokenAIndex].decimals)
              : ''
          }
          style={{
            marginBottom: 10
          }}
          onBlur={() => {
            if (
              tokenAIndex !== null &&
              tokenBIndex !== null &&
              tokenAInputState.value.length === 0
            ) {
              tokenAInputState.setValue('0.0');
            }
          }}
          {...tokenAInputState}
          priceLoading={priceALoading}
        />

        <DepositAmountInput
          tokenPrice={priceB}
          currency={tokenBIndex !== null ? tokens[tokenBIndex].symbol : null}
          currencyIconSrc={tokenBIndex !== null ? tokens[tokenBIndex].logoURI : undefined}
          placeholder='0.0'
          onMaxClick={() => {
            if (tokenBIndex === null) {
              return;
            }

            // if (tokens[tokenBIndex].assetAddress.equals(new PublicKey(WRAPPED_ETH_ADDRESS))) {
            //   if (tokenAIndex !== null && poolIndex === null) {
            //     tokenBInputState.setValue(
            //       printBigint(
            //         tokens[tokenBIndex].balance.gt(WETH_POOL_INIT_LAMPORTS)
            //           ? tokens[tokenBIndex].balance.sub(WETH_POOL_INIT_LAMPORTS)
            //           : new BN(0),
            //         tokens[tokenBIndex].decimals
            //       )
            //     )

            //     return
            //   }

            //   tokenBInputState.setValue(
            //     printBigint(
            //       tokens[tokenBIndex].balance.gt(WETH_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
            //         ? tokens[tokenBIndex].balance.sub(WETH_MIN_DEPOSIT_SWAP_FROM_AMOUNT)
            //         : new BN(0),
            //       tokens[tokenBIndex].decimals
            //     )
            //   )

            //   return
            // }
            tokenBInputState.setValue(
              printBigint(tokens[tokenBIndex].balance, tokens[tokenBIndex].decimals)
            );
          }}
          balanceValue={
            tokenBIndex !== null
              ? printBigint(tokens[tokenBIndex].balance, tokens[tokenBIndex].decimals)
              : ''
          }
          onBlur={() => {
            if (
              tokenAIndex !== null &&
              tokenBIndex !== null &&
              tokenBInputState.value.length === 0
            ) {
              tokenBInputState.setValue('0.0');
            }
          }}
          {...tokenBInputState}
          priceLoading={priceBLoading}
        />
      </Grid>

      <AnimatedButton
        className={classNames(
          classes.addButton,
          progress === 'none' ? classes.hoverButton : undefined
        )}
        onClick={() => {
          if (progress === 'none') {
            onAddLiquidity();
          }
        }}
        disabled={getButtonMessage() !== 'Add Liquidity'}
        content={getButtonMessage()}
        progress={progress}
      />
    </Grid>
  );
};

export default DepositSelector;
