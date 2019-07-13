import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default class Textarea extends Component {
  render() {
    return (
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textarea}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    width: 370,
    borderWidth: 3,
    borderColor: "#2057A8",
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 10,
    alignSelf: "center"
  },
  textarea: {
    width: 350,
    fontSize: 20,
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 5
  }
});
