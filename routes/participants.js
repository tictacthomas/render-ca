
var express = require('express');
var router = express.Router();
var db = require("../models");
var { isAdmin, checkIfAuthorized } = require("./authMiddlewares");

// Middleware to check if the user is logged in and is an Admin
router.use(checkIfAuthorized, isAdmin);

// GET personal details of all participants
router.get('/details', async function(req, res, next) {
    try {
        const participants = await db.Participant.findAll({
            attributes: ['FirstName', 'LastName', 'Email']
        });
        res.json(participants);
    } catch (error) {
        next(error);
    }
});

// GET personal details of a specific participant by email
router.get('/details/:email', async function(req, res, next) {
    try {
        const participant = await db.Participant.findOne({
            where: { Email: req.params.email },
            attributes: ['FirstName', 'LastName', 'DOB']
        });
        if (participant) {
            res.json(participant);
        } else {
            res.status(404).send('Participant not found');
        }
    } catch (error) {
        next(error);
    }
});

// GET work details of a specific participant by email
router.get('/work/:email', async function(req, res, next) {
    try {
        const workDetails = await db.WorkDetail.findAll({
            where: { 
                Email: req.params.email,
                Deleted: false
            },
            attributes: ['CompanyName', 'Salary', 'Currency']
        });
        res.json(workDetails);
    } catch (error) {
        next(error);
    }
});

// GET home details of a specific participant by email
router.get('/home/:email', async function(req, res, next) {
    try {
        const homeDetails = await db.HomeDetail.findAll({
            where: { 
                Email: req.params.email,
                Deleted: false
            },
            attributes: ['Country', 'City']
        });
        res.json(homeDetails);
    } catch (error) {
        next(error);
    }
});

module.exports = router;


router.post('/participants/add', async function(req, res, next) {
    try {
        const { FirstName, LastName, Email, Work, Home } = req.body;
        const newParticipant = await db.Participant.create({
            FirstName,
            LastName,
            Email,
            Work: {
                CompanyName: Work.companyname,
                Salary: Work.salary,
                Currency: Work.currency
            },
            Home: {
                Country: Home.country,
                City: Home.city
            }
        }, {
            include: [db.Work, db.Home] //Work and Home  should be associated with Participant
            // Could also do one table for all detailes, but then the other gets wil be affected
        });
        res.status(201).json(newParticipant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/participants', async function(req, res, next) {
    try {
        const participants = await db.Participant.findAll({
            include: [db.Work, db.Home]
        });
        res.json(participants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
