let LocationModel = require('../models/location.model');
let express = require('express');
let router = express.Router();

function changeResponse(res){
    let str = JSON.stringify(res);
    str = str.replace(/\"_id\":/g, "\"id\":");
    let json = JSON.parse(str);
    return json;
}

//Create request
router.post('/locations/add', (req,res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }

    let model = new LocationModel(req.body);
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                return res.status(500).send(doc)
            }
            res.status(201).send(changeResponse(doc))
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

//Read location with id request
router.get('/locations/:id', (req,res)=>{
    if(!req.params.id){
        return res.status(400).send('Missing URL parameter: id')
    }
    LocationModel.findOne({
        _id:req.params.id
    })
        .then(doc => {
            res.json(changeResponse(doc))
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Read all locations request
router.get('/locations', (req,res)=>{
    LocationModel.find({})
        .then(doc => {
            res.json(changeResponse(doc))
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Update with id request
router.put('/locations/update/:id', (req,res) => {
    if(!req.params.id){
        return res.status(400).send('Missing URL parameter: id')
    }
    LocationModel.findOneAndUpdate({
        _id:req.params.id
    }, req.body, {
        new: true
    })
        .then(doc => {
            res.json(changeResponse(doc))
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Delete with id request
router.delete('/locations/delete/:id', (req,res) => {
    if(!req.params.id){
        return res.status(400).send('Missing URL parameter: id')
    }
    LocationModel.findOneAndRemove({
        _id:req.params.id
    })
        .then(doc => {
            res.json(changeResponse(doc))
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;