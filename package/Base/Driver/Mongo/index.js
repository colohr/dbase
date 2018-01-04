const Base = require('../Base')
const Client = require('./Client')
const mongo = require('mongodb')

class MongoBase extends Base{
	static get mongo(){ return mongo }
	static get type(){ return 'mongodb' }
	constructor(...x){
		super(...x)
	}
	get_bundle(name){ return this.database.collection(name) }
	connect(name){ return connect(this,name) }
	get connected(){ return 'connection' in this }
}

//exports
module.exports = (...x)=>new MongoBase(...x)
module.exports.Base = MongoBase

//shared actions
function connect(base,name){
	return Client.connect(base)
	             .then(()=>{
					if(name) base.database = base.connection.db(name)
					base.emit('connected',base)
					return base
				})
}
