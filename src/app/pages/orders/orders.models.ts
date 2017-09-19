import { JsonObject, JsonProperty } from "json2typescript";


@JsonObject
export class Model {

    @JsonProperty('id')
    id:number = undefined;

    @JsonProperty('order_job_no')
    order_job_no: string = undefined;

    @JsonProperty('order_item_code')
    order_item_code: string = undefined;

    @JsonProperty('order_quantity')
    order_quantity: number = undefined;

    @JsonProperty('order_date')
    order_date: string = undefined;

    @JsonProperty('order_status')
    order_status: string = undefined;

    @JsonProperty('master_item_quantity', Number, true)
    master_item_quantity: number = 0;

}

@JsonObject
export class OrdersModel {

    @JsonProperty('orders', [Model])
    orders: Model = undefined;

    @JsonProperty('pages_count')
    pagesCount: number = undefined;
}

@JsonObject
export class OrderModel {

    @JsonProperty('order', Model)
    order: Model = undefined;

    @JsonProperty('orders_count', Number, true)
    ordersCount: number = undefined;

    @JsonProperty('message', String, true)    
    message: string = undefined;
}