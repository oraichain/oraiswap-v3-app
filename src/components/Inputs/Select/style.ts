import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => {
  return {
    button: {
      posiiton: 'relative',
      width: 'auto',
      textTransform: 'none',
      boxShadow: 'none',
      borderRadius: 12,
      height: 36,
      minWidth: 'auto',
      fontFamily: 'Mukta',
      backgroundColor: colors.oraidex.light,
      ...typography.body3,
      padding: 15,

      filter: 'brightness(0.8)',

      '&:hover': {
        filter: 'brightness(1)',
        backgroundColor: colors.oraidex.light
      },

      [theme.breakpoints.down('xs')]: {
        minWidth: 'auto'
      }
    },
    tokenName: {
      position: 'relative',
      top: 1,
      color: colors.white.main
    },
    icon: {
      marginRight: 5,
      minWidth: 20,
      height: 20,
      borderRadius: '100%'
    },
    endIcon: {
      marginLeft: 9
    }
  }
})

export default useStyles
