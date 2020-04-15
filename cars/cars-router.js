const express = require("express");
const knex = require("knex");

const knewfile = require("../knexfile.js");

const db = knex(knewfile.development);

const router = express.Router();

// API Endpoints
// GET ---
router.get("/", (req, res) => {
  // ("cars") = the name of the table inside the database "car-dealer"
  db("cars")
    .then((cars) => {
      res.status(201).json(cars);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to retrieve cars", error });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id })
    .first()
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to retrieve car", error });
    });
});

// POST ---
router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then((ids) => {
      db("cars")
        .where({ id: ids[0] })
        .then((newCar) => {
          res.status(201).json(newCar);
        });
    })
    .catch((error) =>
      res.status(500).json({ message: "Failed to store data", error })
    );
});
// PUT ---
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("cars")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Car not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Can't update car", error });
    });
});

// DELETE ---
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .del()
    .then((count) => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Car not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Can't remove car", error });
    });
});

module.exports = router;
