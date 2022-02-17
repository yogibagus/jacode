import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environtments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { detailMenu, listMenu } from '../models/menu.models';

const baseUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient ) { }

  getAllMenu(body: any = ""): Observable<listMenu> {
    return this.http.get<listMenu>(`${baseUrl}menu/all`, { params: body });
  }

  getMenuByID(id_menu): Observable<detailMenu> {
    return this.http.get<detailMenu>(`${baseUrl}menu/detail/${id_menu}`);
  }

  updateMenuByID(id_menu, body): Observable<any> {
    return this.http.post<any>(`${baseUrl}menu/update/${id_menu}`, body);
  }

  addMenu(body): Observable<any> {
    return this.http.post<any>(`${baseUrl}menu/add`, body);
  }

}
