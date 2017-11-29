import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
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
        this.loadOrders()
    }

    loadOrders(): void
    {
        var headers = new Headers()
        headers.append( 'Accept', 'application/json' )
        headers.append( 'Content-Type', 'application/json' )
        let options = new RequestOptions( { headers: headers } )

        let post_params = {
            email: this.active_user
        }

        this.httpCtrl.post( 'http://ec2-54-244-76-150.us-west-2.compute.amazonaws.com:3000/order/get_orders', JSON.stringify( post_params ), options )
        .subscribe( data => {
            this.orders = JSON.parse( data[ '_body' ] )

            Object.keys( this.orders ).forEach( key =>
            {
                console.log( this.orders[ key ].date )
            })
        }, error => {
            console.log( 'Load order error: ' + error )
        })
    }
}
