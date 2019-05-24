const transformButton = document.getElementById("transformButton");
const textInput = document.getElementById("inputBox");
const textOutput = document.getElementById("outputBox");
const copyButton = document.getElementById("copyButton");

const ASCII_GAP = 588;

const asciiToLetter = function(str) {
  return String.fromCharCode(str.charCodeAt() + ASCII_GAP);
};

const range = function(start, end) {
  var result = [];
  for (var i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const ascii = [
  range(44032, 44619),
  range(45796, 46383),
  range(48232, 48735),
  range(49324, 49911),
  range(51088, 51675)
];

const asciiCheck = function(str) {
  for (var i = 0; i < ascii.length; i++) {
    if (ascii[i].includes(str.charCodeAt())) {
      return true;
    }
  }
};

const randomLetter = function(str) {
  var strMiddle = Math.round(str.length / 2 - 1);
  if (str.length < 3) {
    var arr = str.split("");
    arr = arr.reverse();
    return arr.join("");
  } else if (str.length > 3 && str.length % 2 === 0) {
    return `${str.slice(0, strMiddle)}${str.charAt(strMiddle + 1)}${str.charAt(
      strMiddle
    )}${str.slice(strMiddle + 2)}`;
  } else {
    return `${str.slice(0, strMiddle)}${str.charAt(strMiddle + 1)}${str.charAt(
      strMiddle
    )}${str.slice(strMiddle + 2)}`;
  }
};

const handleTransform = function(arr) {
  arr.forEach(function(item, index) {
    if (item.length > 3) {
      var firstLetter = asciiCheck(item.charAt(0))
        ? asciiToLetter(item.charAt(0))
        : item.charAt(0);
      var lastLetter = asciiCheck(item.charAt(item.length - 1))
        ? asciiToLetter(item.charAt(item.length - 1))
        : item.charAt(item.length - 1);
      var middleLetter = item.slice(1, item.lastIndexOf(lastLetter));
      arr[index] = `${firstLetter}${randomLetter(middleLetter)}${lastLetter}`;
    } else {
      var array = item.split("");
      for (var i = 0; i < array.length; i++) {
        if (asciiCheck(array[i])) {
          array[i] = asciiToLetter(array[i]);
        }
      }
      arr[index] = array.join("");
    }
    textOutput.value = arr.join(" ");
  });
};

const handleGetData = function() {
  var re = /\s+|\\n+|\.+|\,+|\!+|\?+/;
  var text = textInput.value.split(re);
  console.log(text);
  handleTransform(text);
};

const handleCopy = function() {
  textOutput.select();
  document.execCommand("copy");
  alert("복사되었습니다.");
};

transformButton.addEventListener("click", handleGetData);
copyButton.addEventListener("click", handleCopy);
