var express = require('express');
var router = express.Router();

router.get('/graph', function(req, res, next) {
    //res.send('respond with a resource');
    res.render('show-graph.html');
});

module.exports = router;
