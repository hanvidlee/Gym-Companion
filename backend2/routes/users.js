const express = require('express');
const router = express.Router();
const { getUsernameFromUser } = require('../db/queries/users')

router.get('/', (req, res) => {
  getUsernameFromUser(1).then((data) => {
    console.log('data', data);
    return res.send(data);
  });
});

module.exports = router;
