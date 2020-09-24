import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  isItEdit = false;
  realData;
  realDataKey
  constructor(
    public authService: AuthService,
    public router: Router,
    
  ) { }

  ngOnInit(): void {
    this.CarValueAreUpdated();
    console.log(this.isItEdit )

  }

  CarValueAreUpdated(){
    if(localStorage.getItem('CarKey') != undefined){
      this.isItEdit = true
      this.realData = JSON.parse(localStorage.getItem('Cardata'))
      this.realDataKey = localStorage.getItem('CarKey')
      console.log(this.realDataKey)
      localStorage.removeItem('Cardata')
      localStorage.removeItem('CarKey')
    }
  }
  
  openListing() {
   // this.ListofAll()
    this.router.navigate(['dashboard/car/listing']);
  }

  addMyCar(){
  //  this.authService.AddCarSet()
  }


  

}
