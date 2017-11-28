import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage
{
	//we could make this an object -> login_info: any
	email: string = ''
	psswd: string = ''

	constructor( public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController, private httpCtrl: Http )
	{
	}

	//called when login button is pressed
	attemptLogin(): void
	{
		if( this.inputisEmpty( this.email ) || this.inputisEmpty( this.psswd ) ) //if either are empty or fail regex test, alert user
		{
			this.showAlert( 'Input Error', 'All inputs are required' )
		}
		else
		{
			this.postRequest()
		}
	}


	postRequest(): void
	{
		var headers = new Headers()
		headers.append( 'Accept', 'application/json' )
		headers.append( 'Content-Type', 'application/json' )
		let options = new RequestOptions( { headers: headers } )

		let post_params = {
			email: this.email,
			pass: this.psswd
		}

		this.httpCtrl.post( 'http://localhost:3000/user/login', JSON.stringify( post_params ), options )
		.subscribe( data => {
			let status = data[ '_body' ]
			if( status != 'true' )
			{
				this.showAlert( 'Login Failed', 'Username or Password is incorrect' )
			}
            else
            {
				localStorage.setItem( 'active_user', this.email )
                this.navCtrl.push( HomePage )
            }
		}, error => {
			console.log( 'error: ' + error )
		})
	}

	//tells the user whats wrong with the input fields
	showAlert( title, msg ): void
	{
		let alert = this.alertCtrl.create(
			{
				title   : title,
				subTitle: msg,
				buttons : [ 'Ok' ]
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
			if( data.email != '' && data.psswd != '' ) //if data is empty then the registration was cancelled
			{
				this.email = data.email
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
		 * numbers, and [ !, @, #, $, %, ^, &, *, . ].
		 *
		 * Eventually it will require a certain number of
		 * characters that contains capital letters,
		 * special chars, etc.
		**/
		let re = /^[\w!@#$%^&*.]+$/
		return !re.test( str )
	}
}
