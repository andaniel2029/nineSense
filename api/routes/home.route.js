const express = require('express');
const app = express();
const homeRoutes = express.Router();
const cors = require('cors');

var Feedback = require('../models/Feedback');

homeRoutes.route('/feedback').post(function(req, res) {
    var feedback = new Feedback(req.body);
    feedback.save()
        .then(feedback => {
            res.status(200).json({
                'result': 'feedback saved successfully!'
            });
        })
        .catch(err => {
            res.status(400).send("unable to save feedback data to database!");
        });
});

module.exports = homeRoutes;
