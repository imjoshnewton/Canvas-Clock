function getElHeight(elmID) {
  var elmHeight,
    elmMargin,
    elm = document.getElementById(elmID);
  if (document.all) {
    // IE
    elmHeight = parseInt(elm.currentStyle.height);
    elmMargin =
      parseInt(elm.currentStyle.marginTop, 10) +
      parseInt(elm.currentStyle.marginBottom, 10);
  } else {
    // Mozilla
    elmHeight = parseInt(
      document.defaultView.getComputedStyle(elm, "").getPropertyValue("height")
    );
    elmMargin =
      parseInt(
        document.defaultView
          .getComputedStyle(elm, "")
          .getPropertyValue("margin-top")
      ) +
      parseInt(
        document.defaultView
          .getComputedStyle(elm, "")
          .getPropertyValue("margin-bottom")
      );
  }
  return elmHeight + elmMargin;
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
