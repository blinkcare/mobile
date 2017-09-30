import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center'
  },
  ...ApplicationStyles.screen,
  login: {
    marginBottom: 24
  },
  signup: {}
})
