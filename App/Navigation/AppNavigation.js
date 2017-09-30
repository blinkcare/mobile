import { StackNavigator } from 'react-navigation'
import SignupScreen from '../Containers/SignupScreen'
import LoginScreen from '../Containers/LoginScreen'
import StartScreen from '../Containers/StartScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import MainScreen from '../Containers/MainScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    SignupScreen: { screen: SignupScreen },
    LoginScreen: { screen: LoginScreen },
    StartScreen: { screen: StartScreen },
    SettingsScreen: { screen: SettingsScreen },
    MainScreen: { screen: MainScreen }
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
