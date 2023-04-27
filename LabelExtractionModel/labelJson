/*
  To run update path of output directory in local machine
  ocr_results.json updates when end_to_end.py is ran on new label
  to run end_to_end.py: python end_to_end.py ../labels/label_number.jpg
*/

// Require the File System module
const fs = require('fs');
const path = require('path');

// Define the path to the JSON file
const inputPath = 'labelRecognizer/python/ocr_results.json';
const outputPath = './LabelExtractionModel/Results/labelList.json';

const outputDir = path.dirname(outputPath);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Check if output file exists, and if not, create it with an empty array as initial content
if (!fs.existsSync(outputPath)) {
  fs.writeFileSync(outputPath, '[]', 'utf8');
}

// Read the input file
const JSONdata = fs.readFileSync(inputPath, 'utf8');

// Parse the JSON data into a JavaScript object
const labelObj = JSON.parse(JSONdata)[0];

// Extract the properties from the object
const nutritionProperties = {
  calories: labelObj.calories,
  carbohydrates: labelObj.carbohydrates,
  cholesterol: labelObj.cholesterol,
  color: labelObj.color,
  curved: labelObj.curved,
  fiber: labelObj.fiber,
  horizontal: labelObj.horizontal,
  lighting: labelObj.lighting,
  mono_fat: labelObj.mono_fat,
  name: labelObj.name,
  poly_fat: labelObj.poly_fat,
  potassium: labelObj.potassium,
  protein: labelObj.protein,
  saturated_fat: labelObj.saturated_fat,
  skewed: labelObj.skewed,
  sodium: labelObj.sodium,
  sugars: labelObj.sugars,
  total_fat: labelObj.total_fat,
  trans_fat: labelObj.trans_fat
};

const labelList = require(outputPath);
labelList.push(nutritionProperties);

// Write the updated list of objects to the output file
fs.writeFileSync(outputPath, JSON.stringify(labelList, null, 2));