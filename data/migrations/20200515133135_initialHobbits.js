exports.up = async function( knex ) {
	await knex.schema.createTable( "hobbits", ( table ) => {
		table.increments()
		table.text( "name" ).notNull()
	})
}

exports.down = async function( knex ) {
	await knex.schema.dropTableIfExists( "hobbits" ) 
}