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
            <FormInput value={this.props.endpoint} onChangeText={(text) => this.props.updateEndpoint(text)}/>
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    endpoint: state.settings.endpoint
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEndpoint: (text) => dispatch(SettingsActions.updateEndpoint(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
