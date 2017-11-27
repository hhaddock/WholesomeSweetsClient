import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RegisterPage } from '../register/register';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage
{
	active_user: string = ''
	inventory: Array<{ pic: string, title: string, descr: string, count: number }>
	cart: number = 0

	constructor( private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController )
	{
		this.active_user = this.navParams.get( 'alias' )
		console.log( this.active_user )

		this.inventory = [
			{ pic: 'assets/imgs/cookies.jpg', title: 'Cookies', descr: 'These are some tasty cookies', count: 0 },
			{ pic: 'assets/imgs/brownies.jpg', title: 'Brownies', descr: 'These are some tasty brownies', count: 0 },
			{ pic: 'assets/imgs/krispie.jpg', title: 'Krispies', descr: 'These are some tasty krispies', count: 0 }
		]
	}

	ionViewWillEnter()
	{
		this.viewCtrl.showBackButton( false )
	}

	loadProducts()
	{
		var headers = new Headers()
		headers.append( 'Accept', 'application/json' )
		headers.append( 'Content-Type', 'application/json' )
		let options = new RequestOptions( { headers: headers } )


	}

	bumpCounter( item ): void
	{
		if( item.count < 4 )
		{
			this.cart++
			item.count++
		}
	}

	decrCounter( item ): void
	{
		if( item.count > 0 )
		{
			this.cart--
			item.count--
		}
	}
}
