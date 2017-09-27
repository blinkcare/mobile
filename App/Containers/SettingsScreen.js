import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Card, FormLabel, FormInput } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SettingsActions from '../Redux/SettingsRedux'

// Styles
import styles from './Styles/SettingsScreenStyle'

class SettingsScreen extends Component {

  static navigationOptions = {
    title: 'Settings'
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Card>
            <FormLabel>Endpoint</FormLabel>
            <FormInput value={this.props.deviceName} onChangeText={(text) => this.props.updateDevice(text)}/>
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deviceName: state.settings.deviceName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateDevice: (text) => dispatch(SettingsActions.updateDevice(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
