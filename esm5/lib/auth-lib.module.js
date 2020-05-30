import { NgModule, InjectionToken } from '@angular/core';
import { AuthComponent } from './auth-lib.component';
import * as i0 from "@angular/core";
export var DCS_AUTH_CONFIG = new InjectionToken('Authentication Configuration');
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule.ɵmod = i0.ɵɵdefineNgModule({ type: AuthModule });
    AuthModule.ɵinj = i0.ɵɵdefineInjector({ factory: function AuthModule_Factory(t) { return new (t || AuthModule)(); }, providers: [
            {
                provide: DCS_AUTH_CONFIG,
                useValue: { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' }
            }
        ], imports: [[]] });
    return AuthModule;
}());
export { AuthModule };
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AuthModule, { declarations: [AuthComponent], exports: [AuthComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuthModule, [{
        type: NgModule,
        args: [{
                declarations: [AuthComponent],
                imports: [],
                providers: [
                    {
                        provide: DCS_AUTH_CONFIG,
                        useValue: { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' }
                    }
                ],
                exports: [AuthComponent]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXV0aC1saWIvIiwic291cmNlcyI6WyJsaWIvYXV0aC1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFRckQsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLElBQUksY0FBYyxDQUFhLDhCQUE4QixDQUFDLENBQUM7QUFFOUY7SUFBQTtLQVcyQjtrREFBZCxVQUFVO3VHQUFWLFVBQVUsbUJBUlY7WUFDVDtnQkFDRSxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsUUFBUSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRTthQUNoRztTQUNGLFlBTlEsRUFBRTtxQkFiYjtDQXNCMkIsQUFYM0IsSUFXMkI7U0FBZCxVQUFVO3dGQUFWLFVBQVUsbUJBVk4sYUFBYSxhQVFsQixhQUFhO2tEQUVaLFVBQVU7Y0FYdEIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixRQUFRLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFO3FCQUNoRztpQkFDRjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGhDb21wb25lbnQgfSBmcm9tICcuL2F1dGgtbGliLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aENvbmZpZyB7XG4gIGF1dGhlbnRpY2F0aW9uVXJsOiBzdHJpbmc7XG4gIHJlZnJlc2hVcmw6IHN0cmluZztcbiAgcmVkaXJlY3RVcmw6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IERDU19BVVRIX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBdXRoQ29uZmlnPignQXV0aGVudGljYXRpb24gQ29uZmlndXJhdGlvbicpO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtBdXRoQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IERDU19BVVRIX0NPTkZJRyxcbiAgICAgIHVzZVZhbHVlOiB7IGF1dGhlbnRpY2F0aW9uVXJsOiAnYXV0aGVudGljYXRlJywgcmVmcmVzaFVybDogJ3JlZnJlc2gnLCByZWRpcmVjdFVybDogJ3JlZGlyZWN0JyB9XG4gICAgfVxuICBdLFxuICBleHBvcnRzOiBbQXV0aENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXV0aE1vZHVsZSB7IH1cbiJdfQ==