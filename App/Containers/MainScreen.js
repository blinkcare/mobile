import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Box, Card, Text, Icon } from '../UI'
import { connect } from 'react-redux'
import timer from 'react-native-timer'
import Parse from 'parse/react-native'
import MainActions, { getQueue } from '../Redux/MainRedux'

// Components
import MorseDisplay from '../Components/MorseDisplay'
import DeviceDisplay from '../Components/DeviceDisplay'

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <Icon
        name="settings"
        mx={2}
        size={28}
        onPress={() => navigation.navigate('SettingsScreen')}
      />
    ),
    headerLeft: null
  })

  componentDidMount() {
    let query = new Parse.Query('Queue')
    this.subscription = query.subscribe()
    this.subscription.on('create', object => {
      this.props.getQueue(object)
    })
    this.subscription.on('update', object => {
      this.props.getQueue(object)
    })
    this.subscription.on('enter', object => {
      this.props.getQueue(object)
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  devicesMap() {
    return Object.keys(this.props.totalObj).map((key, index) => {
      const { characters, queue, stat } = this.props.totalObj[key]
      const deviceName = key
      return (
        <DeviceDisplay
          key={key}
          deviceName={deviceName}
          characters={characters}
          queue={queue}
          stat={stat}
        />
      )
    })
  }

  render() {
    return <ScrollView p={2}>{this.devicesMap()}</ScrollView>
  }
}

const mapStateToProps = state => {
  const { totalObj } = state.main
  return {
    totalObj
  }
}

const mapDispatchToProps = dispatch => ({
  getQueue: object => dispatch(getQueue(object))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
