// Core
import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

// Services
import { RestApiService } from '../../shared/services';

// Json Convert Module
import { JsonConvert } from "json2typescript";

// Models
import { MasterItemsModel, MasterItemModel } from './master.models';


@Injectable()
export class MasterService {

  constructor(private http: RestApiService) {
    
  }

  getItems(filterData: any): Observable<MasterItemsModel> {
    return this.http.post('billing-rest-api/master-items/', filterData).map((response: Response) => {
        let jsonResponse = JsonConvert.deserializeString(JSON.stringify(response.json()), MasterItemsModel);
        return jsonResponse;
    });
  }

  getMasterItem(id: number): Observable<MasterItemModel> {
    return this.http.get('billing-rest-api/master-item/' + id).map((response: Response) => {
        let jsonResponse = JsonConvert.deserializeString(JSON.stringify(response.json()), MasterItemModel);
        return jsonResponse;
    });
  }

  getMasterItemByCode(code: string): Observable<MasterItemModel> {
    return this.http.get('billing-rest-api/master-item-by-code/' + code).map((response: Response) => {
        let jsonResponse = JsonConvert.deserializeString(JSON.stringify(response.json()), MasterItemModel);
        return jsonResponse;
    });
  }

  saveMasterItem(itemData: any): Observable<MasterItemModel> {
    return this.http.post('billing-rest-api/master-item/save', itemData).map((response: Response) => {
        let jsonResponse = JsonConvert.deserializeString(JSON.stringify(response.json()), MasterItemModel);            
        return jsonResponse;
    });
  }

  deleteMasterItem(id: number): Observable<any> {
    return this.http.get('billing-rest-api/master-item/delete/' + id).map((response: Response) => {
        return response.json();
    });
  }

}
