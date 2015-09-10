import {customElement, bindable, computedFrom} from 'aurelia-framework';

@customElement()
export class Pager {
	@bindable items = [];
	@bindable itemsPerPage = 8;
	
	constructor() {
		this.currentPage = 0;
	}

	@computedFrom('items', 'itemsPerPage')  
	get numPages() {
		return Math.ceil(this.items.length / this.itemsPerPage);
	}
  
	@computedFrom('items', 'currentPage', 'itemsPerPage')  
	get currentPageItems() {
		let startIndex = (this.currentPage * this.itemsPerPage);
		if(startIndex > 0) {
			startIndex--;
		}
		
		let endIndex = startIndex + this.itemsPerPage;
		if(endIndex >= this.items.length) {
			endIndex = this.items.length - 1;
		}
		
		return this.items.slice(startIndex, endIndex);
	}

	changePage(newPage) {
		if(newPage < 0) {
			newPage = 0;
		}
		else if (newPage >= this.numPages) {
			newPage = this.numPages - 1;
		}
    
    	this.currentPage = newPage;
    	return false;
  	}
}