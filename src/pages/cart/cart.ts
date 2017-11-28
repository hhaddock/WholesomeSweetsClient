import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html'
})

export class CartPage
{
    active_user: string = ''
    cart: any = []
    cart_price: number = 0

    constructor( private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private httpCtrl: Http )
    {
        this.active_user = this.navParams.get( 'email' )
        this.cart = this.navParams.get( 'cart' )
        this.calculatePrice()
        console.log( this.active_user )
    }

    ionViewWillEnter()
    {
        this.viewCtrl.showBackButton( false )
    }

    calculatePrice(): void
    {
        this.cart_price = 0

        Object.keys( this.cart ).forEach( key =>
        {
            let product_count = this.cart[ key ].count
            let product_price = this.cart[ key ].price
            this.cart_price += ( product_count * product_price )
        })
        console.log( this.cart_price )
    }
}
