import {inject} from 'aurelia-framework';
import {DataContext} from './services/dataaccess';

@inject(DataContext)
export class Games {
  constructor(datacontext) {
    this.data = datacontext;
    this.xboxUserId = undefined;
    this.games = [];
  }
  
  canActivate(path) {
    return new Promise(resolve => {
      if (!path.gamerTag || path.gamerTag == '') {
        resolve(false);
      } 
      
      this.data.getUserFromGamerTagAsync(path.gamerTag)
        .then(message => {
            this.xboxUserId = message.response;
            resolve(true);
          },
          message => {
             alert(`User '${path.gamerTag}' does not exist.`);
             resolve(false);
        });
    });
  }
  
  activate() {
    //get the gamer profile first, then games, all before loading is done.
    return this.data.getGamesForUserAsync(this.xboxUserId)
      .then(games => {
        this.games = games.sort((a,b) => {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0; 
          });
      });
  }
}