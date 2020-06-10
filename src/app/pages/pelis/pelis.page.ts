import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { PelisService } from "../../services/pelis.service";
import { AuthService } from "../../services/auth.service";
import { IPelis } from "../../shared/ipelis.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-pelis",
  templateUrl: "./pelis.page.html",
  styleUrls: ["./pelis.page.scss"],
})
export class PelisPage implements OnInit {
  results: Observable<IPelis>;
  term: string = "";
  type: string = "";

  constructor(
    private _serv: PelisService,
    private _auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  searchChanged() {
    this.results = this._serv.searchMovies(this.term, this.type);
  }

  closeLog() {
    this._auth.logout();
    this.router.navigate(["/"]);
  }
}
