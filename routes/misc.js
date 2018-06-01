var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("home");
});

router.get("*", function(req, res){
    res.redirect("/");
});

module.exports = router;

