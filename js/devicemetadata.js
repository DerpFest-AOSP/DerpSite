var sourceForge = "https://sourceforge.net/projects/derpfest";
var updatedb = "https://raw.githubusercontent.com/DerpLab/Updater-Stuff/master";
var onPageLoad = function() {
  document.querySelectorAll("div[data-device]").forEach(el => {
    var device = el.getAttribute("data-device");
    fetch(updatedb + "/" + device + "/" + device + ".json")
      .then(res => res.json())
      .then(ret => {
        var file = ret.response[0].filename;
        file = sourceForge + "/files/" + device + "/" + file + "/download"
        el.getElementsByClassName("btn-download")[0].href = file;
        var today = new Date().toIOString().slice(0, 10);
        fetch(file + "/stats/json?start_date=2000-01-01" + "&end_date=" + today")
          .then(res => res.json())
          .then(ret => {
            var dlc = ret.response[0].summaries.time.downloads;
            el.getElementsByClassName("lbl btn-download")[0].href = dlc;
          })
          .catch(err => {
            console.error("failed to fetch " + device + " download count");
          });
      })
      .catch(err => {
        console.error("failed to fetch " + device + " data");
      });
  });
};

window.addEventListener("load", onPageLoad);
