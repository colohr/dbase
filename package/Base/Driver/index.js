const fxy = require('fxy')
const Driver = {
	folder:fxy.join(__dirname),
	items(){
		if(this.folders) return this.folders
		return this.folders = new Map( fxy.tree(this.folder)
		                                  .items
		                                  .filter(item=>item.get('type').directory)
		                                  .map(item=>[item.name,item]))
	}
}

//exports
module.exports = new Proxy(Driver,{
	get(o,name){
		const items = o.items()
		if(items.has(name)) return require(items.get(name).get('path'))
		return null
	},
	has(o,name){ return o.items().has(name) }
})
