import { Component, OnInit } from "@angular/core";
import { PelisService } from "../../services/pelis.service";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
})
export class DetailsPage implements OnInit {
  content: object = null;

  constructor(
    private _serv: PelisService,
    private activatedRoute: ActivatedRoute,
    private _auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this._serv.getDetails(id).subscribe((result) => (this.content = result));
  }

  closeLog() {
    this._auth.logout();
    this.router.navigate(["/"]);
  }
}
