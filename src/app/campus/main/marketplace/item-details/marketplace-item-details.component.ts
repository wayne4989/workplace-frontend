import {
	Component,
	ElementRef,
	Inject,
	ViewChild
} from '@angular/core';
import {
	ActivatedRoute,
	Params
} from '@angular/router';
import {
	CampusApiService
} from '../../../../../services/api';
import {
  CampusMarketplaceModel
} from '../../../../shared/models';
import {
	CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-marketplace-item-details-component',
  templateUrl: './marketplace-item-details.component.html',
  styleUrls: ['./marketplace-item-details.component.scss']
})
export class CampusMarketPlaceItemDetails {
	constructor (
		private campusApiService: CampusApiService,
    private route: ActivatedRoute,
		private el: ElementRef,
		@Inject(Window) private window: Window
	) {}
	protected itemId: number;
	protected myCampusMarketPlaceItem: CampusMarketplaceModel;
	private slideIndex = 1;

	public ngOnInit (): void {
		this.route.params.subscribe((params: Params) => {
			this.itemId = params.id;
			this.getItemDetails();
    });
	}

	private getItemDetails (): void {
		let itemId = parseInt(CryptoUtilities.decipher(this.itemId), 10);
		this.campusApiService.promiseGetMarketplaceItem(itemId)
		.then((campusMarketPlaceItem: CampusMarketplaceModel) => {
			this.myCampusMarketPlaceItem = campusMarketPlaceItem;
		});
	}

	protected plusSlides (n): void {
		this.showSlides(this.slideIndex += n);
	}

	private showSlides (item): void {
		let slides = this.el.nativeElement.querySelectorAll('.item-slide');
		if (item > slides.length) { this.slideIndex = 1; }
		if (item < 1) { this.slideIndex = slides.length; }
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}
		slides[this.slideIndex - 1].style.display = 'block';
	}
}
