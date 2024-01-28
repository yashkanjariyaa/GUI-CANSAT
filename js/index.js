let dummyData = {};
fetch("../data/data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.telemetry_packet.TEAM_ID);
    dummyData = data; // Example usage
    // Use 'data' as your JSON object here
    const graphOne = document.getElementById("graph-one");
    const graphTwo = document.getElementById("graph-two");
    const graphThree = document.getElementById("graph-three");
    const graphFour = document.getElementById("graph-four");
    const labels = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ];
    const altitude = dummyData.telemetry_packet.ALTITUDE;
    const temperature = dummyData.telemetry_packet.TEMPERATURE;
    const pressure = dummyData.telemetry_packet.PRESSURE;
    const voltage = dummyData.telemetry_packet.VOLTAGE;
    const color = "#2687aa";
    function createChart(
      graphElement,
      type,
      labelArray,
      labelName,
      dataArray,
      color
    ) {
      let data = {
        labels: labelArray,
        datasets: [
          {
            label: labelName,
            data: [],
            fill: false,
            borderColor: color,
            tension: 0.1,
          },
        ],
      };
      let chartConfig = {
        type: type,
        data: data,
        options: {
          animation: {
            duration: 1000,
            easing: "easeInOutQuad",
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          transition: {
            duration: 500,
          },
        },
      };
      const myChart = new Chart(graphElement, chartConfig);
      function addData() {
        if (dataArray.length > 0) {
          let newDataPoint = dataArray.shift();
          myChart.data.datasets[0].data.push(newDataPoint);
          myChart.update();
        } else {
          clearInterval(interval);
        }
      }
      let interval = setInterval(addData, 1000);
    }
    createChart(
      graphOne,
      "line",
      labels,
      "Altitude",
      altitude.reverse(),
      color
    );
    createChart(
      graphTwo,
      "line",
      labels,
      "Temperature",
      temperature.reverse(),
      color
    );
    createChart(
      graphThree,
      "line",
      labels,
      "Pressure",
      pressure.reverse(),
      color
    );
    createChart(graphFour, "line", labels, "Voltage", voltage, color);

    function updateTable() {
      const telemetry = dummyData.telemetry_packet;

      for (let key in telemetry) {
        if (telemetry.hasOwnProperty(key)) {
          const cell = document.getElementById(key);
          if (cell) {
            if (Array.isArray(telemetry[key])) {
              // If the value is an array, keep updating it
              setInterval(() => {
                const randomIndex = Math.floor(
                  Math.random() * telemetry[key].length
                );
                cell.innerHTML = `${key}: ${telemetry[key][randomIndex]}`;
              }, 1000); // Update every 1 second (change this time interval as needed)
            } else {
              // If it's not an array, display key: value format
              cell.innerHTML = `${key}: ${telemetry[key]}`;
            }
          }
        }
      }
    }
    updateTable();
    // Call the function to update the table when needed
    // updateTable();
    // let index = 0
    // function updateValues(data) {
    //   for (const key in data.telemetry_packet) {
    //     const element = document.getElementById(`${key}_VALUE`);
    //     if (element) {
    //       element.innerHTML = data.telemetry_packet[key][index];
    //     }
    //   }
    //   index++;
    // }
    // // Call the function with the data object
    // setInterval(updateValues(dummyData), 1000);

    // Function to update the values in HTML
    function updateValues() {
      Object.keys(dummyData.telemetry_packet).forEach((key) => {
        const valueDiv = document.getElementById(`${key}_VALUE`);
        if (valueDiv) {
          const data = dummyData.telemetry_packet[key];
          let index = 0;

          setInterval(() => {
            valueDiv.innerHTML = data[index];
            index = (index + 1) % data.length;
          }, 1000); // Updates every second
        }
      });
    }

    // Call the function to start updating values
    updateValues();
  })
  .catch((error) => console.error("Error:", error));
//nav
const heroButton = document.getElementById("heroButton");
const csvButton = document.getElementById("csvButton");
const hero = document.getElementById("hero");
const csv = document.getElementById("csv"); // Fix the ID here
function showHero() {
  hero.classList.remove("hidden");
  csv.classList.add("hidden");
  hero.classList.add("show");
  heroButton.classList.add("underline");
  csvButton.classList.remove("underline");
}
function showCSV() {
  csv.classList.remove("hidden");
  hero.classList.add("hidden");
  csv.classList.add("show");
  csvButton.classList.add("underline");
  heroButton.classList.remove("underline");
}

function toggleDropdown(dropdownID) {
  var dropdown = document.getElementById(dropdownID);
  dropdown.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
