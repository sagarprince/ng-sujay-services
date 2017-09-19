import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

    // Cache store
    private static _cache: { [ID: string]: any } = {};

    // Check Cache Key Value Exist
    static isExist(key: string): boolean {
        if (this._cache[key]) {
            return true;
        }

        return false;
    }

    // Set Cache Value
    static set(key: string, value: any): void {
        this._cache[key] = value;
    }

    // Get Cache Value
    static get(key: string): any {
        if (typeof this._cache[key] !== 'undefined') {
            return this._cache[key];
        } else {
            return null;
        }
    }

    // Delete Cache Value
    static delete(key: string): any {
        if (this.isExist(key)) {
            delete this._cache[key];
        }        
    }

}