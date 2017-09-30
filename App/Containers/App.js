import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import theme from '../UI/theme'
import RootContainer from './RootContainer'
import createStore from '../Redux'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RootContainer />
    </Provider>
  </ThemeProvider>
)

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App)
