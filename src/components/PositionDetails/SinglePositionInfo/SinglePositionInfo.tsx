import ClosePositionWarning from '@components/Modals/ClosePositionWarning/ClosePositionWarning';
import { Button, Grid, Typography } from '@mui/material';
import { TokenPriceData } from '@store/consts/static';
import { blurContent, unblurContent } from '@utils/uiUtils';
import classNames from 'classnames';
import React, { useState } from 'react';
import { BoxInfo } from './BoxInfo';
import { ILiquidityToken } from './consts';
import useStyles from './style';
import MarketIdLabel from '@components/NewPosition/MarketIdLabel/MarketIdLabel';
import { VariantType } from 'notistack';

interface IProp {
  fee: number;
  onClickClaimFee: () => void;
  closePosition: (claimFarmRewards?: boolean) => void;
  tokenX: ILiquidityToken;
  tokenY: ILiquidityToken;
  tokenXPriceData?: TokenPriceData;
  tokenYPriceData?: TokenPriceData;
  xToY: boolean;
  swapHandler: () => void;
  showFeesLoader?: boolean;
  userHasStakes?: boolean;
  poolAddress: string;
  copyPoolAddressHandler: (message: string, variant: VariantType) => void;
}

const SinglePositionInfo: React.FC<IProp> = ({
  fee,
  onClickClaimFee,
  closePosition,
  tokenX,
  tokenY,
  tokenXPriceData,
  tokenYPriceData,
  xToY,
  swapHandler,
  showFeesLoader = false,
  userHasStakes = false,
  poolAddress,
  copyPoolAddressHandler
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { classes } = useStyles();

  const tokenA = xToY
    ? { ...tokenX, value: tokenX.claimValue }
    : { ...tokenY, value: tokenY.claimValue };

  const tokenB = xToY
    ? { ...tokenY, value: tokenY.claimValue }
    : { ...tokenX, value: tokenX.claimValue };

  const disableClaimFee =
    Math.abs(Number(tokenA.value)) < 10 ** Number(-tokenA.decimal) &&
    Math.abs(Number(tokenB.value)) < 10 ** Number(-tokenB.decimal);

  return (
    <Grid className={classes.root}>
      <ClosePositionWarning
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          unblurContent();
        }}
        onClose={() => {
          closePosition();
          setIsModalOpen(false);
          unblurContent();
        }}
        onClaim={() => {
          closePosition(true);
          setIsModalOpen(false);
          unblurContent();
        }}
      />
      <Grid className={classes.header}>
        <Grid className={classes.iconsGrid}>
          <img
            className={classes.icon}
            src={xToY ? tokenX.icon : tokenY.icon}
            alt={xToY ? tokenX.name : tokenY.name}
          />
          <img
            className={classes.icon2}
            src={xToY ? tokenY.icon : tokenX.icon}
            alt={xToY ? tokenY.name : tokenX.name}
          />
          <Grid className={classes.namesGrid}>
            <Typography className={classes.name}>{xToY ? tokenX.name : tokenY.name}</Typography>
            <Typography id='pause' className={classes.name}>
              /
            </Typography>
            <Typography className={classes.name}>{xToY ? tokenY.name : tokenX.name}</Typography>
          </Grid>
          <Grid className={classes.rangeGrid}>
            <Typography className={classNames(classes.text, classes.feeText)}>
              Fee: {fee.toString()}%
            </Typography>
          </Grid>
        </Grid>

        {/* <Grid className={classes.headerButtons}>
          <Button
            className={classes.closeButton}
            variant='contained'
            onClick={() => {
              if (!userHasStakes) {
                closePosition();
              } else {
                setIsModalOpen(true);
                blurContent();
              }
            }}>
            Close position
          </Button>
        </Grid> */}
      </Grid>
      <MarketIdLabel
        marketId={poolAddress.toString()}
        displayLength={9}
        copyPoolAddressHandler={copyPoolAddressHandler}
      />
      <Grid className={classes.bottomGrid}>
        <BoxInfo
          title={'Liquidity'}
          tokenA={
            xToY
              ? { ...tokenX, value: tokenX.liqValue, price: tokenXPriceData?.price }
              : { ...tokenY, value: tokenY.liqValue, price: tokenYPriceData?.price }
          }
          tokenB={
            xToY
              ? { ...tokenY, value: tokenY.liqValue, price: tokenYPriceData?.price }
              : { ...tokenX, value: tokenX.liqValue, price: tokenXPriceData?.price }
          }
          showBalance
          swapHandler={swapHandler}
        />
        <BoxInfo
          title={'Unclaimed fees'}
          tokenA={
            xToY ? { ...tokenX, value: tokenX.claimValue } : { ...tokenY, value: tokenY.claimValue }
          }
          tokenB={
            xToY ? { ...tokenY, value: tokenY.claimValue } : { ...tokenX, value: tokenX.claimValue }
          }
          onClickButton={onClickClaimFee}
          showLoader={showFeesLoader}
        />
      </Grid>

      <Grid className={classes.headerButtons}>
        <Button
          className={classes.closeButton}
          variant='contained'
          onClick={() => {
            if (!userHasStakes) {
              closePosition();
            } else {
              setIsModalOpen(true);
              blurContent();
            }
          }}>
          Close Position
        </Button>
        <Button
          className={classes.violetButton}
          variant='contained'
          onClick={onClickClaimFee}
          disabled={disableClaimFee}>
          Claim Fee
        </Button>
      </Grid>
    </Grid>
  );
};

export default SinglePositionInfo;
