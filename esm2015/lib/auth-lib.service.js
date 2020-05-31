import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { DCS_AUTH_CONFIG } from './auth-lib.module';
import * as i0 from "@angular/core";
import * as i1 from "./auth.service";
import * as i2 from "./auth-lib.module";
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
            if (this.watchSuccessVar) {
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
    init(type, urlParams, captchaToken) {
        console.log('[AuthApi]', 'init', type, urlParams);
        if (type) {
            this.type = type;
        }
        const code = urlParams && new URLSearchParams(urlParams).get('code');
        console.log('[AuthApi]', 'CODE', code);
        if (this.type !== this.authTypes().CAPTCHA && code) {
            return this.codeLogin(code);
        }
        else if (this.type === this.authTypes().CAPTCHA) {
            return this.captchaLogin(captchaToken);
        }
        else {
            return this.initLogin();
        }
    }
    initLogin() {
        console.log('[AuthApi]', 'initLogin');
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
    codeLogin(secureCode) {
        console.log('[AuthApi]', 'codeLogin');
        return new Observable((observer) => {
            switch (this.type) {
                case this.authTypes().KEYCLOAK:
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
AuthApi.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthApi_Factory() { return new AuthApi(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.DCS_AUTH_CONFIG)); }, token: AuthApi, providedIn: "root" });
AuthApi = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(DCS_AUTH_CONFIG))
], AuthApi);
export { AuthApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F1dGgtbGliLyIsInNvdXJjZXMiOlsibGliL2F1dGgtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFxQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBS3ZGLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUE0RGxCLFlBQW9CLFdBQXdCLEVBQW1DLE1BQWtCO1FBQTdFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQW1DLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDL0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN0QyxDQUFDO0lBdkRELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsT0FBZ0I7UUFDMUIsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztZQUMxQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN0QztTQUNGO0lBQ0gsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxl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QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELE9BQU8sT0FBTyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRixDQUFDO0NBQ0YsQ0FBQTs7WUExSGtDLFdBQVc7NENBQUcsTUFBTSxTQUFDLGVBQWU7OztBQTVEMUQsT0FBTztJQUhuQixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0lBNkQrQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtHQTVEM0QsT0FBTyxDQXNMbkI7U0F0TFksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBEQ1NfQVVUSF9DT05GSUcsIEF1dGhDb25maWcsIEFjY2Vzc0RhdGEsIEF1dGhUeXBlcyB9IGZyb20gJy4vYXV0aC1saWIubW9kdWxlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aEFwaSB7XG5cbiAgcHJpdmF0ZSB0eXBlOiBzdHJpbmc7XG4gIHByaXZhdGUgc3VjY2Vzc1ZhcjogYm9vbGVhbjtcbiAgcHJpdmF0ZSB3YXRjaFN1Y2Nlc3NWYXI6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcbiAgcHJpdmF0ZSBhY2Nlc3NUb2tlblZhcjogc3RyaW5nO1xuICBwcml2YXRlIHJlZnJlc2hUb2tlblZhcjogc3RyaW5nO1xuXG4gIGdldCBzdWNjZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN1Y2Nlc3NWYXI7XG4gIH1cblxuICBzZXQgc3VjY2VzcyhzdWNjZXNzOiBib29sZWFuKSB7XG4gICAgaWYgKHN1Y2Nlc3MgIT09IHRoaXMuc3VjY2Vzc1Zhcikge1xuICAgICAgdGhpcy5zdWNjZXNzVmFyID0gc3VjY2VzcztcbiAgICAgIGlmICh0aGlzLndhdGNoU3VjY2Vzc1Zhcikge1xuICAgICAgICB0aGlzLndhdGNoU3VjY2Vzcy5uZXh0KHRoaXMuc3VjY2Vzcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IHdhdGNoU3VjY2VzcygpIHtcbiAgICBpZiAoIXRoaXMud2F0Y2hTdWNjZXNzVmFyKSB7XG4gICAgICB0aGlzLndhdGNoU3VjY2Vzc1ZhciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5zdWNjZXNzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2F0Y2hTdWNjZXNzVmFyO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgYWNjZXNzVG9rZW4oKSB7XG4gICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuVmFyKSB7XG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuVmFyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWNjZXNzVG9rZW5WYXI7XG4gIH1cblxuICBwcml2YXRlIHNldCBhY2Nlc3NUb2tlbih0b2tlbjogc3RyaW5nKSB7XG4gICAgdGhpcy5hY2Nlc3NUb2tlblZhciA9IHRva2VuO1xuICAgIGlmICh0aGlzLmFjY2Vzc1Rva2VuVmFyKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NUb2tlbicsIHRoaXMuYWNjZXNzVG9rZW5WYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NUb2tlbicpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJlZnJlc2hUb2tlbigpIHtcbiAgICBpZiAoIXRoaXMucmVmcmVzaFRva2VuVmFyKSB7XG4gICAgICB0aGlzLnJlZnJlc2hUb2tlblZhciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3JlZnJlc2hUb2tlbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZWZyZXNoVG9rZW5WYXI7XG4gIH1cblxuICBwcml2YXRlIHNldCByZWZyZXNoVG9rZW4odG9rZW46IHN0cmluZykge1xuICAgIHRoaXMucmVmcmVzaFRva2VuVmFyID0gdG9rZW47XG4gICAgaWYgKHRoaXMucmVmcmVzaFRva2VuVmFyKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZWZyZXNoVG9rZW4nLCB0aGlzLnJlZnJlc2hUb2tlblZhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlZnJlc2hUb2tlbicpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBASW5qZWN0KERDU19BVVRIX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IEF1dGhDb25maWcpIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NvbnN0cnVjdG9yJyk7XG4gICAgdGhpcy50eXBlID0gdGhpcy5jb25maWcuZGVmYXVsdFR5cGU7XG4gIH1cblxuICBpbml0KHR5cGU/OiBzdHJpbmcsIHVybFBhcmFtcz86IHN0cmluZywgY2FwdGNoYVRva2VuPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdpbml0JywgdHlwZSwgdXJsUGFyYW1zKTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgY29uc3QgY29kZSA9IHVybFBhcmFtcyAmJiBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybFBhcmFtcykuZ2V0KCdjb2RlJyk7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdDT0RFJywgY29kZSk7XG4gICAgaWYgKHRoaXMudHlwZSAhPT0gdGhpcy5hdXRoVHlwZXMoKS5DQVBUQ0hBICYmIGNvZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvZGVMb2dpbihjb2RlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gdGhpcy5hdXRoVHlwZXMoKS5DQVBUQ0hBKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYXB0Y2hhTG9naW4oY2FwdGNoYVRva2VuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdExvZ2luKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdExvZ2luKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnaW5pdExvZ2luJyk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgdGhpcy5hdXRoVHlwZXMoKS5LRVlDTE9BSzpcbiAgICAgICAgICBjb25zdCBrZXljbG9ha1BhcmFtcyA9IHtcbiAgICAgICAgICAgIHN0YXRlOiAnaW5pdCdcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uua2V5Y2xvYWsoa2V5Y2xvYWtQYXJhbXMpLnN1YnNjcmliZSgoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdrZXljbG9haycsICdyZXNwb25zZScsIGFjY2Vzc0RhdGEpO1xuICAgICAgICAgICAgaWYgKGFjY2Vzc0RhdGEgJiYgYWNjZXNzRGF0YS5yZWRpcmVjdCkge1xuICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gYWNjZXNzRGF0YS5yZWRpcmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoQm9vbGVhbihhY2Nlc3NEYXRhICYmIGFjY2Vzc0RhdGEucmVkaXJlY3QpKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3Vua25vd24gdHlwZScpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQobnVsbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvZGVMb2dpbihzZWN1cmVDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NvZGVMb2dpbicpO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICBjYXNlIHRoaXMuYXV0aFR5cGVzKCkuS0VZQ0xPQUs6XG4gICAgICAgICAgY29uc3Qga2V5Y2xvYWtQYXJhbXMgPSB7XG4gICAgICAgICAgICBzdGF0ZTogJ2luaXQnLFxuICAgICAgICAgICAgY29kZTogc2VjdXJlQ29kZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5rZXljbG9hayhrZXljbG9ha1BhcmFtcykuc3Vic2NyaWJlKChhY2Nlc3NEYXRhOiBBY2Nlc3NEYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2tleWNsb2FrJywgJ3Jlc3BvbnNlJywgYWNjZXNzRGF0YSk7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MgPSB0aGlzLmhhbmRsZUFjY2Vzc0RhdGEoYWNjZXNzRGF0YSk7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRoaXMuc3VjY2Vzcyk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICd1bmtub3duIHR5cGUnKTtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KG51bGwpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjYXB0Y2hhTG9naW4oc2VjcmV0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NhcHRjaGFMb2dpbicsIHNlY3JldCk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGNvbnN0IGNhcHRjaGFQYXJhbXMgPSB7XG4gICAgICAgIHRva2VuOiBzZWNyZXRcbiAgICAgIH07XG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLmNhcHRjaGEoY2FwdGNoYVBhcmFtcykuc3Vic2NyaWJlKChhY2Nlc3NEYXRhOiBBY2Nlc3NEYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnY2FwdGNoYScsICdyZXNwb25zZScsIGFjY2Vzc0RhdGEpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MgPSB0aGlzLmhhbmRsZUFjY2Vzc0RhdGEoYWNjZXNzRGF0YSk7XG4gICAgICAgIG9ic2VydmVyLm5leHQodGhpcy5zdWNjZXNzKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9rZW4oKTogc3RyaW5nIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2dldFRva2VuJyk7XG4gICAgcmV0dXJuIHRoaXMuYWNjZXNzVG9rZW47XG4gIH1cblxuICB1cGRhdGVUb2tlbigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAndXBkYXRlVG9rZW4nKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlZnJlc2godGhpcy5yZWZyZXNoVG9rZW4pLnN1YnNjcmliZSgoYWNjZXNzVG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3VwZGF0ZVRva2VuJywgJ3Jlc3BvbnNlJywgYWNjZXNzVG9rZW4pO1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XG4gICAgICAgIG9ic2VydmVyLm5leHQoYWNjZXNzVG9rZW4pO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhdXRoVHlwZXMoKTogQXV0aFR5cGVzIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2F1dGhUeXBlcycpO1xuICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhUeXBlcztcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlQWNjZXNzRGF0YShhY2Nlc3NEYXRhOiBBY2Nlc3NEYXRhKTogYm9vbGVhbiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdoYW5kbGVBY2Nlc3NEYXRhJywgYWNjZXNzRGF0YSk7XG4gICAgaWYgKGFjY2Vzc0RhdGEpIHtcbiAgICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBhY2Nlc3NEYXRhLmFjY2Vzc1Rva2VuO1xuICAgICAgdGhpcy5yZWZyZXNoVG9rZW4gPSBhY2Nlc3NEYXRhLnJlZnJlc2hUb2tlbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IG51bGw7XG4gICAgICB0aGlzLnJlZnJlc2hUb2tlbiA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBCb29sZWFuKGFjY2Vzc0RhdGEgJiYgYWNjZXNzRGF0YS5hY2Nlc3NUb2tlbiAmJiBhY2Nlc3NEYXRhLnJlZnJlc2hUb2tlbik7XG4gIH1cbn1cbiJdfQ==