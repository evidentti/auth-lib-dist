import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AuthService, AuthType, AccessData } from './auth.service';
import * as i0 from "@angular/core";
import * as i1 from "./auth.service";
var AuthApi = /** @class */ (function () {
    function AuthApi(authService) {
        this.authService = authService;
        console.log('[AuthApi]', 'constructor');
        this.type = AuthType.KEYCLOAK;
    }
    Object.defineProperty(AuthApi.prototype, "success", {
        get: function () {
            return this.successVar;
        },
        set: function (success) {
            if (success !== this.successVar) {
                this.successVar = success;
                if (this.watchSuccessVar) {
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
    AuthApi.prototype.init = function (type, urlParams) {
        console.log('[AuthApi]', 'init', type, urlParams);
        var code = urlParams && new URLSearchParams(urlParams).get('code');
        console.log('[AuthApi]', 'CODE', code);
        if (this.type !== AuthType.CAPTCHA && code) {
            return this.codeLogin(code);
        }
        else if (this.type === AuthType.CAPTCHA) {
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
                case AuthType.KEYCLOAK:
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
                case AuthType.KEYCLOAK:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F1dGgtbGliLyIsInNvdXJjZXMiOlsibGliL2F1dGgtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFLbkU7SUE0REUsaUJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUNoQyxDQUFDO0lBdkRELHNCQUFJLDRCQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQVksT0FBZ0I7WUFDMUIsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7Z0JBQzFCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtvQkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN0QzthQUNGO1FBQ0gsQ0FBQzs7O09BVEE7SUFXRCxzQkFBSSxpQ0FBWTthQUFoQjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuRTtZQUNELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FB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LEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1NBQzdDO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELE9BQU8sT0FBTyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRixDQUFDOztnQkF2R2dDLFdBQVc7OztJQTVEakMsT0FBTztRQUhuQixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO09BQ1csT0FBTyxDQW9LbkI7a0JBM0tEO0NBMktDLEFBcEtELElBb0tDO1NBcEtZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UsIEF1dGhUeXBlLCBBY2Nlc3NEYXRhIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBdXRoQXBpIHtcblxuICBwcml2YXRlIHR5cGU6IHN0cmluZztcbiAgcHJpdmF0ZSBzdWNjZXNzVmFyOiBib29sZWFuO1xuICBwcml2YXRlIHdhdGNoU3VjY2Vzc1ZhcjogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuICBwcml2YXRlIGFjY2Vzc1Rva2VuVmFyOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVmcmVzaFRva2VuVmFyOiBzdHJpbmc7XG5cbiAgZ2V0IHN1Y2Nlc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3VjY2Vzc1ZhcjtcbiAgfVxuXG4gIHNldCBzdWNjZXNzKHN1Y2Nlc3M6IGJvb2xlYW4pIHtcbiAgICBpZiAoc3VjY2VzcyAhPT0gdGhpcy5zdWNjZXNzVmFyKSB7XG4gICAgICB0aGlzLnN1Y2Nlc3NWYXIgPSBzdWNjZXNzO1xuICAgICAgaWYgKHRoaXMud2F0Y2hTdWNjZXNzVmFyKSB7XG4gICAgICAgIHRoaXMud2F0Y2hTdWNjZXNzLm5leHQodGhpcy5zdWNjZXNzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgd2F0Y2hTdWNjZXNzKCkge1xuICAgIGlmICghdGhpcy53YXRjaFN1Y2Nlc3NWYXIpIHtcbiAgICAgIHRoaXMud2F0Y2hTdWNjZXNzVmFyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLnN1Y2Nlc3MpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy53YXRjaFN1Y2Nlc3NWYXI7XG4gIH1cblxuICBwcml2YXRlIGdldCBhY2Nlc3NUb2tlbigpIHtcbiAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5WYXIpIHtcbiAgICAgIHRoaXMuYWNjZXNzVG9rZW5WYXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hY2Nlc3NUb2tlblZhcjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGFjY2Vzc1Rva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuVmFyID0gdG9rZW47XG4gICAgaWYgKHRoaXMuYWNjZXNzVG9rZW5WYXIpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc1Rva2VuJywgdGhpcy5hY2Nlc3NUb2tlblZhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcmVmcmVzaFRva2VuKCkge1xuICAgIGlmICghdGhpcy5yZWZyZXNoVG9rZW5WYXIpIHtcbiAgICAgIHRoaXMucmVmcmVzaFRva2VuVmFyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncmVmcmVzaFRva2VuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlZnJlc2hUb2tlblZhcjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IHJlZnJlc2hUb2tlbih0b2tlbjogc3RyaW5nKSB7XG4gICAgdGhpcy5yZWZyZXNoVG9rZW5WYXIgPSB0b2tlbjtcbiAgICBpZiAodGhpcy5yZWZyZXNoVG9rZW5WYXIpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JlZnJlc2hUb2tlbicsIHRoaXMucmVmcmVzaFRva2VuVmFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncmVmcmVzaFRva2VuJyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NvbnN0cnVjdG9yJyk7XG4gICAgdGhpcy50eXBlID0gQXV0aFR5cGUuS0VZQ0xPQUs7XG4gIH1cblxuICBpbml0KHR5cGU6IEF1dGhUeXBlLCB1cmxQYXJhbXM/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2luaXQnLCB0eXBlLCB1cmxQYXJhbXMpO1xuICAgIGNvbnN0IGNvZGUgPSB1cmxQYXJhbXMgJiYgbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmxQYXJhbXMpLmdldCgnY29kZScpO1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnQ09ERScsIGNvZGUpO1xuICAgIGlmICh0aGlzLnR5cGUgIT09IEF1dGhUeXBlLkNBUFRDSEEgJiYgY29kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29kZUxvZ2luKGNvZGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBBdXRoVHlwZS5DQVBUQ0hBKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYXB0Y2hhTG9naW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdExvZ2luKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdExvZ2luKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnaW5pdExvZ2luJyk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgQXV0aFR5cGUuS0VZQ0xPQUs6XG4gICAgICAgICAgY29uc3Qga2V5Y2xvYWtQYXJhbXMgPSB7XG4gICAgICAgICAgICBzdGF0ZTogJ2luaXQnXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmtleWNsb2FrKGtleWNsb2FrUGFyYW1zKS5zdWJzY3JpYmUoKGFjY2Vzc0RhdGE6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAna2V5Y2xvYWsnLCAncmVzcG9uc2UnLCBhY2Nlc3NEYXRhKTtcbiAgICAgICAgICAgIGlmIChhY2Nlc3NEYXRhICYmIGFjY2Vzc0RhdGEucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGFjY2Vzc0RhdGEucmVkaXJlY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KEJvb2xlYW4oYWNjZXNzRGF0YSAmJiBhY2Nlc3NEYXRhLnJlZGlyZWN0KSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICd1bmtub3duIHR5cGUnKTtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KG51bGwpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb2RlTG9naW4oc2VjdXJlQ29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdjb2RlTG9naW4nKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBBdXRoVHlwZS5LRVlDTE9BSzpcbiAgICAgICAgICBjb25zdCBrZXljbG9ha1BhcmFtcyA9IHtcbiAgICAgICAgICAgIHN0YXRlOiAnaW5pdCcsXG4gICAgICAgICAgICBjb2RlOiBzZWN1cmVDb2RlXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmtleWNsb2FrKGtleWNsb2FrUGFyYW1zKS5zdWJzY3JpYmUoKGFjY2Vzc0RhdGE6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAna2V5Y2xvYWsnLCAncmVzcG9uc2UnLCBhY2Nlc3NEYXRhKTtcbiAgICAgICAgICAgIHRoaXMuc3VjY2VzcyA9IHRoaXMuaGFuZGxlQWNjZXNzRGF0YShhY2Nlc3NEYXRhKTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQodGhpcy5zdWNjZXNzKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3Vua25vd24gdHlwZScpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQobnVsbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNhcHRjaGFMb2dpbigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NhcHRjaGFMb2dpbicpO1xuICAgIHJldHVybiBvZihudWxsKTtcbiAgfVxuXG4gIGdldFRva2VuKCk6IHN0cmluZyB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdnZXRUb2tlbicpO1xuICAgIHJldHVybiB0aGlzLmFjY2Vzc1Rva2VuO1xuICB9XG5cbiAgdXBkYXRlVG9rZW4oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3VwZGF0ZVRva2VuJyk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgdGhpcy5hdXRoU2VydmljZS5yZWZyZXNoKHRoaXMucmVmcmVzaFRva2VuKS5zdWJzY3JpYmUoKGFjY2Vzc1Rva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICd1cGRhdGVUb2tlbicsICdyZXNwb25zZScsIGFjY2Vzc1Rva2VuKTtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2VuO1xuICAgICAgICBvYnNlcnZlci5uZXh0KGFjY2Vzc1Rva2VuKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVBY2Nlc3NEYXRhKGFjY2Vzc0RhdGE6IEFjY2Vzc0RhdGEpOiBib29sZWFuIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2hhbmRsZUFjY2Vzc0RhdGEnLCBhY2Nlc3NEYXRhKTtcbiAgICBpZiAoYWNjZXNzRGF0YSkge1xuICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IGFjY2Vzc0RhdGEuYWNjZXNzVG9rZW47XG4gICAgICB0aGlzLnJlZnJlc2hUb2tlbiA9IGFjY2Vzc0RhdGEucmVmcmVzaFRva2VuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gbnVsbDtcbiAgICAgIHRoaXMucmVmcmVzaFRva2VuID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIEJvb2xlYW4oYWNjZXNzRGF0YSAmJiBhY2Nlc3NEYXRhLmFjY2Vzc1Rva2VuICYmIGFjY2Vzc0RhdGEucmVmcmVzaFRva2VuKTtcbiAgfVxufVxuIl19