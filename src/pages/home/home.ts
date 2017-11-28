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
	inventory = []
	cart: number = 0
	cart_obj = []

	constructor( private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private httpCtrl: Http )
	{
		this.active_user = this.navParams.get( 'alias' )
		console.log( this.active_user )
	}

	ionViewWillEnter()
	{
		this.viewCtrl.showBackButton( false )
		this.loadProducts()
	}

	loadProducts(): void
	{
		var headers = new Headers()
		headers.append( 'Accept', 'application/json' )
		headers.append( 'Content-Type', 'application/json' )
		let options = new RequestOptions( { headers: headers } )

		this.httpCtrl.post( 'http://localhost:3000/product/products', options )
		.subscribe( data => {
			this.inventory = JSON.parse( data[ '_body' ] )
		}, error => {
			console.log( 'Error loading products: ' + error )
		})
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

	loadCart(): void
	{
		let cart_name = this.active_user + '_cart'
		this.cart_obj = ( localStorage.getItem( cart_name ) !== null ) ? JSON.parse( localStorage.getItem( cart_name ) ) : []
	}
}
