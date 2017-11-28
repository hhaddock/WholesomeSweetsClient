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
    cart = []

    constructor( private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private httpCtrl: Http )
    {
        this.active_user = this.navParams.get( 'email' )
        console.log( this.active_user )
    }

    ionViewWillEnter()
    {
        this.viewCtrl.showBackButton( false )
    }
}
