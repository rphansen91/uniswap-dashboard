import React, { useCallback, FC } from 'react'
import { MuiThemeProvider } from "@material-ui/core/styles";
import { hawk, useHawkState, useHawkSetState } from 'react-hawk'
import { dark } from './dark'
import { light } from './light'

const key = 'theme-type'
const themeType = hawk({
  key,
  default: localStorage.getItem(key) || 'dark',
})

export const useThemeType = () => useHawkState(themeType)
export const useSetThemeType = () => {
  const setTheme = useHawkSetState(themeType)
  return useCallback((type: string) => {
    setTheme(type)
    localStorage.setItem(key, type)
  }, [setTheme])
}
export const ThemeProvider: FC = ({ children }) => {
  const type = useThemeType()
  return (
    <MuiThemeProvider theme={type === 'dark' ? dark : light}>
      {children}
    </MuiThemeProvider>
  )
}