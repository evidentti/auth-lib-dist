import { InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./auth-lib.component";
export interface AuthConfig {
    authenticationUrl: string;
    refreshUrl: string;
    redirectUrl: string;
}
export declare const DCS_AUTH_CONFIG: InjectionToken<AuthConfig>;
export declare class AuthModule {
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AuthModule, [typeof i1.AuthComponent], never, [typeof i1.AuthComponent]>;
    static ɵinj: i0.ɵɵInjectorDef<AuthModule>;
}
