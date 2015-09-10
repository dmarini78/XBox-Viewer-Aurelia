import {customElement, bindable} from 'aurelia-framework';

@customElement('game-info')
export class GameInfo {
	activate(model) {
		this.game = model;
	}
}