import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    root: {
      background: colors.oraidex.component,
      width: 310,
      borderRadius: 20,
      marginTop: 8,
      padding: 8
    },
    list: {
      borderRadius: 5,
      marginTop: 7
    },
    listItem: {
      color: colors.oraidex.textGrey,
      background: colors.oraidex.component,
      borderRadius: 11,
      padding: '6px 7px',
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        background: colors.oraidex.light,
        color: colors.white.main
      },
      '&first-of-type': {
        marginBottom: '4px'
      },
      '&:not(:first-of-type)': {
        margin: '4px 0'
      },
      '&:last-child': {
        marginTop: '4px'
      }
    },
    title: {
      ...typography.body1,
      margin: 10
    },
    dotIcon: {
      width: 12,
      marginLeft: 'auto',
      color: colors.oraidex.green,
      display: 'none'
    },
    name: {
      textTransform: 'capitalize',
      ...typography.body2,
      paddingTop: '1px'
    },
    paper: {
      background: 'transparent',
      boxShadow: 'none'
    },
    icon: {
      float: 'left',
      marginRight: 8,
      opacity: 1
    },
    active: {
      background: colors.oraidex.light,
      color: colors.white.main,
      '& $icon': {
        opacity: 1
      },

      '& $dotIcon': {
        display: 'block'
      }
    },
    lowerRow: {
      height: 30,
      marginBlock: 10
    },
    input: {
      backgroundColor: colors.oraidex.newDark,
      width: '100%',
      height: 30,
      color: colors.white.main,
      borderRadius: 11,
      ...typography.body2,
      marginRight: 6,
      '&::placeholder': {
        color: colors.oraidex.light,
        ...typography.body2
      },
      '&:focus': {
        outline: 'none'
      }
    },
    innerInput: {
      padding: '6px 10px'
    },
    add: {
      minWidth: 50,
      height: 30,
      background: colors.oraidex.greenLinearGradient,
      ...typography.body1,
      color: colors.oraidex.black,
      textTransform: 'none',
      borderRadius: 11,

      '&:disabled': {
        background: colors.oraidex.light,
        color: colors.oraidex.black
      }
    }
  }
})

export default useStyles
