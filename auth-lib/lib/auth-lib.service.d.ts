import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
export declare class AuthApi {
    private authService;
    private successVariable;
    get success(): boolean;
    set success(success: boolean);
    private watchSuccessVariable;
    get watchSuccess(): BehaviorSubject<boolean>;
    private accessTokenVariable;
    get accessToken(): string;
    set accessToken(token: string);
    private refreshTokenVariable;
    get refreshToken(): string;
    set refreshToken(token: string);
    private typeVariable;
    get type(): string;
    set type(type: string);
    constructor(authService: AuthService);
    init(): Observable<boolean>;
    initLogin(): Observable<boolean>;
    codeLogin(secureCode: string): Observable<boolean>;
    captchaLogin(): Observable<boolean>;
    getToken(): string;
    updateToken(): Observable<string>;
    private handleAccessData;
    first(): string;
}