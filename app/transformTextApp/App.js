import React, { Component } from "react";
import { StyleSheet, Text, View, Clipboard, Image } from "react-native";
import Textarea from "./Textarea";
import Button from "./Button";

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
    alert(this._isKorea() ? "복사되었습니다." : "Copy to clipboard");
    this.setState({
      textOutput: null
    });
  };

  _isKorea = () => {
    const { language } = this.state;
    if (language === "ko-KR" || "ko") {
      return true;
    }
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
        <Text style={styles.title}>
          {this._isKorea() ? "번역방지 텍스트 변환기" : "Manipulate text"}
        </Text>
        <Textarea
          placeholder={
            this._isKorea() ? "텍스트를 입력하세요!!" : "Type your text here."
          }
          onChangeText={text => {
            this.setState({ textInput: text });
          }}
        />
        <Button
          onPress={this._handleGetData}
          title={this._isKorea() ? "변환하기" : "Manipulate"}
        />
        {this.state.textOutput === null ? (
          <Textarea
            placeholder={
              this._isKorea()
                ? "변환버튼을 누르면 결과가 표시됩니다."
                : "Result here."
            }
          />
        ) : (
          <Textarea value={this.state.textOutput} />
        )}
        <Button
          onPress={this._handleCopy}
          title={this._isKorea() ? "복사하기" : "Copy"}
        />
        <View style={styles.imgContainer}>
          <Image
            style={styles.decoImage1}
            source={{
              uri: "https://img.icons8.com/color/96/000000/google-translate.png"
              //<a href="https://icons8.com/icon/13647/google-translate">Google Translate icon by Icons8</a>
            }}
          />
          <Image
            style={styles.decoImage2}
            source={{
              uri: "https://img.icons8.com/color/96/000000/ask-question.png"
              //<a href="https://icons8.com/icon/13720/ask-question">Ask Question icon by Icons8</a>
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFDFF"
  },
  title: {
    alignSelf: "center",
    fontSize: 40,
    paddingTop: 40,
    color: "#082133"
  },
  imgContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FBFDFF",
    alignItems: "center",
    justifyContent: "center"
  },
  decoImage1: {
    width: 150,
    height: 120
  },
  decoImage2: {
    position: "relative",
    top: -70,
    left: -25,
    width: 100,
    height: 80
  }
});
