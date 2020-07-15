/**
 * PostgREST API
 * standard public schema
 *
 * OpenAPI spec version: 7.0.0 (2b61a63)
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { AppUnidad } from '../model/appUnidad';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AppUnidadService {

    protected basePath = 'http://app.mandala.red:3002';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param idunidad 
     * @param unidad 
     * @param idestado 
     * @param prefer Preference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public appUnidadDelete(idunidad?: string, unidad?: string, idestado?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'body', reportProgress?: boolean): Observable<any>;
    public appUnidadDelete(idunidad?: string, unidad?: string, idestado?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public appUnidadDelete(idunidad?: string, unidad?: string, idestado?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public appUnidadDelete(idunidad?: string, unidad?: string, idestado?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idunidad !== undefined && idunidad !== null) {
            queryParameters = queryParameters.set('idunidad', <any>idunidad);
        }
        if (unidad !== undefined && unidad !== null) {
            queryParameters = queryParameters.set('unidad', <any>unidad);
        }
        if (idestado !== undefined && idestado !== null) {
            queryParameters = queryParameters.set('idestado', <any>idestado);
        }

        let headers = this.defaultHeaders;
        if (prefer !== undefined && prefer !== null) {
            headers = headers.set('Prefer', String(prefer));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/app_unidad`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param idunidad 
     * @param unidad 
     * @param idestado 
     * @param select Filtering Columns
     * @param order Ordering
     * @param range Limiting and Pagination
     * @param rangeUnit Limiting and Pagination
     * @param offset Limiting and Pagination
     * @param limit Limiting and Pagination
     * @param prefer Preference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public appUnidadGet(idunidad?: string, unidad?: string, idestado?: string, select?: string, order?: string, range?: string, rangeUnit?: string, offset?: string, limit?: string, prefer?: 'count=none', observe?: 'body', reportProgress?: boolean): Observable<Array<AppUnidad>>;
    public appUnidadGet(idunidad?: string, unidad?: string, idestado?: string, select?: string, order?: string, range?: string, rangeUnit?: string, offset?: string, limit?: string, prefer?: 'count=none', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AppUnidad>>>;
    public appUnidadGet(idunidad?: string, unidad?: string, idestado?: string, select?: string, order?: string, range?: string, rangeUnit?: string, offset?: string, limit?: string, prefer?: 'count=none', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AppUnidad>>>;
    public appUnidadGet(idunidad?: string, unidad?: string, idestado?: string, select?: string, order?: string, range?: string, rangeUnit?: string, offset?: string, limit?: string, prefer?: 'count=none', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {











        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idunidad !== undefined && idunidad !== null) {
            queryParameters = queryParameters.set('idunidad', <any>idunidad);
        }
        if (unidad !== undefined && unidad !== null) {
            queryParameters = queryParameters.set('unidad', <any>unidad);
        }
        if (idestado !== undefined && idestado !== null) {
            queryParameters = queryParameters.set('idestado', <any>idestado);
        }
        if (select !== undefined && select !== null) {
            queryParameters = queryParameters.set('select', <any>select);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', <any>order);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }

        let headers = this.defaultHeaders;
        if (range !== undefined && range !== null) {
            headers = headers.set('Range', String(range));
        }
        if (rangeUnit !== undefined && rangeUnit !== null) {
            headers = headers.set('Range-Unit', String(rangeUnit));
        }
        if (prefer !== undefined && prefer !== null) {
            headers = headers.set('Prefer', String(prefer));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];

        return this.httpClient.get<Array<AppUnidad>>(`${this.basePath}/app_unidad`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param idunidad 
     * @param unidad 
     * @param idestado 
     * @param appUnidad app_unidad
     * @param prefer Preference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public appUnidadPatch(idunidad?: string, unidad?: string, idestado?: string, appUnidad?: AppUnidad, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'body', reportProgress?: boolean): Observable<any>;
    public appUnidadPatch(idunidad?: string, unidad?: string, idestado?: string, appUnidad?: AppUnidad, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public appUnidadPatch(idunidad?: string, unidad?: string, idestado?: string, appUnidad?: AppUnidad, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public appUnidadPatch(idunidad?: string, unidad?: string, idestado?: string, appUnidad?: AppUnidad, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idunidad !== undefined && idunidad !== null) {
            queryParameters = queryParameters.set('idunidad', <any>idunidad);
        }
        if (unidad !== undefined && unidad !== null) {
            queryParameters = queryParameters.set('unidad', <any>unidad);
        }
        if (idestado !== undefined && idestado !== null) {
            queryParameters = queryParameters.set('idestado', <any>idestado);
        }

        let headers = this.defaultHeaders;
        if (prefer !== undefined && prefer !== null) {
            headers = headers.set('Prefer', String(prefer));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.patch<any>(`${this.basePath}/app_unidad`,
            appUnidad,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param appUnidad app_unidad
     * @param select Filtering Columns
     * @param prefer Preference
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public appUnidadPost(appUnidad?: AppUnidad, select?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'body', reportProgress?: boolean): Observable<any>;
    public appUnidadPost(appUnidad?: AppUnidad, select?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public appUnidadPost(appUnidad?: AppUnidad, select?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public appUnidadPost(appUnidad?: AppUnidad, select?: string, prefer?: 'return=representation' | 'return=minimal' | 'return=none', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (select !== undefined && select !== null) {
            queryParameters = queryParameters.set('select', <any>select);
        }

        let headers = this.defaultHeaders;
        if (prefer !== undefined && prefer !== null) {
            headers = headers.set('Prefer', String(prefer));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/vnd.pgrst.object+json',
            'text/csv'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/app_unidad`,
            appUnidad,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
