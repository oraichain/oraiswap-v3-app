import React from 'react';

import useStyles from './style';

import classNames from 'classnames';
import { Button, Typography } from '@mui/material';
import { blurContent, unblurContent } from '@utils/uiUtils';
import ConnectWallet from '@components/Modals/ConnectWallet';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface IProps {
  name: string;
  onConnect: () => void;
  connected: boolean;
  startIcon?: JSX.Element;
  onDisconnect: () => void;
  hideArrow?: boolean;
  className?: string;
}
export const ChangeWalletButton: React.FC<IProps> = ({
  name,
  onConnect,
  connected,
  startIcon,
  hideArrow,
  onDisconnect,
  className
}) => {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!connected) {
      onConnect();
      return;
    }

    setAnchorEl(event.currentTarget);
    blurContent();
    setOpen(true);
  };

  const handleClose = () => {
    unblurContent();
    setOpen(false);
  };

  const handleDisconnect = () => {
    onDisconnect();
    unblurContent();
    setOpen(false);
  };

  return (
    <>
      <Button
        id='connect-wallet-button'
        className={classNames(
          className,
          connected ? classes.headerButtonConnected : classes.headerButtonConnect
        )}
        disabled={true}
        variant='contained'
        classes={{
          disabled: classes.disabled,
          startIcon: classes.startIcon,
          endIcon: classes.innerEndIcon
        }}
        sx={{ '& .MuiButton-label': classes.label }}
        onClick={handleClick}
        startIcon={startIcon}
        endIcon={
          connected && !hideArrow ? <ExpandMoreIcon className={classes.endIcon} /> : undefined
        }>
        <Typography className={classes.headerButtonTextEllipsis}>{name}</Typography>
      </Button>
      <ConnectWallet
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        callDisconect={handleDisconnect}
      />
    </>
  );
};
export default ChangeWalletButton;
