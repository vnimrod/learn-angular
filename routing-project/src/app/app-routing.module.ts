import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  // When the path is reached, right component will be loaded
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UserComponent }],
  },
  {
    path: "servers",

    /* canActivate - Interface that a class can implement to be a guard
     deciding if a route can be activated. If all guards return true, 
     navigation continues. If any guard returns false, navigation is cancelled. */
    // canActivate: [AuthGuard],

    // canActivateChild - Interface that guard only our child routes,
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {
        // Dynamic id route
        path: ":id",
        component: ServerComponent,
        resolve: { server: ServerResolver },
      },
      {
        path: ":id/edit",
        component: EditServerComponent,
        // Here we add canDeactivate, and the component will load it when we try to leave this path.
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" },
  },
  // ** means catch all path you don't know.
  // THE ORDER MATTERS, we need to make sure that this route is the last one on our routs.
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})

    // With RouterModule.forRoot used to register all above routes to our app
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
