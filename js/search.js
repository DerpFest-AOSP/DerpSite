var input = document.getElementById("sb");
var entries = document.getElementsByClassName("device");

input.addEventListener(
  "input",
  function() {
    var val = input.value;
    for (var i = 0, l = entries.length; i < l; i++) {
      var entryText = entries[i].getElementsByTagName("h4")[0].innerHTML;
      if (entryText.toLowerCase().indexOf(val.toLowerCase()) != -1)
        entries[i].style.display = "block";
      else entries[i].style.display = "none";
    }
  },
  false
);
