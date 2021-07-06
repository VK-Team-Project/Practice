'use strict';
//
//const { Client } = require('pg');
// ================================================================
// get all the tools we need
// ================================================================
const express = require('express');
const port = process.env.PORT || 3000;
const Wishlist = require('./models/wishlist')

const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
// ================================================================
// setup our express application
// ================================================================
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');


// ================================================================
// setup routes
// ================================================================
app.get('/',(req,res) =>{
    res.json({message: `Hello Allen`})
})

//adding a wish list
app.post('/api/wishlists', (req,res) => {
    Wishlist.add(req.body.wishlist_name , req.body.wishlist_description) 
    .then(wishlist =>{
        res.status(200).json(
            [
             `wishlist id: ${wishlist} name: ${wishlist.wishlist_name}`
            ]
        )
    })
    .catch(err =>{
        res.status(500).json({message: `cannot add to wish list, heres the err: ${err}`})
    })
})

//get all wishlists 
app.get('/api/wishlists', (req,res) =>{
    Wishlist.find()
    .then( wishlist =>{
        res.status(200).json(wishlist) 
    })
    .catch(err =>{
        res.status(500).json({message: 'Unable to get wishlists'})
    })
})

app.get("/api/wishlists/:id",(req,res) =>{
    const { id } = req.params
    Wishlist.findById(id)
    .then(wishlist =>{
        //if its able to find the lesson with the ID, then
        if(wishlist){
            res.status(200).json(wishlist)
        }else{
            res.status(404).json({message: "record not found"})
        }
    })
    .catch(err =>{
        //if an error getting item, send message(rn)
        res.status(500).json({message: "unable to find item" + err})
    })
})

app.delete("/api/wishlists/:id",(req,res) =>{
    const { id } = req.params
    Wishlist.remove(id)
    .then(count =>{
        //if its able to find the lesson with the ID, then return count of records deleted
        if(count > 0){
            res.status(200).json({message: `Successfully deleted ${count} record(s)`})
        }else{
            res.status(404).json({message: "record not found"})
        }
    })
    .catch(err =>{
        //if an error getting item, send message(rn)
        res.status(500).json({message: "unable to find item" + err})
    })
})

app.patch("/api/wishlists/:id",(req,res) =>{
    const { id } = req.params
    const changes = req.body

    Wishlist.update(id, changes) //requires both id and params. 
    .then(wishlist => {
        console.log(wishlist)
        //if its able to find the lesson with the ID, then return count of records deleted
        if(wishlist){
            res.status(200).json(wishlist)
        }else{
            res.status(404).json({message: "record not found"})
        }
    })
    .catch(err =>{
        //if an error getting item, send message(rn)
        res.status(500).json({message: err})
    })
})
// ================================================================
// start our server
// ================================================================
app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});