import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import timer from 'react-native-timer'
import Parse from 'parse/react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MainActions, {getQueue} from '../Redux/MainRedux'

// Styles
import styles from './Styles/MainScreenStyle'

// Components
import MorseDisplay from '../Components/MorseDisplay'

class MainScreen extends Component {


  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Icon name="settings" style={{paddingRight: 15}} size={30} onPress={() => navigation.navigate('SettingsScreen')} />,
    headerLeft: null
  })

  componentDidMount () {
    let query = new Parse.Query('Queue')
    query.equalTo("deviceName", this.props.deviceName) // /////////////////// ONLY WORKS ON APP RESTART /////////////////////////////
    this.subscription = query.subscribe()
    this.subscription.on('create', (object) => {
      this.props.getQueue(object)
    })
    this.subscription.on('update', (object) => {
      console.log(object)
      this.props.getQueue(object)
    })
    this.subscription.on('enter', (object) => {
      this.props.getQueue(object)
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render () {

    let error = null
    if (this.props.error) {
      error = <Text style={styles.errorText}>There was an error connecting to the device.</Text>
    }

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Card>
            <MorseDisplay current={this.props.characters} waiting={this.props.queue} status={this.props.status} />
            {error}
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deviceName: state.settings.deviceName,
    status: state.main.status,
    characters: state.main.characters,
    queue: state.main.queue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQueue: (object) => dispatch(getQueue(object))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
