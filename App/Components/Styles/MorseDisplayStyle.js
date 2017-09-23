import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    marginLeft: 10
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  current: {
    fontSize: 30,
    color: 'black'
  },
  waiting: {
    fontSize: 30,
    marginLeft: 10,
    color: 'gray',
  }
})
