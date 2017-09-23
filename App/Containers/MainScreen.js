import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import timer from 'react-native-timer'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MainActions, {send} from '../Redux/MainRedux'

// Styles
import styles from './Styles/MainScreenStyle'

// Components
import MorseDisplay from '../Components/MorseDisplay'

class MainScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Icon name="settings" style={{paddingRight: 15}} size={30} onPress={() => navigation.navigate('SettingsScreen')} />
  })

  componentDidMount () {
    timer.setInterval("serverUpdate", this.props.send, 500)
  }

  componentWillUnmount() {
    timer.clearInterval("serverUpdate")
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
            <MorseDisplay current={this.props.current} waiting={this.props.waiting} status={this.props.status} />
            {error}
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    current: state.main.current,
    waiting: state.main.waiting,
    status: state.main.status,
    error: state.main.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    send: () => dispatch(send())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
