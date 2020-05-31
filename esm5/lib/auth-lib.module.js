import { __decorate } from "tslib";
import { NgModule, InjectionToken } from '@angular/core';
import { AuthComponent } from './auth-lib.component';
export var DCS_AUTH_CONFIG = new InjectionToken('Authentication Configuration');
var ɵ0 = { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect', defaultType: 'keycloak' };
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        NgModule({
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
export { AuthModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXV0aC1saWIvIiwic291cmNlcyI6WyJsaWIvYXV0aC1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFzQnJELE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBYSw4QkFBOEIsQ0FBQyxDQUFDO1NBUTlFLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFO0FBSzlIO0lBQUE7SUFBMEIsQ0FBQztJQUFkLFVBQVU7UUFYdEIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQzdCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixRQUFRLElBQWdIO2lCQUN6SDthQUNGO1lBQ0QsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQ3pCLENBQUM7T0FDVyxVQUFVLENBQUk7SUFBRCxpQkFBQztDQUFBLEFBQTNCLElBQTJCO1NBQWQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aENvbXBvbmVudCB9IGZyb20gJy4vYXV0aC1saWIuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRoQ29uZmlnIHtcbiAgYXV0aGVudGljYXRpb25Vcmw6IHN0cmluZztcbiAgcmVmcmVzaFVybDogc3RyaW5nO1xuICByZWRpcmVjdFVybDogc3RyaW5nO1xuICBkZWZhdWx0VHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhUeXBlcyB7XG4gIEtFWUNMT0FLOiBzdHJpbmc7XG4gIFNJR05JQ0FUOiBzdHJpbmc7XG4gIFZFUEE6IHN0cmluZztcbiAgQ0FQVENIQTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjY2Vzc0RhdGEge1xuICBhY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgcmVmcmVzaFRva2VuPzogc3RyaW5nO1xuICByZWRpcmVjdD86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IERDU19BVVRIX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBdXRoQ29uZmlnPignQXV0aGVudGljYXRpb24gQ29uZmlndXJhdGlvbicpO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtBdXRoQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IERDU19BVVRIX0NPTkZJRyxcbiAgICAgIHVzZVZhbHVlOiB7IGF1dGhlbnRpY2F0aW9uVXJsOiAnYXV0aGVudGljYXRlJywgcmVmcmVzaFVybDogJ3JlZnJlc2gnLCByZWRpcmVjdFVybDogJ3JlZGlyZWN0JywgZGVmYXVsdFR5cGU6ICdrZXljbG9haycgfVxuICAgIH1cbiAgXSxcbiAgZXhwb3J0czogW0F1dGhDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhNb2R1bGUgeyB9XG4iXX0=