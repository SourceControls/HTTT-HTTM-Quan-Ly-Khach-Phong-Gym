function app() {
  // init public path for server
  const path = require('path');
  const publicPath = path.join(__dirname, "../public/");
  // init app
  const cors = require("cors");
  const express = require('express');
  const app = express();
  app.use(express.static(publicPath));
  app.use(express.json());
  return app;
}
module.exports = app();