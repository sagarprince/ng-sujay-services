import { JsonObject, JsonProperty } from "json2typescript";


@JsonObject
export class ItemModel {

    @JsonProperty('id')
    id:number = undefined;

    @JsonProperty('item_code')
    item_code: string = undefined;

    @JsonProperty('item_name')
    item_name: string = undefined;

    @JsonProperty('item_quantity')
    item_quantity: number = undefined;

    @JsonProperty('item_rate')
    item_rate: number = undefined;
    
}

@JsonObject
export class MasterItemsModel {

    @JsonProperty('items', [ItemModel])
    items: ItemModel = undefined;

    @JsonProperty('pages_count')
    pagesCount: number = undefined;

}

@JsonObject
export class MasterItemModel {

    @JsonProperty('item', ItemModel)
    item: ItemModel = undefined;

    message: string = undefined;
}