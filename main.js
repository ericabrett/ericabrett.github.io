var padding = {
  horizontal: 120,
  top: 50
};
var vrView;
var imageIndex = 0;
var numImages = 5;
var imageInterval = 10000;
var interval;

window.addEventListener("load", onVrViewLoad);

function onVrViewLoad() {
  var width = window.innerWidth;
  vrView = new VRView.Player("#vrview", {
    image: getImagePath(),
    is_stereo: true,
    width: width - padding.horizontal * 2,
    height: (width - padding.horizontal * 2) / 2,
    is_vr_off: false
  });
  startTimer();
}

function changeImage() {
  imageIndex = (imageIndex + 1) % numImages;
  vrView.setContent({
    image: getImagePath(),
    is_stereo: true,
    is_vr_off: false
  });
}

function getImagePath() {
  return "/images/" + document.getElementById("vrview").dataset.prefix + "_" + imageIndex + ".jpg";
}

function startTimer() {
  interval = setInterval(changeImage, imageInterval);
}

function stop() {
  clearInterval(interval);
}
