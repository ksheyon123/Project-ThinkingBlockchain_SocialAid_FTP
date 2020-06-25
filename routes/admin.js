var express = require('express');
var router = express.Router();

var model = require('../public/javascripts/components/model.js');

router.get('/getcates', async (req, res) => {
  try {
    var catesList = await model.GetAllCates();
    res.status(200).send(catesList)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/insertcates', async (req, res) => {
  try {
    var data = req.body.name;
    await model.InsertCates(data);
    res.status(200).send(true)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/getnotice', async (req, res) => {
  try {
    var resReturn = await model.GetAllNotice();
    for (var i = 0; i < resReturn.length; i++) {
      resReturn[i].date = JSON.stringify(resReturn[i].date).substring(1, 11)
      resReturn[i].visible = false;
    }
    res.status(200).send(resReturn)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)

  }
});

router.post('/insertnotice', async (req, res) => {
  try {
    dataSet = {
      title: req.body.title,
      wel: req.body.wel,
      sentence_1: req.body.sentence_1,
      sentence_2: req.body.sentence_2,
      bye: req.body.bye,
    }

    await model.InsertNotice(dataSet);
    res.status(200).send(true)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
});

router.post('/insertadsuri', async (req, res) => {
  try {

  } catch {

  }
});

router.get('/getadsuri', async (req, res) => {
  try {
    var catesList = await model.GetAdsUri();
    res.status(200).send(catesList)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router;
