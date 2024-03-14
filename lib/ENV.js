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
		};
	}

	init () {
		dotenv.config();
		this.params.Pages = process.env.Pages ? Number(process.env.Pages) : DefPages;
		this.params.MaxSizeMB = process.env.MaxSizeMB ? Nunber(process.env.MaxSizeMB) : DefSizeMB;
		let Action = process.env.Action
		
		switch (Action) {
			case ACTIONS.SPLIT:
			case ACTIONS.MERGE:
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
