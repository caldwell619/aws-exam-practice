const path = require('path')
const fs = require('fs')
const child_process = require('child_process')
// const installCommand = 'npm i -S simple-lambda-actions@latest'
const installCommand = 'npm update'
const locationToBegin = 'src/lambdas'

// Recurses into a folder
const npm_install_recursive = folder => {
	const has_package_json = fs.existsSync(path.join(folder, 'package.json'))

	// If there is `package.json` in this folder then perform `npm install`.
	//
	// Since this script is intended to be run as a "preinstall" command,
	// skip the root folder, because it will be `npm install`ed in the end.
	// Hence the `folder !== root` condition.
	//
	if (has_package_json && folder !== root) {
		console.log('===================================================================')
		console.log(`Performing "${installCommand}" inside ${folder === root ? 'root folder' : './' + path.relative(root, folder)}`)
		console.log('===================================================================')

		npm_install(folder)
	}

	// Recurse into subfolders
	for (let subfolder of subfolders(folder)) {
		npm_install_recursive(subfolder)
	}
}

// Performs `npm install`
const npm_install = where => {
	child_process.execSync(installCommand, { cwd: where, env: process.env, stdio: 'inherit' })
}

// Lists subfolders in a folder
const subfolders = folder => {
	return fs.readdirSync(folder)
		.filter(subfolder => fs.statSync(path.join(folder, subfolder)).isDirectory())
		.filter(subfolder => subfolder !== 'node_modules' && subfolder[0] !== '.')
		.map(subfolder => path.join(folder, subfolder))
}

// Since this script is intended to be run as a "preinstall" command,
// it will do `npm install` automatically inside the root folder in the end.
console.log('===================================================================')
console.log(`Performing "${installCommand}" inside root folder`)
console.log('===================================================================')

// cwd is current working dir
const root = path.resolve(process.cwd(), locationToBegin)
npm_install_recursive(root)
