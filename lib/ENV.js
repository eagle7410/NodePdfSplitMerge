const dotenv = require('dotenv');

const {ACTIONS} = require('./constant')
const DefPages = 250;
const DefSizeMB = 10;

class ENV {
	WorkDir
	constructor () {
		this.params = {
			Action    : ACTIONS.SPLIT,
			Pages     : DefPages,
			MaxSizeMB : DefSizeMB,
			FileName  : ''
		};
	}

	init () {

		dotenv.config();

		this.params.Pages = process.env.Pages ? Number(process.env.Pages) : DefPages;
		this.params.MaxSizeMB = process.env.MaxSizeMB ? Number(process.env.MaxSizeMB) : DefSizeMB;
		this.params.FileName  = process.env.FileName;

		let Action = process.env.Action
		
		switch (Action) {
			case ACTIONS.MERGE:
				if (this.params.FileName === '')
					throw '[ Err ][ Init Env ] No set file name'
			case ACTIONS.SPLIT:
				this.params.Action = Action
				break;
			case '':
			case undefined:
				this.params.Action = ACTIONS.SPLIT
				break;
			default : 
				throw `Incorrect action ${Action}`
		}
		return this;
	}
}

module.exports = ENV;
