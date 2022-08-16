import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenUsernames = ["Chris", "Anna"];

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      // keys below are controls
      // userData is a nested FormGroup inside FormGroup that contains controls
      userData: new FormGroup({
        /* FormControl arguments:
           1. First argument of FromControl (null) is the initial state, value of this control.
           2. Second argument will be a single or array of validators.
           3. Third argument asynchronous validator.
        */
        username: new FormControl(null, [
          Validators.required,
          // this.forbiddenNames.bind(this) - We must bind our validator to this class, because angular will check the validator.
          // If we only use this.forbiddenNames, the this will not refer to this class
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          // Async validator
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl("male"),
      // hobbies array is and array of dynamic controls
      // FormArray represent an array of controls
      hobbies: new FormArray([]),
    });

    // valueChanges change fires every time we change something on our form.
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    /* statusChanges listen to the form status. for example, if one input is invalid
     for some reason, the whole form will be invalid, and that the status that we will get back. */
    this.signupForm.statusChanges.subscribe((status) => console.log(status));

    // setValue - pre populated values to our form, initial data. we must enter data to all of our form arguments, to make setValue to work.
    this.signupForm.setValue({
      userData: {
        username: "Max",
        email: "max@test.com",
      },
      gender: "male",
      hobbies: [],
    });

    // patchValue, same as setValue but the difference is that here, we can assign data to specific arguments.
    this.signupForm.patchValue({
      userData: {
        username: "Anna",
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    // Dynamic creation of FormControl.
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }

  get controls() {
    return (this.signupForm.get("hobbies") as FormArray).controls;
  }

  // validator func
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  // Async validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
