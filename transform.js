var transformButton = document.getElementById("transformButton");
var textInput = document.getElementById("inputBox");
var textOutput = document.getElementById("outputBox");

var randomLetter = function(str) {
  var arr = str.split("");
  arr = arr.reverse();
  return arr.join("");
};

var handleTransform = function(arr) {
  arr.forEach(function(item, index) {
    if (item.length > 3) {
      var firstLetter = item.charAt(0);
      var lastLetter =
        item.charAt(item.length - 1) === ("." || "," || "!" || "?")
          ? item.charAt(item.length - 2)
          : item.charAt(item.length - 1);
      var middleLetter = item.slice(1, item.lastIndexOf(lastLetter));
      arr[index] = `${firstLetter}${randomLetter(middleLetter)}${lastLetter}`;
    } else {
      var array = item.split("");
      for (var i = 0; i < array.length; i++) {
        array[i] = String.fromCharCode(array[i].charCodeAt() + 588);
      }
      arr[index] = array.join("");
    }
    textOutput.value = arr.join(" ");
  });
};

var handleGetData = function() {
  var text = textInput.value.split(" ");
  handleTransform(text);
};

transformButton.addEventListener("click", handleGetData);
