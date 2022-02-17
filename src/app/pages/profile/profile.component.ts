import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { listAkses } from 'src/app/core/models/akses.models';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  pageTitle: string = "Users";
  breadCrumbItems: Array<{}> = [
    {
      label: "User",
    },
    {
      label: "Profile",
      active: true,
    },
  ];

  is: any = {
    showForm: false,
    view: false,
    edit: false,
    create: false,
    search: false,
  };

  

  listAkses: listAkses[];
  formProfile: FormGroup;
  currentRolesID: number;
  currentUserID: number;
  currentUserName: string = 'JC';

  image: string | SafeUrl = "../../../assets/images/default-upload.png";
  base64img: string;
  
  constructor(private userService: UserService, private authService: AuthenticationService, private fb: FormBuilder, private sanitizer: DomSanitizer) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.currentUserID = currentUser.user.id_user;
  }

  ngOnInit(): void {
    this.getSession();
    this.getUserByID();
    this.getAllHakAkses()
    this.formCreate()
  }

  formCreate() {
    this.formProfile = this.fb.group({
      nama: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telepon: new FormControl('', [Validators.required]),
      alamat: new FormControl('', [Validators.required]),
      hakAkses: new FormControl('', [Validators.required]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formProfile.controls; }

  updateImage(ev) {
    this.image = this.sanitizer.bypassSecurityTrustUrl(
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
    const body = {
      foto: this.base64img
    }
    this.userService.updateImageProfileUserByID(this.currentUserID, body).subscribe({
      next: (data) => {
        if (data.status_code == 200){
          this.getUserByID()
          this.alertToast("success", "Berhasil memperbarui gambar profile!");
        }else{
          this.alertToast('error', "Gagal memperbarui gambar profile!")
        }
        
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.formProfile.invalid) {
      this.alertToast('warning', "Lengkapi data dengan benar")
      return;
    }

    const body = {
      nama: this.formProfile.value.nama,
      email: this.formProfile.value.email,
      telepon: this.formProfile.value.telepon,
      alamat: this.formProfile.value.alamat,
      m_roles_id: this.formProfile.value.hakAkses,
    }

    this.userService.updateUserByID(this.currentUserID, body).subscribe({
      next: (data) => {
        if (data.status_code == 200){
          this.getUserByID()
          this.alertToast("success", "Berhasil memperbarui profile!");
        }else{
          this.alertToast("error", "Gagal memperbarui profile!");
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getAllHakAkses() {
    this.userService.getAllHakAkses().subscribe({
      next: (data) => {
        console.log(data);
        this.listAkses = data.data.list
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getUserByID() {
    this.userService.getUserByID(this.currentUserID).subscribe({
      next: (data) => {
        this.formProfile.controls['nama'].setValue(data.data.nama);
        this.formProfile.controls['email'].setValue(data.data.email);
        this.formProfile.controls['telepon'].setValue(data.data.telepon);
        this.formProfile.controls['alamat'].setValue(data.data.alamat);
        this.formProfile.controls['hakAkses'].setValue(data.data.roles_id);
        
        this.currentRolesID = data.data.roles_id;
        this.currentUserName = data.data.nama;
        if(data.data.foto != null){
          this.image = data.data.foto;
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getSession() {
    this.authService.getSession().subscribe({
      next: (data) => {
        console.log(data);

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
