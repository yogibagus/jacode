import { Component, OnInit } from '@angular/core';
import { detail, menuOrder, Order } from 'src/app/core/models/order.models';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  is: any = {
    showDetail: false,
    showButtonAction: false,
    showSearch: false,
  };

  ngOnInit(): void {
    this.getAllOrder();
  }

  listOrder: Order[];
  listMenu: menuOrder[];
  order: detail;
  pageTitle: string = "Orders";
  breadCrumbItems: Array<{}> = [
    {
      label: "Kitchen",
    },
    {
      label: "Orders",
      active: true,
    },
  ];

  cari: any = {
    nama: ""
  }


  getAllOrder(){
    const body = {
      status: 0
    }
    this.orderService.getAllOrder(body).subscribe({
      next: (data) => {
        if(data.status_code == 200){
          this.listOrder = data.data
        }else{
          this.alertToast("error", "Gagal dalam memuat data.");
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getOrderFiltered(status) {
    const body = {
      status: status
    }
    this.orderService.getAllOrder(body).subscribe({
      next: (data) => {
        if (data.status_code == 200) {
          this.listOrder = data.data
        } else {
          this.alertToast("error", "Tidak ditemukan.");
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getOrderFilteredString(nama) {
    const body = {
      nama: nama
    }
    this.orderService.getAllOrder(body).subscribe({
      next: (data) => {
        if (data.status_code == 200) {
          this.listOrder = data.data
        } else {
          this.alertToast("error", "Tidak ditemukan.");
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getDetailOrder(id_order) {
    console.log(id_order);
    this.orderService.getOrderByID(id_order).subscribe({
      next: (data) => {
        console.log(data)
        if (data.status_code == 200) {
          this.is.showDetail = true
          this.is.showButtonAction = true
          this.order = data.data.order
          this.listMenu = data.data.detail
        } else {
          this.alertToast("error", "Gagal dalam memuat data.");
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  toggleSearch(val){
    if(val == true){
      this.is.showSearch = true
    }else{
      this.is.showSearch = false
    }
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
