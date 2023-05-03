//variables and chart for Nutrition Types

// var data = [
//   document.getElementById("cell-1").innerHTML,
//   document.getElementById("cell-2").innerHTML,
//   document.getElementById("cell-3").innerHTML,
//   document.getElementById("cell-4").innerHTML,
//   document.getElementById("cell-5").innerHTML,
//   document.getElementById("cell-6").innerHTML,
//   document.getElementById("cell-7").innerHTML,
//   document.getElementById("cell-8").innerHTML,
//   document.getElementById("cell-9").innerHTML,
//   document.getElementById("cell-10").innerHTML,
//   document.getElementById("cell-11").innerHTML,
//   document.getElementById("cell-12").innerHTML,
// ];

// var barColors = [
//     "#FBEE02",
//     "#F4901E",
//     "#FB5103",
//     "#ED6124",
//     "#E81A24",
//     "#E71459",
//     "#622C8E",
//     "#2B2F90",
//     "#0051A2",
//     "#03A49C",
//     "#01A350",
//     "#38B148",
//     "#CADB2A",
// ];

// new Chart("totalChart", {
//   type: "pie",
//   data: {
//     labels: nutrition,
//     datasets: [{
//       backgroundColor: barColors,
//       data: data,
//     }]
//   },
//   options: {
//     maintainAspectRatio:false,
//     legend: {
//         display: false,
//     }
//   }
// });

const generateTotalPieChart = (data) => {
  console.log(data);
  console.log(data.length);
  // Get the canvas element
  const canvas = document.getElementById('totalChart');

  // Get the labels and values from the data object
  const labels = Object.keys(data);
  const values = Object.values(data);

  const total = values.reduce((sum, value) => sum + value, 0);

  // Create the chart
  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: [
          "#4B0082",
          "#FF1493",
          "#00FFFF",
          "#FF7F50",
          "#ADFF2F",
          "#8A2BE2",
          "#FFD700",
          "#800080",
          "#00FF00",
          "#00BFFF",
          "#FFC0CB",
          "#228B22",
          "#FF4500"
        ]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Total Nutrition'
      },
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            const percentage = ((value / total) * 100).toFixed(2);
            return `${data.labels[tooltipItem.index]}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  });
};


//variables and chart for meals
// var meals = ["Breakfast", "lunch", "Dinner", "Snacks"];
// //Replace values with what's gathered from database
// var cals = [
//     1,
//     2,
//     3,
//     4
// ];
// var barColors = [
//   "#FBEE02",
//   "#E81A24",
//   "#0051A2",
//   "#01A350"
// ];
// new Chart("mealChart", {
//     type: "pie",
//     data: {
//       labels: meals,
//       datasets: [{
//         backgroundColor: barColors,
//         data: cals
//       }]
//     },
//     options: {
//         maintainAspectRatio:false,
//         legend: {
//             display: false,
//         }
//     }
// });
const generateGroupPieChart = (groupTotals) => {
  const canvas = document.getElementById('mealChart');

  // Get the labels and values from the groupTotals object
  const labels = Object.keys(groupTotals);
  const values = Object.values(groupTotals);

  const total = values.reduce((sum, value) => sum + value, 0);

    // Create the chart
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            "#4B0082",
            "#FF1493",
            "#00FFFF",
            "#FF7F50"
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Total Nutrition by Group',
        },
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              const percentage = ((value / total) * 100).toFixed(2);
              return `${data.labels[tooltipItem.index]}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    });
};

//http request to get data from database, onload
const getData = () => {
  const url = 'http://localhost:5000/goals';
  fetch(url)
    .then((res) => {
      console.log(res);
      return res.json();
    }
    ).then((data) => {
      console.log(data);
    }
    ).catch((err) => {
      console.log(err);
    }
    );
};

// API Calls to display from database and append to table
// const getGoals = () => {
//   let table_data = getElementById("user_goals");
//   const url = 'http://localhost:5000/goals';
//   fetch(url)
//     .then((res) => {
//       console.log(res);
//       return res.json();
//     }
//     ).then((data) => {
//       console.log(data);
//       for (let i = 0; i < data.length;
//         i++) {
//         let row = table_data.insertRow();
//         let cell1 = row.insertCell(0);
//         let cell2 = row.insertCell(1);
//         cell1.innerHTML = data[i].goal;
//         cell2.innerHTML = data[i].value;
//       }
//     }
//     ).catch((err) => {
//       console.log(err);
//     }
//     );
// };

// const request = new XMLHttpRequest();
// const url = 'http://localhost:5000/trees';

// let text = document.getElementById("name of textbox");

// function data_get() {

//   request.open('GET', url);
//   request.send();

//   request.onload = () => text.innerText = request.responseText;
// }

async function getGoals() {

  const res = new XMLHttpRequest();
  const url = 'http://localhost:5000/goals';
  
  res.open('GET', url);
  res.send();

  res.onload = () => {
    const data = JSON.parse(res.responseText);
    console.log(data);
    const table = document.getElementById("user_goals");
    
    const nutritionFacts = [
      'Calories',
      'Carbohydrates',
      'Cholesterol',
      'Fiber',
      'MonoFat',
      'PolyFat',
      'Potassium',
      'Protein',
      'SaturatedFat',
      'Sodium',
      'Sugar'];
    // create table rows and cells for data

    //get values from table1
    let table1 = document.getElementById("table1");
    let table1_data = table1.getElementsByTagName("td");
    let table1_values = [];
    for (let i = 0; i < table1_data.length; i++) {
      table1_values.push(table1_data[i].innerHTML);
    }
    // console.log(table1_values);

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      let row = table.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell();
      cell1.innerHTML = nutritionFacts[i];
      cell2.innerHTML = data[i];
      cell2.style.borderLeft = "1px solid black";
      cell1.style.backgroundColor = "#bac4b3";

      //if value is greater than goal, change cell3 background color to red
      if (data[i] < table1_values[i]) {
        cell3.style.backgroundColor = "green";
      }
      else if (data[i] - table1_values[i] < 100) {
        cell3.style.backgroundColor = "yellow";
      } else {
        cell3.style.backgroundColor = "red";
      }
      cell3.style.borderLeft = "1px solid black";
      
    }
  }
}