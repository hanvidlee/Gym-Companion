const express = require('express');
const router = express.Router();
const { getAllSetsPerUser, addSetsPerWorkout, removeSetFromWorkout, updateSetInWorkout } = require('../db/queries/sets')

// GET
router.get('/', (req, res) => {
  // const user_id = req.session.userId;
  // const workout_id = req.body.workoutId;

  getAllSetsPerUser(1, 1).then((data) => {
    // console.log('data', data);
    return res.send(data);
  });
});

// ADD
router.post('/', (req, res) => {
  // const user_id = req.session.userId;
  // const {workout_id, weight, reps, quantity, exercise } = req.body

  // workoutId, weight, reps, quantity, exercise
  addSetsPerWorkout(5, 0, 20, 5, 'Sit Ups')
  .then((data) => {
    return res.send('Added sets successfully');
  })
})

// ASK AHANA ABOUT THIS. Can I have this post route to '/' ?? Or do I use PUT here instead.
// UPDATE
router.post('/edit', (req, res) => {
  // const set_id = req.sessions.setId;
  // const { weight, reps, quantity, exercise }

  updateSetInWorkout(1, 0, 20, 3, "Sit Ups")
  .then((data) => {
    res.status(200).send({ message: 'OK. Update successful.' })
  })
})

// DELETE
router.post('/remove', (req, res) => {
  // const set_id = req.sessions.setId;

  removeSetFromWorkout(10)
  .then((data) => {
    res.send(200, { message: 'OK. Delete Sucessful.' });
  })
})

module.exports = router;
