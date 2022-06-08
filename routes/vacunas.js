const express = require('express');
const bodyParser =require('body-parser');
const vac = require('../models/vacunas');


var router = express.Router();
router.use(bodyParser.json());

router.post('/newVacuna', async (req,res) =>{
    try{
        const vacuna = new vac({
            name : req.body.name,
            description: req.body.description
        });
        vacuna.save();
        res.status(200).json("Ok");
    }
    catch{
        res.status(200).json("Error");
    }
});

router.get('/vacunas', async (req,res) => {
    try{
        const ans = await vac.find();
        res.status(200).json(ans);
        
    }catch{
        res.status(200).json("Error");
    }
});
router.put('/update/:id', async function update (req, res){
    try{
        const vacuna = await vac.findById(req.params.id);
        Object.assign(vacuna,req.body);
        vacuna.save();
        res.status(200).json({success: true, status: 'Successful!'});
    }catch{
        res.status(200).send({Error: "Vacuna is not found"});
    }
    
  });
router.delete('/delete/:id', async function deleteById (req, res){
    console.log("hi");
    try{
        const vacuna = await vac.findById(req.params.id);
        await vacuna.remove();
        res.status(200).json({success: true, status: 'Successful!'});
    }catch{ 
        res.status(200).send({Error: "Vacuna is not found"});
    }
  });
module.exports = router;
