import { Theme } from '@mui/material';
import { colors, typography } from '@static/theme';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  poolFilter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px 16px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '6px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  poolFilterRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      width: '100%'
      // marginTop: '8px'
    }
  },

  //   input: {
  //     width: '100%',
  //     marginRight: '0'
  //   },

  poolFilterList: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '99px',

    // @include theme() {
    //   background-color: theme-get('neutral-border-border-default'),
    // }

    [theme.breakpoints.down('md')]: {
      width: '100%',
      justifyContent: 'space-between'
    }
  },

  poolSearch: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '99px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },

  input: {
    height: '40px',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '150%',
    marginRight: '8px',
    // color: $neutron-text-body-light,
    borderRadius: '99px',
    color: '#EFEFEF',
    minWidth: '280px',
    maxWidth: 400,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: 600,

      marginRight: '0px'
    }
  },

  filterActive: {
    backgroundColor: '#fff'

    //   @include theme() {
    //     color: #163300,
    //   }
  },

  filterItem: {
    padding: '3px 20px',
    fontSize: '16px',
    fontƯeight: '500',
    cursor: 'pointer',
    borderRadius: '99px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
    // @include theme() {
    //   color: theme-get('neutral-text-body'),
    // }
  },

  titleBar: {
    display: 'flex',
    marginBottom: 20
  },
  title: {
    color: colors.oraidex.text,
    ...typography.heading4,
    fontWeight: 500
  },
  positionsNumber: {
    width: 28,
    height: 28,
    color: colors.oraidex.text,
    background: colors.oraidex.light,
    marginLeft: 8,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchRoot: {
    width: '100%'
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  searchBar: {
    width: 221,
    height: 32,
    padding: '7px 12px',
    borderRadius: 10,
    background: colors.oraidex.black,
    border: '1px solid #202946',
    color: colors.oraidex.lightGrey,
    ...typography.body2,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 200
    }
  },
  button: {
    color: colors.oraidex.dark,
    ...typography.body1,
    textTransform: 'none',
    borderRadius: 14,
    height: 40,
    minWidth: 130,
    paddingInline: 0,
    marginLeft: 16,
    background:
      'linear-gradient(180deg, rgba(239, 132, 245, 0.8) 0%, rgba(156, 62, 189, 0.8) 100%)',

    '&:hover': {
      background: 'linear-gradient(180deg, #EF84F5 0%, #9C3EBD 100%)',
      boxShadow: '0px 0px 16px rgba(239, 132, 245, 0.35)'
    }
  },

  buttonSelectDisabled: {
    ...typography.body1,
    textTransform: 'none',
    borderRadius: 14,
    height: 40,
    minWidth: 130,
    paddingInline: 0,
    cursor: 'auto',
    marginLeft: 16,
    background: `${colors.oraidex.light} !important`,

    '&:hover': {
      filter: 'brightness(1.15)'
    }
  },
  buttonText: {
    WebkitPaddingBefore: '2px'
  },
  noPositionsText: {
    ...typography.heading1,
    textAlign: 'center',
    color: colors.oraidex.text
  },
  list: {
    position: 'relative',
    flex: 1
  },
  itemLink: {
    textDecoration: 'none',
    cursor: 'pointer',

    '&:not(:last-child)': {
      display: 'block',
      marginBottom: 20,

      [theme.breakpoints.down('sm')]: {
        marginBottom: 16
      }
    }
  },
  searchIcon: {
    width: 17
  },
  loading: {
    width: 150,
    height: 150,
    margin: 'auto'
  },
  placeholder: {
    margin: 'auto'
  },
  refreshIconBtn: {
    padding: 0,
    margin: 0,
    minWidth: 'auto',
    background: 'none',
    marginRight: 7,
    '&:hover': {
      background: 'none'
    },
    '&:disabled': {
      opacity: 0.5
    }
  },
  refreshIcon: {
    width: 26,
    height: 21,
    cursor: 'pointer',
    transition: 'filter 100ms',
    '&:hover': {
      filter: 'brightness(1.5)'
    }
  }
}));