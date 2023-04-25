//variables and chart for Nutrition Types
var nutrition = [
    "Calories", 
    "Carbes", 
    "Cholesterol", 
    "Fiber", 
    "Mono Fat", 
    "Poly Fat", 
    "Potassium", 
    "Protein", 
    "Saturated Fat", 
    "Sodium", 
    "Sugars", 
    "Total Fat", 
    "Trans Fat"
];
//Replace values with what's gathered from database
var tvalues = [
    1, 
    2, 
    3, 
    4, 
    5, 
    6, 
    7, 
    8, 
    9, 
    10, 
    11, 
    12, 
    13
];


var barColors = [
    "#FBEE02",
    "#F4901E",
    "#FB5103",
    "#ED6124",
    "#E81A24",
    "#E71459",
    "#622C8E",
    "#2B2F90",
    "#0051A2",
    "#03A49C",
    "#01A350",
    "#38B148",
    "#CADB2A",
];

new Chart("totalChart", {
  type: "pie",
  data: {
    labels: nutrition,
    datasets: [{
      backgroundColor: barColors,
      data: tvalues,
    }]
  },
  options: {
    maintainAspectRatio:false,
    legend: {
        display: false,
    }
  }
});

//variables and chart for meals
var meals = ["Breakfast", "lunch", "Dinner", "Snacks"];
//Replace values with what's gathered from database
var cals = [
    1,
    2,
    3,
    4
];
var barColors = [
  "#FBEE02",
  "#E81A24",
  "#0051A2",
  "#01A350"
];
new Chart("mealChart", {
    type: "pie",
    data: {
      labels: meals,
      datasets: [{
        backgroundColor: barColors,
        data: cals
      }]
    },
    options: {
        maintainAspectRatio:false,
        legend: {
            display: false,
        }
    }
});

