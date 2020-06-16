import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPelis } from "../shared/ipelis.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PelisService {
  private url_omdb: string = environment.URL_OMDB;
  private apiKey: string = environment.APIKEY_OMDB;
  private url: string;

  constructor(private _http: HttpClient) {}

  searchMovies(title: string, type: string) {
    this.url = `http://www.omdbapi.com/?s=${encodeURI(
      title
    )}&type=${type}&apikey=${this.apiKey}`;
    //console.log(this.url);
    return this._http
      .get<IPelis>(this.url)
      .pipe(map((results) => results["Search"]));
  }

  getDetails(id: string) {
    return this._http.get<IPelis>(
      `http://www.omdbapi.com/?i=${id}&plot=full&apikey=${this.apiKey}`
    );
  }
}
