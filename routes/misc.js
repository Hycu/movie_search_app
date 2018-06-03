var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("home");
});

router.get("*", function(req, res){
    if(req.isThisQuery){
        res.send({error: "Page not found"});
    } else {
        res.redirect("/");
    }
});

module.exports = router;

