import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  /* Subject is a better approach to use then using an emitter 
     (Reminder - we create on a service and new emitter on it, then emit to it from component, then subscribe to it on other component)
  */
  // A Subject is and object we can subscribe to, but its active because we can actively call next on it from OUTSIDE.
  // We call next also in observable, but we call it from inside the observable where we created it (home.component is an example).

  /* Rules of Thumbs:
   1. USING OF SUBJECT IS THE RECOMMENDED WAY. DO NOT USE EVENT EMITTER
   2. WE MUST UNSUBSCRIBE TO SUBJECTS THAT WE CREATED.
   3. WHEN USING @OUTPUT ON COMPONENTS, WE STILL NEED TO USE EVENT EMITTER.
   */
  activatedEmitter = new Subject<boolean>();
}
