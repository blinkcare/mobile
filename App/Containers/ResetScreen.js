import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { FormInput, FormLabel } from 'react-native-elements'
import { Card, Text, Button } from '../UI'
import { scale } from '../UI/theme'
import LoginActions, { reset } from '../Redux/LoginRedux'

const successMessage =
  'Your password was successfully reset. Check your email for a link on reset it.'

class ResetScreen extends Component {
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  componentWillUnmount() {
    this.props.setError('')
  }

  render() {
    var error = null
    if (this.props.resetError == successMessage) {
      error = <Text color="black">{this.props.resetError}</Text>
    } else if (this.props.resetError) {
      error = <Text color="error">{this.props.resetError}</Text>
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Card>
            <FormLabel>
              Enter your email. If it matches an account, a reset password link
              will be sent to you.
            </FormLabel>
            <FormInput
              keyboardType="email-address"
              value={this.props.email}
              onChangeText={a => {
                this.props.setError('')
                this.props.setEmail(a)
              }}
              autoCapitalize="none"
            />
            <Button
              onPress={() => {
                this.props
                  .reset()
                  .then(this.props.setError(successMessage))
                  .catch(() => {})
              }}
              title="Reset Password"
              buttonStyle={{marginVertical: scale[1]}}
            />
            {error}
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const { email, resetError } = state.login
  return { email, resetError }
}

const mapDispatchToProps = dispatch => ({
  setEmail: a => dispatch(LoginActions.setEmail(a)),
  setError: a => dispatch(LoginActions.setResetError(a)),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetScreen)
