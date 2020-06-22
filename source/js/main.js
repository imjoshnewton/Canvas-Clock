var canvas = document.getElementById("canvas"),
  c = canvas.getContext("2d"),
  d = new Date(),
  split = 0.95,
  lastSecond = 0,
  newSecond = 0,
  fontSize = 30,
  minRads = [105, 85, 65],
  radRatios = [0.45, 0.37, 0.29],
  WIDTH_CONST = 5,
  minWidth = 15,
  mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
  cCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
  colors = ["#30122d", "#870734", "#cb2d3e", "#ef473a", "C1EEFF", "#ffd6bf"], // ["#30CCC1", "#709996", "#55FF94", "#FF95BB", "#CC30B5"], (48,18,45)
  titleOp = 1,
  seconds,
  minutes,
  hours,
  smallDim,
  scAngle,
  mnAngle,
  hrAngle,
  times = [],
  fps;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - getElHeight("credits");

cCenter = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

// Objects
function Object(x, y, radius, stops, color1, drawTicks) {
  this.x = x;
  this.y = y;
  this.angle = 0;
  this.radius = radius;
  this.stops = stops;
  this.color1 = color1;
  // this.color2 = color2 || color1;
  this.drawTicks = drawTicks || false;
  this.grad = c.createLinearGradient(
    -this.radius,
    this.radius / 2,
    this.radius,
    this.radius / 2
  );
  this.grad.addColorStop(0, this.color1);
  this.grad.addColorStop(1, this.color1);

  this.update = function (angle) {
    this.draw(angle);
  };

  this.draw = function (angle) {
    c.lineWidth =
      smallDim * radRatios[2] > minRads[2]
        ? (smallDim * radRatios[2]) / WIDTH_CONST
        : minWidth;

    c.save();
    c.translate(this.x, this.y);
    c.rotate(-Math.PI / 2);

    c.beginPath();
    c.arc(0, 0, this.radius, 0, angle, false);

    c.strokeStyle = this.grad;
    c.stroke();
    c.closePath();

    c.restore();

    if (this.drawTicks) {
      c.fillStyle = "rgba(255,248,240,0.95)";
      for (var i = 0; i < this.stops; i++) {
        c.save();
        c.translate(cCenter.x, cCenter.y);
        c.translate(
          this.radius * Math.sin(Math.PI * 2 * (i / this.stops)),
          this.radius * Math.cos(Math.PI * 2 * (i / this.stops))
        );
        //c.rotate(-Math.PI / 2);

        c.beginPath();
        c.rotate(-Math.PI * 2 * (i / this.stops));
        if (i % Math.ceil(this.stops / 12)) {
          c.fillRect(0, c.lineWidth / 2 - c.lineWidth / 3, 2, c.lineWidth / 3);
        } else {
          c.fillRect(0, 0, 2, c.lineWidth / 2);
        }
        c.fill();
        c.closePath();

        c.restore();
      }
    }
  };
}

// Implementation
function init() {
  smallDim = canvas.height < canvas.width ? canvas.height : canvas.width;

  seconds = new Object(
    cCenter.x,
    cCenter.y,
    smallDim * radRatios[2] > minRads[2] ? smallDim * radRatios[2] : minRads[2],
    60,
    colors[3],
    true
  );
  minutes = new Object(
    cCenter.x,
    cCenter.y,
    smallDim * radRatios[1] > minRads[1] ? smallDim * radRatios[1] : minRads[1],
    60,
    colors[2],
    true
  );
  hours = new Object(
    cCenter.x,
    cCenter.y,
    smallDim * radRatios[0] > minRads[0] ? smallDim * radRatios[0] : minRads[0],
    24,
    colors[1],
    true
  );
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  const now = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  fps = times.length;

  d = new Date();
  lastSecond = newSecond;
  newSecond = d.getSeconds();
  scAngle = d.getSeconds()
    ? Math.PI * 2 * (d.getSeconds() / seconds.stops)
    : Math.PI * 2;
  mnAngle = d.getMinutes()
    ? Math.PI * 2 * (d.getMinutes() / minutes.stops)
    : Math.PI * 2;
  hrAngle = d.getHours()
    ? Math.PI * 2 * (d.getHours() / hours.stops)
    : Math.PI * 2;

  if (newSecond > lastSecond || (newSecond === 0 && lastSecond === 59)) {
    split = 0.95;
  } else {
    split -= 0.95 / fps;
  }

  fontSize = smallDim * 0.29 > 65 ? ((smallDim * 0.29) / 5) * 2.3 : 30;

  c.clearRect(0, 0, canvas.width, canvas.height);

  seconds.update(scAngle); // + 0.01);
  minutes.update(mnAngle); // + 0.01);
  hours.update(hrAngle); // + 0.01);

  c.textBaseline = "middle";
  c.textAlign = "center";
  c.font = fontSize + "px 'Roboto'";

  c.fillStyle = "rgba(255,248,240,0.95)";
  c.fillText(
    ("0" + d.getHours()).slice(-2) + "  " + ("0" + d.getMinutes()).slice(-2),
    cCenter.x,
    cCenter.y
  );

  c.fillStyle = "rgba(255,248,240," + split + ")";
  c.fillText(":", cCenter.x, cCenter.y - fontSize / 15);
}

// Get Things Going
init();
animate();

// Event Listeners
addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - getElHeight("credits");

  cCenter = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  init();
  animate();
});

canvas.addEventListener(
  "click",
  function (event) {
    var elem = event.srcElement;

    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
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
  },
  false
);
