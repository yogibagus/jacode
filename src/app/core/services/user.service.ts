import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ListUser, User } from '../models/user.models';
import { environment } from 'src/environtments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Akses } from '../models/akses.models';

const baseUrl = environment.api;

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getUserByID(id_user): Observable<User> {
        return this.http.get<User>(`${baseUrl}user/detail/${id_user}`);
    }

    updateUserByID(id_user, body): Observable<any> {
        return this.http.post<any>(`${baseUrl}user/update/${id_user}`, body);
    }

    updateImageProfileUserByID(id_user, body): Observable<any> {
        return this.http.post<any>(`${baseUrl}user/profil/${id_user}`, body);
    }

    getAllHakAkses(): Observable<Akses> {
        return this.http.get<Akses>(`${baseUrl}akses`);
    }

    getAllCustomer(body : any = ""): Observable<ListUser> {
        return this.http.get<ListUser>(`${baseUrl}user/customer`, {params: body});
    }
}
