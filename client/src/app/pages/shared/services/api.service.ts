import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: "root"
})

export class ApiService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
      return this.http.get<any>('/api/products')
  }

  getMain():  Observable<any> {
    return this.http.get<any>('/api/main')
  }
}
