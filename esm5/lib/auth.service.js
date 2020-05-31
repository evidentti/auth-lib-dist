import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DCS_AUTH_CONFIG } from './auth-lib.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./auth-lib.module";
var AUTH_TYPE = 'auth-type';
export var AuthType;
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
    Object.defineProperty(AuthService.prototype, "authTypes", {
        get: function () {
            return AuthType;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [DCS_AUTH_CONFIG,] }] }
    ]; };
    AuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.DCS_AUTH_CONFIG)); }, token: AuthService, providedIn: "root" });
    AuthService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __param(1, Inject(DCS_AUTH_CONFIG))
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXV0aC1saWIvIiwic291cmNlcyI6WyJsaWIvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUVoRSxJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFFOUIsTUFBTSxDQUFOLElBQVksUUFLWDtBQUxELFdBQVksUUFBUTtJQUNsQixpQ0FBcUIsQ0FBQTtJQUNyQixpQ0FBcUIsQ0FBQTtJQUNyQix5QkFBYSxDQUFBO0lBQ2IsK0JBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUxXLFFBQVEsS0FBUixRQUFRLFFBS25CO0FBV0Q7SUFFRSxxQkFBc0IsVUFBc0IsRUFBbUMsTUFBa0I7UUFBM0UsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFtQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQy9GLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsMkJBQUssR0FBTCxVQUFNLE1BQVc7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFD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UUFBUSxDQUFDLFdBQVcsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVPLDBCQUFJLEdBQVosVUFBYSxJQUFTO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFNLE9BQU8sR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztRQUM5RCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDeEYsR0FBRyxDQUFDLFVBQUMsUUFBb0I7WUFDdkIsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxzQkFBSSxpQ0FBUTthQUFaO1lBQ0UsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBYSxDQUFDO1FBQ3ZELENBQUM7YUFFRCxVQUFhLElBQWM7WUFDekIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSxrQ0FBUzthQUFiO1lBQ0UsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7O2dCQXhGaUMsVUFBVTtnREFBRyxNQUFNLFNBQUMsZUFBZTs7O0lBRjFELFdBQVc7UUFIdkIsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztRQUcrQyxXQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtPQUYzRCxXQUFXLENBMkZ2QjtzQkFuSEQ7Q0FtSEMsQUEzRkQsSUEyRkM7U0EzRlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERDU19BVVRIX0NPTkZJRywgQXV0aENvbmZpZyB9IGZyb20gJy4vYXV0aC1saWIubW9kdWxlJztcblxuY29uc3QgQVVUSF9UWVBFID0gJ2F1dGgtdHlwZSc7XG5cbmV4cG9ydCBlbnVtIEF1dGhUeXBlIHtcbiAgS0VZQ0xPQUsgPSAna2V5Y2xvYWsnLFxuICBTSUdOSUNBVCA9ICdzaWduaWNhdCcsXG4gIFZFUEEgPSAndmVwYScsXG4gIENBUFRDSEEgPSAnY2FwdGNoYSdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBY2Nlc3NEYXRhIHtcbiAgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIHJlZnJlc2hUb2tlbj86IHN0cmluZztcbiAgcmVkaXJlY3Q/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIEBJbmplY3QoRENTX0FVVEhfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogQXV0aENvbmZpZykge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ2NvbnN0cnVjdG9yJywgY29uZmlnKTtcbiAgfVxuXG4gIG9hdXRoKHBhcmFtczogYW55KSB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAnb2F1dGgnKTtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5zdGF0ZSkge1xuICAgICAgcGFyYW1zLnVyaSA9IHRoaXMuY29uZmlnLnJlZGlyZWN0VXJsO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHN0YXRlIG9yIHVyaSBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgc2lnbmljYXQocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlPEFjY2Vzc0RhdGE+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhTZXJ2aWNlXScsICdzaWduaWNhdCcpO1xuICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnN0YXRlKSB7XG4gICAgICBwYXJhbXMudXJpID0gdGhpcy5jb25maWcucmVkaXJlY3RVcmw7XG4gICAgICB0aGlzLmF1dGhUeXBlID0gQXV0aFR5cGUuU0lHTklDQVQ7XG4gICAgICBjb25zdCBib2R5ID0geyBjb2RlOiBwYXJhbXMuY29kZSwgdXJpOiBwYXJhbXMudXJpLCBzdGF0ZTogcGFyYW1zLnN0YXRlIH07XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGJvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHN0YXRlIG9yIHVyaSBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgdmVwYShwYXJhbXM6IGFueSk6IE9ic2VydmFibGU8QWNjZXNzRGF0YT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ3ZlcGEnKTtcbiAgICBpZiAocGFyYW1zLnMwICYmIHBhcmFtcy5zMSAmJiBwYXJhbXMuczIgJiYgcGFyYW1zLnMzICYmIHBhcmFtcy5zdGF0ZSkge1xuICAgICAgdGhpcy5hdXRoVHlwZSA9IEF1dGhUeXBlLlZFUEE7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFuZGF0b3J5IHBhcmFtZXRlcnMgczAsIHMxLCBzMiwgczMgb3Igc3RhdGUgbWlzc2luZycpO1xuICAgIH1cbiAgfVxuXG4gIGtleWNsb2FrKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxBY2Nlc3NEYXRhPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAna2V5Y2xvYWsnKTtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5zdGF0ZSkge1xuICAgICAgcGFyYW1zLnVyaSA9IHRoaXMuY29uZmlnLnJlZGlyZWN0VXJsO1xuICAgICAgdGhpcy5hdXRoVHlwZSA9IEF1dGhUeXBlLktFWUNMT0FLO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHVyaSBvciBzdGF0ZSBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgY2FwdGNoYShwYXJhbXM6IGFueSk6IE9ic2VydmFibGU8QWNjZXNzRGF0YT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ2NhcHRjaGEnKTtcbiAgICBpZiAocGFyYW1zLnRva2VuKSB7XG4gICAgICB0aGlzLmF1dGhUeXBlID0gQXV0aFR5cGUuQ0FQVENIQTtcbiAgICAgIGNvbnN0IHRva2VuID0gcGFyYW1zLnRva2VuO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdCh7IHRva2VuIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHRva2VuIG1pc3NpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZWZyZXNoKHRva2VuOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ3JlZnJlc2gnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0gfTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3Q8QWNjZXNzRGF0YT4odGhpcy5jb25maWcucmVmcmVzaFVybCwgbnVsbCwgb3B0aW9ucykucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlICYmIHJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3N0KGJvZHk6IGFueSk6IE9ic2VydmFibGU8QWNjZXNzRGF0YT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ3Bvc3QnLCBib2R5KTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB7ICdYLUF1dGgtVHlwZSc6IHRoaXMuYXV0aFR5cGUgfSB9O1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdDxBY2Nlc3NEYXRhPih0aGlzLmNvbmZpZy5hdXRoZW50aWNhdGlvblVybCwgYm9keSwgb3B0aW9ucykucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0IGF1dGhUeXBlKCkge1xuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKEFVVEhfVFlQRSkgYXMgQXV0aFR5cGU7XG4gIH1cblxuICBzZXQgYXV0aFR5cGUodHlwZTogQXV0aFR5cGUpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKEFVVEhfVFlQRSwgdHlwZSk7XG4gIH1cblxuICBnZXQgYXV0aFR5cGVzKCkge1xuICAgIHJldHVybiBBdXRoVHlwZTtcbiAgfVxufVxuIl19