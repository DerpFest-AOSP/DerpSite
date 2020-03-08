var sourceForge = "https://sourceforge.net/projects/derpfest";
var updatedb = "https://raw.githubusercontent.com/DerpLab/Updater-Stuff/master";
var today = new Date().toISOString().slice(0, 10);
var onPageLoad = function() {
  document.querySelectorAll("div[data-device]").forEach(el => {
    var device = el.getAttribute("data-device");
    fetch(updatedb + "/" + device + "/" + device + ".json")
      .then(res => res.json())
      .then(ret => {
        var file = ret.response[0].filename;
        file = sourceForge + "/files/" + device + "/" + file;
        el.getElementsByClassName("btn-download")[0].href = file + "/download";
        fetch(file + "/stats/json?start_date=2000-01-01" + "&end_date=" + today)
          .then(res => res.json())
          .then(ret => {
            el.getElementsByClassName("total-download")[0].innerHTML = "Download Count</br>(Per latest build)<br>" + ret.total + "</br>";
          })
          .catch(err => {
            console.error("failed to fetch total download count for " + device);
          });
      })
      .catch(err => {
        console.error("failed to fetch " + device + " data");
      });
  });
};

window.addEventListener("load", onPageLoad);
