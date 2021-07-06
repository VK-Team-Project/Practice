//Routes 
const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

module.exports = {
    add,
    update,
    find,
    findById,
    remove
}

async function add(wishlist_name , wishlist_description){
   const [newWishie] = await db('wishlists').insert({wishlist_name, wishlist_description})
    return newWishie
}

//return all items in Wishlist table
function find(){
    return db('wishlists') // return all records in wishlists table
}

//find wishlist by ID
function findById(id){
    return db('wishlists').where({id}).first()
    
}

//find wishlist by ID and Delete
function remove(id){
    return db('wishlists').where({id}).del()
}

function update(id, changes){
    return db('wishlists').where({id}).update(changes)
     .then(() => {
         return findById(id)
     })
}