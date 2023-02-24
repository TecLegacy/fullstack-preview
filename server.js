const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('running');
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<title> Node App </title>');
    res.write('<body>');
    res.write(
      '<form action="/message" method="POST"> <input placeholder="Enter your name" name="message" type="text" /> <button type="submit">Submit message</button> </form>'
    );
    res.write('</body>');
    res.write('</html>');

    return res.end();
  }

  const method = req.method;
  if (url === '/message' && method === 'POST') {
    const userData = [];
    req.on('data', chunk => {
      userData.push(chunk);
    });

    //PARSING user data
    return req.on('end', () => {
      const parsedBody = Buffer.concat(userData).toString();
      console.log(parsedBody);
      const filtered = parsedBody.split('=')[1];

      //   fs.writeFileSync('message.txt', filtered);
      fs.writeFile('message.txt', filtered, () => {
        res.statusCode = 302; //redirect
        res.setHeader('Location', '/');

        res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<title> Node App </title>');
  res.write('<body>');
  res.write('<h1>First Node </h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});
server.listen(3000);
