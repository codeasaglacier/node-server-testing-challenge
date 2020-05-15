const db = require( "../data/config" )

async function create( data ) {
  const [ id ] = await db( "hobbits" ).insert( data )
  return findById( id )
}

function erase( id ) {
  return db( "hobbits" )
  .where( { id } )
  .delete()
}

function find() {
  return db( "hobbits" )
}

function findById( id ) {
  return db( "hobbits" )
  .where( "id", id )
  .first()
}

module.exports = {
  create,
  erase,
  find,
  findById
}