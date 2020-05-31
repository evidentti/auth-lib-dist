(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common/http'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('auth-lib', ['exports', '@angular/core', 'rxjs', '@angular/common/http', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['auth-lib'] = {}, global.ng.core, global.rxjs, global.ng.common.http, global.rxjs.operators));
}(this, (function (exports, core, rxjs, http, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var AuthComponent = /** @class */ (function () {
        function AuthComponent() {
        }
        AuthComponent.prototype.ngOnInit = function () {
        };
        AuthComponent = __decorate([
            core.Component({
                selector: 'lib-auth-lib',
                template: "\n    <p>\n      auth-lib works!\n    </p>\n  "
            })
        ], AuthComponent);
        return AuthComponent;
    }());

    var DCS_AUTH_CONFIG = new core.InjectionToken('Authentication Configuration');
    var ɵ0 = { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' };
    var AuthModule = /** @class */ (function () {
        function AuthModule() {
        }
        AuthModule = __decorate([
            core.NgModule({
                declarations: [AuthComponent],
                imports: [],
                providers: [
                    {
                        provide: DCS_AUTH_CONFIG,
                        useValue: ɵ0
                    }
                ],
                exports: [AuthComponent]
            })
        ], AuthModule);
        return AuthModule;
    }());

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
            return this.httpClient.post(this.config.refreshUrl, null, options).pipe(operators.map(function (response) {
                return response && response.accessToken;
            }));
        };
        AuthService.prototype.post = function (body) {
            console.log('[AuthService]', 'post', body);
            var options = { headers: { 'X-Auth-Type': this.authType } };
            return this.httpClient.post(this.config.authenticationUrl, body, options).pipe(operators.map(function (response) {
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
            { type: http.HttpClient },
            { type: undefined, decorators: [{ type: core.Inject, args: [DCS_AUTH_CONFIG,] }] }
        ]; };
        AuthService.ɵprov = core.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(DCS_AUTH_CONFIG)); }, token: AuthService, providedIn: "root" });
        AuthService = __decorate([
            core.Injectable({
                providedIn: 'root',
            }),
            __param(1, core.Inject(DCS_AUTH_CONFIG))
        ], AuthService);
        return AuthService;
    }());

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
                    this.watchSuccessVar = new rxjs.BehaviorSubject(this.success);
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
            return new rxjs.Observable(function (observer) {
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
            return new rxjs.Observable(function (observer) {
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
            return rxjs.of(null);
        };
        AuthApi.prototype.getToken = function () {
            console.log('[AuthApi]', 'getToken');
            return this.accessToken;
        };
        AuthApi.prototype.updateToken = function () {
            var _this = this;
            console.log('[AuthApi]', 'updateToken');
            return new rxjs.Observable(function (observer) {
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
        AuthApi.ɵprov = core.ɵɵdefineInjectable({ factory: function AuthApi_Factory() { return new AuthApi(core.ɵɵinject(AuthService)); }, token: AuthApi, providedIn: "root" });
        AuthApi = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], AuthApi);
        return AuthApi;
    }());

    exports.AuthApi = AuthApi;
    exports.AuthComponent = AuthComponent;
    exports.AuthModule = AuthModule;
    exports.DCS_AUTH_CONFIG = DCS_AUTH_CONFIG;
    exports.ɵ0 = ɵ0;
    exports.ɵa = AuthService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=auth-lib.umd.js.map
