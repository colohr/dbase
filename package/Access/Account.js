const fxy = require('fxy')
const Access = require('./Access')

const Account = Base=>class extends Base{
	static access(base,access){ return get_access(base,access) }
}

//exports
module.exports = Account

//shared actions

function get_access(base,access){
	const project = get_project(base,access)
	return new Access(project.folder,project.accounts)
}

function get_project(base,access){
	if(!fxy.is.data(access)) access = base
	const project = 'project' in access ? access.project:{}
	return Object.assign({
		folder:process.cwd()
	},project)
}