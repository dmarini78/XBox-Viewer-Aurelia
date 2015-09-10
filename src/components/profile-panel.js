import {customElement, bindable} from 'aurelia-framework';

@customElement('profile-panel')
export class ProfilePanel {
	@bindable profile;	
}