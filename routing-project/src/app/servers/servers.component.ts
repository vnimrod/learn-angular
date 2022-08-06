import { Component, OnInit } from "@angular/core";
import { ServersService } from "./servers.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.css"],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    // ActivatedRoute, inject the current route.
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    /* with relative path, the navigate method doesn't know on which route we currently on.
       so we pass second argument, with relativeTo.
    */
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
