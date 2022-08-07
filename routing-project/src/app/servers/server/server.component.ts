import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.server = data["server"];
    });
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   );
  }

  onEdit() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      /* When we click edit, we want to preserve the query params from the previous route /[server]?allowEdit=[x] to the new route /edit?allowEdit=[x], so we use queryParamsHandling: "preserve"
         Without the use of queryParamsHandling, the new route (when we click edit), will be just /edit and we lose our access to allowEdit=x=[x]*/
      queryParamsHandling: "preserve",
    });
  }
}
