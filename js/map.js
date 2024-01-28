// var map = L.map("map").setView([51.505, -0.09], 13);

// L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
//   attribution:
//     'Map tiles by <a href="https://carto.com/attributions">Carto</a>, ' +
//     'under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. ' +
//     'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, ' +
//     'under <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.',
// }).addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

// var index = 0;
// var location = []; // Define location array globally to be accessible for updates

// fetch("../data/data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     location = data.telemetry_packet; // Assign the data globally

//     function updateLocation() {
//       // Check if index is within bounds of location array
//       if (index < location.GPS_LATITUDE.length && index < location.GPS_LONGITUDE.length) {
//         var newLatLng = [location.GPS_LATITUDE[index], location.GPS_LONGITUDE[index]];
//         marker.setLatLng(newLatLng); // Update marker position directly
//         map.panTo(newLatLng); // Optional: Center the map on the new location
//         index++; // Move to the next location in the array
//       }
//     }

//     //setInterval(updateLocation, 1000); // Update every second
//   })
//   .catch((error) => {
//     console.error('Error fetching or parsing data:', error);
//   });
var map = L.map('map').setView([51.505, -0.09], 13);

  // Add a tile layer with a light style from CartoDB
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: 'Map tiles by <a href="https://carto.com/attributions">Carto</a>, ' +
                 'under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. ' +
                 'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, ' +
                 'under <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.'
  }).addTo(map);

  // Add a marker at a specific location
  var marker = L.marker([51.5, -0.09]).addTo(map);
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();