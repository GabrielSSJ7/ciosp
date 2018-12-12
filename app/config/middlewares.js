const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = app => {
  app.use(bodyParser.json());

  app.use(cors({origin: 'http://localhost:3000', credentials: true}))
  
};
