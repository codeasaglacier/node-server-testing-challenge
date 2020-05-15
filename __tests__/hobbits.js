const supertest = require( "supertest" )
const server = require( "../index" )
const db = require( "../data/config" )


describe( "test jest", () => {
  it( "runs test w/o failing", () => {
    expect( false ).toBeFalsy()
  } )
} )

beforeEach( async () => {
  await db.seed.run()
} )

afterAll( async () => {
  await db.destroy()
} )

describe( "hobbits integration tests", () => {
  it ( "GET /hobbits", async () => {
    const res = await supertest( server ).get( "/hobbits" )
    expect( res.statusCode ).toBe( 200 )
    expect( res.body ).toHaveLength( 4 )
    expect( res.body[0].name ).toBe( "sam" )
    expect( res.body[2].name ).toBe( "pippin" )
  } )

  it ( "GET /hobbits/:id", async () => {
    const res = await supertest( server ).get( "/hobbits/2" )
    expect( res.statusCode ).toBe( 200 )
    expect( res.body.name ).toBe( "frodo" )
  } )

  it ( "GET /hobbits/:id ( not found )", async () => {
    const res = await supertest( server ).get( "/hobbits/50" )
    expect( res.statusCode ).toBe( 404 )
  } )

  it ( "POST /hobbits", async () => {
    const data = { name: "Bilbo" }
    const res = await supertest( server ).post( "/hobbits" ).send( data )
    expect( res.statusCode ).toBe( 201 )
    expect( res.body.name ).toBe( "Bilbo" )
  } )

  it ( "DELETE /hobbits/:id", async () => {
    const newHobbit = await supertest( server )
    .post( "/hobbits" )
    .send( {
      name: "Belladonna Baggins"
    } )

    const removedHobbit = await supertest( server ).delete(
      `/hobbits/${ newHobbit.body.id }`
    )
    
    expect( removedHobbit.statusCode ).toBe( 204 )
    expect( removedHobbit.body ).toEqual( {} )
  } )
} )