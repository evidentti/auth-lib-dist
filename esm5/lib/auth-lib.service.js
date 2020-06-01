import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { DCS_AUTH_CONFIG } from './auth-lib.module';
import * as i0 from "@angular/core";
import * as i1 from "./auth.service";
import * as i2 from "./auth-lib.module";
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
    AuthApi.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthApi_Factory() { return new AuthApi(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.DCS_AUTH_CONFIG)); }, token: AuthApi, providedIn: "root" });
    AuthApi = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(DCS_AUTH_CONFIG))
    ], AuthApi);
    return AuthApi;
}());
export { AuthApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F1dGgtbGliLyIsInNvdXJjZXMiOlsibGliL2F1dGgtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFxQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBS3ZGO0lBNERFLGlCQUFvQixXQUF3QixFQUFtQyxNQUFrQjtRQUE3RSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFtQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQy9GLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDdEMsQ0FBQztJQXZERCxzQkFBSSw0QkFBTzthQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFZLE9BQWdCO1lBQzFCLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO2dCQUMxQixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7b0JBQ3pELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDdEM7YUFDRjtRQUNILENBQUM7OztPQVRBO0lBV0Qsc0JBQUksaUNBQVk7YUFBaEI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFB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QU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtPQTVEM0QsT0FBTyxDQWdMbkI7a0JBeExEO0NBd0xDLEFBaExELElBZ0xDO1NBaExZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgRENTX0FVVEhfQ09ORklHLCBBdXRoQ29uZmlnLCBBY2Nlc3NEYXRhLCBBdXRoVHlwZXMgfSBmcm9tICcuL2F1dGgtbGliLm1vZHVsZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhBcGkge1xuXG4gIHByaXZhdGUgdHlwZTogc3RyaW5nO1xuICBwcml2YXRlIHN1Y2Nlc3NWYXI6IGJvb2xlYW47XG4gIHByaXZhdGUgd2F0Y2hTdWNjZXNzVmFyOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG4gIHByaXZhdGUgYWNjZXNzVG9rZW5WYXI6IHN0cmluZztcbiAgcHJpdmF0ZSByZWZyZXNoVG9rZW5WYXI6IHN0cmluZztcblxuICBnZXQgc3VjY2VzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdWNjZXNzVmFyO1xuICB9XG5cbiAgc2V0IHN1Y2Nlc3Moc3VjY2VzczogYm9vbGVhbikge1xuICAgIGlmIChzdWNjZXNzICE9PSB0aGlzLnN1Y2Nlc3NWYXIpIHtcbiAgICAgIHRoaXMuc3VjY2Vzc1ZhciA9IHN1Y2Nlc3M7XG4gICAgICBpZiAodGhpcy53YXRjaFN1Y2Nlc3NWYXIgJiYgdGhpcy5zdWNjZXNzVmFyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy53YXRjaFN1Y2Nlc3MubmV4dCh0aGlzLnN1Y2Nlc3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCB3YXRjaFN1Y2Nlc3MoKSB7XG4gICAgaWYgKCF0aGlzLndhdGNoU3VjY2Vzc1Zhcikge1xuICAgICAgdGhpcy53YXRjaFN1Y2Nlc3NWYXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuc3VjY2Vzcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndhdGNoU3VjY2Vzc1ZhcjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGFjY2Vzc1Rva2VuKCkge1xuICAgIGlmICghdGhpcy5hY2Nlc3NUb2tlblZhcikge1xuICAgICAgdGhpcy5hY2Nlc3NUb2tlblZhciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFjY2Vzc1Rva2VuVmFyO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXQgYWNjZXNzVG9rZW4odG9rZW46IHN0cmluZykge1xuICAgIHRoaXMuYWNjZXNzVG9rZW5WYXIgPSB0b2tlbjtcbiAgICBpZiAodGhpcy5hY2Nlc3NUb2tlblZhcikge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnYWNjZXNzVG9rZW4nLCB0aGlzLmFjY2Vzc1Rva2VuVmFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzVG9rZW4nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCByZWZyZXNoVG9rZW4oKSB7XG4gICAgaWYgKCF0aGlzLnJlZnJlc2hUb2tlblZhcikge1xuICAgICAgdGhpcy5yZWZyZXNoVG9rZW5WYXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyZWZyZXNoVG9rZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaFRva2VuVmFyO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXQgcmVmcmVzaFRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlZnJlc2hUb2tlblZhciA9IHRva2VuO1xuICAgIGlmICh0aGlzLnJlZnJlc2hUb2tlblZhcikge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmVmcmVzaFRva2VuJywgdGhpcy5yZWZyZXNoVG9rZW5WYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdyZWZyZXNoVG9rZW4nKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgQEluamVjdChEQ1NfQVVUSF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBBdXRoQ29uZmlnKSB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdjb25zdHJ1Y3RvcicpO1xuICAgIHRoaXMudHlwZSA9IHRoaXMuY29uZmlnLmRlZmF1bHRUeXBlO1xuICB9XG5cbiAgaW5pdCh1cmxQYXJhbXM/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2luaXQnLCB1cmxQYXJhbXMpO1xuICAgIGNvbnN0IGNvZGUgPSB1cmxQYXJhbXMgJiYgbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmxQYXJhbXMpLmdldCgnY29kZScpO1xuICAgIGlmIChjb2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2dpbihjb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdExvZ2luKCk7XG4gICAgfVxuICB9XG5cbiAgY2FwdGNoYUxvZ2luKHNlY3JldDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdjYXB0Y2hhTG9naW4nLCBzZWNyZXQpO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBjb25zdCBjYXB0Y2hhUGFyYW1zID0ge1xuICAgICAgICB0b2tlbjogc2VjcmV0XG4gICAgICB9O1xuICAgICAgdGhpcy5hdXRoU2VydmljZS5jYXB0Y2hhKGNhcHRjaGFQYXJhbXMpLnN1YnNjcmliZSgoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NhcHRjaGEnLCAncmVzcG9uc2UnLCBhY2Nlc3NEYXRhKTtcbiAgICAgICAgdGhpcy5zdWNjZXNzID0gdGhpcy5oYW5kbGVBY2Nlc3NEYXRhKGFjY2Vzc0RhdGEpO1xuICAgICAgICBvYnNlcnZlci5uZXh0KHRoaXMuc3VjY2Vzcyk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRva2VuKCk6IHN0cmluZyB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdnZXRUb2tlbicpO1xuICAgIHJldHVybiB0aGlzLmFjY2Vzc1Rva2VuO1xuICB9XG5cbiAgdXBkYXRlVG9rZW4oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3VwZGF0ZVRva2VuJyk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgdGhpcy5hdXRoU2VydmljZS5yZWZyZXNoKHRoaXMucmVmcmVzaFRva2VuKS5zdWJzY3JpYmUoKGFjY2Vzc1Rva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICd1cGRhdGVUb2tlbicsICdyZXNwb25zZScsIGFjY2Vzc1Rva2VuKTtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2VuO1xuICAgICAgICBvYnNlcnZlci5uZXh0KGFjY2Vzc1Rva2VuKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXV0aFR5cGVzKCk6IEF1dGhUeXBlcyB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdhdXRoVHlwZXMnKTtcbiAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5hdXRoVHlwZXM7XG4gIH1cblxuICBwcml2YXRlIGluaXRMb2dpbigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2luaXRMb2dpbicsIHRoaXMudHlwZSk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgdGhpcy5hdXRoVHlwZXMoKS5LRVlDTE9BSzpcbiAgICAgICAgICBjb25zdCBrZXljbG9ha1BhcmFtcyA9IHtcbiAgICAgICAgICAgIHN0YXRlOiAnaW5pdCdcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uua2V5Y2xvYWsoa2V5Y2xvYWtQYXJhbXMpLnN1YnNjcmliZSgoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdrZXljbG9haycsICdyZXNwb25zZScsIGFjY2Vzc0RhdGEpO1xuICAgICAgICAgICAgaWYgKGFjY2Vzc0RhdGEgJiYgYWNjZXNzRGF0YS5yZWRpcmVjdCkge1xuICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gYWNjZXNzRGF0YS5yZWRpcmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoQm9vbGVhbihhY2Nlc3NEYXRhICYmIGFjY2Vzc0RhdGEucmVkaXJlY3QpKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3Vua25vd24gdHlwZScpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQobnVsbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbG9naW4oc2VjcmV0OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2xvZ2luJywgc2VjcmV0KTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgY2FzZSB0aGlzLmF1dGhUeXBlcygpLktFWUNMT0FLOlxuICAgICAgICAgIGNvbnN0IGtleWNsb2FrUGFyYW1zID0ge1xuICAgICAgICAgICAgc3RhdGU6ICdhdXRoJyxcbiAgICAgICAgICAgIGNvZGU6IHNlY3JldFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5rZXljbG9hayhrZXljbG9ha1BhcmFtcykuc3Vic2NyaWJlKChhY2Nlc3NEYXRhOiBBY2Nlc3NEYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2tleWNsb2FrJywgJ3Jlc3BvbnNlJywgYWNjZXNzRGF0YSk7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MgPSB0aGlzLmhhbmRsZUFjY2Vzc0RhdGEoYWNjZXNzRGF0YSk7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRoaXMuc3VjY2Vzcyk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICd1bmtub3duIHR5cGUnKTtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KG51bGwpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUFjY2Vzc0RhdGEoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSk6IGJvb2xlYW4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnaGFuZGxlQWNjZXNzRGF0YScsIGFjY2Vzc0RhdGEpO1xuICAgIGlmIChhY2Nlc3NEYXRhKSB7XG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gYWNjZXNzRGF0YS5hY2Nlc3NUb2tlbjtcbiAgICAgIHRoaXMucmVmcmVzaFRva2VuID0gYWNjZXNzRGF0YS5yZWZyZXNoVG9rZW47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBudWxsO1xuICAgICAgdGhpcy5yZWZyZXNoVG9rZW4gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gQm9vbGVhbihhY2Nlc3NEYXRhICYmIGFjY2Vzc0RhdGEuYWNjZXNzVG9rZW4gJiYgYWNjZXNzRGF0YS5yZWZyZXNoVG9rZW4pO1xuICB9XG59XG4iXX0=