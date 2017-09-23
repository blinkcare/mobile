import { StackNavigator } from 'react-navigation'
import SettingsScreen from '../Containers/SettingsScreen'
import MainScreen from '../Containers/MainScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SettingsScreen: { screen: SettingsScreen },
  MainScreen: { screen: MainScreen }
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'MainScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
