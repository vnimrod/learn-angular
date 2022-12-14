import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  // Getting access to the local elements that has the f attribute on them. (our form)
  // With this we don't need to pass f as an argument to onSubmit below
  @ViewChild("f", { static: false }) signupForm: NgForm;
  defaultQuestion = "teacher";
  answer = "";
  genders = ["male", "female"];
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: "",
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = "Superuser";

    /* setValue({}) - allows us to set the value of the whole form. 
       we need to pass js object that exactly representing our form.
       This is a bad approach, because it setting the values of all our form and overwrite other values we entered.
    */
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    /* 
     form.patchValue({}) - better approach then setValue({}).
      Here we pass only the properties we want to overwrite.
    */
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  // By adding #f on our form, we have access through NgForm, to the NgForm object created by angular of our added form (on app.component.html)
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // reset() - will reset all of our form
    this.signupForm.reset();
  }
}
