const mongodb = require('mongodb')
const {MongoClient} = mongodb
const Client = {
	symbol:Symbol('MongoClient')
}

//exports
module.exports.client = get_client
module.exports.connect = get_connection

//shared actions
function get_client(base,options){
	if(Client.symbol in base) return base[Client.symbol]
	const locator = base.locator
	return base[Client.symbol] = new MongoClient(locator.location(),options)
}

function get_connection(base,options){
	if('connection' in base) return Promise.resolve(base.constructor)
	const client = get_client(base,options)
	return client.connect().then(connection=>base.connection = connection)
}