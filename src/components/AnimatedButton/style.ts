import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    button: {
      height: 44,
      borderRadius: 16,
      textAlign: 'center',
      textTransform: 'none',
      ...typography.body1,
      color: colors.oraidex.componentBcg,
      background: colors.oraidex.pinkLinearGradient,
      transition: 'background-color 0ms ease, box-shadow 150ms linear',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 4,
      '&:disabled': {
        background: colors.oraidex.light,
        color: colors.oraidex.componentBcg
      }
    },

    buttonRelease: {
      background: `${colors.oraidex.component} !important`,
      '&:hover': {
        background: `${colors.oraidex.component} !important`
      }
    },
    '@keyframes slide-start': {
      '0%': {
        left: '-100%'
      },
      '100%': {
        left: '-50%'
      }
    },
    '@keyframes slide-end-success': {
      '0%': {
        left: '-50%'
      },
      '80%': {
        left: '-35%'
      },
      '100%': {
        left: 0
      }
    },
    '@keyframes slide-end-fail': {
      '0%': {
        left: '-50%'
      },
      '80%': {
        left: '-65%'
      },
      '100%': {
        left: '-100%'
      }
    },
    background: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      padding: 0,
      zIndex: 1,
      top: 0,
      left: '-100%',
      backgroundColor: colors.oraidex.pink
    },
    backgroundRelease: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: '-50%',
      padding: 0,
      zIndex: 1,
      top: '0%',
      animation: '$slide-start .4s ease-in',
      transition: 'all .2s',
      backgroundColor: colors.oraidex.pink
    },
    backgroundApprovedWithSuccess: {
      top: 0,
      left: '-50%',
      width: '100%',
      height: '100%',
      padding: 0,
      position: 'absolute',
      animation: '$slide-end-success 1.5s',
      animationFillMode: 'forwards'
    },
    backgroundApprovedWithFail: {
      top: 0,
      left: '-50%',
      width: '100%',
      height: '100%',
      padding: 0,
      position: 'absolute',
      animation: '$slide-end-fail 1.5s',
      animationFillMode: 'forwards'
    },
    buttonContent: {
      position: 'relative',
      zIndex: 4
    },
    gifContent: {
      position: 'relative',
      zIndex: 4,
      width: 20
    },
    btnStories: {
      padding: '8px 14px',
      backgroundColor: colors.oraidex.green,
      border: 'none',
      margin: '10px 14px 10px 0'
    }
  }
})

export default useStyles
