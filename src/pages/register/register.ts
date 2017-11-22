import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {

	usrnm: string = ''
	email: string = ''
	psswd: string = ''
	cnfrm: string = ''

	constructor( private navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private httpCtrl: Http )
	{
	}

	attemptRegistration(): void
	{
		let credentials = { usrnm: this.usrnm, email: this.email, psswd: this.psswd, cnfrm: this.cnfrm } //make object from login info for simpler access when validating
		var flag: boolean = true

		Object.keys( credentials ).forEach( key => {
			if( this.isEmpty( credentials[ key ] ) )
			{
				flag = false
			}
		})

		if( !flag )
		{
			this.showAlert( 'Invlalid Inputs', 'All inputs are required' )
		}
		else if( !this.verifyEmail() )
		{
			this.showAlert( 'Email Error', "Valid emails must include an '@' followed by the domain" )
		}
		else if( this.psswd != this.cnfrm )
		{
			this.showAlert( 'Password Error', 'Passwords must match' )
		}
		else
		{
			this.sendRegistrationRequest()
			//pass new username and password back to login for immediate login
			//this.viewCtrl.dismiss( { usrnm: this.email, psswd: this.psswd } )
		}
	}

	sendRegistrationRequest(): void
	{
		var headers = new Headers()
		headers.append( 'Accept', 'application/json' )
		headers.append( 'Content-Type', 'application/json' )
		let options = new RequestOptions( { headers: headers } )

		let post_params = {
			alias: this.usrnm,
			email: this.email,
			pass : this.psswd
		}

		this.httpCtrl.post( 'http://localhost:3000/user/signup', JSON.stringify( post_params ), options )
		.subscribe( data => {
			let status = data[ '_body' ]
			if( status != '' )
			{
				this.showAlert( 'Registration Failed', status )
			}
			else
			{
				this.viewCtrl.dismiss( { usrnm: this.email, psswd: this.psswd } )
			}
		}, error => {
			console.log( 'ERROR: ' + error )
		})
	}

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

	verifyEmail(): boolean
	{
		//confirms the email consists of 'string'-'@'-'string'-'.'-'string'
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test( this.email )
	}

	isEmpty( str ): boolean
	{
		//fails if even a space is in the input
		let re = /^$/
		return re.test( str )
	}

	//called when the user presses cancel
	dismiss(): void
	{
		this.viewCtrl.dismiss( { usrnm: '', psswd: '' } )
	}

}
