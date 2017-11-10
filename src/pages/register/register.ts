import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {

	usrnm: string
	email: string
	psswd: string
	cnfrm: string

	constructor( private navParams: NavParams, private viewCtrl: ViewController ) {
	}

	attemptRegistration(): void
	{
		console.log( 'Username: ' + this.usrnm )
		console.log( 'Email: ' + this.email )
		console.log( 'Password: ' + this.psswd )
		console.log( 'Confirm Password: ' + this.cnfrm )
	}

	dismiss(): void
	{
		this.viewCtrl.dismiss()
	}

}
