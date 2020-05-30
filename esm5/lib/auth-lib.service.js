import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
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
    AuthApi.ɵfac = function AuthApi_Factory(t) { return new (t || AuthApi)(i0.ɵɵinject(i1.AuthService)); };
    AuthApi.ɵprov = i0.ɵɵdefineInjectable({ token: AuthApi, factory: AuthApi.ɵfac, providedIn: 'root' });
    return AuthApi;
}());
export { AuthApi };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuthApi, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.AuthService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F1dGgtbGliLyIsInNvdXJjZXMiOlsibGliL2F1dGgtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQVksTUFBTSxNQUFNLENBQUM7OztBQUdqRSxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDNUIsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBRTFCO0lBa0VFLGlCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBL0RELHNCQUFJLDRCQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzthQUNELFVBQVksT0FBZ0I7WUFDMUIsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQy9CLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO29CQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7UUFDSCxDQUFDOzs7T0FSQTtJQVdELHNCQUFJLGlDQUFZO2FBQWhCO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4RTtZQUNELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FB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QUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxrQ0FBZ0IsR0FBeEIsVUFBeUIsVUFBc0I7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1NBQzdDO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELE9BQU8sT0FBTyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRixDQUFDO2tFQXZLVSxPQUFPO21EQUFQLE9BQU8sV0FBUCxPQUFPLG1CQUZOLE1BQU07a0JBUnBCO0NBa0xDLEFBM0tELElBMktDO1NBeEtZLE9BQU87a0RBQVAsT0FBTztjQUhuQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UsIEFjY2Vzc0RhdGEgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5cbmNvbnN0IEtFWUNMT0FLID0gJ0tFWUNMT0FLJztcbmNvbnN0IENBUFRDSEEgPSAnQ0FQVENIQSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhBcGkge1xuXG4gIHByaXZhdGUgc3VjY2Vzc1ZhcmlhYmxlOiBib29sZWFuO1xuICBnZXQgc3VjY2VzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdWNjZXNzVmFyaWFibGU7XG4gIH1cbiAgc2V0IHN1Y2Nlc3Moc3VjY2VzczogYm9vbGVhbikge1xuICAgIGlmIChzdWNjZXNzICE9PSB0aGlzLnN1Y2Nlc3NWYXJpYWJsZSkge1xuICAgICAgdGhpcy5zdWNjZXNzVmFyaWFibGUgPSBzdWNjZXNzO1xuICAgICAgaWYgKHRoaXMud2F0Y2hTdWNjZXNzVmFyaWFibGUpIHtcbiAgICAgICAgdGhpcy53YXRjaFN1Y2Nlc3MubmV4dCh0aGlzLnN1Y2Nlc3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hTdWNjZXNzVmFyaWFibGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcbiAgZ2V0IHdhdGNoU3VjY2VzcygpIHtcbiAgICBpZiAoIXRoaXMud2F0Y2hTdWNjZXNzVmFyaWFibGUpIHtcbiAgICAgIHRoaXMud2F0Y2hTdWNjZXNzVmFyaWFibGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMuc3VjY2Vzcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndhdGNoU3VjY2Vzc1ZhcmlhYmxlO1xuICB9XG5cbiAgcHJpdmF0ZSBhY2Nlc3NUb2tlblZhcmlhYmxlOiBzdHJpbmc7XG4gIGdldCBhY2Nlc3NUb2tlbigpIHtcbiAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5WYXJpYWJsZSkge1xuICAgICAgdGhpcy5hY2Nlc3NUb2tlblZhcmlhYmxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWNjZXNzVG9rZW5WYXJpYWJsZTtcbiAgfVxuICBzZXQgYWNjZXNzVG9rZW4odG9rZW46IHN0cmluZykge1xuICAgIHRoaXMuYWNjZXNzVG9rZW5WYXJpYWJsZSA9IHRva2VuO1xuICAgIGlmICh0aGlzLmFjY2Vzc1Rva2VuVmFyaWFibGUpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc1Rva2VuJywgdGhpcy5hY2Nlc3NUb2tlblZhcmlhYmxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzVG9rZW4nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hUb2tlblZhcmlhYmxlOiBzdHJpbmc7XG4gIGdldCByZWZyZXNoVG9rZW4oKSB7XG4gICAgaWYgKCF0aGlzLnJlZnJlc2hUb2tlblZhcmlhYmxlKSB7XG4gICAgICB0aGlzLnJlZnJlc2hUb2tlblZhcmlhYmxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncmVmcmVzaFRva2VuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlZnJlc2hUb2tlblZhcmlhYmxlO1xuICB9XG4gIHNldCByZWZyZXNoVG9rZW4odG9rZW46IHN0cmluZykge1xuICAgIHRoaXMucmVmcmVzaFRva2VuVmFyaWFibGUgPSB0b2tlbjtcbiAgICBpZiAodGhpcy5yZWZyZXNoVG9rZW5WYXJpYWJsZSkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmVmcmVzaFRva2VuJywgdGhpcy5yZWZyZXNoVG9rZW5WYXJpYWJsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlZnJlc2hUb2tlbicpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHlwZVZhcmlhYmxlOiBzdHJpbmc7XG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGVWYXJpYWJsZTtcbiAgfVxuICBzZXQgdHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnR5cGVWYXJpYWJsZSA9IHR5cGU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnY29uc3RydWN0b3InKTtcbiAgICB0aGlzLnR5cGUgPSBLRVlDTE9BSztcbiAgfVxuXG4gIGluaXQodXJsUGFyYW1zPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdpbml0Jyk7XG4gICAgLy8gY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBjb2RlID0gdXJsUGFyYW1zICYmIG5ldyBVUkxTZWFyY2hQYXJhbXModXJsUGFyYW1zKS5nZXQoJ2NvZGUnKTtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ1VSTCBQQVJBTVMnLCB1cmxQYXJhbXMsICdDT0RFJywgY29kZSk7XG4gICAgaWYgKHRoaXMudHlwZSAhPT0gQ0FQVENIQSAmJiBjb2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2RlTG9naW4oY29kZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IENBUFRDSEEpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhcHRjaGFMb2dpbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0TG9naW4oKTtcbiAgICB9XG4gIH1cblxuICBpbml0TG9naW4oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdpbml0TG9naW4nKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBLRVlDTE9BSzpcbiAgICAgICAgICBjb25zdCBrZXljbG9ha1BhcmFtcyA9IHtcbiAgICAgICAgICAgIHN0YXRlOiAnaW5pdCdcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uua2V5Y2xvYWsoa2V5Y2xvYWtQYXJhbXMpLnN1YnNjcmliZSgoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdrZXljbG9haycsICdyZXNwb25zZScsIGFjY2Vzc0RhdGEpO1xuICAgICAgICAgICAgaWYgKGFjY2Vzc0RhdGEgJiYgYWNjZXNzRGF0YS5yZWRpcmVjdCkge1xuICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gYWNjZXNzRGF0YS5yZWRpcmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoQm9vbGVhbihhY2Nlc3NEYXRhICYmIGFjY2Vzc0RhdGEucmVkaXJlY3QpKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3Vua25vd24gdHlwZScpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQobnVsbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvZGVMb2dpbihzZWN1cmVDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NvZGVMb2dpbicpO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICBjYXNlIEtFWUNMT0FLOlxuICAgICAgICAgIGNvbnN0IGtleWNsb2FrUGFyYW1zID0ge1xuICAgICAgICAgICAgc3RhdGU6ICdpbml0JyxcbiAgICAgICAgICAgIGNvZGU6IHNlY3VyZUNvZGVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uua2V5Y2xvYWsoa2V5Y2xvYWtQYXJhbXMpLnN1YnNjcmliZSgoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdrZXljbG9haycsICdyZXNwb25zZScsIGFjY2Vzc0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5zdWNjZXNzID0gdGhpcy5oYW5kbGVBY2Nlc3NEYXRhKGFjY2Vzc0RhdGEpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAndW5rbm93biB0eXBlJyk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChudWxsKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2FwdGNoYUxvZ2luKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnY2FwdGNoYUxvZ2luJyk7XG4gICAgcmV0dXJuIG9mKG51bGwpO1xuICB9XG5cbiAgZ2V0VG9rZW4oKTogc3RyaW5nIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2dldFRva2VuJyk7XG4gICAgcmV0dXJuIHRoaXMuYWNjZXNzVG9rZW47XG4gIH1cblxuICB1cGRhdGVUb2tlbigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAndXBkYXRlVG9rZW4nKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlZnJlc2godGhpcy5yZWZyZXNoVG9rZW4pLnN1YnNjcmliZSgoYWNjZXNzVG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3VwZGF0ZVRva2VuJywgJ3Jlc3BvbnNlJywgYWNjZXNzVG9rZW4pO1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XG4gICAgICAgIG9ic2VydmVyLm5leHQoYWNjZXNzVG9rZW4pO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUFjY2Vzc0RhdGEoYWNjZXNzRGF0YTogQWNjZXNzRGF0YSk6IGJvb2xlYW4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnaGFuZGxlQWNjZXNzRGF0YScsIGFjY2Vzc0RhdGEpO1xuICAgIGlmIChhY2Nlc3NEYXRhKSB7XG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gYWNjZXNzRGF0YS5hY2Nlc3NUb2tlbjtcbiAgICAgIHRoaXMucmVmcmVzaFRva2VuID0gYWNjZXNzRGF0YS5yZWZyZXNoVG9rZW47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBudWxsO1xuICAgICAgdGhpcy5yZWZyZXNoVG9rZW4gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gQm9vbGVhbihhY2Nlc3NEYXRhICYmIGFjY2Vzc0RhdGEuYWNjZXNzVG9rZW4gJiYgYWNjZXNzRGF0YS5yZWZyZXNoVG9rZW4pO1xuICB9XG59XG4iXX0=