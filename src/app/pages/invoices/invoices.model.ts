import { JsonObject, JsonProperty } from "json2typescript";


@JsonObject
export class IModel {

    @JsonProperty('id')
    id:number = undefined;

    @JsonProperty('invoice_no')
    invoice_no: string = undefined;

    @JsonProperty('invoice_date')
    invoice_date: string = undefined;

    @JsonProperty('invoice_total_amount')
    invoice_total_amount: number = undefined;
}

@JsonObject
export class InvoicesModel {

    @JsonProperty('invoices', [IModel])
    invoices: IModel = undefined;
}

@JsonObject
export class InvoiceModel {

    @JsonProperty('invoice', IModel)
    invoice: IModel = undefined;

    message: string = undefined;
}