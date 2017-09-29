import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  view: {
    flex: 1
  },
  ...ApplicationStyles.screen,
  login: {
    marginBottom: 10
  },
  signup: {
    marginTop: 10
  }
})
