import { Component, OnInit} from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Wash } from './wash.model'; 

@Component({
	selector: 'app-wash',
	templateUrl: './wash.component.html',
	styleUrls: ['./wash.component.scss']
})
export class WashComponent implements OnInit {

	displayPriceMessage = false; 
	washForm: FormGroup; 
	wash: Wash; 

	ngOnInit() {
		this.washForm = new FormGroup({
			'vehicleLicensePlate': new FormControl(null, [Validators.required, this.stolenLicensePlate.bind(this)]),
			'vehicleType': new FormControl(null, Validators.required), 
			'hasMuddyBed': new FormControl(null), 
			'hasBedDown': new FormControl(true, [this.bedIsDown]), 
			'isSecondWash': new FormControl(null), 
		});
	}

	hideAlert() {
		this.displayPriceMessage = false; 
	}

	onSubmit() {
		this.wash = new Wash(
			this.washForm.value['vehicleLicensePlate'], 
			this.washForm.value['vehicleType'],
			this.washForm.value['hasMuddyBed'], 
			this.washForm.value['hasBedDown'], 
			this.washForm.value['isSecondWash'], 
			0
		); 

		if (this.wash.vehicleType == 'car') {
			this.wash.price += 5; 
		}
		if (this.wash.vehicleType  == 'truck') {
			this.wash.price += 10; 
		}
		if ( this.wash.hasMuddyBed  == true ) {
			this.wash.price += 2; 
		}
		if ( this.wash.isSecondWash  == true ) {
			this.wash.price *= 0.5; 
		}

		this.displayPriceMessage = true; 
		this.washForm.reset(); 
	}

	bedIsDown(control: FormControl): {[s: string]: boolean} {
		if (control.value && control.value === true ) {
			return {'bedIsDown': true};
		}
		return null; 
	}

	stolenLicensePlate(control: FormControl): {[s: string]: boolean} {
		if (control.value === '1111111') {
			return {'vehicleIsStolen': true};
		}
		return null; 
	}
}
