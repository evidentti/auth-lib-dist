import { __decorate, __param } from 'tslib';
import { Component, InjectionToken, NgModule, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
var ɵ0 = { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' };
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
                this.watchSuccessVariable = new BehaviorSubject(this.success);
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
    AuthApi.prototype.init = function () {
        console.log('[AuthApi]', 'init');
        var urlParams = new URLSearchParams(window.location.search);
        var code = urlParams.get('code');
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
        return new Observable(function (observer) {
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
        return new Observable(function (observer) {
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
        return of(null);
    };
    AuthApi.prototype.getToken = function () {
        console.log('[AuthApi]', 'getToken');
        return null;
    };
    AuthApi.prototype.updateToken = function () {
        console.log('[AuthApi]', 'updateToken');
        return of(null);
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
    AuthApi.prototype.first = function () {
        console.log('[AuthApi]', 'first');
        return 'first';
    };
    AuthApi.ctorParameters = function () { return [
        { type: AuthService }
    ]; };
    AuthApi.ɵprov = ɵɵdefineInjectable({ factory: function AuthApi_Factory() { return new AuthApi(ɵɵinject(AuthService)); }, token: AuthApi, providedIn: "root" });
    AuthApi = __decorate([
        Injectable({
            providedIn: 'root'
        })
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
