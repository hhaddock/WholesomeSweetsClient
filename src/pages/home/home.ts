import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage
{
	active_user: string = ''

	constructor( private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController )
	{
		this.active_user = this.navParams.get( 'alias' )
		console.log( this.active_user )
	}

	ionViewWillEnter()
	{
		this.viewCtrl.showBackButton( false )
	}
}
