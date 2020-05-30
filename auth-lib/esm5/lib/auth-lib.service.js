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
    AuthApi.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthApi_Factory() { return new AuthApi(i0.ɵɵinject(i1.AuthService)); }, token: AuthApi, providedIn: "root" });
    AuthApi = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], AuthApi);
    return AuthApi;
}());
export { AuthApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F1dGgtbGliLyIsInNvdXJjZXMiOlsibGliL2F1dGgtbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUV6RCxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDNUIsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBSzFCO0lBK0RFLGlCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBL0RELHNCQUFJLDRCQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzthQUNELFVBQVksT0FBZ0I7WUFDMUIsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQy9CLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO29CQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7UUFDSCxDQUFDOzs7T0FSQTtJQVdELHNCQUFJLGlDQUFZO2FBQWhCO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4RTtZQUNELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksZ0NBQVc7YUFBZjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xFO1lBQ0QsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDbEMsQ0FBQzthQUNELFVBQWdCLEtBQWE7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDakU7aUJBQU07Z0JBQ0wsY0FBYyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMxQztRQUNILENBQUM7OztPQVJBO0lBV0Qsc0JBQUksaUNBQVk7YUFBaEI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNwRTtZQUNELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ25DLENBQUM7YUFDRCxVQUFpQixLQUFhO1lBQzVCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFDbEMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzdCLGNBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNMLGNBQWMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDM0M7UUFDSCxDQUFDOzs7T0FSQTtJQVdELHNCQUFJLHlCQUFJO2FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQzthQUNELFVBQVMsSUFBWTtZQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDOzs7T0FIQTtJQVVELHNCQUFJLEdBQUo7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlELElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM1QjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQsMkJBQVMsR0FBVDtRQUFBLGlCQXlCQztRQXhCQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN0QyxPQUFPLElBQUksVUFBVSxDQUFDLFVBQUMsUUFBMkI7WUFDaEQsUUFBUSxLQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNqQixLQUFLLFFBQVE7b0JBQ1gsSUFBTSxjQUFjLEdBQUc7d0JBQ3JCLEtBQUssRUFBRSxNQUFNO3FCQUNkLENBQUM7b0JBQ0YsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsVUFBc0I7d0JBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQzdELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUU7NEJBQ3JDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7eUJBQzlDO3dCQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDMUQsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN0QixDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNO2dCQUVSO29CQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUN6QyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3BCLE1BQU07YUFDVDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUFTLEdBQVQsVUFBVSxVQUFrQjtRQUE1QixpQkF3QkM7UUF2QkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQTJCO1lBQ2hELFFBQVEsS0FBSSxDQUFDLElBQUksRUFBRTtnQkFDakIsS0FBSyxRQUFRO29CQUNYLElBQU0sY0FBYyxHQUFHO3dCQUNyQixLQUFLLEVBQUUsTUFBTTt3QkFDYixJQUFJLEVBQUUsVUFBVTtxQkFDakIsQ0FBQztvQkFDRixLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxVQUFzQjt3QkFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDN0QsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ2pELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM1QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3RCLENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU07Z0JBRVI7b0JBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7b0JBQ3pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDcEIsTUFBTTthQUNUO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsOEJBQVksR0FBWjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCwwQkFBUSxHQUFSO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTyxrQ0FBZ0IsR0FBeEIsVUFBeUIsVUFBc0I7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1NBQzdDO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELE9BQU8sT0FBTyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsdUJBQUssR0FBTDtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQXRHZ0MsV0FBVzs7O0lBL0RqQyxPQUFPO1FBSG5CLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxPQUFPLENBc0tuQjtrQkFoTEQ7Q0FnTEMsQUF0S0QsSUFzS0M7U0F0S1ksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBCZWhhdmlvclN1YmplY3QsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSwgQWNjZXNzRGF0YSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcblxuY29uc3QgS0VZQ0xPQUsgPSAnS0VZQ0xPQUsnO1xuY29uc3QgQ0FQVENIQSA9ICdDQVBUQ0hBJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aEFwaSB7XG5cbiAgcHJpdmF0ZSBzdWNjZXNzVmFyaWFibGU6IGJvb2xlYW47XG4gIGdldCBzdWNjZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN1Y2Nlc3NWYXJpYWJsZTtcbiAgfVxuICBzZXQgc3VjY2VzcyhzdWNjZXNzOiBib29sZWFuKSB7XG4gICAgaWYgKHN1Y2Nlc3MgIT09IHRoaXMuc3VjY2Vzc1ZhcmlhYmxlKSB7XG4gICAgICB0aGlzLnN1Y2Nlc3NWYXJpYWJsZSA9IHN1Y2Nlc3M7XG4gICAgICBpZiAodGhpcy53YXRjaFN1Y2Nlc3NWYXJpYWJsZSkge1xuICAgICAgICB0aGlzLndhdGNoU3VjY2Vzcy5uZXh0KHRoaXMuc3VjY2Vzcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB3YXRjaFN1Y2Nlc3NWYXJpYWJsZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuICBnZXQgd2F0Y2hTdWNjZXNzKCkge1xuICAgIGlmICghdGhpcy53YXRjaFN1Y2Nlc3NWYXJpYWJsZSkge1xuICAgICAgdGhpcy53YXRjaFN1Y2Nlc3NWYXJpYWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5zdWNjZXNzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2F0Y2hTdWNjZXNzVmFyaWFibGU7XG4gIH1cblxuICBwcml2YXRlIGFjY2Vzc1Rva2VuVmFyaWFibGU6IHN0cmluZztcbiAgZ2V0IGFjY2Vzc1Rva2VuKCkge1xuICAgIGlmICghdGhpcy5hY2Nlc3NUb2tlblZhcmlhYmxlKSB7XG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuVmFyaWFibGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hY2Nlc3NUb2tlblZhcmlhYmxlO1xuICB9XG4gIHNldCBhY2Nlc3NUb2tlbih0b2tlbjogc3RyaW5nKSB7XG4gICAgdGhpcy5hY2Nlc3NUb2tlblZhcmlhYmxlID0gdG9rZW47XG4gICAgaWYgKHRoaXMuYWNjZXNzVG9rZW5WYXJpYWJsZSkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnYWNjZXNzVG9rZW4nLCB0aGlzLmFjY2Vzc1Rva2VuVmFyaWFibGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NUb2tlbicpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFRva2VuVmFyaWFibGU6IHN0cmluZztcbiAgZ2V0IHJlZnJlc2hUb2tlbigpIHtcbiAgICBpZiAoIXRoaXMucmVmcmVzaFRva2VuVmFyaWFibGUpIHtcbiAgICAgIHRoaXMucmVmcmVzaFRva2VuVmFyaWFibGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyZWZyZXNoVG9rZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaFRva2VuVmFyaWFibGU7XG4gIH1cbiAgc2V0IHJlZnJlc2hUb2tlbih0b2tlbjogc3RyaW5nKSB7XG4gICAgdGhpcy5yZWZyZXNoVG9rZW5WYXJpYWJsZSA9IHRva2VuO1xuICAgIGlmICh0aGlzLnJlZnJlc2hUb2tlblZhcmlhYmxlKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZWZyZXNoVG9rZW4nLCB0aGlzLnJlZnJlc2hUb2tlblZhcmlhYmxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncmVmcmVzaFRva2VuJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0eXBlVmFyaWFibGU6IHN0cmluZztcbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZVZhcmlhYmxlO1xuICB9XG4gIHNldCB0eXBlKHR5cGU6IHN0cmluZykge1xuICAgIHRoaXMudHlwZVZhcmlhYmxlID0gdHlwZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdjb25zdHJ1Y3RvcicpO1xuICAgIHRoaXMudHlwZSA9IEtFWUNMT0FLO1xuICB9XG5cbiAgaW5pdCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2luaXQnKTtcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIGNvbnN0IGNvZGUgPSB1cmxQYXJhbXMuZ2V0KCdjb2RlJyk7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdVUkwgUEFSQU1TJywgdXJsUGFyYW1zLCAnQ09ERScsIGNvZGUpO1xuICAgIGlmICh0aGlzLnR5cGUgIT09IENBUFRDSEEgJiYgY29kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29kZUxvZ2luKGNvZGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBDQVBUQ0hBKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYXB0Y2hhTG9naW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdExvZ2luKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdExvZ2luKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAnaW5pdExvZ2luJyk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgS0VZQ0xPQUs6XG4gICAgICAgICAgY29uc3Qga2V5Y2xvYWtQYXJhbXMgPSB7XG4gICAgICAgICAgICBzdGF0ZTogJ2luaXQnXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmtleWNsb2FrKGtleWNsb2FrUGFyYW1zKS5zdWJzY3JpYmUoKGFjY2Vzc0RhdGE6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAna2V5Y2xvYWsnLCAncmVzcG9uc2UnLCBhY2Nlc3NEYXRhKTtcbiAgICAgICAgICAgIGlmIChhY2Nlc3NEYXRhICYmIGFjY2Vzc0RhdGEucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGFjY2Vzc0RhdGEucmVkaXJlY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KEJvb2xlYW4oYWNjZXNzRGF0YSAmJiBhY2Nlc3NEYXRhLnJlZGlyZWN0KSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICd1bmtub3duIHR5cGUnKTtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KG51bGwpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb2RlTG9naW4oc2VjdXJlQ29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdjb2RlTG9naW4nKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgY2FzZSBLRVlDTE9BSzpcbiAgICAgICAgICBjb25zdCBrZXljbG9ha1BhcmFtcyA9IHtcbiAgICAgICAgICAgIHN0YXRlOiAnaW5pdCcsXG4gICAgICAgICAgICBjb2RlOiBzZWN1cmVDb2RlXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmtleWNsb2FrKGtleWNsb2FrUGFyYW1zKS5zdWJzY3JpYmUoKGFjY2Vzc0RhdGE6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQXV0aEFwaV0nLCAna2V5Y2xvYWsnLCAncmVzcG9uc2UnLCBhY2Nlc3NEYXRhKTtcbiAgICAgICAgICAgIHRoaXMuc3VjY2VzcyA9IHRoaXMuaGFuZGxlQWNjZXNzRGF0YShhY2Nlc3NEYXRhKTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQodGhpcy5zdWNjZXNzKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3Vua25vd24gdHlwZScpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQobnVsbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNhcHRjaGFMb2dpbigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2NhcHRjaGFMb2dpbicpO1xuICAgIHJldHVybiBvZihudWxsKTtcbiAgfVxuXG4gIGdldFRva2VuKCk6IHN0cmluZyB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdnZXRUb2tlbicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdXBkYXRlVG9rZW4oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ3VwZGF0ZVRva2VuJyk7XG4gICAgcmV0dXJuIG9mKG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVBY2Nlc3NEYXRhKGFjY2Vzc0RhdGE6IEFjY2Vzc0RhdGEpOiBib29sZWFuIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhBcGldJywgJ2hhbmRsZUFjY2Vzc0RhdGEnLCBhY2Nlc3NEYXRhKTtcbiAgICBpZiAoYWNjZXNzRGF0YSkge1xuICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IGFjY2Vzc0RhdGEuYWNjZXNzVG9rZW47XG4gICAgICB0aGlzLnJlZnJlc2hUb2tlbiA9IGFjY2Vzc0RhdGEucmVmcmVzaFRva2VuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gbnVsbDtcbiAgICAgIHRoaXMucmVmcmVzaFRva2VuID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIEJvb2xlYW4oYWNjZXNzRGF0YSAmJiBhY2Nlc3NEYXRhLmFjY2Vzc1Rva2VuICYmIGFjY2Vzc0RhdGEucmVmcmVzaFRva2VuKTtcbiAgfVxuXG4gIGZpcnN0KCk6IHN0cmluZyB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoQXBpXScsICdmaXJzdCcpO1xuICAgIHJldHVybiAnZmlyc3QnO1xuICB9XG59XG4iXX0=