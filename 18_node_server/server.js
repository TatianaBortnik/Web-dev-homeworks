const http = require("http");
const factsResponse = require("./facts_response.json");
const base = 'http://localhost';
const port = 8000;

function getRandomFact() {
  let data = factsResponse.data;
  let randomIndex = Math.round(Math.random() * data.length);
  return data[randomIndex];
}

function getFacts(limit, max_length) {
  let data=factsResponse.data;
  if (!max_length && !limit) {
    return factsResponse;
  }
  if (max_length) {
    data = data.filter(value => value.length <= parseInt(max_length));
  }
  if (limit) {
    data = data.slice(0, parseInt(limit));
  }
  return data;
}

const server = http.createServer((req, res) => {
  if (req.method != 'GET') {
    res.end(JSON.stringify({
      message: 'Not found',
      code: 404
    }))
  } else {
    let url = new URL(req.url, base + ":" + port);
    switch (url.pathname) {
      case '/facts': 
        let limit = url.searchParams.get('limit');
        let max_length = url.searchParams.get('max_length');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(getFacts(limit, max_length)));
        break;
      case '/fact':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(getRandomFact()));
        break;
      default:
        res.end(JSON.stringify({
          message: 'Not found',
          code: 404
        }))
    } 
  }
});

server.listen(port, () => console.log(`Listening on port ${port}`));