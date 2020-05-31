import { InjectionToken } from '@angular/core';
export interface AuthConfig {
    authenticationUrl: string;
    refreshUrl: string;
    redirectUrl: string;
    defaultType: string;
}
export interface AuthTypes {
    KEYCLOAK: string;
    SIGNICAT: string;
    VEPA: string;
    CAPTCHA: string;
}
export interface AccessData {
    accessToken?: string;
    refreshToken?: string;
    redirect?: string;
}
export declare const DCS_AUTH_CONFIG: InjectionToken<AuthConfig>;
export declare class AuthModule {
}
