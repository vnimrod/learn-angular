import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-assignment",
  templateUrl: "./assignment.component.html",
  styleUrls: ["./assignment.component.css"],
})
export class AssignmentComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenProjectName = "Test";
  constructor() {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        Validators.required,
        this.forbiddenName.bind(this)
      ),
      email: new FormControl("xyz@gmail.com", [
        Validators.required,
        Validators.email,
      ]),
      projectStatus: new FormControl("critical"),
    });

    this.projectForm.statusChanges.subscribe((status) => console.log(status));
  }

  onSaveProject() {
    console.log(this.projectForm);
    this.projectForm.reset();
  }

  forbiddenName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbiddenProjectName === control.value) {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
