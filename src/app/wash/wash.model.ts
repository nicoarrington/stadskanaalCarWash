export class Wash {
	constructor( public vehicleLicensePlate: string, 
		public vehicleType: string, 
		public hasMuddyBed: boolean, 
		public hasBedDown: boolean, 
		public isSecondWash: boolean,
		public price: number
		) {
	}
}