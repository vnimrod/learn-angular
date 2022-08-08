import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { ServersService } from "../servers.service";

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  /* Resolve Interface that classes can implement to be a data provider. A data provider class can be used with the router
 to resolve data during navigation. The interface defines a resolve() method that is invoked right after the 
 ResolveStart router event. The router waits for the data to be resolved before the route is finally activated. */

  // this method will be call by angular when the route /servers/:id will be called on app-routing module.
  // the data it return here, will be stored on app-routing module on children -> :id (resolve)
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params["id"]);
  }
}
