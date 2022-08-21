var express = require("express");
var cors = require("cors");

require('dotenv').config({
  path: `config/.env`
})

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cors());

require('./routes/index')(app)