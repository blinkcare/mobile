import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
import { Card, FormInput, FormLabel } from 'react-native-elements'
import Parse from 'parse/react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions, { login } from '../Redux/LoginRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {

  componentWillMount() {
    var currentUser = Parse.User.currentAsync();
    console.log(this.props.token)
    if (currentUser) {
      console.log(this.props.token)
      this.props.navigation.navigate("MainScreen")
    } else {
        // show the signup or login page
    }
      
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
        <Card>
            <FormLabel>Username</FormLabel>
            <FormInput value={this.props.username} onChangeText={(text) => this.props.setUsername(text)}/>
            <FormLabel>Password</FormLabel>
            <FormInput value={this.props.password} onChangeText={(text) => this.props.setPassword(text)}/>
            <Button onPress={() => {
              this.props.login()
              if (this.props.token != "" && this.props.token != undefined) {
                this.props.navigation.navigate("MainScreen")
              }
            }} title="Submit" style={styles.signup}/>
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password,
    token: state.login.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (text) => dispatch(LoginActions.setUsername(text)),
    setPassword: (text) => dispatch(LoginActions.setPassword(text)),
    login: () => dispatch(login())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
