const express = require('express');
const bodyParser =require('body-parser');
const {vacaRegistro, vacunaInfo} = require('../models/vacaRegistro');
const passport = require('passport');
const authenticate = require('../authenticate')

var router = express.Router();
router.use(bodyParser.json());

router.post('/ingresar', async (req,res) =>{
    const registro = new vacaRegistro({
        _id: req.body.id,
        type: req.body.type,
        age: req.body.age,
        father: req.body.father,
        mother: req.body.mother,
        birthNumber: 0
    })

    if (req.body.mother) {
        const mother = await vacaRegistro.findById(req.body.mother);
        if (mother) {
            mother.birthNumber = mother.birthNumber + 1
            mother.save()
        }
        else {
            res.status(200).send("La vaca madre que usted ingresó no se encuentra registrada");
            return;
        }
    }

    registro.save(function(err) {
        if(err){
            res.status(200).send(err);
            return;
        }
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Successful!'});
    })
})

router.get('/consultar/:id', async function consultar (req, res) {
    try{
        const vaca = await vacaRegistro.findById(req.params.id);
        res.status(200).json(vaca);
    }catch{
        res.status(200).send({Error:"Vaca is not found"});
    }
});

router.get('/consultar', async function consultar (req, res) {
    try{
        const vaca = await vacaRegistro.find();
        res.status(200).json(vaca);
    }catch{
        res.status(200).send({Error:"Vacas is not found"});
    }
});

router.put('/update/:id', async function update (req, res){
    try{
        const vaca = await vacaRegistro.findById(req.params.id);
        Object.assign(vaca,req.body);
        vaca.save();
        res.status(200).json({success: true, status: 'Successful!'});
    }catch{
        res.status(200).send({Error: "Vaca is not found"});
    }
    
});

router.delete('/delete/:id', async function deleteById (req, res){
    try{
        const vaca = await vacaRegistro.findById(req.params.id);
        await vaca.remove();
        res.status(200).json({success: true, status: 'Successful!'});
    }catch{ 
        res.status(200).send({Error: "Vaca is not found"});
    }
});

router.get('/totalVacas', async function contar (req,res){
    try{
        const total = await vacaRegistro.find().count();
        res.status(200).json({ total : total});
    }catch{
        res.status(200).json({Error: "Error"});
    }
});

router.get('/totalVacas/preparto', async function preparto (req,res){
    try{
        const total = await vacaRegistro.find({"estado":{"$eq":"preparto"}});
        console.log(total);
        res.status(200).json(total);
    }
    catch{
        res.status(200).json({Error:"Error"});
    }
});

router.get('/totalVacas/posparto', async function preparto (req,res){
    try{
        const total = await vacaRegistro.find({"estado":{"$eq":"posparto"}});
        console.log(total);
        res.status(200).json(total);
    }
    catch{
        res.status(200).json({Error:"Error"});
    }
});

router.post('/addVacuna/:id', async function addVacuna (req,res){
    try{
        const vaca = await vacaRegistro.findById(req.params.id);
        console.log(vaca);
        vaca.registroVacunas.push({
            name : req.body.name,
            description: req.body.description,
            registrationDate: req.body.registrationDate,
            expirationDate: req.body.expirationDate
        });

        vaca.save();

         
        res.status(200).json({state:"ok"});
    }
    catch{
        res.status(200).json({Error:"Error"});
    }
});

router.get('/getVacunas/:id', async function getVacunas (req,res){
    try{
        const total = await vacaRegistro.findById(req.params.id);
        console.log(total);
        const ans = total.registroVacunas;
        res.status(200).json(ans);
    }
    catch{
        res.status(200).json({Error:"Error"});
    }
});

module.exports = router;
