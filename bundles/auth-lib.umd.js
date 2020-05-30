(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('auth-lib', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common/http'], factory) :
    (global = global || self, factory(global['auth-lib'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common.http));
}(this, (function (exports, core, rxjs, operators, http) { 'use strict';

    var AuthComponent = /** @class */ (function () {
        function AuthComponent() {
        }
        AuthComponent.prototype.ngOnInit = function () {
        };
        AuthComponent.ɵfac = function AuthComponent_Factory(t) { return new (t || AuthComponent)(); };
        AuthComponent.ɵcmp = core.ɵɵdefineComponent({ type: AuthComponent, selectors: [["lib-auth-lib"]], decls: 2, vars: 0, template: function AuthComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵelementStart(0, "p");
                core.ɵɵtext(1, " auth-lib works! ");
                core.ɵɵelementEnd();
            } }, encapsulation: 2 });
        return AuthComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(AuthComponent, [{
            type: core.Component,
            args: [{
                    selector: 'lib-auth-lib',
                    template: "\n    <p>\n      auth-lib works!\n    </p>\n  ",
                    styles: []
                }]
        }], function () { return []; }, null); })();

    var DCS_AUTH_CONFIG = new core.InjectionToken('Authentication Configuration');
    var AuthModule = /** @class */ (function () {
        function AuthModule() {
        }
        AuthModule.ɵmod = core.ɵɵdefineNgModule({ type: AuthModule });
        AuthModule.ɵinj = core.ɵɵdefineInjector({ factory: function AuthModule_Factory(t) { return new (t || AuthModule)(); }, providers: [
                {
                    provide: DCS_AUTH_CONFIG,
                    useValue: { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' }
                }
            ], imports: [[]] });
        return AuthModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(AuthModule, { declarations: [AuthComponent], exports: [AuthComponent] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(AuthModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [AuthComponent],
                    imports: [],
                    providers: [
                        {
                            provide: DCS_AUTH_CONFIG,
                            useValue: { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' }
                        }
                    ],
                    exports: [AuthComponent]
                }]
        }], null, null); })();

    var AUTH_TYPE = 'auth-type';
    var AuthType;
    (function (AuthType) {
        AuthType["KEYCLOAK"] = "keycloak";
        AuthType["SIGNICAT"] = "signicat";
        AuthType["VEPA"] = "vepa";
        AuthType["CAPTCHA"] = "captcha";
    })(AuthType || (AuthType = {}));
    var AuthService = /** @class */ (function () {
        function AuthService(httpClient, config) {
            this.httpClient = httpClient;
            this.config = config;
            console.log('[AuthService]', 'constructor', config);
        }
        AuthService.prototype.oauth = function (params) {
            console.log('[AuthService]', 'oauth');
            if (params.state && params.uri) {
                return this.post(params);
            }
            else {
                throw new Error('Mandatory parameters state or uri missing');
            }
        };
        AuthService.prototype.signicat = function (params) {
            console.log('[AuthService]', 'signicat');
            if (params.state && params.uri) {
                this.authType = AuthType.SIGNICAT;
                var body = { code: params.code, uri: params.uri, state: params.state };
                return this.post(body);
            }
            else {
                throw new Error('Mandatory parameters state or uri missing');
            }
        };
        AuthService.prototype.vepa = function (params) {
            console.log('[AuthService]', 'vepa');
            if (params.s0 && params.s1 && params.s2 && params.s3 && params.state) {
                this.authType = AuthType.VEPA;
                return this.post(params);
            }
            else {
                throw new Error('Mandatory parameters s0, s1, s2, s3 or state missing');
            }
        };
        AuthService.prototype.keycloak = function (params) {
            console.log('[AuthService]', 'keycloak');
            if (params && params.state) {
                params.uri = this.config.redirectUrl;
                this.authType = AuthType.KEYCLOAK;
                return this.post(params);
            }
            else {
                throw new Error('Mandatory parameters uri or state missing');
            }
        };
        AuthService.prototype.captcha = function (params) {
            console.log('[AuthService]', 'captcha');
            if (params.token) {
                this.authType = AuthType.CAPTCHA;
                var token = params.token;
                return this.post({ token: token });
            }
            else {
                throw new Error('Mandatory parameters token missing');
            }
        };
        AuthService.prototype.refresh = function (token) {
            console.log('[AuthService]', 'refresh');
            var options = { headers: { Authorization: "Bearer " + token } };
            return this.httpClient.post(this.config.refreshUrl, null, options).pipe(operators.map(function (response) {
                return response && response.accessToken;
            }));
        };
        AuthService.prototype.post = function (body) {
            console.log('[AuthService]', 'post', body);
            var options = { headers: { 'X-Auth-Type': this.authType } };
            return this.httpClient.post(this.config.authenticationUrl, body, options).pipe(operators.map(function (response) {
                return response;
            }));
        };
        Object.defineProperty(AuthService.prototype, "authType", {
            get: function () {
                return sessionStorage.getItem(AUTH_TYPE);
            },
            set: function (type) {
                sessionStorage.setItem(AUTH_TYPE, type);
            },
            enumerable: true,
            configurable: true
        });
        AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(core.ɵɵinject(http.HttpClient), core.ɵɵinject(DCS_AUTH_CONFIG)); };
        AuthService.ɵprov = core.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
        return AuthService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(AuthService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], function () { return [{ type: http.HttpClient }, { type: undefined, decorators: [{
                    type: core.Inject,
                    args: [DCS_AUTH_CONFIG]
                }] }]; }, null); })();

    var KEYCLOAK = 'KEYCLOAK';
    var CAPTCHA = 'CAPTCHA';
    var AuthApi = /** @class */ (function () {
        function AuthApi(authService) {
            this.authService = authService;
            console.log('[AuthApi]', 'constructor');
            this.type = KEYCLOAK;
        }
        Object.defineProperty(AuthApi.prototype, "success", {
            get: function () {
                return this.successVariable;
            },
            set: function (success) {
                if (success !== this.successVariable) {
                    this.successVariable = success;
                    if (this.watchSuccessVariable) {
                        this.watchSuccess.next(this.success);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthApi.prototype, "watchSuccess", {
            get: function () {
                if (!this.watchSuccessVariable) {
                    this.watchSuccessVariable = new rxjs.BehaviorSubject(this.success);
                }
                return this.watchSuccessVariable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthApi.prototype, "accessToken", {
            get: function () {
                if (!this.accessTokenVariable) {
                    this.accessTokenVariable = sessionStorage.getItem('accessToken');
                }
                return this.accessTokenVariable;
            },
            set: function (token) {
                this.accessTokenVariable = token;
                if (this.accessTokenVariable) {
                    sessionStorage.setItem('accessToken', this.accessTokenVariable);
                }
                else {
                    sessionStorage.removeItem('accessToken');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthApi.prototype, "refreshToken", {
            get: function () {
                if (!this.refreshTokenVariable) {
                    this.refreshTokenVariable = sessionStorage.getItem('refreshToken');
                }
                return this.refreshTokenVariable;
            },
            set: function (token) {
                this.refreshTokenVariable = token;
                if (this.refreshTokenVariable) {
                    sessionStorage.setItem('refreshToken', this.refreshTokenVariable);
                }
                else {
                    sessionStorage.removeItem('refreshToken');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthApi.prototype, "type", {
            get: function () {
                return this.typeVariable;
            },
            set: function (type) {
                this.typeVariable = type;
            },
            enumerable: true,
            configurable: true
        });
        AuthApi.prototype.init = function (urlParams) {
            console.log('[AuthApi]', 'init');
            // const urlParams = new URLSearchParams(window.location.search);
            var code = urlParams && new URLSearchParams(urlParams).get('code');
            console.log('[AuthApi]', 'URL PARAMS', urlParams, 'CODE', code);
            if (this.type !== CAPTCHA && code) {
                return this.codeLogin(code);
            }
            else if (this.type === CAPTCHA) {
                return this.captchaLogin();
            }
            else {
                return this.initLogin();
            }
        };
        AuthApi.prototype.initLogin = function () {
            var _this = this;
            console.log('[AuthApi]', 'initLogin');
            return new rxjs.Observable(function (observer) {
                switch (_this.type) {
                    case KEYCLOAK:
                        var keycloakParams = {
                            state: 'init'
                        };
                        _this.authService.keycloak(keycloakParams).subscribe(function (accessData) {
                            console.log('[AuthApi]', 'keycloak', 'response', accessData);
                            if (accessData && accessData.redirect) {
                                document.location.href = accessData.redirect;
                            }
                            observer.next(Boolean(accessData && accessData.redirect));
                            observer.complete();
                        });
                        break;
                    default:
                        console.log('[AuthApi]', 'unknown type');
                        observer.next(null);
                        observer.complete();
                        break;
                }
            });
        };
        AuthApi.prototype.codeLogin = function (secureCode) {
            var _this = this;
            console.log('[AuthApi]', 'codeLogin');
            return new rxjs.Observable(function (observer) {
                switch (_this.type) {
                    case KEYCLOAK:
                        var keycloakParams = {
                            state: 'init',
                            code: secureCode
                        };
                        _this.authService.keycloak(keycloakParams).subscribe(function (accessData) {
                            console.log('[AuthApi]', 'keycloak', 'response', accessData);
                            _this.success = _this.handleAccessData(accessData);
                            observer.next(_this.success);
                            observer.complete();
                        });
                        break;
                    default:
                        console.log('[AuthApi]', 'unknown type');
                        observer.next(null);
                        observer.complete();
                        break;
                }
            });
        };
        AuthApi.prototype.captchaLogin = function () {
            console.log('[AuthApi]', 'captchaLogin');
            return rxjs.of(null);
        };
        AuthApi.prototype.getToken = function () {
            console.log('[AuthApi]', 'getToken');
            return this.accessToken;
        };
        AuthApi.prototype.updateToken = function () {
            var _this = this;
            console.log('[AuthApi]', 'updateToken');
            return new rxjs.Observable(function (observer) {
                _this.authService.refresh(_this.refreshToken).subscribe(function (accessToken) {
                    console.log('[AuthApi]', 'updateToken', 'response', accessToken);
                    _this.accessToken = accessToken;
                    observer.next(accessToken);
                    observer.complete();
                });
            });
        };
        AuthApi.prototype.handleAccessData = function (accessData) {
            console.log('[AuthApi]', 'handleAccessData', accessData);
            if (accessData) {
                this.accessToken = accessData.accessToken;
                this.refreshToken = accessData.refreshToken;
            }
            else {
                this.accessToken = null;
                this.refreshToken = null;
            }
            return Boolean(accessData && accessData.accessToken && accessData.refreshToken);
        };
        AuthApi.ɵfac = function AuthApi_Factory(t) { return new (t || AuthApi)(core.ɵɵinject(AuthService)); };
        AuthApi.ɵprov = core.ɵɵdefineInjectable({ token: AuthApi, factory: AuthApi.ɵfac, providedIn: 'root' });
        return AuthApi;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(AuthApi, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], function () { return [{ type: AuthService }]; }, null); })();

    exports.AuthApi = AuthApi;
    exports.AuthComponent = AuthComponent;
    exports.AuthModule = AuthModule;
    exports.DCS_AUTH_CONFIG = DCS_AUTH_CONFIG;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=auth-lib.umd.js.map
