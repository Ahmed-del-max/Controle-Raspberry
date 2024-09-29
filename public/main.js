


var socket = io(); //load socket.io-client and connect to the host that serves the page
window.addEventListener("load", function(){ //when page loads
  if( isMobile.any() ) {
    document.addEventListener("touchstart", ReportTouchStart, false);
    document.addEventListener("touchend", ReportTouchEnd, false);
  } else {
    document.addEventListener("mouseup", ReportMouseUp, false);
    document.addEventListener("mousedown", ReportMouseDown, false);
  }
});

// Update gpio feedback when server changes LED state
socket.on('GPIO26', function (data) {  
  document.getElementById('GPIO26').checked = data;
});

function ReportTouchStart(e) {
  if (e.target.id === "GPIO26M") {
    socket.emit("GPIO26", 1); 
    document.getElementById('GPIO26').checked = 1;
  }
}

function ReportTouchEnd(e) {
  if (e.target.id === "GPIO26M") {
    socket.emit("GPIO26", 0); 
    document.getElementById('GPIO26').checked = 0;
  }
}

function ReportMouseDown(e) {
  if (e.target.id === "GPIO26M") {
    socket.emit("GPIO26", 1); 
    document.getElementById('GPIO26').checked = 1;
  }
}

function ReportMouseUp(e) {
  if (e.target.id === "GPIO26M") {
    socket.emit("GPIO26", 0); 
    document.getElementById('GPIO26').checked = 0;
  }
}

/** function to sense if device is a mobile device **/
var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

