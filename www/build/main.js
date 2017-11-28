webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, navParams, viewCtrl, httpCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.httpCtrl = httpCtrl;
        //string that holds the email of the active user
        this.active_user = '';
        //object that holds the products loaded form the DB
        this.inventory = [];
        //number that holds the total number of products in the cart object
        this.cart = 0;
        //object that holds the products that the user has added to their cart
        this.cart_obj = [];
        this.active_user = localStorage.getItem('active_user');
        console.log(this.active_user);
    }
    HomePage.prototype.ionViewWillEnter = function () {
        //hides the back button so the user has access to the menu toggle
        this.viewCtrl.showBackButton(false);
        this.loadProducts();
    };
    HomePage.prototype.loadProducts = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this.httpCtrl.post('http://localhost:3000/product/products', options)
            .subscribe(function (data) {
            _this.inventory = JSON.parse(data['_body']);
            _this.loadCart();
        }, function (error) {
            console.log('Error loading products: ' + error);
        });
    };
    HomePage.prototype.bumpCounter = function (item) {
        if (item.count < 4) {
            this.cart++;
            item.count++;
            this.updateCart();
        }
    };
    HomePage.prototype.decrCounter = function (item) {
        if (item.count > 0) {
            this.cart--;
            item.count--;
            this.updateCart();
        }
    };
    HomePage.prototype.loadCart = function () {
        var _this = this;
        var cart_name = this.active_user + '_cart';
        //loads the active user's cart
        this.cart_obj = (localStorage.getItem(cart_name) !== null) ? JSON.parse(localStorage.getItem(cart_name)) : [];
        Object.keys(this.cart_obj).forEach(function (cart_key) {
            var cart_item = _this.cart_obj[cart_key];
            Object.keys(_this.inventory).forEach(function (inv_key) {
                /** If the current inventory item's product name matches
                 *  the name of the current item in the user's cart then:
                 *  	1. Set the inventory item's count equal to the
                 *     	   current cart item's count
                 *  	2. Set the current cart item's price equal to
                 *         the current inventory item's price
                 *   	3. Add the current cart item's count to the total
                 *   	   number of items in the cart
                **/
                if (_this.inventory[inv_key].product == cart_item.product) {
                    _this.inventory[inv_key].count = cart_item.count;
                    _this.cart_obj[cart_key].price = _this.inventory[inv_key].price;
                    _this.cart += cart_item.count;
                }
            }); //end inner for each
        }); //end outter for each
    };
    HomePage.prototype.updateCart = function () {
        var _this = this;
        var cart_name = this.active_user + '_cart';
        this.cart_obj = [];
        Object.keys(this.inventory).forEach(function (key) {
            var current_item = _this.inventory[key];
            //If the current inventory item's count is greater than 0
            //then push that item onto the cart object
            if (current_item.count > 0) {
                _this.cart_obj.push({
                    product: current_item.product,
                    count: current_item.count,
                    price: current_item.price,
                    pic: current_item.path_to_picture
                });
            }
        });
        localStorage.setItem(cart_name, JSON.stringify(this.cart_obj));
    };
    HomePage.prototype.loadCartView = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */], {
            cart: this.cart_obj
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/home/home.html"*/`<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Home</ion-title>\n        <ion-buttons end>\n            <button ion-button (click)="loadCartView()">\n                <ion-icon name="md-cart" clear></ion-icon>\n                <ion-badge>{{cart}}</ion-badge>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content bg-color="red">\n    <ion-card bg-color="pink" *ngFor="let item of inventory">\n        <img src={{item.path_to_picture}} />\n        <ion-card-content>\n            <ion-card-title card-title>\n                {{item.product}}\n            </ion-card-title>\n            <p card-description>\n                {{item.description}}\n            </p>\n            <hr>\n            <ion-grid card-buttons>\n                <ion-row>\n                    <ion-col>\n                        <button ion-button id="add-btn" (click)="bumpCounter( item )">\n                            <ion-icon name="md-add-circle"></ion-icon>\n                        </button>\n                    </ion-col>\n                    <ion-col>\n                        <strong quantity>{{item.count}}</strong>\n                    </ion-col>\n                    <ion-col>\n                        <button ion-button id="sub-btn" (click)="decrCounter( item )">\n                            <ion-icon name="md-remove-circle"></ion-icon>\n                        </button>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-card-content>\n    </ion-card>\n</ion-content>\n`/*ion-inline-end:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _d || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 152;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = (function () {
    function LoginPage(navCtrl, modalCtrl, alertCtrl, toastCtrl, httpCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.httpCtrl = httpCtrl;
        //we could make this an object -> login_info: any
        this.email = '';
        this.psswd = '';
    }
    //called when login button is pressed
    LoginPage.prototype.attemptLogin = function () {
        if (this.inputisEmpty(this.email) || this.inputisEmpty(this.psswd)) {
            this.showAlert('Input Error', 'All inputs are required');
        }
        else {
            this.postRequest();
        }
    };
    LoginPage.prototype.postRequest = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var post_params = {
            email: this.email,
            pass: this.psswd
        };
        this.httpCtrl.post('http://localhost:3000/user/login', JSON.stringify(post_params), options)
            .subscribe(function (data) {
            var status = data['_body'];
            if (status != 'true') {
                _this.showAlert('Login Failed', 'Username or Password is incorrect');
            }
            else {
                localStorage.setItem('active_user', _this.email);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }
        }, function (error) {
            console.log('error: ' + error);
        });
    };
    //tells the user whats wrong with the input fields
    LoginPage.prototype.showAlert = function (title, msg) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    //tells the user their profile has been created and prompts
    //them to login
    LoginPage.prototype.showRegistrationConfirm = function () {
        var toast = this.toastCtrl.create({
            message: 'User successfully added, now just login!',
            duration: 5000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    //called when register button is pressed
    LoginPage.prototype.loadRegisterPage = function () {
        var _this = this;
        console.log('Register');
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
        modal.onDidDismiss(function (data) {
            if (data.email != '' && data.psswd != '') {
                _this.email = data.email;
                _this.psswd = data.psswd;
                _this.showRegistrationConfirm();
            }
        });
        modal.present();
    };
    //checks if input is okay to verify
    LoginPage.prototype.inputisEmpty = function (str) {
        /** /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/
         * This will change at some point to be more secure
         * but for now it only allows letters (a-zA-z),
         * numbers, and [ !, @, #, $, %, ^, &, *, . ].
         *
         * Eventually it will require a certain number of
         * characters that contains capital letters,
         * special chars, etc.
        **/
        var re = /^[\w!@#$%^&*.]+$/;
        return !re.test(str);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/login/login.html"*/`<ion-header>\n    <ion-navbar>\n        <ion-title>Login</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content bg-color="red">\n    <form (ngSubmit)="attemptLogin()">\n\n        <!-- Card for text inputs -->\n        <ion-card class="input-card">\n            <ion-card-content>\n                <ion-grid>\n                    <ion-row>\n                        <ion-col>\n                            <ion-item class="login-input">\n                                <ion-input type="text" placeholder="Email" [(ngModel)]="email" name="email"></ion-input>\n                            </ion-item>\n                            <ion-item class="login-input">\n                                <ion-input type="password" placeholder="Password" [(ngModel)]="psswd" name="psswd"></ion-input>\n                            </ion-item>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n            </ion-card-content>\n        </ion-card>\n\n        <!-- Card for login and register buttons -->\n        <ion-card class="input-card">\n            <ion-card-content>\n                <ion-grid>\n                    <ion-row>\n                        <ion-col>\n                            <button type="submit" ion-button round item-start id="login_btn">Login</button>\n                        </ion-col>\n                        <ion-col>\n                            <button type="button" ion-button round item-end id="register_btn" (click)="loadRegisterPage()">Register</button>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n            </ion-card-content>\n        </ion-card>\n\n    </form>\n    <div h-align="center">\n        <img img-size="logo" src="../../assets/imgs/ws.png" align="bottom"/>\n    </div>\n</ion-content>\n`/*ion-inline-end:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _e || Object])
    ], LoginPage);
    return LoginPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterPage = (function () {
    function RegisterPage(navParams, viewCtrl, alertCtrl, httpCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.httpCtrl = httpCtrl;
        this.usrnm = '';
        this.email = '';
        this.psswd = '';
        this.cnfrm = '';
    }
    RegisterPage.prototype.attemptRegistration = function () {
        var _this = this;
        var credentials = { usrnm: this.usrnm, email: this.email, psswd: this.psswd, cnfrm: this.cnfrm }; //make object from login info for simpler access when validating
        var flag = true;
        Object.keys(credentials).forEach(function (key) {
            if (_this.isEmpty(credentials[key])) {
                flag = false;
            }
        });
        if (!flag) {
            this.showAlert('Invlalid Inputs', 'All inputs are required');
        }
        else if (!this.verifyEmail()) {
            this.showAlert('Email Error', "Valid emails must include an '@' followed by the domain");
        }
        else if (this.psswd != this.cnfrm) {
            this.showAlert('Password Error', 'Passwords must match');
        }
        else {
            this.sendRegistrationRequest();
            //pass new username and password back to login for immediate login
            //this.viewCtrl.dismiss( { usrnm: this.email, psswd: this.psswd } )
        }
    };
    RegisterPage.prototype.sendRegistrationRequest = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var post_params = {
            alias: this.usrnm,
            email: this.email,
            pass: this.psswd
        };
        this.httpCtrl.post('http://localhost:3000/user/signup', JSON.stringify(post_params), options)
            .subscribe(function (data) {
            var status = data['_body'];
            if (status != '') {
                _this.showAlert('Registration Failed', status);
            }
            else {
                _this.viewCtrl.dismiss({ email: _this.email, psswd: _this.psswd });
            }
        }, function (error) {
            console.log('ERROR: ' + error);
        });
    };
    RegisterPage.prototype.showAlert = function (title, msg) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    RegisterPage.prototype.verifyEmail = function () {
        //confirms the email consists of 'string'-'@'-'string'-'.'-'string'
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email);
    };
    RegisterPage.prototype.isEmpty = function (str) {
        //fails if even a space is in the input
        var re = /^$/;
        return re.test(str);
    };
    //called when the user presses cancel
    RegisterPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss({ email: '', psswd: '' });
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/register/register.html"*/`<ion-header>\n	<ion-navbar>\n		<ion-title>Register</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content bg-color="maroon">\n	<form (ngSubmit)="attemptRegistration()">\n\n		<!-- Card for text inputs -->\n		<ion-card class="input-card">\n			<ion-card-content>\n				<ion-grid>\n					<ion-row>\n						<ion-col>\n							<ion-item class="home-input">\n								<ion-input type="text" placeholder="Username" [(ngModel)]="usrnm" name="usrnm"></ion-input>\n							</ion-item>\n							<ion-item class="home-input">\n								<ion-input type="text" placeholder="Email" [(ngModel)]="email" name="email"></ion-input>\n							</ion-item>\n							<ion-item class="home-input">\n								<ion-input type="password" placeholder="Password" [(ngModel)]="psswd" name="psswd"></ion-input>\n							</ion-item>\n							<ion-item class="home-input">\n								<ion-input type="password" placeholder="Confirm Password" [(ngModel)]="cnfrm" name="cnfrm"></ion-input>\n							</ion-item>\n						</ion-col>\n					</ion-row>\n				</ion-grid>\n			</ion-card-content>\n		</ion-card>\n\n		<!-- Card for cancel and confirm buttons -->\n		<ion-card class="input-card">\n			<ion-card-content>\n				<ion-grid>\n					<ion-row>\n						<ion-col>\n							<button type="submit" ion-button round item-start id="confirm_btn">Confirm</button>\n						</ion-col>\n						<ion-col>\n							<button type="button" ion-button round item-end id="cancel_btn" (click)="dismiss()">Cancel</button>\n						</ion-col>\n					</ion-row>\n				</ion-grid>\n			</ion-card-content>\n		</ion-card>\n		\n	</form>	\n</ion-content>\n`/*ion-inline-end:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_register_register__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Login', component: __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */] },
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component == __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]) {
            localStorage.setItem('active_user', '');
        }
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]) === "function" && _a || Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/app/app.html"*/`<ion-menu [content]="content" persistent=true>\n    <ion-header>\n        <ion-toolbar>\n            <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content bg-color="lred">\n        <ion-list>\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" class="menu-item">\n                {{p.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n    <ion-footer>\n        <ion-toolbar>\n            <button type="button" menuClose round id="logout_btn" (click)="openPage(pages[0])"><strong>Logout</strong></button>\n        </ion-toolbar>\n    </ion-footer>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n`/*ion-inline-end:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/list/list.html"*/`<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n`/*ion-inline-end:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CartPage = (function () {
    function CartPage(navCtrl, navParams, viewCtrl, httpCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.httpCtrl = httpCtrl;
        this.active_user = '';
        this.cart = [];
        this.cart_price = 0;
        this.active_user = localStorage.getItem('active_user');
        this.cart = this.navParams.get('cart');
        this.calculatePrice();
        console.log(this.active_user);
    }
    CartPage.prototype.ionViewWillEnter = function () {
        this.viewCtrl.showBackButton(false);
    };
    CartPage.prototype.calculatePrice = function () {
        var _this = this;
        this.cart_price = 0;
        Object.keys(this.cart).forEach(function (key) {
            var product_count = _this.cart[key].count;
            var product_price = _this.cart[key].price;
            _this.cart_price += (product_count * product_price);
        });
        console.log(this.cart_price);
    };
    CartPage.prototype.bumpCounter = function (item) {
        if (item.count < 4) {
            item.count++;
            this.cart_price += item.price;
            this.updateCart();
        }
    };
    CartPage.prototype.decrCounter = function (item) {
        if (item.count > 1) {
            item.count--;
            this.cart_price -= item.price;
            this.updateCart();
        }
    };
    CartPage.prototype.updateCart = function () {
        var cart_name = this.active_user + '_cart';
        localStorage.setItem(cart_name, JSON.stringify(this.cart));
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/cart/cart.html"*/`<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Cart</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content bg-color="red">\n    <ion-list>\n        <ion-item *ngFor="let item of cart" bg-color="pink">\n            <ion-thumbnail item-start>\n                <img src={{item.pic}} />\n            </ion-thumbnail>\n            <h2>{{item.product}} (x{{item.count}})</h2>\n            <p>$ {{item.price * item.count}}</p>\n            <button ion-button id="add-btn" item-end (click)="bumpCounter(item)">\n                <ion-icon name="md-add-circle"></ion-icon>\n            </button>\n            <button ion-button id="sub-btn" item-end (click)="decrCounter(item)">\n                <ion-icon name="md-remove-circle"></ion-icon>\n            </button>\n        </ion-item>\n    </ion-list>\n    {{cart_price}}\n</ion-content>\n`/*ion-inline-end:"/Users/cedrik/Desktop/WholesomeSweetsClient/src/pages/cart/cart.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _d || Object])
    ], CartPage);
    return CartPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=cart.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map