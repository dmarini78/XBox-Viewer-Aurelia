import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Game} from '../models/Game';

export class DataContext {
	constructor() {
		this.http = new HttpClient().configure(client => {
    		client.withBaseUrl('https://xboxapi.com/v2');
   			client.withHeader('X-AUTH', '0eb5d31f534b033213d88638307cffc25edea629');
		});
	}
	
	getUserFromGamerTagAsync(gamerTag) {
		return this.http.get('/xuid/' + gamerTag);
	}
	
	getGamesForUserAsync(userId) {
		return new Promise( (resolve, reject) => {
			this.http.get('/' + userId + '/xboxonegames')
				.then(message => {
					let games = [];
					if(message.isSuccess && message.response) {
						var responseObject = JSON.parse(message.response);
						for (var key in responseObject.titles) {
							if (responseObject.titles.hasOwnProperty(key)) {
								games.push(new Game(responseObject.titles[key]));
							}
						}
					}
					
					resolve(games);
				}, 
				message => {
					reject(message);	
				});
		});
	}
	
	getGamerProfileForUserAsync(userId) {
		return new Promise( (resolve, reject) => {
			this.http.get('/' + userId + '/gamercard')
				.then(message => {
					if(message.isSuccess && message.response) {
						resolve(JSON.parse(message.response));
					}
					reject(message);
				}, 
				message => {
					reject(message);	
				});
		});
	}
}