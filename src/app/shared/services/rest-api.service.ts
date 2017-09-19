import { Injectable } from "@angular/core";

import { ConnectionBackend, XHRBackend, RequestOptions, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AppConfig } from '../config';

import { SessionService } from './session.service';

@Injectable()
export class RestApiService extends Http {

        constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
                super(backend, defaultOptions);
        }

        get(url: string, options?: RequestOptionsArgs): Observable<Response> {
                return super.get(AppConfig.apiBaseUrl + url, this.addToken(options)).catch(this.handleError);                
        }

        mockGet(url: string, options?: RequestOptionsArgs): Observable<Response> {
                return super.get(url, this.addToken(options)).catch(this.handleError);
        }

        post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
                return super.post(AppConfig.apiBaseUrl + url, body, this.addToken(options)).catch(this.handleError);
        }

        put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
                return super.put(AppConfig.apiBaseUrl + url, body, this.addToken(options)).catch(this.handleError);
        }

        delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
                return super.delete(AppConfig.apiBaseUrl + url, this.addToken(options)).catch(this.handleError);
        }

        // private helper methods 
        private addToken(options?: RequestOptionsArgs): RequestOptionsArgs {
                // ensure request options and headers are not null
                options = options || new RequestOptions();
                options.headers = options.headers || new Headers();

                options.headers.append('Content-Type', 'application/json');

                let token = SessionService.get('apiToken');
                if (token !== null) {
                        options.headers.append('Authorization', 'Bearer ' + token);
                }

                return options;
        }

        private handleError(error: any) {
                let errorResponse = null;

                try {
                        errorResponse = JSON.parse(error._body);
                } catch (e) {
                        errorResponse = error._body;
                }

                // errorResponse.logout = false;

                // if (error.status === 401) {                        
                //        errorResponse.logout = true;
                // }

                return Observable.throw(errorResponse);
        }
}

export function RestApiFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
        return new RestApiService(xhrBackend, requestOptions);
}

export let RestApiProvider = {
        provide: RestApiService,
        useFactory: RestApiFactory,
        deps: [XHRBackend, RequestOptions]
};
