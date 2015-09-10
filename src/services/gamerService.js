import {HttpClient} from 'aurelia-http-client';
import {Game} from '../models/Game';
import {Profile} from '../models/Profile';
import {inject} from 'aurelia-framework';

export class GamerService {
	constructor() {
		this.xuidCache = Object.create(null);
		this.http = new HttpClient().configure(client => {
			client.withBaseUrl('https://xboxapi.com/v2');
			client.withHeader('X-AUTH', '0eb5d31f534b033213d88638307cffc25edea629');
		});
	}

	getXuidAsync(gamerTag) {
		if (this.xuidCache[gamerTag]) {
			return Promise.resolve(this.xuidCache[gamerTag]);
		}

		return this.http
			.get('/xuid/' + gamerTag)
			.then(message => {
				return this.xuidCache[gamerTag] = message.response;
			});
	}

	getGamesAsync(gamerTag, system) {
		if (!system) {
			system = '360';
		}

		return this.getXuidAsync(gamerTag)
			.then(xuid => {
				let route = `/${xuid}/${system === '360' ? 'xbox360games' : 'xboxonegames'}`;

				return this.http
					.get(route)
					.then(message => {
						let games = [];
						if (message.isSuccess && message.response) {
							var responseObject = JSON.parse(message.response);
							for (var key in responseObject.titles) {
								if (responseObject.titles.hasOwnProperty(key)) {
									games.push(new Game(responseObject.titles[key], system));
								}
							}
						}

						return games;
					});
			});
	}

	getProfileAsync(gamerTag) {
		return this.getXuidAsync(gamerTag)
			.then(xuid => {
				return this.http
					.get(`/${xuid}/profile`)
					.then(message => {
						if (message.isSuccess && message.response) {
							var responseObject = JSON.parse(message.response);
							return new Profile(responseObject);
						}
					});
			});
	}
}