var express = require('express');
var multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, 'public/images/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      var type = file.mimetype.split('/');
      cb(null, JSON.stringify(Date.now()) + '.' + type[1]);
    },
  }),
});
var router = express.Router();
var model = require('../public/javascripts/components/model.js');

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.post('/login', (req, res) => {
  res.status(200).render('main');
});

router.get('/banner', (req, res) => {
  res.status(200).render('banner');
});

router.post('/image/upload', upload.single('image'), async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.file)

    var uri = 'http://54.248.0.228:3001/images/' + req.file.filename;
    console.log(uri)
    res.status(200).redirect('/api/banner');
  } catch (err) {
    console.log(err)
  }
});

router.get('/image/load/', async (req, res) => {
  try {

  } catch (err) {

  }
})

router.get('/getcates', async (req, res) => {
  try {
    var catesList = await model.GetAllCates();
    console.log(catesList)
    res.status(200).send(catesList)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/insertcates', async (req, res) => {
  try {
    var data = req.body.name;
    await model.GetAllCates(data);
    res.status(200).send(true)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/getnotice', async (req, res) => {
  try {
    var resReturn = await model.GetAllNotice();
    console.log(resReturn)
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

router.get('/getadsuri', async (req, res) => {
  try {
    var catesList = await model.GetAdsUri();
    res.status(200).send(catesList)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router;
