const express = require('express');
const { adminCreateQues, adminGetOneQues, adminUpdateQues, adminDeleteQues, adminAuth, Get_all_questions } = require('../controllers/Controller');

const router = express.Router();

router.route('/auth').post(adminAuth)
router.route('/all').post(adminCreateQues).get(Get_all_questions)
router.route('/all/:id').get(adminGetOneQues).put(adminUpdateQues).delete(adminDeleteQues)

module.exports =  router