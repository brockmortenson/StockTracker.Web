import { ISearchRequest } from '../shared/interfaces/search-request.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StockTrackerService {
    private urlPrefix = 'api/ExternalApi';

    constructor(private http: HttpClient) { }
    
    public getTicker(request: ISearchRequest): Observable<any> {
        return this.http.post<any>(`${this.urlPrefix}/GetTicker`, request);
    }

    public getTimeSeriesIntraday(request: ISearchRequest): Observable<any> {
        return this.http.post<any>(`${this.urlPrefix}/GetTimeSeriesIntraday`, request);
    }
}