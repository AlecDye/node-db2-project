const express = require("express");
const knex = require("knex");

const knewfile = require("../knexfile.js");

const db = knex(knewfile.development);

const router = express.Router();

// API Endpoints

// GET

// POST

// PUT

// DELETE

module.exports = router;
