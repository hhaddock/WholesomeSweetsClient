import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	usrnm: string
	psswd: string

	constructor( public navCtrl: NavController, private modalCtrl: ModalController ) {

	}

	//called when login button is pressed
	attemptLogin(): void 
	{
		console.log( 'Login' )
		console.log( 'Username: ' + this.usrnm )
		console.log( 'Password: ' + this.psswd )
	}

	//called when register button is pressed
	loadRegisterPage(): void 
	{
		console.log( 'Register' )
		let modal = this.modalCtrl.create( RegisterPage, { usrnm: this.usrnm } )
		modal.present()
	}
}
