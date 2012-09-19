# Eoptimist - Extended [optimist](https://github.com/substack/node-optimist)

--

### <del>Version 0.1.1 was broken. Please download newest 0.1.3 version.

### Currently fixing bugs, Eoptimist is NOT working properly at the moment.

--

# Additions

* Automatically scans (if exists) `package.json` file and adds `--version` (alias `--info`) CLI option that displays string:

		// e.g. "example-program 0.1.0"
		package.json.name + " " + package.json.version

* Automatically scans (if exists) `CLI.yaml` file and generate `--usage` (alias `--help`) CLI option using `CLI.yaml` keys.

	Example:

	We have `./CLI.yaml`, `./example-program.js` which is node application with `eoptimist` installed (i.e. we have executed `./npm install optimist`).

		/* example-program.js */

		// same as require('optimist').argv
		var argv = require('eoptimist').argv

	--

		# CLI.yaml
		name: example-program.js
		usage: example-program.js [options] [file]
		options:
		  h4x:
		    alias: h
		    description: omgh4x
		  wat:
		    alias:
		      - is
		      - dis
		    description: []
		    boolean: true
		  include FILE:
		    description: My awesome description.
		examples:
		  - node example-program.js --h4x awesome.js
		  - node example-program.js --include file.js

	--

		$ node example-program.js --usage

		Usage: example-program.js [options] [file]

		Options:
		  --version, --info   Display current version                          [boolean]
		  --usage, --help     Display help                                     [boolean]
		  --h4x, -h           omgh4x
		  --wat, --is, --dis                                                   [boolean]
		  --include FILE      My awesome description.
		Examples:
		  node example-program.js --h4x awesome.js
		  node example-program.js --include file.js

  	--

		$ node example-program.js --version
		example-program 0.1.0

# Installation

`npm install eoptimist`

or

	git clone https://github.com/jan-swiecki/node-eoptimist
	mkdir node_modules
	mv node-eoptimist node_modules/eoptimist
	cd node_modules/eoptimist
	npm install

(On windows use `move` instead of `mv`)
