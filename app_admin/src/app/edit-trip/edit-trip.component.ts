import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  
  editForm!: FormGroup; 
  submitted = false; 
  
  constructor( 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) { }
  
  ngOnInit() {
    // retrieve stashed tripId 
    let tripCode = localStorage.getItem("tripCode"); 
    if (!tripCode) {
      alert ("Something wrong, counldn't find where I stashed tripCode!"); 
      this.router.navigate(['']); 
      return;
    } 
    
    console.log('EditTripComponent#onInit found tripCode ' + tripCode); 
    
    //initialize form 
    this.editForm = this.formBuilder.group({
      _id: [], 
      code: [tripCode, Validators.required], 
      name: ['', Validators.required], 
      length: ['', Validators.required], 
      start: ['', Validators.required], 
      resort: ['', Validators.required], 
      perPerson: ['', Validators.required], 
      image: ['', Validators.required], 
      description: ['', Validators.required],
    })
    
    console.log('EditTripComponent#onInit calling TripDataService#getTrip(\'' + tripCode + '\')');

    this.tripService.getTrip(tripCode)
      .then(data => {
        console.log(data);
        // Don't use editForm.setValue() as it will throw
        this.editForm.patchValue(data);
      })
  }
  
  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      const token = this.authenticationService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`
      };


      this.tripService.updateTrip(this.editForm.value)
        .then((data: any) => {
          console.log(data);
          this.router.navigate(['']);
        });
    }
  }

  // get the form short name to access the form fields 
  get f() { return this.editForm.controls; }

}


