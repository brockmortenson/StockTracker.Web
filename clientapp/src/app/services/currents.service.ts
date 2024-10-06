import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITicker } from '../shared/interfaces/common-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CurrentsService {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly currentTicker$: BehaviorSubject<ITicker> = new BehaviorSubject<ITicker>({});

  constructor() { }

  /**
   * Gets the current value of isLoading
   * Subscribe to be notified of changes.
   */
  public getIsLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
  
  /**
   * Set the value of isLoading.
   * @param bool The value to be set.
   */
  public setIsLoading(bool: boolean): void {
    this.isLoading$.next(bool);
  }

  /**
   * Gets the current value of isLoading
   * Subscribe to be notified of changes.
   */
  public getCurrentTicker(): Observable<ITicker> {
    return this.currentTicker$.asObservable();
  }
  
  /**
   * Set the value of currentTicker.
   * @param ticker The value to be set.
   */
  public setCurrentTicker(ticker: ITicker): void {
    this.currentTicker$.next(ticker);
  }

}
