import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html'
})
export class OrdersPage
{
    active_user: string = ''
    orders: any = []

    constructor( private navCtrl: NavController, private viewCtrl: ViewController, private httpCtrl: Http )
    {
        this.active_user = localStorage.getItem( 'active_user' )
    }
}
