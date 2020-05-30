import { __decorate } from "tslib";
import { NgModule, InjectionToken } from '@angular/core';
import { AuthComponent } from './auth-lib.component';
export var DCS_AUTH_CONFIG = new InjectionToken('Authentication Configuration');
var ɵ0 = { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXV0aC1saWIvIiwic291cmNlcyI6WyJsaWIvYXV0aC1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFRckQsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLElBQUksY0FBYyxDQUFhLDhCQUE4QixDQUFDLENBQUM7U0FROUUsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFO0FBS3JHO0lBQUE7SUFBMEIsQ0FBQztJQUFkLFVBQVU7UUFYdEIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQzdCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixRQUFRLElBQXVGO2lCQUNoRzthQUNGO1lBQ0QsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQ3pCLENBQUM7T0FDVyxVQUFVLENBQUk7SUFBRCxpQkFBQztDQUFBLEFBQTNCLElBQTJCO1NBQWQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aENvbXBvbmVudCB9IGZyb20gJy4vYXV0aC1saWIuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRoQ29uZmlnIHtcbiAgYXV0aGVudGljYXRpb25Vcmw6IHN0cmluZztcbiAgcmVmcmVzaFVybDogc3RyaW5nO1xuICByZWRpcmVjdFVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRENTX0FVVEhfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPEF1dGhDb25maWc+KCdBdXRoZW50aWNhdGlvbiBDb25maWd1cmF0aW9uJyk7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0F1dGhDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogRENTX0FVVEhfQ09ORklHLFxuICAgICAgdXNlVmFsdWU6IHsgYXV0aGVudGljYXRpb25Vcmw6ICdhdXRoZW50aWNhdGUnLCByZWZyZXNoVXJsOiAncmVmcmVzaCcsIHJlZGlyZWN0VXJsOiAncmVkaXJlY3QnIH1cbiAgICB9XG4gIF0sXG4gIGV4cG9ydHM6IFtBdXRoQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBdXRoTW9kdWxlIHsgfVxuIl19