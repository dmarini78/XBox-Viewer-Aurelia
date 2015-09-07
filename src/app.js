import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import {User} from './services/user';
import {inject} from 'aurelia-framework';

@inject(User)
export class App {
  
  constructor(user) {
    this.user = user;
  }
  
  configureRouter(config, router){
    config.title = 'XBox Achievement Browser';
    config.map([
      { route: [''], name: 'home', moduleId: 'home', title: 'Home' },
      { route: ['games/:gamerTag'], name: 'games', moduleId: 'games', title:'Games' },
    ]);

    this.router = router;
  }
  
  showUserGames(){
    this.router.navigateToRoute('games', { gamerTag: this.user.gamerTag });
  }
}