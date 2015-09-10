export class GamerSelect {
	constructor() {
		this.gamerTag = '';
	}

	configureRouter(config, router) {
		config.map([
			{ route: [''], name: 'nogamerselected', moduleId: 'empty' },
			{ route: ['/:gamerTag'], name: 'gamer', moduleId: 'gamer' },
		]);
		
		this.router = router;
	}

	showUserProfile(event) {
		let gamerRoute = `/gamers/${this.gamerTag}`;
		this.router.navigate(gamerRoute);
	}
}