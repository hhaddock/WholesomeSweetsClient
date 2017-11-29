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
    hide_confirm: boolean
    order_num: string = '-1'

    constructor( private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private httpCtrl: Http )
    {
        this.active_user = localStorage.getItem( 'active_user' )
        this.cart = ( localStorage.getItem( this.active_user + '_cart' ) !== null ) ? JSON.parse( localStorage.getItem( this.active_user + '_cart' ) ) : []
        this.shouldHideConfirm()
        this.calculatePrice()
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
    }

    bumpCounter( item ): void
    {
        if( item.count < 4 )
        {
            item.count++
            this.cart_price += item.price
            this.updateCart()
        }
    }

    decrCounter( item ): void
    {
        item.count--
        this.cart_price -= item.price
        this.updateCart()
    }

    updateCart(): void
    {
        let cart_name = this.active_user + '_cart'

        let temp_cart = this.cart
        this.cart = []
        Object.keys( temp_cart ).forEach( key =>
        {
            if( temp_cart[ key ].count > 0 )
            {
                this.cart.push({
                    product: temp_cart[ key ].product,
                    count  : temp_cart[ key ].count,
                    price  : temp_cart[ key ].price,
                    pic    : temp_cart[ key ].pic
                })
            }
        })
        this.shouldHideConfirm()
        localStorage.setItem( cart_name, JSON.stringify( this.cart ) )
    }

    submitOrder()
    {
        this.order_num = '-1'
        var headers = new Headers()
        headers.append( 'Accept', 'application/json' )
		headers.append( 'Content-Type', 'application/json' )
		let options = new RequestOptions( { headers: headers } )

        for( var i = 0; i < this.cart.length; i++ )
        {
            console.log( this.cart[ i ] )
        }

        Object.keys( this.cart ).forEach( key =>
        {
            console.log( this.order_num )
            let post_params = {
                product: this.cart[ key ].product,
                email: this.active_user,
                quantity: this.cart[ key ].count,
                order_group: this.order_num
            }

            this.httpCtrl.post( 'http://localhost:3000/order/create_order', JSON.stringify( post_params ), options )
            .subscribe( data => {
                this.order_num = data[ '_body' ]
            }, error => {
                console.log( 'Confirmation error: ' + error )
            })
        })

        console.log( this.order_num )
    }

    shouldHideConfirm(): void
    {
        if( this.cart.length == 0 )
        {
            this.hide_confirm = false
        }
        else
        {
            this.hide_confirm = true
        }
    }
}
