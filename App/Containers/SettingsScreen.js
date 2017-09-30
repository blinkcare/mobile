import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
import { Card, FormLabel, FormInput } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SettingsActions from '../Redux/SettingsRedux'
import { logout } from '../Redux/LoginRedux'

// Styles
import styles from './Styles/SettingsScreenStyle'

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
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Card>
            <FormLabel>Device Name</FormLabel>
            <FormInput
              value={this.props.deviceName}
              onChangeText={text => this.props.updateDevice(text)}
            />
            <Button
              style={styles.logoutBtn}
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
