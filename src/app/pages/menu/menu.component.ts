import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu.service';
import Swal from 'sweetalert2';
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { Menu, Topping } from 'src/app/core/models/menu.models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  pageTitle: string = "Menu";
  breadCrumbItems: Array<{}> = [
    {
      label: "Setting",
    },
    {
      label: "Menu",
      active: true,
    },
  ];

  listMenu: Menu[];
  listTopping: Topping[];
  listLevel: Topping[];
  currentMenuID: number;
  formMenu: FormGroup;

  image: string | SafeUrl = "../../../assets/images/default-upload.png";
  currentImage: string | SafeUrl = this.image;
  base64img: string;

  cari = {
    nama: "",
    status: "",
    kategori: ""
  }

  kategori: boolean;
  is: any = {
    showForm: false,
    view: false,
    edit: false,
    create: false,
    search: false,
  };

  constructor(private menuService: MenuService, private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllMenu()
    this.formCreate()
  }

  formCreate() {
    this.formMenu = this.fb.group({
      nama: new FormControl('', [Validators.required]),
      kategori: new FormControl('', [Validators.required]),
      harga: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      deskripsi: new FormControl('', [Validators.required]),
    });

    this.currentImage = this.image;
  }

  updateImage(ev) {
    this.currentImage = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(ev.target.files[0])
    );

    var file = ev.dataTransfer ? ev.dataTransfer.files[0] : ev.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.base64img = reader.result;
    console.log(this.base64img);
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.formMenu.invalid) {
      this.alertToast('warning', "Lengkapi data dengan benar")
      return;
    }

    const body = {
      nama: this.formMenu.value.nama,
      kategori: this.formMenu.value.kategori,
      harga: this.formMenu.value.harga,
      status: this.formMenu.value.status,
      deskripsi: this.formMenu.value.deskripsi,
      foto: this.base64img
    }

    this.menuService.addMenu(body).subscribe({
      next: (data) => {
        if (data.status_code == 200) {
          this.getAllMenu()
          this.formCreate()
          this.alertToast("success", "Menu berhasil ditambahkan.")
        } else {
          this.alertToast("error", "Gagal dalam mengubah data.")
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onUpdate() {
    // stop here if form is invalid
    if (this.formMenu.invalid) {
      this.alertToast('warning', "Lengkapi data dengan benar")
      return;
    }

    const body = {
      nama: this.formMenu.value.nama,
      kategori: this.formMenu.value.kategori,
      harga: this.formMenu.value.harga,
      status: this.formMenu.value.status,
      deskripsi: this.formMenu.value.deskripsi,
      foto: this.base64img
    }

    this.menuService.updateMenuByID(this.currentMenuID, body).subscribe({
      next: (data) => {
        if (data.status_code == 200) {
          
          this.onEdit(this.currentMenuID);
          this.getAllMenu();
          this.alertToast("success", "Menu berhasil dirubah.")
        } else {
          this.alertToast("error", "Gagal dalam mengubah data.")
        }
      },
      error: (error) => {
        console.error(error);
      }
    })

    console.log(body)
  }

  searchMenu(val) {

    if (val == false) {
      this.getAllMenu()
      return;
    }

    const body = {
      nama: val.nama,
      status: val.status,
      kategori: val.kategori,
    };

    this.menuService.getAllMenu(body).subscribe({
      next: (data) => {
        console.log(data);
        this.listMenu = data.data
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getAllMenu() {
    this.menuService.getAllMenu().subscribe({
      next: (data) => {
        if(data.status_code == 200){
          this.listMenu = data.data
        }else{
          this.alertToast("error", "Gagal dalam memuat data.")
        }
      },
      error: (error)=> {
        console.error(error);
      }
    })
  }


  onEdit(id_menu) {
    console.log(id_menu);
    this.currentMenuID = id_menu;
    this.menuService.getMenuByID(this.currentMenuID).subscribe({
      next: (data) => {
        if(data.status_code == 200){
          this.scrollToTop()
          this.is.showForm = true;
          this.is.edit = true;
          this.formMenu.controls['nama'].setValue(data.data.menu.nama);
          this.formMenu.controls['kategori'].setValue(data.data.menu.kategori);
          this.formMenu.controls['harga'].setValue(data.data.menu.harga);
          this.formMenu.controls['status'].setValue(data.data.menu.status);
          this.formMenu.controls['deskripsi'].setValue(data.data.menu.deskripsi);

          this.listTopping = data.data.topping
          this.listLevel = data.data.level

         this.currentImage = data.data.menu.foto;
        }else{
          this.alertToast("error", "Gagal dalam memuat data.")
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  selected(e: any) {
    console.log(e.target.value);
    this.kategori = e.target.value;
  }

  resetForm(){
    this.formCreate()
    this.base64img = "";
    this.is.edit = false;
  }

  showForm() {
    this.is.showForm = true;
  }

  closeForm() {
    this.is.showForm = false;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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
