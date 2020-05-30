import { NgModule, InjectionToken } from '@angular/core';
import { AuthComponent } from './auth-lib.component';
import * as i0 from "@angular/core";
export const DCS_AUTH_CONFIG = new InjectionToken('Authentication Configuration');
export class AuthModule {
}
AuthModule.ɵmod = i0.ɵɵdefineNgModule({ type: AuthModule });
AuthModule.ɵinj = i0.ɵɵdefineInjector({ factory: function AuthModule_Factory(t) { return new (t || AuthModule)(); }, providers: [
        {
            provide: DCS_AUTH_CONFIG,
            useValue: { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' }
        }
    ], imports: [[]] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXV0aC1saWIvIiwic291cmNlcyI6WyJsaWIvYXV0aC1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFRckQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLElBQUksY0FBYyxDQUFhLDhCQUE4QixDQUFDLENBQUM7QUFhOUYsTUFBTSxPQUFPLFVBQVU7OzhDQUFWLFVBQVU7bUdBQVYsVUFBVSxtQkFSVjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGVBQWU7WUFDeEIsUUFBUSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRTtTQUNoRztLQUNGLFlBTlEsRUFBRTt3RkFTQSxVQUFVLG1CQVZOLGFBQWEsYUFRbEIsYUFBYTtrREFFWixVQUFVO2NBWHRCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsUUFBUSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRTtxQkFDaEc7aUJBQ0Y7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2FBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoLWxpYi5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhDb25maWcge1xuICBhdXRoZW50aWNhdGlvblVybDogc3RyaW5nO1xuICByZWZyZXNoVXJsOiBzdHJpbmc7XG4gIHJlZGlyZWN0VXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBEQ1NfQVVUSF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48QXV0aENvbmZpZz4oJ0F1dGhlbnRpY2F0aW9uIENvbmZpZ3VyYXRpb24nKTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQXV0aENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBEQ1NfQVVUSF9DT05GSUcsXG4gICAgICB1c2VWYWx1ZTogeyBhdXRoZW50aWNhdGlvblVybDogJ2F1dGhlbnRpY2F0ZScsIHJlZnJlc2hVcmw6ICdyZWZyZXNoJywgcmVkaXJlY3RVcmw6ICdyZWRpcmVjdCcgfVxuICAgIH1cbiAgXSxcbiAgZXhwb3J0czogW0F1dGhDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhNb2R1bGUgeyB9XG4iXX0=