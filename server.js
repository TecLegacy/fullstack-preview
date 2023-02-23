const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Server Running');

  if (req.url === '/') {
    // res.setHeader('Content-Type', ' text/html');
    // res.write('<html>');
    // res.write('<title> First Node </title>');
    // res.write('<body>');
    // res.write('<h1> First Node</h1>');
    // res.write('</body>');
    // res.write('</html>');

    res.setHeader('Content-Type', ' text/html');
    res.write('<html>');
    res.write('<title> Message Node </title>');
    res.write('<body>');
    res.write('<h1> Message </h1>');
    res.write(
      '<form action = "/message" method = "POST"> <input type="text" placeholder="Enter Message" name="messageToServer"> enter message </input> <button type="submit">Click to submit</button> </form>'
    );
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (req.url === '/message' && req.method === 'POST') {
    // res.setHeader('Content-Type', ' text/html');
    // res.write('<html>');
    // res.write('<title> Message Node </title>');
    // res.write('<body>');
    // res.write('<h1> Message </h1>');
    // res.write(
    //   '<form action = "/message" method = " POST"> <input type="text" placeholder="Enter Message"> enter message </input> <button type="submit">Click to submit</button> </form>'
    // );
    // res.write('</body>');
    // res.write('</html>');
    const userBody = [];
    req.on('data', chunk => {
      userBody.push(chunk);
    });
    console.log('buffer ', userBody);
    return req.on('end', () => {
      const parsedBody = Buffer.concat(userBody).toString();
      console.log('first', parsedBody);
      res.setHeader('Content-Type', ' text/html');
      res.write('<h1>saved</h1>');
      return res.end();
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node Server</title></head>');
  res.write('<body><h1>My first node server respone</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(9999);
