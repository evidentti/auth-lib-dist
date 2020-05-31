import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DCS_AUTH_CONFIG } from './auth-lib.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./auth-lib.module";
var AUTH_TYPE = 'auth-type';
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
            this.authType = this.authTypes.SIGNICAT;
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
            this.authType = this.authTypes.VEPA;
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
            this.authType = this.authTypes.KEYCLOAK;
            return this.post(params);
        }
        else {
            throw new Error('Mandatory parameters uri or state missing');
        }
    };
    AuthService.prototype.captcha = function (params) {
        console.log('[AuthService]', 'captcha');
        if (params.token) {
            this.authType = this.authTypes.CAPTCHA;
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
            return {
                KEYCLOAK: 'keycloak',
                SIGNICAT: 'signicat',
                VEPA: 'vepa',
                CAPTCHA: 'captcha'
            };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXV0aC1saWIvIiwic291cmNlcyI6WyJsaWIvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQXFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUFFdkYsSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBSzlCO0lBRUUscUJBQXNCLFVBQXNCLEVBQW1DLE1BQWtCO1FBQTNFLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBbUMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUMvRixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELDJCQUFLLEdBQUwsVUFBTSxNQUFXO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUMxQixNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxNQUFXO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFL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QyxlQUFlLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN4RixHQUFHLENBQUMsVUFBQyxRQUFvQjtZQUN2QixPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELHNCQUFJLGlDQUFRO2FBQVo7WUFDRSxPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsQ0FBQzthQUVELFVBQWEsSUFBWTtZQUN2QixjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLGtDQUFTO2FBQWI7WUFDRSxPQUFPO2dCQUNMLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLFNBQVM7YUFDbkIsQ0FBQztRQUNKLENBQUM7OztPQUFBOztnQkE3RmlDLFVBQVU7Z0RBQUcsTUFBTSxTQUFDLGVBQWU7OztJQUYxRCxXQUFXO1FBSHZCLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7UUFHK0MsV0FBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7T0FGM0QsV0FBVyxDQWdHdkI7c0JBM0dEO0NBMkdDLEFBaEdELElBZ0dDO1NBaEdZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEQ1NfQVVUSF9DT05GSUcsIEF1dGhDb25maWcsIEFjY2Vzc0RhdGEsIEF1dGhUeXBlcyB9IGZyb20gJy4vYXV0aC1saWIubW9kdWxlJztcblxuY29uc3QgQVVUSF9UWVBFID0gJ2F1dGgtdHlwZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIEBJbmplY3QoRENTX0FVVEhfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogQXV0aENvbmZpZykge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ2NvbnN0cnVjdG9yJywgY29uZmlnKTtcbiAgfVxuXG4gIG9hdXRoKHBhcmFtczogYW55KSB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAnb2F1dGgnKTtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5zdGF0ZSkge1xuICAgICAgcGFyYW1zLnVyaSA9IHRoaXMuY29uZmlnLnJlZGlyZWN0VXJsO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHN0YXRlIG9yIHVyaSBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgc2lnbmljYXQocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlPEFjY2Vzc0RhdGE+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhTZXJ2aWNlXScsICdzaWduaWNhdCcpO1xuICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnN0YXRlKSB7XG4gICAgICBwYXJhbXMudXJpID0gdGhpcy5jb25maWcucmVkaXJlY3RVcmw7XG4gICAgICB0aGlzLmF1dGhUeXBlID0gdGhpcy5hdXRoVHlwZXMuU0lHTklDQVQ7XG4gICAgICBjb25zdCBib2R5ID0geyBjb2RlOiBwYXJhbXMuY29kZSwgdXJpOiBwYXJhbXMudXJpLCBzdGF0ZTogcGFyYW1zLnN0YXRlIH07XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGJvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHN0YXRlIG9yIHVyaSBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgdmVwYShwYXJhbXM6IGFueSk6IE9ic2VydmFibGU8QWNjZXNzRGF0YT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ3ZlcGEnKTtcbiAgICBpZiAocGFyYW1zLnMwICYmIHBhcmFtcy5zMSAmJiBwYXJhbXMuczIgJiYgcGFyYW1zLnMzICYmIHBhcmFtcy5zdGF0ZSkge1xuICAgICAgdGhpcy5hdXRoVHlwZSA9IHRoaXMuYXV0aFR5cGVzLlZFUEE7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFuZGF0b3J5IHBhcmFtZXRlcnMgczAsIHMxLCBzMiwgczMgb3Igc3RhdGUgbWlzc2luZycpO1xuICAgIH1cbiAgfVxuXG4gIGtleWNsb2FrKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxBY2Nlc3NEYXRhPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAna2V5Y2xvYWsnKTtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5zdGF0ZSkge1xuICAgICAgcGFyYW1zLnVyaSA9IHRoaXMuY29uZmlnLnJlZGlyZWN0VXJsO1xuICAgICAgdGhpcy5hdXRoVHlwZSA9IHRoaXMuYXV0aFR5cGVzLktFWUNMT0FLO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHVyaSBvciBzdGF0ZSBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgY2FwdGNoYShwYXJhbXM6IGFueSk6IE9ic2VydmFibGU8QWNjZXNzRGF0YT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ2NhcHRjaGEnKTtcbiAgICBpZiAocGFyYW1zLnRva2VuKSB7XG4gICAgICB0aGlzLmF1dGhUeXBlID0gdGhpcy5hdXRoVHlwZXMuQ0FQVENIQTtcbiAgICAgIGNvbnN0IHRva2VuID0gcGFyYW1zLnRva2VuO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdCh7IHRva2VuIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHRva2VuIG1pc3NpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZWZyZXNoKHRva2VuOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ3JlZnJlc2gnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0gfTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3Q8QWNjZXNzRGF0YT4odGhpcy5jb25maWcucmVmcmVzaFVybCwgbnVsbCwgb3B0aW9ucykucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlICYmIHJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3N0KGJvZHk6IGFueSk6IE9ic2VydmFibGU8QWNjZXNzRGF0YT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ3Bvc3QnLCBib2R5KTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB7ICdYLUF1dGgtVHlwZSc6IHRoaXMuYXV0aFR5cGUgfSB9O1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdDxBY2Nlc3NEYXRhPih0aGlzLmNvbmZpZy5hdXRoZW50aWNhdGlvblVybCwgYm9keSwgb3B0aW9ucykucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0IGF1dGhUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oQVVUSF9UWVBFKTtcbiAgfVxuXG4gIHNldCBhdXRoVHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKEFVVEhfVFlQRSwgdHlwZSk7XG4gIH1cblxuICBnZXQgYXV0aFR5cGVzKCk6IEF1dGhUeXBlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIEtFWUNMT0FLOiAna2V5Y2xvYWsnLFxuICAgICAgU0lHTklDQVQ6ICdzaWduaWNhdCcsXG4gICAgICBWRVBBOiAndmVwYScsXG4gICAgICBDQVBUQ0hBOiAnY2FwdGNoYSdcbiAgICB9O1xuICB9XG59XG4iXX0=