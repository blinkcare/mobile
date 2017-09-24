import { StackNavigator } from 'react-navigation'
import SignupScreen from '../Containers/SignupScreen'
import LoginScreen from '../Containers/LoginScreen'
import SplashScreen from '../Containers/SplashScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import MainScreen from '../Containers/MainScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SignupScreen: { screen: SignupScreen },
  LoginScreen: { screen: LoginScreen },
  SplashScreen: { screen: SplashScreen },
  SettingsScreen: { screen: SettingsScreen },
  MainScreen: { screen: MainScreen }
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'SplashScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
