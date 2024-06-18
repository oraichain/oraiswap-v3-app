import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    wrapper: {
      width: '100%',
      borderRadius: 13,
      backgroundColor: colors.oraidex.componentBcg,
      marginBottom: 8
    },
    bestText: {
      color: colors.oraidex.green,
      position: 'absolute',
      ...typography.caption1,
      textAlign: 'center',
      top: 40
    }
  }
})

export const useTabsStyles = makeStyles()(() => {
  return {
    root: {
      overflow: 'visible',
      height: 36,
      minHeight: 36,
      margin: '4px 4px',
      borderRadius: 10
    },
    indicator: {
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.oraidex.light,
      top: 0
    },
    flexContainer: {
      justifyContent: 'space-between'
    },
    scrollButtons: {
      width: 24,
      '& svg': {
        fill: colors.oraidex.light
      },
      '&:hover svg': {
        fill: colors.oraidex.text
      }
    }
  }
})

export const useSingleTabStyles = makeStyles()(() => {
  return {
    root: {
      zIndex: 1,
      textTransform: 'none',
      ...typography.body3,
      height: 36,
      minHeight: 36,
      color: colors.oraidex.light,
      paddingInline: 0,
      minWidth: 65,
      width: 65,
      marginRight: '7px',
      position: 'relative',
      overflow: 'visible',

      '&:hover': {
        color: colors.oraidex.lightHover,
        backgroundColor: colors.oraidex.light,
        height: 36,
        borderRadius: 10
      },

      '&:last-of-type': {
        marginRight: 0
      }
    },
    best: {
      color: colors.oraidex.green,
      border: `2px solid ${colors.oraidex.green}`,
      borderRadius: 10,

      '&:hover': {
        color: colors.oraidex.green
      }
    },
    selected: {
      ...typography.heading4,
      color: colors.white.main + ' !important',
      transition: 'color 300ms',

      '&:hover': {
        color: colors.white.main
      }
    }
  }
})

export default useStyles
