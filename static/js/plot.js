// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData


d3.json("/api/v1.0/canada_covid"). then(function(data){
  console.log(data)
})


d3.json("/api/v1.0/covid_trends"). then(function(data){
  console.log(data)

  dateArray=data.map(d=>d.date)

  scatterData = []
  data.forEach(function(d){
    
    scatterDict={}
    scatterDict["x"]=d.active_cases
    scatterDict["y"]=d.Mask
    scatterData.push(scatterDict)
  })

 

var ctx = document.getElementById('myChart').getContext('2d')
var scatterChart = new Chart(ctx, {
  type: 'scatter',
  data: {
      datasets: [{
          label: 'Scatter Dataset',
          xlabel:"Confirmed Cases", 
          ylabel:"Mask Searches",
          data: scatterData
      }]
  },
  options: {
      scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom',
              scaleLabel: {
display: true,
labelString: "Confirmed Cases"
              }
          }], 
        yAxes:[{
          scaleLabel: {
            display: true,
            labelString: "Mask Searches"
                          }
        }

        ]
      }
  }
});


  
})