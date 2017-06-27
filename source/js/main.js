var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d"),
    d = new Date(),
    split = 0.95,
    lastSecond = 0,
    newSecond = 0,
    fontSize = 30,
    mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    },
    cCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    },
    colors = ["#30CCC1", "#709996", "#55FF94", "#FF95BB", "#CC30B5"],
    titleOp = 1,
    seconds, minutes, hours, smallDim;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight -
  function (elmID) {
      var elmHeight, elmMargin, elm = document.getElementById(elmID);
      if(document.all) {// IE
          elmHeight = parseInt(elm.currentStyle.height);
          elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10);
      } else {// Mozilla
          elmHeight = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('height'));
          elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'));
      }
      return (elmHeight+elmMargin);
  }("title");

cCenter = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

// Objects
function Object(x, y, radius, color1, color2) {
  this.x = x;
  this.y = y;
  this.angle = 0;
  this.radius = radius;
  this.color1 = color1;
  this.color2 = color2 || color1;
  this.grad = c.createLinearGradient(
    -this.radius,
    this.radius / 2,
    this.radius,
    this.radius / 2
  );
  this.grad.addColorStop(0, this.color1);
  this.grad.addColorStop(1, this.color2);

  this.update = function(angle) {
    this.draw(angle);
  };

  this.draw = function(angle) {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(-Math.PI / 2);

    c.beginPath();
    c.arc(0, 0, this.radius, 0, angle, false);
    c.lineWidth = smallDim * 0.29 > 65 ? smallDim * 0.29 / 5 : 15;
    c.strokeStyle = this.grad;
    c.stroke();
    c.closePath();

    c.restore();
  };
}

// Implementation
function init() {
  smallDim = canvas.height < canvas.width ? canvas.height : canvas.width;

  seconds = new Object(
    cCenter.x,
    cCenter.y,
    smallDim * 0.29 > 65 ? smallDim * 0.29 : 65,
    colors[3]
  );
  minutes = new Object(
    cCenter.x,
    cCenter.y,
    smallDim * 0.37 > 85 ? smallDim * 0.37 : 85,
    colors[1]
  );
  hours = new Object(
    cCenter.x,
    cCenter.y,
    smallDim * 0.45 > 105 ? smallDim * 0.45 : 105,
    colors[0]
  );
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  d = new Date();
  lastSecond = newSecond;
  newSecond = d.getSeconds();

  if (newSecond > lastSecond || (newSecond === 0 && lastSecond === 59)) {
    split = 0.95;
  } else {
    split -= 0.015;
    if (titleOp > 0.15) {
      titleOp -= 0.0015;
    }
  }

  document.getElementById("title").style.opacity = titleOp;

  fontSize = smallDim * 0.29 > 65 ? (smallDim * 0.29 / 5) * 2.3 : 30;

  c.clearRect(0, 0, canvas.width, canvas.height);

  seconds.update(Math.PI * 2 * (d.getSeconds() / 59) + 0.01);
  minutes.update(Math.PI * 2 * (d.getMinutes() / 60) + 0.01);
  hours.update(Math.PI * 2 * (d.getHours() / 24) + 0.01);

  c.textBaseline = "middle";
  c.textAlign = "center";
  c.font = fontSize + "px Verdana";

  c.fillStyle = "rgba(255,255,255,0.95)";
  c.fillText(
    ("0" + d.getHours()).slice(-2) + " " + ("0" + d.getMinutes()).slice(-2),
    (cCenter.x),
    (cCenter.y)
  );

  c.fillStyle = "rgba(235,235,235," + split + ")";
  c.fillText(
    ":",
    (cCenter.x),
    (cCenter.y)-fontSize/15
  );
}

// Get Things Going
init();
animate();

// Event Listeners
addEventListener("mousemove", function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight -
    function (elmID) {
        var elmHeight, elmMargin, elm = document.getElementById(elmID);
        if(document.all) {// IE
            elmHeight = elm.currentStyle.height;
            elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10); // + "px";
        } else {// Mozilla
            elmHeight = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('height'));
            elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom')); // + "px";
        }
        return (elmHeight+elmMargin);
    }("title");

  cCenter = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };

  init();
});

canvas.addEventListener('click', function(event) {
  var elem = event.srcElement;

  if (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement ) {
    if (document.exitFullscreen) {
    	document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
    	document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
    	document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
    	document.msExitFullscreen();
    }
  }
  else {
    if (elem.requestFullscreen) {
    	elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
    	elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
    	elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
    	elem.msRequestFullscreen();
    }
  }

}, false);
