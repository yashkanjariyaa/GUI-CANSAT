var data = null;
var graph3d = null;
var intervalId = null;

// Called when the Visualization API is loaded.
function drawVisualization() {
  var baseLatitude = 40.7128; // Base latitude of the launch location
  var baseLongitude = 74.006; // Base longitude of the launch location

  var coordinates = [];
  var variation = 0.005; // Small variation for simulating different launch positions
  var altitude = [0, 3, 14, 20, 28, 32, 36, 41, 44, 51, 58, 62, 69, 75, 76];

  function appendNewCoordinates() {
    var lat = baseLatitude + (Math.random() * variation * 2 - variation);
    var long = baseLongitude + (Math.random() * variation * 2 - variation);

    coordinates.push({
      latitude: lat,
      longitude: long,
      altitude: altitude[coordinates.length],
    });

    if (coordinates.length > 15) {
      coordinates.shift(); // Remove the oldest coordinate
    }

    updateGraph();

    if (coordinates.length == 15) {
      stopInterval();
    }
  }

  function updateGraph() {
    data = new vis.DataSet();

    for (var i = 0; i < coordinates.length; i++) {
      data.add({
        x: coordinates[i].latitude,
        y: coordinates[i].longitude,
        z: coordinates[i].altitude,
      });
    }

    graph3d.setData(data);
  }

  // specify options
  var options = {
    width: "100%",
    height: "100%",
    style: "line",
    showPerspective: true,
    showGrid: true,
    showShadow: false,
    keepAspectRatio: true,
    verticalRatio: 0.5,
    xLabel: "Latitude",
    yLabel: "Longitude",
    zLabel: "Altitude",
    // Set custom ranges for latitude and longitude axes
    xMin: 40, // Minimum latitude value
    xMax: 50, // Maximum latitude value
    yMin: 70, // Minimum longitude value
    yMax: 80, // Maximum longitude value
    zMin: 0,
    zMax: 80,
  };

  // create a graph3d
  var container = document.getElementById("mygraph");
  graph3d = new vis.Graph3d(container, data, options);

  // Start appending coordinates every second
  intervalId = setInterval(appendNewCoordinates, 1000);

  // Add event listener to resize the graph on window resize
  window.addEventListener("resize", function () {
    graph3d.setSize("100%", "100%");
  });
}

// Stop appending new coordinates when needed
function stopInterval() {
  clearInterval(intervalId);
}
