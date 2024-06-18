import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    wrapper: {
      borderRadius: 10,
      backgroundColor: colors.oraidex.component,
      padding: 24,
      paddingTop: 16,
      flex: '1 1 0%'
    },
    sectionTitle: {
      ...typography.heading4,
      marginBottom: 24,
      color: colors.white.main
    },
    sectionWrapper: {
      borderRadius: 8,
      backgroundColor: colors.oraidex.component,
      paddingTop: 0,
      width: '100%'
    },
    inputLabel: {
      ...typography.body3,
      lineHeight: '16px',
      color: colors.oraidex.light,
      marginBottom: 3
    },
    selects: {
      gap: 12,
      marginBottom: 10
    },
    selectWrapper: {
      flex: '1 1 0%'
    },
    customSelect: {
      width: '100%',
      justifyContent: 'flex-start',
      border: 'none',
      backgroundColor: colors.oraidex.componentBcg,
      borderRadius: 13,
      paddingInline: 13,
      height: 44,

      '& .selectArrow': {
        marginLeft: 'auto'
      },

      '&:hover': {
        backgroundColor: colors.oraidex.light
      }
    },
    addButton: {
      width: '100%',
      margin: '30px 0',
      cursor: 'default'
    },
    hoverButton: {
      '&:hover': {
        filter: 'brightness(1.2)',
        boxShadow: `0 0 10px ${colors.oraidex.pink}`,
        transition: '.2s all',
        cursor: 'pointer'
      }
    },
    arrows: {
      width: 32,
      cursor: 'pointer',

      '&:hover': {
        filter: 'brightness(2)'
      }
    }
  }
})
