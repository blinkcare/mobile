import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { FormLabel, FormInput } from 'react-native-elements'
import { Card, Button } from '../UI'
import { NavigationActions } from 'react-navigation'
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
            <Button
              bg="danger"
              title="Log out"
              my={2}
              onPress={() => {
                this.props.logout().then(() => {
                  this.resetNavigation('StartScreen')
                })
              }}
            />
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
