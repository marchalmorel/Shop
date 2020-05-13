import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IFbResponse, IProduct} from './interfaces';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  create(product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(
        map((res: IFbResponse) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date)
          }
        })
      )
  }

  //todo типизация
  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(
        map( res => {
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }))
        })
      )
  }

  //todo типизация
  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(
        map( (res: IProduct) => {
          return {
              ...res,
              id,
              date: new Date(res.date)
            }
        })
      )
  }


}
