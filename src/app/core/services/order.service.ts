import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environtments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { detailOrder, listOrder } from '../models/order.models';

const baseUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrder(body: any = ""): Observable<listOrder> {
    return this.http.get<listOrder>(`${baseUrl}order/all`, { params: body });
  }

  getOrderByID(id_order): Observable<detailOrder> {
    return this.http.get<detailOrder>(`${baseUrl}order/detail/${id_order}`);
  }

  updateStatusOrder(id_order, body): Observable<any> {
    return this.http.post<any>(`${baseUrl}order/update/status/${id_order}`, body);
  }

  updateOrder(id_order, body): Observable<any> {
    return this.http.post<any>(`${baseUrl}order/update/${id_order}`, body);
  }

  
}
