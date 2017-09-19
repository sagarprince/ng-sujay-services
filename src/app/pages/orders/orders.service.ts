// Core
import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

// Services
import { RestApiService } from '../../shared/services';

// Json Convert Module
import { JsonConvert } from "json2typescript";

// Models
import { OrdersModel, OrderModel } from './orders.models';


@Injectable()
export class OrdersService {

  constructor(private http: RestApiService) {
    
  }

  getOrdersCount(): Observable<any> {
    return this.http.get('billing-rest-api/orders-count').map((response: Response) => {
        let jsonResponse = response.json();
        return jsonResponse;
    });
  }

  getOrders(filterData: any): Observable<OrdersModel> {
    return this.http.post('billing-rest-api/orders', filterData).map((response: Response) => {
        let jsonResponse = JsonConvert.deserializeString(JSON.stringify(response.json()), OrdersModel);
        return jsonResponse;
    });
  }

  getOrder(id: number): Observable<OrderModel> {
    return this.http.get('billing-rest-api/order/' + id).map((response: Response) => {
        let jsonResponse = JsonConvert.deserializeString(JSON.stringify(response.json()), OrderModel);
        return jsonResponse;
    });
  }

  saveOrder(orderData: any): Observable<OrderModel> {
    return this.http.post('billing-rest-api/order/save', orderData).map((response: Response) => {
        let jsonResponse = JsonConvert.deserializeString(JSON.stringify(response.json()), OrderModel);            
        return jsonResponse;
    });
  }

  changeOrderStatus(orderData: any): Observable<any> {
    return this.http.post('billing-rest-api/order/change-order-status', orderData).map((response: Response) => {
        let jsonResponse = response.json();            
        return jsonResponse;
    });
  }

  deleteOrder(id: number) {
    return this.http.get('billing-rest-api/order/delete/' + id).map((response: Response) => {
        return response.json();
    });
  }

}
