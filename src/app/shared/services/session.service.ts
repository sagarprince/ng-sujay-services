import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    // Session Data store as key: value pair.
    private static _sessionData: { [ID: string]: any } = {};

    static set(id: string, value: any): void {
        this._sessionData[id] = value;
    }

    static get(id: string): any {
        if (this._sessionData[id]) {
            return this._sessionData[id];
        }

        return null;
    }

    static remove(id: string): void {
        if (this._sessionData[id]) {
            delete this._sessionData[id];
        }
    }
    
}