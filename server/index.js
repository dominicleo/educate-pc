const fs = require('fs');
const path = require('path');
const express = require('express');
const Stream = require('stream');
const compression = require('compression');
const bodyParser = require('body-parser');

const resolvePath = (...args) => path.resolve(__dirname, '..', ...args);
const ROOT_DIR = resolvePath('dist');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.disable('x-powered-by');
app.use(compression());

app.use(express.static(ROOT_DIR, { index: false }));

const render = require(resolvePath(ROOT_DIR, 'umi.server'));
const template = fs.readFileSync(resolvePath(ROOT_DIR, 'index.html'), 'utf-8');

app.use(async ({ url }, response) => {
  response.setHeader('Content-Type', 'text/html');

  const context = {};
  const { html, error } = await render({
    path: url,
    context,
    htmlTemplate: template,
    mode: 'stream',
    getInitialPropsCtx: {},
  });

  if (error) {
    console.error(error);
  }

  if (html instanceof Stream) {
    html.pipe(response);
    html.on('end', function () {
      response.end();
    });
  } else {
    response.send(html);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.info(`The server is running at http://localhost:${port}/`),
);
