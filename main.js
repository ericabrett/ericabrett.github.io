var padding = {
  horizontal: 120,
  top: 50
};
var vrView;
var imageIndex = 0;
var numImages = 5;
var imageInterval = 15000;
var interval;
var isPaused = false;

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
  vrView.on("ready", function(e) {
    startTimer();
  });
  vrView.on("click", function(e) {
    isPaused = !isPaused;
    if (isPaused) {
      stop();
    } else {
      changeImage();
      startTimer();
    }
  });
}

function advanceImageIndex() {
  imageIndex = (imageIndex + 1) % numImages;
}

function changeImage() {
  advanceImageIndex();
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

function preloader() {
  if (document.images) {
    var images = [];
    for (var i = 0; i < numImages; i++) {
      var image = new Image();
      image.src = "/images/" + document.getElementById("vrview").dataset.prefix + "_" + i + ".jpg";
      images.push(image);
    }
  }
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    };
  }
}

addLoadEvent(preloader);
