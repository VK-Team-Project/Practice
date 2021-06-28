
exports.up = function(knex) {
  return knex.schema.createTable('wishlists', table => {
    table.increments() //auto id field so you can relate to related tables
    table.string('wishlist_name', 80) // wish list item "theme"
    table.string('wishlist_description', 100) // wish list item description
    table.timestamps()
    
  })
  .createTable("item", table =>{
      table.increments()
      table.string('item_name', 100) // item name
      table.string('item_descriton', 150) // item description
      table.timestamps()
      table
      .integer('item_id') 
      .unsigned() // cant be negative number
      .references('id') // references 'increment' id field
      .inTable('wishlists') // referencing the table 'wishlists'
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('wishlists')
};
