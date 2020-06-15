var gdindex = "https://get.derpfest.org/";
var updatedb = "https://raw.githubusercontent.com/DerpLab/Updater-Stuff/master";
var today = new Date().toISOString().slice(0, 10);
var onPageLoad = function() {
  document.querySelectorAll("div[data-device]").forEach(el => {
    var device = el.getAttribute("data-device");
    fetch(updatedb + "/" + device + "/" + device + ".json")
      .then(res => res.json())
      .then(ret => {
        var file = ret.response[0].filename;
        var dl = gdindex + device + "/builds/"+ file;
        el.getElementsByClassName("btn-download")[0].href = dl;
        var md5 = gdindex + device + "/md5/"+ file+ ".md5sum";
        el.getElementsByClassName("btn-md5")[0].href = md5;  
          
      })
      .catch(err => {
        console.error("failed to fetch " + device + " data");
      });
  });
};

window.addEventListener("load", onPageLoad);
