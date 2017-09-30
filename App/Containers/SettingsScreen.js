import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { FormLabel, FormInput } from 'react-native-elements'
import { Card, Button } from '../UI'
import SettingsActions from '../Redux/SettingsRedux'
import { logout } from '../Redux/LoginRedux'

class SettingsScreen extends Component {
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  static navigationOptions = {
    title: 'Settings'
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Card>
            <FormLabel>Device Name</FormLabel>
            <FormInput
              value={this.props.deviceName}
              onChangeText={text => this.props.updateDevice(text)}
            />
            <Button
              bg="red"
              title="Log out"
              onPress={() => {
                this.props.logout().then(() => {
                  this.props.navigation.navigate('SplashScreen')
                })
              }}
            />
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  deviceName: state.settings.deviceName
})

const mapDispatchToProps = dispatch => ({
  updateDevice: text => dispatch(SettingsActions.updateDevice(text)),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
