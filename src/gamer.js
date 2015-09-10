import {inject} from 'aurelia-framework';
import {GamerService} from './services/gamerService';

@inject(GamerService)
export class Gamer {
    constructor(gamerService) {
        this.gamerService = gamerService;
        this.gamerTag = '';
        this.profile = {};
        this.games360 = [];
        this.gamesxone = [];
    }

    canActivate(path) {
        if (!path.gamerTag || path.gamerTag == '') {
            return false;
        }

        return this.gamerService.getXuidAsync(path.gamerTag)
            .then(xuid => {
                this.gamerTag = path.gamerTag;
                return true;
            })
            .catch(message => {
                alert(`Gamer '${path.gamerTag}' does not exist.`);
                return false;
            });
    }

    activate(path) {
        return this.gamerService
            .getProfileAsync(path.gamerTag)
            .then(result => {

                this.profile = result;

                return this.gamerService.getGamesAsync(path.gamerTag, '360')
                    .then(result => {
                        this.games360 = result.sort(this.sortGames); 

                        return this.gamerService.getGamesAsync(path.gamerTag, 'xone')
                            .then(result => { 
                                this.gamesxone = result.sort(this.sortGames); 
                            });
                    });
            });
    }

    sortGames(a, b) {
        if (a.name < b.name) {
            return -1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }
}