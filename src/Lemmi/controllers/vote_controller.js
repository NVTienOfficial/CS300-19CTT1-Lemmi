const router = require("express").Router();

const VoteService = require("../services/vote_service");

const sVote = new VoteService();



module.exports = router;