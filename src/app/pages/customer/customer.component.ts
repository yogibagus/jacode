import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { userDetail } from 'src/app/core/models/user.models';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  pageTitle: string = "Daftar Customer";
  breadCrumbItems: Array<{}> = [
    {
      label: "Setting",
    },
    {
      label: "Customer",
      active: true,
    },
  ];

  listCustomer: userDetail[];
  showModal: boolean;
  detailCustomer: userDetail = {
    ktp: "https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif",
    status : 0
  };

  defaultImg: "https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif";
  currentUserID: number;
  currentSearch: string;
  
  cari = {
    nama : "",
    status: ""
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllCustomer()
  }

  getAllCustomer() {
    const body = {};
    this.userService.getAllCustomer(body).subscribe({
      next: (data) => {
        this.listCustomer = data.data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  openModal(event : any) {
    this.showModal = true; // Show-Hide Modal Check
    this.detailCustomer.ktp = this.defaultImg;
    this.currentUserID = event.target.id;
    this.userService.getUserByID(this.currentUserID).subscribe({
      next: (data) => {
        if(data.status_code == 200){
          this.detailCustomer = data.data;
        }else{
          this.showModal = false;
          this.alertToast("error", "Gagal mendapatkan data")
        }
      },
      error: (error) => {
        this.showModal = false;
        console.error(error);
      }
    })
  }

  updateStatus(status) {
    console.log(status)
    const body = {
      status: status
    }
    this.userService.updateUserByID(this.currentUserID, body).subscribe({
      next: (data) => {
        if (data.status_code == 200) {
          this.showModal = false;
          this.getAllCustomer()
          this.alertToast("success", "Berhasil merubah status")
        } else {
          this.alertToast("error", "Gagal merubah status")
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  hide() {
    this.showModal = false;
  }

  searchCustomer(val) {

    if(val == false){
      this.getAllCustomer()
      return;
    }

    const body = {
      nama: val.nama,
      status: val.status,
    };

    this.userService.getAllCustomer(body).subscribe({
      next: (data) => {
        console.log(data);
        this.listCustomer = data.data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  alertToast(icon, title) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }

}
