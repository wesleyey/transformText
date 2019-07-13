import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    marginRight: 30,
    alignSelf: "flex-end",
    borderRadius: 10,
    backgroundColor: "#0E94F6"
  },
  buttonText: {
    paddingTop: 3,
    paddingBottom: 3,
    color: "white",
    alignSelf: "center"
  }
});
