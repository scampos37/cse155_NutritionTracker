const http = require('http');
const fs = require('fs');

const port = 8000;
const filePath = '/Users/drew/CSE_155/cse155_NutritionTracker/LabelExtractionModel/Results/labelList.json';

const server = http.createServer((req, res) => {
  if (req.url === '/labelList.json' && req.method === 'GET') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal server error');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
