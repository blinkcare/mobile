import { StackNavigator } from 'react-navigation'
import ResetScreen from '../Containers/ResetScreen'
import SignupScreen from '../Containers/SignupScreen'
import LoginScreen from '../Containers/LoginScreen'
import StartScreen from '../Containers/StartScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import MainScreen from '../Containers/MainScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    SignupScreen: {
      screen: SignupScreen,
      navigationOptions: { title: 'Sign up' }
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: { title: 'Sign in' }
    },
    StartScreen: { screen: StartScreen },
    SettingsScreen: { screen: SettingsScreen },
    MainScreen: { screen: MainScreen },
    ResetScreen: { screen: ResetScreen }
  },
  {
    // Default config for all screens
    headerMode: 'float',
    initialRouteName: 'StartScreen',
    navigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.white,
      headerBackTitleStyle: styles.white,
      headerTintColor: styles.white
    }
  }
)

export default PrimaryNav
