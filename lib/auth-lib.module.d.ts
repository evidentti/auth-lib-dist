import { InjectionToken } from '@angular/core';
export interface AuthConfig {
    authenticationUrl: string;
    refreshUrl: string;
    redirectUrl: string;
}
export declare const DCS_AUTH_CONFIG: InjectionToken<AuthConfig>;
export declare class AuthModule {
}
