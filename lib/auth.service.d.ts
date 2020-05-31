import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthConfig, AccessData, AuthTypes } from './auth-lib.module';
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
    get authType(): string;
    set authType(type: string);
    get authTypes(): AuthTypes;
}
