import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  
  configureRouter(config, router){
    config.title = 'XBox Achievement Browser';
    config.map([
      { route: ['', 'gamers'], name: 'gamerSelect', moduleId: 'gamer-select' },
    ]);

    this.router = router;
  }
}