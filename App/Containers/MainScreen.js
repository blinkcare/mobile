import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, View } from 'react-native'
import { Card, Text, Icon } from '../UI'
import { connect } from 'react-redux'
import timer from 'react-native-timer'
import Parse from 'parse/react-native'
import MainActions, { getQueue } from '../Redux/MainRedux'

// Components
import MorseDisplay from '../Components/MorseDisplay'

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <Icon
        name="settings"
        pr={2}
        size={32}
        onPress={() => navigation.navigate('SettingsScreen')}
      />
    ),
    headerLeft: null
  })

  componentDidMount() {
    let query = new Parse.Query('Queue')
    query.equalTo('deviceName', this.props.deviceName) // ONLY WORKS ON APP RESTART
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

  render() {
    const { error, characters, queue, stat } = this.props
    const errorText = error ? (
      <Text color="error">There was an error connecting to the device.</Text>
    ) : null

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Card>
            <MorseDisplay current={characters} waiting={queue} status={stat} />
            {errorText}
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const { stat, characters, queue } = state.main
  return {
    deviceName: state.settings.deviceName,
    stat,
    characters,
    queue
  }
}

const mapDispatchToProps = dispatch => ({
  getQueue: object => dispatch(getQueue(object))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
