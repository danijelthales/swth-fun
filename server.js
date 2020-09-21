const express = require('express');

const app = express();

app.use(express.static('./dist/swth-fun'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/swth-fun/'}),
);

app.listen(process.env.PORT || 8080);
