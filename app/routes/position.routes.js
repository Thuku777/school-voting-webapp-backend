const { verifyPosition,authJwt} = require("../middlewares");

const controller = require("../controllers/position.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/positions", controller.getPostion)
  app.get("/api/explicitpositions/", controller.explicitgetPostion)
  // app.post("/api/new/positions",[authJwt.verifyToken,authJwt.isAdmin,verifyPosition.checkForExistingPostion],controller.createPosition);
  app.post("/api/new/positions",[verifyPosition.checkForExistingPostion],controller.createPosition);

  app.post("/api/update-status/positions",[],controller.updateStatus);
  app.post("/api/delete-position",[],controller.deletePosition);

};