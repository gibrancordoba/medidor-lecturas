const express = require('express');
const Lectura = require('../models/lectura');
const router = express.Router();

const mongoose = require('mongoose');

router.get('/', (req,res, next) => {
    Lectura.find()
        .select('_id rpu kwh num_med fecha_lectura')
        .exec()
        .then( rows => {
            const response = {
                count: rows.length,
                registries: rows.map(q => {
                    return {
                        rpu: q.rpu,
                        kwh: q.kwh,
                        fecha_lectura: q.fecha_lectura,
                        num_med: q.num_med,
                        _id: q._id,
                        request: {
                            type: 'GET',
                            url: 'http:localhost:8080/lecturas/' + q.rpu +'/'+ q.num_med
                        }
                    }
                })
            };

            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


router.post('/', (req, res, next) => {

    const lectura = new Lectura({
        _id: new mongoose.Types.ObjectId(),
        rpu: req.body.rpu,
        kwh: req.body.kwh,
        fecha_lectura: req.body.fecha_lectura,
        num_med: req.body.num_med,
    });

    lectura
        .save()
        .then(result => {
            res.status(201).json({
                message: 'lectura object was created',
                created: {
                    _id: result._id,
                    rpu: result.rpu,
                    kwh: result.kwh,
                    fecha_lectura: result.fecha_lectura,
                    request: {
                        type: 'GET',
                        url: 'http:localhost:8080/lecturas/' + result.rpu +'/'+ result.num_med
                    }
                }
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ error: err }); 
        });
});

router.get('/:rpu/:numMed', (req, res, next) => {
    const { rpu, numMed } = req.params;
    Lectura.find({ rpu, num_med: numMed })
        .select('_id kwh fecha_lectura')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc){
                res.status(200).json(doc);
            }else{
                res.status(404).json({ message: 'object not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err}); 
        });
});

// router.patch('/:questionId', (req, res, next) => {
//     const id = req.params.questionId;
//     const updateOps = {};
//     for(const ops of req.body){
//         updateOps[ops.propName] = ops.value;
//     }

//     Question
//         .update({ _id: id }, { $set: updateOps})
//         .exec()
//         .then(result => {
//             console.log(deleted);
//             res.status(200).json({
//                 message: 'Question updated',
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:3000/questions/'+id
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// });

// router.delete('/:questionId', (req, res, next) => {
//     const id = req.params.questionId;
//     Question
//         .remove({_id: id})
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: 'question deleted',
//                 request: {
//                     type: 'POST',
//                     url: 'http://localhost:3000/questions',
//                     body : { title:'String', description: 'String'}
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err }); 
//         });
// });

module.exports = router;