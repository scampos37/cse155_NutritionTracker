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
