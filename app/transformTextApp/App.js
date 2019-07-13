import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Clipboard
} from "react-native";

export default class App extends Component {
  _ASCII_GAP = 588;

  _asciiToLetter = str => {
    return String.fromCharCode(str.charCodeAt() + this._ASCII_GAP);
  };

  _range = (start, end) => {
    var result = [];
    for (var i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  _ascii = [
    this._range(44032, 44619),
    this._range(45796, 46383),
    this._range(48232, 48735),
    this._range(49324, 49911),
    this._range(51088, 51675)
  ];

  _asciiCheck = str => {
    for (var i = 0; i < this._ascii.length; i++) {
      if (this._ascii[i].includes(str.charCodeAt())) {
        return true;
      }
    }
  };

  _randomLetter = str => {
    var strMiddle = Math.round(str.length / 2 - 1);
    if (str.length < 3) {
      var arr = str.split("");
      arr = arr.reverse();
      return arr.join("");
    } else if (str.length > 3 && str.length % 2 === 0) {
      return `${str.slice(0, strMiddle)}${str.charAt(
        strMiddle + 1
      )}${str.charAt(strMiddle)}${str.slice(strMiddle + 2)}`;
    } else {
      return `${str.slice(0, strMiddle)}${str.charAt(
        strMiddle + 1
      )}${str.charAt(strMiddle)}${str.slice(strMiddle + 2)}`;
    }
  };

  _handleTransform = arr => {
    var self = this;
    arr.forEach(function(item, index) {
      if (item.length > 3) {
        var firstLetter = self._asciiCheck(item.charAt(0))
          ? self._asciiToLetter(item.charAt(0))
          : item.charAt(0);
        var lastLetter = self._asciiCheck(item.charAt(item.length - 1))
          ? self._asciiToLetter(item.charAt(item.length - 1))
          : item.charAt(item.length - 1);
        var middleLetter = item.slice(1, item.lastIndexOf(lastLetter));
        arr[index] = `${firstLetter}${self._randomLetter(
          middleLetter
        )}${lastLetter}`;
      } else {
        var array = item.split("");
        for (var i = 0; i < array.length; i++) {
          if (self._asciiCheck(array[i])) {
            array[i] = self._asciiToLetter(array[i]);
          }
        }
        arr[index] = array.join("");
      }
      self.setState({ textOutput: arr.join(" ") });
    });
  };

  _handleGetData = () => {
    var re = /\s+|\\n+|\.+|\,+|\!+|\?+/;
    var text = this.state.textInput.split(re);
    this._handleTransform(text);
  };

  _handleCopy = () => {
    Clipboard.setString(`${this.state.textOutput}`);
    alert("복사되었습니다.");
    this.setState({
      textOutput: null
    });
  };

  state = {
    language: null,
    textInput: null,
    textOutput: null
  };

  componentDidMount() {
    this.setState({
      language: navigator.language
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>번역방지 텍스트 변환기</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textarea}
            multiline={true}
            numberOfLines={4}
            placeholder={"텍스트를 입력하세요!!"}
            textAlignVertical="top"
            onChangeText={text => {
              this.setState({ textInput: text });
              console.log(this.state.textInput);
            }}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this._handleGetData}>
          <Text style={styles.buttonText}>변환하기</Text>
        </TouchableOpacity>
        {this.state.textOutput === null ? (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textarea}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              placeholder={"변환버튼을 누르면 결과가 표시됩니다."}
            />
          </View>
        ) : (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textarea}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              value={this.state.textOutput}
            />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={this._handleCopy}>
          <Text style={styles.buttonText}>복사하기</Text>
        </TouchableOpacity>
        <View style={styles.decoImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  title: {
    alignSelf: "center",
    fontSize: 40,
    paddingTop: 40
  },
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
  },
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
  },
  decoImage: {}
});
