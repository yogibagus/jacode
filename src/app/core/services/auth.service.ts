import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { environment } from "../../../environtments/environment";
import { User } from '../models/auth.models';
import { LandaService } from './landa.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.api;

@Injectable({ providedIn: 'root' })


export class AuthenticationService {
    // user: User;
    // userDetail: UserDetail;
    constructor(private http: HttpClient) {
    }


    authLogin(body): Observable<any> {
        return this.http.post<any>(`${baseUrl}auth/login`, body);
    }

    getSession(): Observable<User> {
        return this.http.get<User>(`${baseUrl}auth/session`);
    }

    logout() {
        // logout the user
        sessionStorage.clear(); 
        return this.http.get<any>(`${baseUrl}auth/logout`);
    }

    // getSession(data): Observable<any> {
    //     return this.http.post(`${baseUrl}promo/insert/`, data);
    // }

    // getPromoByID(id_promo): Observable<detailPromo> {
    //     return this.http.get<detailPromo>(`${baseUrl}promo/${id_promo}`);
    // }


    // =========================


    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    /**
     * Returns the current detail user
     */
    // public getDetailUser(): UserDetail {
    //     return getFirebaseBackend().getDetailUser();
    // }

    /**
     * Returns the current client
     */
    public getActiveClient() {
        return getFirebaseBackend().getActiveClient();
    }

    /**
     * Returns the current company
     */
    public getActiveCompany() {
        return getFirebaseBackend().getActiveCompany();
    }

    /**
     * Returns set active company
     */
    public setDetailUser(payload: any) {
        return getFirebaseBackend().setDetailUser(payload);
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return getFirebaseBackend().loginUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }
    loginWithGoogle() {
        return getFirebaseBackend().loginWithGoogle().then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, password: string) {
        return getFirebaseBackend().registerUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    // logout() {
    //     // logout the user
    //     return getFirebaseBackend().logout();
    // }
}

