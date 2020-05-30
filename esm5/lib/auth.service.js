import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { DCS_AUTH_CONFIG } from './auth-lib.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var AUTH_TYPE = 'auth-type';
var AuthType;
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
        if (params.state && params.uri) {
            return this.post(params);
        }
        else {
            throw new Error('Mandatory parameters state or uri missing');
        }
    };
    AuthService.prototype.signicat = function (params) {
        console.log('[AuthService]', 'signicat');
        if (params.state && params.uri) {
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
    AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(DCS_AUTH_CONFIG)); };
    AuthService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
    return AuthService;
}());
export { AuthService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                type: Inject,
                args: [DCS_AUTH_CONFIG]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXV0aC1saWIvIiwic291cmNlcyI6WyJsaWIvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sbUJBQW1CLENBQUM7OztBQUVoRSxJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFFOUIsSUFBSyxRQUtKO0FBTEQsV0FBSyxRQUFRO0lBQ1gsaUNBQXFCLENBQUE7SUFDckIsaUNBQXFCLENBQUE7SUFDckIseUJBQWEsQ0FBQTtJQUNiLCtCQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFMSSxRQUFRLEtBQVIsUUFBUSxRQUtaO0FBUUQ7SUFLRSxxQkFBc0IsVUFBc0IsRUFBbUMsTUFBa0I7UUFBM0UsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFtQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQy9GLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sMkJBQUssR0FBWixVQUFhLE1BQVc7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFnQixNQUFXO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUs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QzNDLElBQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN4RixHQUFHLENBQUMsVUFBQyxRQUFvQjtZQUN2QixPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELHNCQUFJLGlDQUFRO2FBQVo7WUFDRSxPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFhLENBQUM7UUFDdkQsQ0FBQzthQUVELFVBQWEsSUFBYztZQUN6QixjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7T0FKQTswRUFoRlUsV0FBVywwQ0FFZ0MsZUFBZTt1REFGMUQsV0FBVyxXQUFYLFdBQVcsbUJBRlYsTUFBTTtzQkF0QnBCO0NBNkdDLEFBeEZELElBd0ZDO1NBckZZLFdBQVc7a0RBQVgsV0FBVztjQUh2QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQUdnRCxNQUFNO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEQ1NfQVVUSF9DT05GSUcsIEF1dGhDb25maWcgfSBmcm9tICcuL2F1dGgtbGliLm1vZHVsZSc7XG5cbmNvbnN0IEFVVEhfVFlQRSA9ICdhdXRoLXR5cGUnO1xuXG5lbnVtIEF1dGhUeXBlIHtcbiAgS0VZQ0xPQUsgPSAna2V5Y2xvYWsnLFxuICBTSUdOSUNBVCA9ICdzaWduaWNhdCcsXG4gIFZFUEEgPSAndmVwYScsXG4gIENBUFRDSEEgPSAnY2FwdGNoYSdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBY2Nlc3NEYXRhIHtcbiAgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIHJlZnJlc2hUb2tlbj86IHN0cmluZztcbiAgcmVkaXJlY3Q/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIEBJbmplY3QoRENTX0FVVEhfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogQXV0aENvbmZpZykge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ2NvbnN0cnVjdG9yJywgY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBvYXV0aChwYXJhbXM6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ29hdXRoJyk7XG4gICAgaWYgKHBhcmFtcy5zdGF0ZSAmJiBwYXJhbXMudXJpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFuZGF0b3J5IHBhcmFtZXRlcnMgc3RhdGUgb3IgdXJpIG1pc3NpbmcnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2lnbmljYXQocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlPEFjY2Vzc0RhdGE+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhTZXJ2aWNlXScsICdzaWduaWNhdCcpO1xuICAgIGlmIChwYXJhbXMuc3RhdGUgJiYgcGFyYW1zLnVyaSkge1xuICAgICAgdGhpcy5hdXRoVHlwZSA9IEF1dGhUeXBlLlNJR05JQ0FUO1xuICAgICAgY29uc3QgYm9keSA9IHsgY29kZTogcGFyYW1zLmNvZGUsIHVyaTogcGFyYW1zLnVyaSwgc3RhdGU6IHBhcmFtcy5zdGF0ZSB9O1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYW5kYXRvcnkgcGFyYW1ldGVycyBzdGF0ZSBvciB1cmkgbWlzc2luZycpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB2ZXBhKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxBY2Nlc3NEYXRhPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAndmVwYScpO1xuICAgIGlmIChwYXJhbXMuczAgJiYgcGFyYW1zLnMxICYmIHBhcmFtcy5zMiAmJiBwYXJhbXMuczMgJiYgcGFyYW1zLnN0YXRlKSB7XG4gICAgICB0aGlzLmF1dGhUeXBlID0gQXV0aFR5cGUuVkVQQTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYW5kYXRvcnkgcGFyYW1ldGVycyBzMCwgczEsIHMyLCBzMyBvciBzdGF0ZSBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGtleWNsb2FrKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxBY2Nlc3NEYXRhPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAna2V5Y2xvYWsnKTtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5zdGF0ZSkge1xuICAgICAgcGFyYW1zLnVyaSA9IHRoaXMuY29uZmlnLnJlZGlyZWN0VXJsO1xuICAgICAgdGhpcy5hdXRoVHlwZSA9IEF1dGhUeXBlLktFWUNMT0FLO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHVyaSBvciBzdGF0ZSBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNhcHRjaGEocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlPEFjY2Vzc0RhdGE+IHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhTZXJ2aWNlXScsICdjYXB0Y2hhJyk7XG4gICAgaWYgKHBhcmFtcy50b2tlbikge1xuICAgICAgdGhpcy5hdXRoVHlwZSA9IEF1dGhUeXBlLkNBUFRDSEE7XG4gICAgICBjb25zdCB0b2tlbiA9IHBhcmFtcy50b2tlbjtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoeyB0b2tlbiB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYW5kYXRvcnkgcGFyYW1ldGVycyB0b2tlbiBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZnJlc2godG9rZW46IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAncmVmcmVzaCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAgfSB9O1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdDxBY2Nlc3NEYXRhPih0aGlzLmNvbmZpZy5yZWZyZXNoVXJsLCBudWxsLCBvcHRpb25zKS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogQWNjZXNzRGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UgJiYgcmVzcG9uc2UuYWNjZXNzVG9rZW47XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHBvc3QoYm9keTogYW55KTogT2JzZXJ2YWJsZTxBY2Nlc3NEYXRhPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAncG9zdCcsIGJvZHkpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHsgJ1gtQXV0aC1UeXBlJzogdGhpcy5hdXRoVHlwZSB9IH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PEFjY2Vzc0RhdGE+KHRoaXMuY29uZmlnLmF1dGhlbnRpY2F0aW9uVXJsLCBib2R5LCBvcHRpb25zKS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZTogQWNjZXNzRGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXQgYXV0aFR5cGUoKSB7XG4gICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oQVVUSF9UWVBFKSBhcyBBdXRoVHlwZTtcbiAgfVxuXG4gIHNldCBhdXRoVHlwZSh0eXBlOiBBdXRoVHlwZSkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oQVVUSF9UWVBFLCB0eXBlKTtcbiAgfVxufVxuIl19