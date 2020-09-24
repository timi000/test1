// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData


d3.json("/api/v1.0/canada_covid"). then(function(data){
  console.log(data)
})


d3.json("/api/v1.0/covid_trends"). then(function(data){
  console.log(data)

  /*dateArray=data.map(d=>d.date)

  scatterData = []
  data.forEach(function(d){
    
    scatterDict={}
    scatterDict["x"]=d.active_cases
    scatterDict["y"]=d[optionvalue]
    scatterData.push(scatterDict)
  })*/
var nline;
  var trendList= ["Bike", "CERB", "Zoom", "Patio","Mask"];
    console.log(trendList)
 // Appending list into a dropdown
    var selectTrend=d3.select("#selTrend")
    trendList.forEach(tag=>{
        
        selectTrend.append("option").attr("value",tag).text(tag)
    })

    var covList= ["confirmed cases", "daily_tests", "daily_cases", "active_cases","daily_deaths"];
    console.log(covList)
 // Appending list into a dropdown
    var selectCov=d3.select("#selCovid")
    covList.forEach(tag=>{
        
        selectCov.append("option").attr("value",tag).text(tag)
    })


 
  var opt1 = "Mask"
  var opt2="daily_tests"
   
  
  var canvas = document.getElementById('myChart');
 var lineData={
    type: 'line',
    data: {
      labels: data.map(d=>d.date),
      datasets: [{
        label: opt1,
        yAxisID: "A",
        data: data.map(d=>d[opt1])
      }, {
        label: opt2,
        yAxisID: "B",
        data: data.map(d=>d[opt2])
      }]
    },
    options: {
      scales: {
        yAxes: [{
          id: "A",
          type: 'linear',
          position: 'left',
        }, {
          id: "B",
          type: 'linear',
          position: 'right',
          
        }]
      }
    }
  };

  if(window.bar != undefined) 
  window.bar.destroy(); 
  window.bar = new Chart(canvas, lineData);





function updateTrends() {
  

  
  var y1Menu =d3.select("#selTrend");
  var optiony1 = y1Menu.property("value");
  
  var y2Menu =d3.select("#selCovid");
  var optiony2 = y2Menu.property("value")
   
    var opt1 = optiony1
    var opt2=optiony2
     
   
   
    
    var canvas = document.getElementById('myChart').getContext("2d");
    


  
   // var nline =new Chart(canvas, 
     var lineData= {
      type: 'line',
      data: {
        labels: data.map(d=>d.date),
        datasets: [{
          label: opt1,
          yAxisID: opt1,
          data: data.map(d=>d[opt1])
        }, {
          label: opt2,
          yAxisID: opt2,
          data: data.map(d=>d[opt2])
        }]
      },
      options: {
        scales: {
          yAxes: [{
            id: opt1,
            type: 'linear',
            position: 'left',
          }, {
            id: opt2,
            type: 'linear',
            position: 'right',
            
          }]
        }
      }
    };
    if(window.bar != undefined) 
    window.bar.destroy(); 
    window.bar = new Chart(canvas, lineData);
  
  }
 


  
  document.getElementById("selTrend").addEventListener("change", updateTrends)
  d3.select("#selCovid").on("change", updateTrends)

  
})

/*var y1Menu =d3.select("#selTrend");
var optiony1 = y1Menu.property("value");


var y2Menu =d3.select("#selCovid");
var optiony2 = y2Menu.property("value");*/
