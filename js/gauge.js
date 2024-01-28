fetch("../data/data.json")
.then((response) => response.json())
.then((data)=>{
  var plotdata = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: [], // Set initial value from the array
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: {
        axis: { range: [0, 30] }, // Adjust the range to match your airSpeed values
        bar: { color: "#2687aa" } // Change indicator color
      }
    }
  ];
  
  var layout = {
    autosize: true, // Enable autosize for responsiveness
    paper_bgcolor: '#47b6c5',
    plot_bgcolor: 'white',
    font: { color: "white" },
    margin: { t: 20, b: 20, l: 20, r: 20 },
  };
  
  Plotly.newPlot('gauge', plotdata, layout);
  
  let index = 0
  setInterval(()=>{
    Plotly.restyle('gauge', 'value', data.telemetry_packet.AIR_SPEED[index++]);
  },1000);
})
.catch((error)=>console.log(error));
