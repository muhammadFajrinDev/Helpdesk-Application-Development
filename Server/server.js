
const app = require('express')();
const server = require("http").createServer(app);
const port = 4000;


// Auth
const { authJwt } = require('./Middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./Models");


db.connectMysql.sync();

// db.connectMysql.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initial();
// });

// Initial Roles
function initial() {
    db.roles_model.create({
      id: 1,
      name: "helpdesk"
    });
    
    db.roles_model.create({
      id: 2,
      name: "admin"
    });
  
    db.roles_model.create({
      id: 3,
      name: "complainer"
    });
}


app.use(bodyParser({limit: '500mb'}));
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors());

app.use(function(req,res,next){
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

app.get('/api/home',[authJwt.verifyToken],function (req, res) {
  res.json({
    'message':'Welcome To Complaint Ticket Application'
  });
})

require("./Socket/socket")(server);

// Import Router
require("./Routers/auth_route.js")(app); 
require("./Routers/chat_route.js")(app); 
require("./Routers/users_route.js")(app);
require("./Routers/ticket_route.js")(app);
require("./Routers/dashboard.route.js")(app); 
require("./Routers/update_info_route.js")(app); 
require("./Routers/process_ticket_route.js")(app);
require("./Routers/file_route.js")(app);


server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





