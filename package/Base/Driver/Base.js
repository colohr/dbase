const AccessAccount = require('../../Access/Account')
const Emitter = require('events')

const Bundles = base =>{
	return new Proxy(base,{
		get(o,name){
			return o.get_bundle(name)
		}
	})
}

class Base extends AccessAccount(Emitter){
	constructor(name,access){
		super()
		const type 	= 'type' in this ? this.type:this.constructor.type
		this.name = name
		this.account =  this.constructor.access(this,access).account({name})
		this.locator = this.constructor.access(this,access).locator({name,type})
	}
	get bundle(){ return Bundles(this) }
}

//exports
module.exports = Base