import { ITickerRequest } from './../shared/interfaces/ticker-request.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StockTrackerService {
    private urlPrefix = 'api/ExternalApi';

    constructor(private http: HttpClient) { }
    
    public getTicker(request: ITickerRequest): Observable<any> {
        // return this.http.get<any>('api/ExternalApi/ticker');
        return this.http.post<any>(`${this.urlPrefix}/ticker`, request);
    }
}