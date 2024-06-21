import { colors } from '@static/theme';
import { makeStyles } from 'tss-react/mui';

export const useLabelStyles = makeStyles()(() => {
  return {
    marketId: {
      fontFamily: 'Mukta',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '-0.03px',
      textAlign: 'left',
      color: `${colors.oraidex.textGrey} !important`,
      paddingRight: 7,
      paddingTop: 8
    },
    clipboardIcon: {
      width: 15,
      height: 13,
      cursor: 'pointer'
    }
  };
});
