import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AuthService, AccessData } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "./auth.service";
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
        { type: AuthService }
    ]; };
    AuthApi.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthApi_Factory() { return new AuthApi(i0.ɵɵinject(i1.AuthService)); }, token: AuthApi, providedIn: "root" });
    AuthApi = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], AuthApi);
    return AuthApi;
}());
export { AuthApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F1dGgtbGliLyIsInNvdXJjZXMiOlsibGliL2F1dGgtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUV6RCxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDNUIsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBSzFCO0lBK0RFLGlCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBL0RELHNCQUFJLDRCQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzthQUNELFVBQVksT0FBZ0I7WUFDMUIsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQy9CLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO29CQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7UUFDSCxDQUFDOzs7T0FSQTtJQVdELHNCQUFJLGlDQUFZO2FBQWhCO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxP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LElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0IsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0NBQWdCLEdBQXhCLFVBQXlCLFVBQXNCO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztTQUM3QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFDRCxPQUFPLE9BQU8sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFdBQVcsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7Z0JBeEdnQyxXQUFXOzs7SUEvRGpDLE9BQU87UUFIbkIsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLE9BQU8sQ0F3S25CO2tCQWxMRDtDQWtMQyxBQXhLRCxJQXdLQztTQXhLWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBBY2Nlc3NEYXRhIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG5jb25zdCBLRVlDTE9BSyA9ICdLRVlDTE9BSyc7XG5jb25zdCBDQVBUQ0hBID0gJ0NBUFRDSEEnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBdXRoQXBpIHtcblxuICBwcml2YXRlIHN1Y2Nlc3NWYXJpYWJsZTogYm9vbGVhbjtcbiAgZ2V0IHN1Y2Nlc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3VjY2Vzc1ZhcmlhYmxlO1xuICB9XG4gIHNldCBzdWNjZXNzKHN1Y2Nlc3M6IGJvb2xlYW4pIHtcbiAgICBpZiAoc3VjY2VzcyAhPT0gdGhpcy5zdWNjZXNzVmFyaWFibGUpIHtcbiAgICAgIHRoaXMuc3VjY2Vzc1ZhcmlhYmxlID0gc3VjY2VzcztcbiAgICAgIGlmICh0aGlzLndhdGNoU3VjY2Vzc1ZhcmlhYmxlKSB7XG4gICAgICAgIHRoaXMud2F0Y2hTdWNjZXNzLm5leHQodGhpcy5zdWNjZXNzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHdhdGNoU3VjY2Vzc1ZhcmlhYmxlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG4gIGdldCB3YXRjaFN1Y2Nlc3MoKSB7XG4gICAgaWYgKCF0aGlzLndhdGNoU3VjY2Vzc1ZhcmlhYmxlKSB7XG4gICAgICB0aGlzLndhdGNoU3VjY2Vzc1ZhcmlhYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLnN1Y2Nlc3MpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy53YXRjaFN1Y2Nlc3NWYXJpYWJsZTtcbiAgfVxuXG4gIHByaXZhdGUgYWNjZXNzVG9rZW5WYXJpYWJsZTogc3RyaW5nO1xuICBnZXQgYWNjZXNzVG9rZW4oKSB7XG4gICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuVmFyaWFibGUpIHtcbiAgICAgIHRoaXMuYWNjZXNzVG9rZW5WYXJpYWJsZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFjY2Vzc1Rva2VuVmFyaWFibGU7XG4gIH1cbiAgc2V0IGFjY2Vzc1Rva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuVmFyaWFibGUgPSB0b2tlbjtcbiAgICBpZiAodGhpcy5hY2Nlc3NUb2tlblZhcmlhYmxlKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NUb2tlbicsIHRoaXMuYWNjZXNzVG9rZW5WYXJpYWJsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoVG9rZW5WYXJpYWJsZTogc3RyaW5nO1xuICBnZXQgcmVmcmVzaFRva2VuKCkge1xuICAgIGlmICghdGhpcy5yZWZyZXNoVG9rZW5WYXJpYWJsZSkge1xuICAgICAgdGhpcy5yZWZyZXNoVG9rZW5WYXJpYWJsZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3JlZnJlc2hUb2tlbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZWZyZXNoVG9rZW5WYXJpYWJsZTtcbiAgfVxuICBzZXQgcmVmcmVzaFRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlZnJlc2hUb2tlblZhcmlhYmxlID0gdG9rZW47XG4gICAgaWYgKHRoaXMucmVmcmVzaFRva2VuVmFyaWFibGUpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JlZnJlc2hUb2tlbicsIHRoaXMucmVmcmVzaFRva2VuVmFyaWFibGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdyZWZyZXNoVG9rZW4nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHR5cGVWYXJpYWJsZTogc3RyaW5nO1xuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlVmFyaWFibGU7XG4gIH1cbiAgc2V0IHR5cGUodHlwZTogc3RyaW5nKSB7XG4gICAgdGhpcy50eXBlVmFyaWFibGUgPSB0eXBlO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NvbnN0cnVjdG9yJyk7XG4gICAgdGhpcy50eXBlID0gS0VZQ0xPQUs7XG4gIH1cblxuICBpbml0KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnaW5pdCcpO1xuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgY29kZSA9IHVybFBhcmFtcy5nZXQoJ2NvZGUnKTtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ1VSTCBQQVJBTVMnLCB1cmxQYXJhbXMsICdDT0RFJywgY29kZSk7XG4gICAgaWYgKHRoaXMudHlwZSAhPT0gQ0FQVENIQSAmJiBjb2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2RlTG9naW4oY29kZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IENBUFRDSEEpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhcHRjaGFMb2dpbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0TG9naW4oKTtcbiAgICB9XG4gIH1cblxuICBpbml0TG9naW4oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdpbml0TG9naW4nKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBLRVlDTE9BSzpcbiAgICAgICAgICBjb25zdCBrZXljbG9ha1BhcmFtcyA9IHtcbiAgICAgICAgICAgIHN0YXRlOiAnaW5pdCdcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uua2V5Y2xvYWsoa2V5Y2xvYWtQYXJhbXMpLnN1YnNjcmliZSgoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdrZXljbG9haycsICdyZXNwb25zZScsIGFjY2Vzc0RhdGEpO1xuICAgICAgICAgICAgaWYgKGFjY2Vzc0RhdGEgJiYgYWNjZXNzRGF0YS5yZWRpcmVjdCkge1xuICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gYWNjZXNzRGF0YS5yZWRpcmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoQm9vbGVhbihhY2Nlc3NEYXRhICYmIGFjY2Vzc0RhdGEucmVkaXJlY3QpKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3Vua25vd24gdHlwZScpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQobnVsbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvZGVMb2dpbihzZWN1cmVDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NvZGVMb2dpbicpO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICBjYXNlIEtFWUNMT0FLOlxuICAgICAgICAgIGNvbnN0IGtleWNsb2FrUGFyYW1zID0ge1xuICAgICAgICAgICAgc3RhdGU6ICdpbml0JyxcbiAgICAgICAgICAgIGNvZGU6IHNlY3VyZUNvZGVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uua2V5Y2xvYWsoa2V5Y2xvYWtQYXJhbXMpLnN1YnNjcmliZSgoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdrZXljbG9haycsICdyZXNwb25zZScsIGFjY2Vzc0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5zdWNjZXNzID0gdGhpcy5oYW5kbGVBY2Nlc3NEYXRhKGFjY2Vzc0RhdGEpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAndW5rbm93biB0eXBlJyk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChudWxsKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2FwdGNoYUxvZ2luKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnY2FwdGNoYUxvZ2luJyk7XG4gICAgcmV0dXJuIG9mKG51bGwpO1xuICB9XG5cbiAgZ2V0VG9rZW4oKTogc3RyaW5nIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2dldFRva2VuJyk7XG4gICAgcmV0dXJuIHRoaXMuYWNjZXNzVG9rZW47XG4gIH1cblxuICB1cGRhdGVUb2tlbigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAndXBkYXRlVG9rZW4nKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlZnJlc2godGhpcy5yZWZyZXNoVG9rZW4pLnN1YnNjcmliZSgoYWNjZXNzVG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3VwZGF0ZVRva2VuJywgJ3Jlc3BvbnNlJywgYWNjZXNzVG9rZW4pO1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XG4gICAgICAgIG9ic2VydmVyLm5leHQoYWNjZXNzVG9rZW4pO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUFjY2Vzc0RhdGEoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSk6IGJvb2xlYW4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnaGFuZGxlQWNjZXNzRGF0YScsIGFjY2Vzc0RhdGEpO1xuICAgIGlmIChhY2Nlc3NEYXRhKSB7XG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gYWNjZXNzRGF0YS5hY2Nlc3NUb2tlbjtcbiAgICAgIHRoaXMucmVmcmVzaFRva2VuID0gYWNjZXNzRGF0YS5yZWZyZXNoVG9rZW47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBudWxsO1xuICAgICAgdGhpcy5yZWZyZXNoVG9rZW4gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gQm9vbGVhbihhY2Nlc3NEYXRhICYmIGFjY2Vzc0RhdGEuYWNjZXNzVG9rZW4gJiYgYWNjZXNzRGF0YS5yZWZyZXNoVG9rZW4pO1xuICB9XG59XG4iXX0=