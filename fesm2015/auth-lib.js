import { __decorate, __param } from 'tslib';
import { Component, InjectionToken, NgModule, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
const ɵ0 = { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect', defaultType: 'keycloak' };
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
let AuthService = class AuthService {
    constructor(httpClient, config) {
        this.httpClient = httpClient;
        this.config = config;
        console.log('[AuthService]', 'constructor', config);
    }
    oauth(params) {
        console.log('[AuthService]', 'oauth');
        if (params && params.state) {
            params.uri = this.config.redirectUrl;
            return this.post(params);
        }
        else {
            throw new Error('Mandatory parameters state or uri missing');
        }
    }
    signicat(params) {
        console.log('[AuthService]', 'signicat');
        if (params && params.state) {
            params.uri = this.config.redirectUrl;
            this.authType = this.authTypes.SIGNICAT;
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
            this.authType = this.authTypes.VEPA;
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
            this.authType = this.authTypes.KEYCLOAK;
            return this.post(params);
        }
        else {
            throw new Error('Mandatory parameters uri or state missing');
        }
    }
    captcha(params) {
        console.log('[AuthService]', 'captcha');
        if (params.token) {
            this.authType = this.authTypes.CAPTCHA;
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
    get authTypes() {
        return {
            KEYCLOAK: 'keycloak',
            SIGNICAT: 'signicat',
            VEPA: 'vepa',
            CAPTCHA: 'captcha'
        };
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

let AuthApi = class AuthApi {
    constructor(authService, config) {
        this.authService = authService;
        this.config = config;
        console.log('[AuthApi]', 'constructor');
        this.type = this.config.defaultType;
    }
    get success() {
        return this.successVar;
    }
    set success(success) {
        if (success !== this.successVar) {
            this.successVar = success;
            if (this.watchSuccessVar && this.successVar !== undefined) {
                this.watchSuccess.next(this.success);
            }
        }
    }
    get watchSuccess() {
        if (!this.watchSuccessVar) {
            this.watchSuccessVar = new BehaviorSubject(this.success);
        }
        return this.watchSuccessVar;
    }
    get accessToken() {
        if (!this.accessTokenVar) {
            this.accessTokenVar = sessionStorage.getItem('accessToken');
        }
        return this.accessTokenVar;
    }
    set accessToken(token) {
        this.accessTokenVar = token;
        if (this.accessTokenVar) {
            sessionStorage.setItem('accessToken', this.accessTokenVar);
        }
        else {
            sessionStorage.removeItem('accessToken');
        }
    }
    get refreshToken() {
        if (!this.refreshTokenVar) {
            this.refreshTokenVar = sessionStorage.getItem('refreshToken');
        }
        return this.refreshTokenVar;
    }
    set refreshToken(token) {
        this.refreshTokenVar = token;
        if (this.refreshTokenVar) {
            sessionStorage.setItem('refreshToken', this.refreshTokenVar);
        }
        else {
            sessionStorage.removeItem('refreshToken');
        }
    }
    init(urlParams) {
        console.log('[AuthApi]', 'init', urlParams);
        const code = urlParams && new URLSearchParams(urlParams).get('code');
        if (code) {
            return this.login(code);
        }
        else {
            return this.initLogin();
        }
    }
    captchaLogin(secret) {
        console.log('[AuthApi]', 'captchaLogin', secret);
        return new Observable((observer) => {
            const captchaParams = {
                token: secret
            };
            this.authService.captcha(captchaParams).subscribe((accessData) => {
                console.log('[AuthApi]', 'captcha', 'response', accessData);
                this.success = this.handleAccessData(accessData);
                observer.next(this.success);
                observer.complete();
            });
        });
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
    authTypes() {
        console.log('[AuthApi]', 'authTypes');
        return this.authService.authTypes;
    }
    initLogin() {
        console.log('[AuthApi]', 'initLogin', this.type);
        return new Observable((observer) => {
            switch (this.type) {
                case this.authTypes().KEYCLOAK:
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
    login(secret) {
        console.log('[AuthApi]', 'login', secret);
        return new Observable((observer) => {
            switch (this.type) {
                case this.authTypes().KEYCLOAK:
                    const keycloakParams = {
                        state: 'auth',
                        code: secret
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
    { type: AuthService },
    { type: undefined, decorators: [{ type: Inject, args: [DCS_AUTH_CONFIG,] }] }
];
AuthApi.ɵprov = ɵɵdefineInjectable({ factory: function AuthApi_Factory() { return new AuthApi(ɵɵinject(AuthService), ɵɵinject(DCS_AUTH_CONFIG)); }, token: AuthApi, providedIn: "root" });
AuthApi = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(DCS_AUTH_CONFIG))
], AuthApi);

/*
 * Public API Surface of auth-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthApi, AuthComponent, AuthModule, DCS_AUTH_CONFIG, ɵ0, AuthService as ɵa };
//# sourceMappingURL=auth-lib.js.map
