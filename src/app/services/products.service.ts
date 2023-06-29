import { IProduct } from "./../models/product";
import { errorService } from "./error.service";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, catchError, delay, retry, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient, private errorService: errorService) {}

  products: IProduct[] = [];

  getAll(): Observable<IProduct[]> {
    const params = new HttpParams().set("limit", "5");
    return this.http
      .get<IProduct[]>("https://fakestoreapi.com/products", { params })
      .pipe(
        delay(2000),
        retry(2),
        tap((products) => (this.products = products)),
        catchError(this.errorHandler.bind(this))
      );
  }

  create(IProduct: any): Observable<IProduct> {
    return this.http
      .post<IProduct>("https://fakestoreapi.com/products", IProduct)
      .pipe(
        tap((prod) => {
          this.products.push(prod);
        })
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message).pipe(
      tap((prod) => {
        this.products.push(prod);
      })
    );
  }
}
