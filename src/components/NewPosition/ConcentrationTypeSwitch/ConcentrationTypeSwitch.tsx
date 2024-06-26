import React, { useState } from 'react'
import { theme } from '@static/theme'
import { useSingleTabStyles, useTabsStyles } from './style'
import { Tab, Tabs, useMediaQuery } from '@mui/material'

export interface IProps {
  onSwitch: (isConcentrated: boolean) => void
  initialValue: number
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}

export const ConcentrationTypeSwitch: React.FC<IProps> = ({
  onSwitch,
  initialValue,
  className,
  style,
  disabled = false
}) => {
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  const [current, setCurrent] = useState(initialValue)

  const { classes: tabsClasses } = useTabsStyles({ value: current })
  const { classes: singleTabClasses } = useSingleTabStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrent(newValue)
    onSwitch(!newValue)
  }

  return (
    <Tabs
      className={className}
      style={style}
      value={current}
      onChange={!disabled ? handleChange : undefined}
      variant='scrollable'
      scrollButtons={false}
      classes={tabsClasses}>
      <Tab
        disableRipple
        label={isXs ? 'Conc.' : 'Concentr.'}
        classes={singleTabClasses}
        style={{ cursor: !disabled ? 'pointer' : 'default' }}
      />
      <Tab
        disableRipple
        label='Range'
        classes={singleTabClasses}
        style={{ cursor: !disabled ? 'pointer' : 'default' }}
      />
    </Tabs>
  )
}

export default ConcentrationTypeSwitch
