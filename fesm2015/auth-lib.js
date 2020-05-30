import { __decorate, __param } from 'tslib';
import { Component, InjectionToken, NgModule, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

let AuthComponent = class AuthComponent {
    constructor() { }
    ngOnInit() {
    }
};
AuthComponent = __decorate([
    Component({
        selector: 'lib-auth-lib',
        template: `
    <p>
      auth-lib works!
    </p>
  `
    })
], AuthComponent);

const DCS_AUTH_CONFIG = new InjectionToken('Authentication Configuration');
const ɵ0 = { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' };
let AuthModule = class AuthModule {
};
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

const AUTH_TYPE = 'auth-type';
var AuthType;
(function (AuthType) {
    AuthType["KEYCLOAK"] = "keycloak";
    AuthType["SIGNICAT"] = "signicat";
    AuthType["VEPA"] = "vepa";
    AuthType["CAPTCHA"] = "captcha";
})(AuthType || (AuthType = {}));
let AuthService = class AuthService {
    constructor(httpClient, config) {
        this.httpClient = httpClient;
        this.config = config;
        console.log('[AuthService]', 'constructor', config);
    }
    oauth(params) {
        console.log('[AuthService]', 'oauth');
        if (params.state && params.uri) {
            return this.post(params);
        }
        else {
            throw new Error('Mandatory parameters state or uri missing');
        }
    }
    signicat(params) {
        console.log('[AuthService]', 'signicat');
        if (params.state && params.uri) {
            this.authType = AuthType.SIGNICAT;
            const body = { code: params.code, uri: params.uri, state: params.state };
            return this.post(body);
        }
        else {
            throw new Error('Mandatory parameters state or uri missing');
        }
    }
    vepa(params) {
        console.log('[AuthService]', 'vepa');
        if (params.s0 && params.s1 && params.s2 && params.s3 && params.state) {
            this.authType = AuthType.VEPA;
            return this.post(params);
        }
        else {
            throw new Error('Mandatory parameters s0, s1, s2, s3 or state missing');
        }
    }
    keycloak(params) {
        console.log('[AuthService]', 'keycloak');
        if (params && params.state) {
            params.uri = this.config.redirectUrl;
            this.authType = AuthType.KEYCLOAK;
            return this.post(params);
        }
        else {
            throw new Error('Mandatory parameters uri or state missing');
        }
    }
    captcha(params) {
        console.log('[AuthService]', 'captcha');
        if (params.token) {
            this.authType = AuthType.CAPTCHA;
            const token = params.token;
            return this.post({ token });
        }
        else {
            throw new Error('Mandatory parameters token missing');
        }
    }
    refresh(token) {
        console.log('[AuthService]', 'refresh');
        const options = { headers: { Authorization: `Bearer ${token}` } };
        return this.httpClient.post(this.config.refreshUrl, null, options).pipe(map((response) => {
            return response && response.accessToken;
        }));
    }
    post(body) {
        console.log('[AuthService]', 'post', body);
        const options = { headers: { 'X-Auth-Type': this.authType } };
        return this.httpClient.post(this.config.authenticationUrl, body, options).pipe(map((response) => {
            return response;
        }));
    }
    get authType() {
        return sessionStorage.getItem(AUTH_TYPE);
    }
    set authType(type) {
        sessionStorage.setItem(AUTH_TYPE, type);
    }
};
AuthService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [DCS_AUTH_CONFIG,] }] }
];
AuthService.ɵprov = ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(ɵɵinject(HttpClient), ɵɵinject(DCS_AUTH_CONFIG)); }, token: AuthService, providedIn: "root" });
AuthService = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __param(1, Inject(DCS_AUTH_CONFIG))
], AuthService);

const KEYCLOAK = 'KEYCLOAK';
const CAPTCHA = 'CAPTCHA';
let AuthApi = class AuthApi {
    constructor(authService) {
        this.authService = authService;
        console.log('[AuthApi]', 'constructor');
        this.type = KEYCLOAK;
    }
    get success() {
        return this.successVariable;
    }
    set success(success) {
        if (success !== this.successVariable) {
            this.successVariable = success;
            if (this.watchSuccessVariable) {
                this.watchSuccess.next(this.success);
            }
        }
    }
    get watchSuccess() {
        if (!this.watchSuccessVariable) {
            this.watchSuccessVariable = new BehaviorSubject(this.success);
        }
        return this.watchSuccessVariable;
    }
    get accessToken() {
        if (!this.accessTokenVariable) {
            this.accessTokenVariable = sessionStorage.getItem('accessToken');
        }
        return this.accessTokenVariable;
    }
    set accessToken(token) {
        this.accessTokenVariable = token;
        if (this.accessTokenVariable) {
            sessionStorage.setItem('accessToken', this.accessTokenVariable);
        }
        else {
            sessionStorage.removeItem('accessToken');
        }
    }
    get refreshToken() {
        if (!this.refreshTokenVariable) {
            this.refreshTokenVariable = sessionStorage.getItem('refreshToken');
        }
        return this.refreshTokenVariable;
    }
    set refreshToken(token) {
        this.refreshTokenVariable = token;
        if (this.refreshTokenVariable) {
            sessionStorage.setItem('refreshToken', this.refreshTokenVariable);
        }
        else {
            sessionStorage.removeItem('refreshToken');
        }
    }
    get type() {
        return this.typeVariable;
    }
    set type(type) {
        this.typeVariable = type;
    }
    init() {
        console.log('[AuthApi]', 'init');
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
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
    }
    initLogin() {
        console.log('[AuthApi]', 'initLogin');
        return new Observable((observer) => {
            switch (this.type) {
                case KEYCLOAK:
                    const keycloakParams = {
                        state: 'init'
                    };
                    this.authService.keycloak(keycloakParams).subscribe((accessData) => {
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
    }
    codeLogin(secureCode) {
        console.log('[AuthApi]', 'codeLogin');
        return new Observable((observer) => {
            switch (this.type) {
                case KEYCLOAK:
                    const keycloakParams = {
                        state: 'init',
                        code: secureCode
                    };
                    this.authService.keycloak(keycloakParams).subscribe((accessData) => {
                        console.log('[AuthApi]', 'keycloak', 'response', accessData);
                        this.success = this.handleAccessData(accessData);
                        observer.next(this.success);
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
    }
    captchaLogin() {
        console.log('[AuthApi]', 'captchaLogin');
        return of(null);
    }
    getToken() {
        console.log('[AuthApi]', 'getToken');
        return this.accessToken;
    }
    updateToken() {
        console.log('[AuthApi]', 'updateToken');
        return new Observable((observer) => {
            this.authService.refresh(this.refreshToken).subscribe((accessToken) => {
                console.log('[AuthApi]', 'updateToken', 'response', accessToken);
                this.accessToken = accessToken;
                observer.next(accessToken);
                observer.complete();
            });
        });
    }
    handleAccessData(accessData) {
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
    }
};
AuthApi.ctorParameters = () => [
    { type: AuthService }
];
AuthApi.ɵprov = ɵɵdefineInjectable({ factory: function AuthApi_Factory() { return new AuthApi(ɵɵinject(AuthService)); }, token: AuthApi, providedIn: "root" });
AuthApi = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthApi);

/*
 * Public API Surface of auth-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthApi, AuthComponent, AuthModule, DCS_AUTH_CONFIG, ɵ0, AuthService as ɵa };
//# sourceMappingURL=auth-lib.js.map
