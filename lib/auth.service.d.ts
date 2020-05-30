import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthConfig } from './auth-lib.module';
declare enum AuthType {
    KEYCLOAK = "keycloak",
    SIGNICAT = "signicat",
    VEPA = "vepa",
    CAPTCHA = "captcha"
}
export interface AccessData {
    accessToken?: string;
    refreshToken?: string;
    redirect?: string;
}
export declare class AuthService {
    protected httpClient: HttpClient;
    private config;
    constructor(httpClient: HttpClient, config: AuthConfig);
    oauth(params: any): Observable<AccessData>;
    signicat(params: any): Observable<AccessData>;
    vepa(params: any): Observable<AccessData>;
    keycloak(params: any): Observable<AccessData>;
    captcha(params: any): Observable<AccessData>;
    refresh(token: string): Observable<string>;
    private post;
    get authType(): AuthType;
    set authType(type: AuthType);
}
export {};
