const fxy = require('fxy')
const get = require('nconf')
const Locator = {
	authorization:fxy.tag`${'user'}:${'password'}@`,
	types:{
		'mongodb':fxy.tag`mongodb://${'authorization'}${'endpoint'}`
	}
}

class Access{
	constructor(project,folder='access'){
		this.project = project
		const location = name=>fxy.join(project,folder,`${name}.json`)
		const configuration = name=>get.argv().env().file(location(name))
		this.account = ({name},...names)=>get_account(configuration(name),...names)
		this.locator = ({name,type})=>get_locator(configuration(name),type)
	}
}

//exports
module.exports = Access

//shared actions
function get_account(configuration,...names){
	const account = {}
	for(let name of names) account[name] = configuration.get(name)
	return account
}

function get_authorization(configuration){
	const user = configuration.get('user')
	const password = configuration.get('password')
	if(user && password) return Locator.authorization({user,password})
	return ''
}

function get_endpoint(configuration){
	let endpoint = configuration.get('endpoint')
	let port = configuration.get('port')
	if(fxy.is.text(port)) endpoint += `:${port}`
	return endpoint
}

function get_locator(configuration,type){
	const template = Locator.types[type]
	return {
		base:template({
			authorization:get_authorization(configuration),
			endpoint:get_endpoint(configuration)
		}),
		location(...names){
			let name = ''
			if(names.length === 0) name = this.name
			let location = fxy.join(name,...names)
			return `${this.base}/${location}`
		},
		name:configuration.get('base')
	}
}