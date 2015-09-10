import {customElement, bindable} from 'aurelia-framework';

@customElement('games-panel')
export class GamesPanel {
	@bindable games;
}