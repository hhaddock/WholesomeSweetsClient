import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { HomePage } from '../home/home';
import { OrdersPage } from '../orders/orders';

@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html'
})

export class CartPage
{
    active_user: string = ''
    active_user_cart: string = ''
    cart: any = []
    cart_price: number = 0
    order_num: string = '-1'
    ordered_items: any = []

    say_hide_confirm: boolean
    say_hide_order: boolean
    say_hide_empty: boolean

    constructor( private navCtrl: NavController, private viewCtrl: ViewController, private httpCtrl: Http )
    {
        this.active_user = localStorage.getItem( 'active_user' )
        this.active_user_cart = this.active_user + '_cart'
        this.cart = ( localStorage.getItem( this.active_user_cart ) !== null ) ? JSON.parse( localStorage.getItem( this.active_user_cart ) ) : []
        this.setHiddenContent()
        this.calculatePrice()
    }

    ionViewWillEnter()
    {
        this.viewCtrl.showBackButton( false )
    }

    setHiddenContent(): void
    {
        if( this.cart.length == 0 )
        {
            if( this.order_num == '-1' )
            {
                this.say_hide_order = false
                this.say_hide_confirm = false
                this.say_hide_empty = true
            }
            else
            {
                this.say_hide_order = true
                this.say_hide_confirm = false
                this.say_hide_empty = false
            }
        }
        else
        {
            this.say_hide_empty = false
            this.say_hide_order = false
            this.say_hide_confirm = true
        }
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
        this.setHiddenContent()
        localStorage.setItem( cart_name, JSON.stringify( this.cart ) )
    }

    setOrderNum( order_group: string )
    {
        this.order_num = order_group

        Object.keys( this.cart ).forEach( key =>
        {
            this.ordered_items.push({
                product: this.cart[ key ].product,
                quantity: this.cart[ key ].count
            })
        })

        this.cart = []
        localStorage.setItem( this.active_user + '_cart', JSON.stringify( this.cart ) )
        this.setHiddenContent()
    }

    submitOrder( order_group: string, index: number )
    {
        if( index == this.cart.length )
        {
            this.setOrderNum( order_group )
            return
        }

        this.order_num = order_group
        var headers = new Headers()
        headers.append( 'Accept', 'application/json' )
		headers.append( 'Content-Type', 'application/json' )
		let options = new RequestOptions( { headers: headers } )

        let post_params = {
            product: this.cart[ index ].product,
            email: this.active_user,
            quantity: this.cart[ index ].count,
            order_group: order_group
        }

        this.httpCtrl.post( 'http://ec2-54-244-76-150.us-west-2.compute.amazonaws.com:3000/order/create_order', JSON.stringify( post_params ), options )
        .subscribe( data => {
            this.submitOrder( data[ '_body' ], index + 1 )
        }, error => {
            console.log( 'Confirmation error: ' + error )
        })
    }

    goToHome(): void
    {
        this.navCtrl.push( HomePage )
    }

    goToOrders(): void
    {
        this.navCtrl.push( OrdersPage )
    }
}
