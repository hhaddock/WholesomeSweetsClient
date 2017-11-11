/** David 11/10/17
 * Ready for DB connection.
 * Functions for data retrieval and validation are set up.
 * Some UI feedback is set up:
 *	* Inputs are empty or invalid
 *	* There account has been created if they registered
**/

import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	//we could make this an object -> login_info: any
	usrnm: string = ''
	psswd: string = ''

	constructor( public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController ) {

	}

	//called when login button is pressed
	attemptLogin(): void 
	{
		if( this.inputisEmpty( this.usrnm ) || this.inputisEmpty( this.psswd ) ) //if either are empty or fail regex test, alert user 
		{
			this.showAlert( 'Input Error', 'All inputs are required' )
		}
		// else { login() }
	}

	//tells the user whats wrong with the input fields
	showAlert( title, msg ): void
	{
		let alert = this.alertCtrl.create(
			{
				title: title,
				subTitle: msg,
				buttons: [ 'Ok' ]	
			}
		)
		alert.present()
	}

	//tells the user their profile has been created and prompts
	//them to login
	showRegistrationConfirm(): void
	{
		let toast = this.toastCtrl.create(
			{
				message: 'User successfully added, now just login!',
				duration: 5000,
				position: 'middle',
				showCloseButton: true,
				closeButtonText: 'Ok'
			}
		)
		toast.present()
	}

	//called when register button is pressed
	loadRegisterPage(): void 
	{
		console.log( 'Register' )
		let modal = this.modalCtrl.create( RegisterPage )

		modal.onDidDismiss( data => {
			if( data.usrnm != '' && data.psswd != '' ) //if data is empty then the registration was cancelled
			{
				this.usrnm = data.usrnm
				this.psswd = data.psswd
				this.showRegistrationConfirm()
			}
		})

		modal.present()
	}

	//checks if input is okay to verify
	inputisEmpty( str ): boolean
	{
		/** /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/
		 * This will change at some point to be more secure
		 * but for now it only allows letters (a-zA-z),
		 * numbers, and [ !, @, #, $, %, ^, &, * ].
		 * 
		 * Eventually it will require a certain number of
		 * characters that contains capital letters, 
		 * special chars, etc.
		**/
		let re = /^[\w!@#$%^&*]+$/
		return !re.test( str )
	}
}
