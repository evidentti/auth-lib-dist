import { __decorate } from "tslib";
import { NgModule, InjectionToken } from '@angular/core';
import { AuthComponent } from './auth-lib.component';
export const DCS_AUTH_CONFIG = new InjectionToken('Authentication Configuration');
const ɵ0 = { authenticationUrl: 'authenticate', refreshUrl: 'refresh', redirectUrl: 'redirect' };
let AuthModule = class AuthModule {
};
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
export { AuthModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXV0aC1saWIvIiwic291cmNlcyI6WyJsaWIvYXV0aC1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFRckQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLElBQUksY0FBYyxDQUFhLDhCQUE4QixDQUFDLENBQUM7V0FROUUsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFO0FBS3JHLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7Q0FBSSxDQUFBO0FBQWQsVUFBVTtJQVh0QixRQUFRLENBQUM7UUFDUixZQUFZLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDN0IsT0FBTyxFQUFFLEVBQUU7UUFDWCxTQUFTLEVBQUU7WUFDVDtnQkFDRSxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsUUFBUSxJQUF1RjthQUNoRztTQUNGO1FBQ0QsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO0tBQ3pCLENBQUM7R0FDVyxVQUFVLENBQUk7U0FBZCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoLWxpYi5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhDb25maWcge1xuICBhdXRoZW50aWNhdGlvblVybDogc3RyaW5nO1xuICByZWZyZXNoVXJsOiBzdHJpbmc7XG4gIHJlZGlyZWN0VXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBEQ1NfQVVUSF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48QXV0aENvbmZpZz4oJ0F1dGhlbnRpY2F0aW9uIENvbmZpZ3VyYXRpb24nKTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQXV0aENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBEQ1NfQVVUSF9DT05GSUcsXG4gICAgICB1c2VWYWx1ZTogeyBhdXRoZW50aWNhdGlvblVybDogJ2F1dGhlbnRpY2F0ZScsIHJlZnJlc2hVcmw6ICdyZWZyZXNoJywgcmVkaXJlY3RVcmw6ICdyZWRpcmVjdCcgfVxuICAgIH1cbiAgXSxcbiAgZXhwb3J0czogW0F1dGhDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhNb2R1bGUgeyB9XG4iXX0=