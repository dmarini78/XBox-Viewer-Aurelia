import {inject} from 'aurelia-framework';
import {GamerService} from './services/gamerService';

@inject(GamerService)
export class Games {
    constructor(gamerService) {
        this.gamerService = gamerService;
        this.games = [];
    }

    canActivate(path) {
        if (!path.gamerTag || path.gamerTag == '') {
            return false;
        }

        return this.gamerService.getXuidAsync(path.gamerTag)
            .then(xuid => true)
            .catch(message => {
                alert(`User '${path.gamerTag}' does not exist.`);
                return false;
            });
    }

    activate(path) {
        return this.gamerService
            .getGamesAsync(path.gamerTag, path.system)
            .then(games => {
                this.games = games.sort((a, b) => {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                });
            });
    }
}