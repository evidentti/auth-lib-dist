import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService, AuthType } from './auth.service';
export declare class AuthApi {
    private authService;
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
    constructor(authService: AuthService);
    init(type: AuthType, urlParams?: string): Observable<boolean>;
    initLogin(): Observable<boolean>;
    codeLogin(secureCode: string): Observable<boolean>;
    captchaLogin(): Observable<boolean>;
    getToken(): string;
    updateToken(): Observable<string>;
    private handleAccessData;
}
