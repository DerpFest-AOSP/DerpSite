var sourceForge = "https://sourceforge.net/projects/derpfest";
var updatedb = "https://raw.githubusercontent.com/DerpLab/Updater-Stuff/master";
var onPageLoad = function() {
  document.querySelectorAll("div[data-device]").forEach(el => {
    var device = el.getAttribute("data-device");
    fetch(updatedb + "/" + device + "/" + device + ".json")
      .then(res => res.json())
      .then(ret => {
        var file = ret.response[0].filename;
        el.getElementsByClassName("btn-download")[0].href = sourceForge + "/files/" + device + "/" + file + "/download";
        el.getElementsByClassName("btn-changelog")[0].href = updatedb + "/" + device + "/changelog.txt";
      })
      .catch(err => {
        console.error("failed to fetch " + device + " data");
      });
  });
};

window.addEventListener("load", onPageLoad);
