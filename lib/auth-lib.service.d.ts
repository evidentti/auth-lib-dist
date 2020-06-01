import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthConfig, AuthTypes } from './auth-lib.module';
export declare class AuthApi {
    private authService;
    private config;
    private type;
    private successVar;
    private watchSuccessVar;
    private accessTokenVar;
    private refreshTokenVar;
    get success(): boolean;
    set success(success: boolean);
    get watchSuccess(): BehaviorSubject<boolean>;
    private get accessToken();
    private set accessToken(value);
    private get refreshToken();
    private set refreshToken(value);
    constructor(authService: AuthService, config: AuthConfig);
    init(urlParams?: string): Observable<boolean>;
    captchaLogin(secret: string): Observable<boolean>;
    getToken(): string;
    updateToken(): Observable<string>;
    authTypes(): AuthTypes;
    private initLogin;
    private login;
    private handleAccessData;
}
