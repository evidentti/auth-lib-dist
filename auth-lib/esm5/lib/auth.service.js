import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DCS_AUTH_CONFIG } from './auth-lib.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./auth-lib.module";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXV0aC1saWIvIiwic291cmNlcyI6WyJsaWIvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUVoRSxJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFFOUIsSUFBSyxRQUtKO0FBTEQsV0FBSyxRQUFRO0lBQ1gsaUNBQXFCLENBQUE7SUFDckIsaUNBQXFCLENBQUE7SUFDckIseUJBQWEsQ0FBQTtJQUNiLCtCQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFMSSxRQUFRLEtBQVIsUUFBUSxRQUtaO0FBV0Q7SUFFRSxxQkFBc0IsVUFBc0IsRUFBbUMsTUFBa0I7UUFBM0UsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFtQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQy9GLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sMkJBQUssR0FBWixVQUFhLE1BQVc7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFnQixN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QUcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN4RixHQUFHLENBQUMsVUFBQyxRQUFvQjtZQUN2QixPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELHNCQUFJLGlDQUFRO2FBQVo7WUFDRSxPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFhLENBQUM7UUFDdkQsQ0FBQzthQUVELFVBQWEsSUFBYztZQUN6QixjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7T0FKQTs7Z0JBOUVpQyxVQUFVO2dEQUFHLE1BQU0sU0FBQyxlQUFlOzs7SUFGMUQsV0FBVztRQUh2QixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO1FBRytDLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO09BRjNELFdBQVcsQ0FxRnZCO3NCQTdHRDtDQTZHQyxBQXJGRCxJQXFGQztTQXJGWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRENTX0FVVEhfQ09ORklHLCBBdXRoQ29uZmlnIH0gZnJvbSAnLi9hdXRoLWxpYi5tb2R1bGUnO1xuXG5jb25zdCBBVVRIX1RZUEUgPSAnYXV0aC10eXBlJztcblxuZW51bSBBdXRoVHlwZSB7XG4gIEtFWUNMT0FLID0gJ2tleWNsb2FrJyxcbiAgU0lHTklDQVQgPSAnc2lnbmljYXQnLFxuICBWRVBBID0gJ3ZlcGEnLFxuICBDQVBUQ0hBID0gJ2NhcHRjaGEnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNjZXNzRGF0YSB7XG4gIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICByZWZyZXNoVG9rZW4/OiBzdHJpbmc7XG4gIHJlZGlyZWN0Pzogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCBASW5qZWN0KERDU19BVVRIX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IEF1dGhDb25maWcpIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhTZXJ2aWNlXScsICdjb25zdHJ1Y3RvcicsIGNvbmZpZyk7XG4gIH1cblxuICBwdWJsaWMgb2F1dGgocGFyYW1zOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZygnW0F1dGhTZXJ2aWNlXScsICdvYXV0aCcpO1xuICAgIGlmIChwYXJhbXMuc3RhdGUgJiYgcGFyYW1zLnVyaSkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbmRhdG9yeSBwYXJhbWV0ZXJzIHN0YXRlIG9yIHVyaSBtaXNzaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNpZ25pY2F0KHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxBY2Nlc3NEYXRhPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAnc2lnbmljYXQnKTtcbiAgICBpZiAocGFyYW1zLnN0YXRlICYmIHBhcmFtcy51cmkpIHtcbiAgICAgIHRoaXMuYXV0aFR5cGUgPSBBdXRoVHlwZS5TSUdOSUNBVDtcbiAgICAgIGNvbnN0IGJvZHkgPSB7IGNvZGU6IHBhcmFtcy5jb2RlLCB1cmk6IHBhcmFtcy51cmksIHN0YXRlOiBwYXJhbXMuc3RhdGUgfTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFuZGF0b3J5IHBhcmFtZXRlcnMgc3RhdGUgb3IgdXJpIG1pc3NpbmcnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdmVwYShwYXJhbXM6IGFueSk6IE9ic2VydmFibGU8QWNjZXNzRGF0YT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ3ZlcGEnKTtcbiAgICBpZiAocGFyYW1zLnMwICYmIHBhcmFtcy5zMSAmJiBwYXJhbXMuczIgJiYgcGFyYW1zLnMzICYmIHBhcmFtcy5zdGF0ZSkge1xuICAgICAgdGhpcy5hdXRoVHlwZSA9IEF1dGhUeXBlLlZFUEE7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFuZGF0b3J5IHBhcmFtZXRlcnMgczAsIHMxLCBzMiwgczMgb3Igc3RhdGUgbWlzc2luZycpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBrZXljbG9hayhwYXJhbXM6IGFueSk6IE9ic2VydmFibGU8QWNjZXNzRGF0YT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ2tleWNsb2FrJyk7XG4gICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMuc3RhdGUpIHtcbiAgICAgIHBhcmFtcy51cmkgPSB0aGlzLmNvbmZpZy5yZWRpcmVjdFVybDtcbiAgICAgIHRoaXMuYXV0aFR5cGUgPSBBdXRoVHlwZS5LRVlDTE9BSztcbiAgICAgIHJldHVybiB0aGlzLnBvc3QocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYW5kYXRvcnkgcGFyYW1ldGVycyB1cmkgb3Igc3RhdGUgbWlzc2luZycpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjYXB0Y2hhKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxBY2Nlc3NEYXRhPiB7XG4gICAgY29uc29sZS5sb2coJ1tBdXRoU2VydmljZV0nLCAnY2FwdGNoYScpO1xuICAgIGlmIChwYXJhbXMudG9rZW4pIHtcbiAgICAgIHRoaXMuYXV0aFR5cGUgPSBBdXRoVHlwZS5DQVBUQ0hBO1xuICAgICAgY29uc3QgdG9rZW4gPSBwYXJhbXMudG9rZW47XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KHsgdG9rZW4gfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFuZGF0b3J5IHBhcmFtZXRlcnMgdG9rZW4gbWlzc2luZycpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWZyZXNoKHRva2VuOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ3JlZnJlc2gnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0gfTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3Q8QWNjZXNzRGF0YT4odGhpcy5jb25maWcucmVmcmVzaFVybCwgbnVsbCwgb3B0aW9ucykucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlICYmIHJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3N0KGJvZHk6IGFueSk6IE9ic2VydmFibGU8QWNjZXNzRGF0YT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQXV0aFNlcnZpY2VdJywgJ3Bvc3QnLCBib2R5KTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB7ICdYLUF1dGgtVHlwZSc6IHRoaXMuYXV0aFR5cGUgfSB9O1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdDxBY2Nlc3NEYXRhPih0aGlzLmNvbmZpZy5hdXRoZW50aWNhdGlvblVybCwgYm9keSwgb3B0aW9ucykucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2U6IEFjY2Vzc0RhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0IGF1dGhUeXBlKCkge1xuICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKEFVVEhfVFlQRSkgYXMgQXV0aFR5cGU7XG4gIH1cblxuICBzZXQgYXV0aFR5cGUodHlwZTogQXV0aFR5cGUpIHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKEFVVEhfVFlQRSwgdHlwZSk7XG4gIH1cbn1cbiJdfQ==