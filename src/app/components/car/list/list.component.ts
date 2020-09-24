import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  ListofCars
  items
  constructor(
    private toastr: ToastrService,
    public authService: AuthService,
    public router: Router,

  ) {
    this.ListofAll();

  }

  ngOnInit(): void {
  }

  ListofAll() {
    this.ListofCars = this.authService.fruitObject.snapshotChanges().subscribe((data) => {
      this.ListofCars = data
      console.log(data)
    });


  }

  openListing() {
    this.ListofAll()
    this.router.navigate(['dashboard/car/listing']);
  }
  addMyList() {
   // this.ListofAll()
    this.router.navigate(['dashboard/car/add']);
  }

  DeleteMyVal(key) {
    // alert(key)
    this.toastr.success('Car Added Successfully !!!', 'Success')
    this.authService.fruitObject.remove(key);
  } 

  updateMyData(key , bulk){
    
    localStorage.setItem('CarKey',key);
    localStorage.setItem('Cardata',JSON.stringify(bulk));
    this.router.navigate(['dashboard/car/add']);

  }
}
