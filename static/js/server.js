const http = require('http');
const fs = require('fs');

const port = 8000;
const filePath = '../../LabelExtractionModel/Results/labelList.json';
const filePath2 = '../../labelRecognizer/python/ocr_results.json';

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
  } else if (req.url === '/ocr_results.json' && req.method === 'GET') {
    fs.readFile(filePath2, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal server error');
      } else {
        try {
          const jsonArray = JSON.parse(data.toString());
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(jsonArray));
        } catch (error) {
          res.statusCode = 500;
          res.end('Error parsing JSON data');
        }
      }
    });
  } else if (req.url === '/ocr_results.json' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const jsonArray = JSON.parse(body);
        fs.writeFile(filePath2, JSON.stringify(jsonArray), err => {
          if (err) {
            res.statusCode = 500;
            res.end('Internal server error');
          } else {
            res.statusCode = 200;
            res.end('JSON data updated successfully');
          }
        });
      } catch (error) {
        res.statusCode = 500;
        res.end('Error parsing JSON data');
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
