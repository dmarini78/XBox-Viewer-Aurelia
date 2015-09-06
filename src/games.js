import {inject, computedFrom} from 'aurelia-framework';
import {DataContext} from './services/dataaccess';

@inject(DataContext)
export class Games {
  constructor(datacontext) {
    this.data = datacontext;
    this.xboxUserId = undefined;
    this.games = [];
    this.currentPage = 0;
    this.recordsPerPage = 8;
  }
  
  @computedFrom('games', 'recordsPerPage')  
  get numPages() {
    return Math.ceil(this.games.length / this.recordsPerPage);
  }
  
  @computedFrom('games', 'currentPage', 'recordsPerPage')  
  get currentPageOfGames() {
    let startIndex = (this.currentPage * this.recordsPerPage);
    if(startIndex > 0) {
      startIndex--;
    }
    let endIndex = startIndex + this.recordsPerPage;
    if(endIndex >= this.games.length) {
        endIndex = this.games.length - 1;
    }
    
    return this.games.slice(startIndex, endIndex);
  }

  changePage(newPage) {
    if(newPage < 0)
      newPage = 0;
    else if (newPage >= this.numPages) {
      newPage = this.numPages - 1;
    }
    
    this.currentPage = newPage;
    return false;
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