import { __decorate, __param } from 'tslib';
import { Component, InjectionToken, NgModule, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

var AuthComponent = /** @class */ (function () {
    function AuthComponent() {
    }
    AuthComponent.prototype.ngOnInit = function () {
    };
    AuthComponent = __decorate([
        Component({
            selector: 'lib-auth-lib',
            template: "\n    <p>\n      auth-lib works!\n    </p>\n  "
        })
    ], AuthComponent);
    return AuthComponent;
}());

var DCS_AUTH_CONFIG = new InjectionToken('Authentication Configuration');
var ɵ0 = { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect', defaultType: 'keycloak' };
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        NgModule({
            declarations: [AuthComponent],
            imports: [],
            providers: [
                {
                    provide: DCS_AUTH_CONFIG,
                    useValue: ɵ0
                }
            ],
            exports: [AuthComponent]
        })
    ], AuthModule);
    return AuthModule;
}());

var AUTH_TYPE = 'auth-type';
var AuthService = /** @class */ (function () {
    function AuthService(httpClient, config) {
        this.httpClient = httpClient;
        this.config = config;
        console.log('[AuthService]', 'constructor', config);
    }
    AuthService.prototype.oauth = function (params) {
        console.log('[AuthService]', 'oauth');
        if (params && params.state) {
            params.uri = this.config.redirectUrl;
            return this.post(params);
        }
        else {
            throw new Error('Mandatory parameters state or uri missing');
        }
    };
    AuthService.prototype.signicat = function (params) {
        console.log('[AuthService]', 'signicat');
        if (params && params.state) {
            params.uri = this.config.redirectUrl;
            this.authType = this.authTypes.SIGNICAT;
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
            this.authType = this.authTypes.VEPA;
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
            this.authType = this.authTypes.KEYCLOAK;
            return this.post(params);
        }
        else {
            throw new Error('Mandatory parameters uri or state missing');
        }
    };
    AuthService.prototype.captcha = function (params) {
        console.log('[AuthService]', 'captcha');
        if (params.token) {
            this.authType = this.authTypes.CAPTCHA;
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
        return this.httpClient.post(this.config.refreshUrl, null, options).pipe(map(function (response) {
            return response && response.accessToken;
        }));
    };
    AuthService.prototype.post = function (body) {
        console.log('[AuthService]', 'post', body);
        var options = { headers: { 'X-Auth-Type': this.authType } };
        return this.httpClient.post(this.config.authenticationUrl, body, options).pipe(map(function (response) {
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
    Object.defineProperty(AuthService.prototype, "authTypes", {
        get: function () {
            return {
                KEYCLOAK: 'keycloak',
                SIGNICAT: 'signicat',
                VEPA: 'vepa',
                CAPTCHA: 'captcha'
            };
        },
        enumerable: true,
        configurable: true
    });
    AuthService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [DCS_AUTH_CONFIG,] }] }
    ]; };
    AuthService.ɵprov = ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(ɵɵinject(HttpClient), ɵɵinject(DCS_AUTH_CONFIG)); }, token: AuthService, providedIn: "root" });
    AuthService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __param(1, Inject(DCS_AUTH_CONFIG))
    ], AuthService);
    return AuthService;
}());

var AuthApi = /** @class */ (function () {
    function AuthApi(authService, config) {
        this.authService = authService;
        this.config = config;
        console.log('[AuthApi]', 'constructor');
        this.type = this.config.defaultType;
    }
    Object.defineProperty(AuthApi.prototype, "success", {
        get: function () {
            return this.successVar;
        },
        set: function (success) {
            if (success !== this.successVar) {
                this.successVar = success;
                if (this.watchSuccessVar && this.successVar !== undefined) {
                    this.watchSuccess.next(this.success);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthApi.prototype, "watchSuccess", {
        get: function () {
            if (!this.watchSuccessVar) {
                this.watchSuccessVar = new BehaviorSubject(this.success);
            }
            return this.watchSuccessVar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthApi.prototype, "accessToken", {
        get: function () {
            if (!this.accessTokenVar) {
                this.accessTokenVar = sessionStorage.getItem('accessToken');
            }
            return this.accessTokenVar;
        },
        set: function (token) {
            this.accessTokenVar = token;
            if (this.accessTokenVar) {
                sessionStorage.setItem('accessToken', this.accessTokenVar);
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
            if (!this.refreshTokenVar) {
                this.refreshTokenVar = sessionStorage.getItem('refreshToken');
            }
            return this.refreshTokenVar;
        },
        set: function (token) {
            this.refreshTokenVar = token;
            if (this.refreshTokenVar) {
                sessionStorage.setItem('refreshToken', this.refreshTokenVar);
            }
            else {
                sessionStorage.removeItem('refreshToken');
            }
        },
        enumerable: true,
        configurable: true
    });
    AuthApi.prototype.init = function (urlParams) {
        console.log('[AuthApi]', 'init', urlParams);
        var code = urlParams && new URLSearchParams(urlParams).get('code');
        if (code) {
            return this.login(code);
        }
        else {
            return this.initLogin();
        }
    };
    AuthApi.prototype.captchaLogin = function (secret) {
        var _this = this;
        console.log('[AuthApi]', 'captchaLogin', secret);
        return new Observable(function (observer) {
            var captchaParams = {
                token: secret
            };
            _this.authService.captcha(captchaParams).subscribe(function (accessData) {
                console.log('[AuthApi]', 'captcha', 'response', accessData);
                _this.success = _this.handleAccessData(accessData);
                observer.next(_this.success);
                observer.complete();
            });
        });
    };
    AuthApi.prototype.getToken = function () {
        console.log('[AuthApi]', 'getToken');
        return this.accessToken;
    };
    AuthApi.prototype.updateToken = function () {
        var _this = this;
        console.log('[AuthApi]', 'updateToken');
        return new Observable(function (observer) {
            _this.authService.refresh(_this.refreshToken).subscribe(function (accessToken) {
                console.log('[AuthApi]', 'updateToken', 'response', accessToken);
                _this.accessToken = accessToken;
                observer.next(accessToken);
                observer.complete();
            });
        });
    };
    AuthApi.prototype.authTypes = function () {
        console.log('[AuthApi]', 'authTypes');
        return this.authService.authTypes;
    };
    AuthApi.prototype.initLogin = function () {
        var _this = this;
        console.log('[AuthApi]', 'initLogin', this.type);
        return new Observable(function (observer) {
            switch (_this.type) {
                case _this.authTypes().KEYCLOAK:
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
    AuthApi.prototype.login = function (secret) {
        var _this = this;
        console.log('[AuthApi]', 'login', secret);
        return new Observable(function (observer) {
            switch (_this.type) {
                case _this.authTypes().KEYCLOAK:
                    var keycloakParams = {
                        state: 'auth',
                        code: secret
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
    AuthApi.ctorParameters = function () { return [
        { type: AuthService },
        { type: undefined, decorators: [{ type: Inject, args: [DCS_AUTH_CONFIG,] }] }
    ]; };
    AuthApi.ɵprov = ɵɵdefineInjectable({ factory: function AuthApi_Factory() { return new AuthApi(ɵɵinject(AuthService), ɵɵinject(DCS_AUTH_CONFIG)); }, token: AuthApi, providedIn: "root" });
    AuthApi = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(DCS_AUTH_CONFIG))
    ], AuthApi);
    return AuthApi;
}());

/*
 * Public API Surface of auth-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthApi, AuthComponent, AuthModule, DCS_AUTH_CONFIG, ɵ0, AuthService as ɵa };
//# sourceMappingURL=auth-lib.js.map
