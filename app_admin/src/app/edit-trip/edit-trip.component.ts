import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService

  ) { }

  ngOnInit() {
    //retrive stashed tripId
    let tripCode = localStorage.getItem("tripCode");
    if(!tripCode) {
      alert ("Something is wrong, couldn't find stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log("EditTripComponent#onInit found tripCode " + tripCode);

    //initialize form
    this.editForm = this.formBuilder.group ({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.tripService.getTrip(tripCode)
      .then(data => {
        console.log(data);
        //Don't use editFrom.setValue() this will throw console error
        this.editForm.patchValue(data[0]);
      })
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      
      const token = this.authenticationService.getToken();

      // create authorization header with bearer token attribute (Savani, 2023, p. 1)
      const headers = {
        Authorization: `Bearer ${token}`
      };

      // call edit trip from the trip service object passing the values of edit form and the authorization bearer token (Savani, 2023, p. 1);(SNHU, 2023, p. 1)
      this.tripService.updateTrip(this.editForm.value, headers)
      .then(() => {
        this.router.navigate(['/list-trips']);
      });
      
    }
  }
}