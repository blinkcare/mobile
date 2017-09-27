import React, { Component } from 'react'
import Spinner from 'react-native-spinkit'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/MorseDisplayStyle'

export default class MorseDisplay extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    console.log(this.props.waiting)
    return (
      <View style={styles.textView}>
        <Text style={styles.current}>{this.props.current}</Text>
        <Text style={styles.waiting}>{this.props.waiting}</Text>
        <Spinner style={styles.spinner} isVisible={this.props.status} size={30} type={"ThreeBounce"} />
      </View>
    )
  }
}
