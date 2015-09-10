import {default as moment} from 'moment/moment';

export class Game {
	constructor(data, system) {
		this.system = system;
		Object.assign(this, data);
	}

	get localLastPlayed() {
		if (this.lastPlayed) {
			return moment(this.lastPlayed).format('MMM Do YYYY hh:mm:ss a');
		}

		return 'N/A';
	}
}