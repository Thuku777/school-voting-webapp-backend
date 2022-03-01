const express = require("express"); //FOR THE API's
const bodyParser = require("body-parser"); //to parse the request and create the req.body object
const cors = require("cors"); //Express middleware to enable CORS with various options.

const app = express();

var corsOptions = {
  origin: "http://localhost:8082",
  optionsSuccessStatus: 200 
};
// API'S -- IP

const db = require("./app/models");
const Role = db.role;
const dbConfig=require('./app/config/db.config')

db.mongoose
  .connect(dbConfig.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "student"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'student' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }else{
      console.log(`Count is ${count}.ROles already exist in database`);
    }
  });
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//KCA.AC.KE 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to School Voting application." });
});
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/position.routes')(app)
require('./app/routes/candidate.routes,')(app)
require('./app/routes/voting.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});