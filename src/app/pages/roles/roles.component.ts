import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;
  breadCrumbItems: Array<{}>;
  pageTitle: string;
  is: any = {
    edit: false,
    view: false,
  };
  totalItems: any;
  filterCollapsed: boolean;
  modelParam: {
    nama;
  };
  listData: any;
  listAkses: any;
  showForm: boolean;
  listStatus: any;
  modelCheck: {
    DataMaster;
  };
  model: {
    id;
    nama;
    akses: {
      master: {
        m_user;
        m_roles;
      };
    };
  };

  constructor(private LandaService: LandaService, private Router: Router) {}

  ngOnInit(): void {
    this.pageTitle = "HAK AKSES";
    this.breadCrumbItems = [
      {
        label: "Master Admin",
      },
      {
        label: "Hak Akses",
        active: true,
      },
    ];
    this.modelParam = {
      nama: "",
    };
    this.getData();
    this.empty();
    this.filterCollapsed = true;
  }

  getData() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      pagingType: "full_numbers",
      ajax: (dataTablesParameters: any, callback) => {
        const params = {
          filter: JSON.stringify(this.modelParam),
          offset: dataTablesParameters.start,
          limit: dataTablesParameters.length,
        };
        this.LandaService.DataGet("akses/index", params).subscribe(
          (res: any) => {
            this.listData = res.data.list;
            this.totalItems = res.data.totalItems;
            callback({
              recordsTotal: res.data.totalItems,
              recordsFiltered: res.data.totalItems,
              data: [],
            });
          }
        );
      },
    };
  }

  empty() {
    this.modelCheck = {
      DataMaster: false
    };

    this.model = {
      id: "",
      nama: "",
      akses: {
        master: {
          m_user: false, 
          m_roles: false,
        },
      },
    };
    this.getData();
  }

  checkAllKolom(val, arr, type) {
    arr.forEach((value: any, key: any) => {
      Object.keys(value).forEach((key) => {
        if (type == "master") {
          if (val) {
            this.model.akses.master[value] = true;
          } else {
            this.model.akses.master[value] = false;
          }
        }
      });
    });
  }

  index() {
    this.showForm = !this.showForm;
    this.pageTitle = "HAK AKSES";
    this.getData();
  }

  create() {
    this.empty();
    this.showForm = !this.showForm;
    this.pageTitle = "Tambah Hak Akses";
    this.is = {
      view: false,
      edit: false,
    }
  }

  edit(val) {
    this.showForm = !this.showForm;
    this.model.nama = val.nama;
    this.pageTitle = "Ubah Data : " + val.nama;
    this.getData();
    this.checkData(val);
    this.model.id = val.id;
    this.is = {
      view: false,
      edit: true,
    }
  }

  view(val) {
    this.showForm = !this.showForm;
    this.model.nama = val.nama;
    this.pageTitle = "Lihat Data : " + val.nama;
    this.getData();
    this.checkData(val);
    this.is = {
      view: true,
      edit: false,
    }
  }

  save() {
    const final = Object.assign(this.model);
    this.LandaService.DataPost("akses/save", final).subscribe((res: any) => {
      if (res.status_code === 200) {
        this.LandaService.alertSuccess(
          "Berhasil",
          "Data Hak Akses telah disimpan!"
        );
        this.index();
      } else {
        this.LandaService.alertError("Mohon Maaf", res.errors);
      }
    });
  }

  delete(val) {
    const data = {
      id: val != null ? val.id : null,
    };
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Menghapus data Pengguna akan berpengaruh terhadap data lainnya",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Ya, Hapus data ini !",
    }).then((result) => {
      if (result.value) {
        this.LandaService.DataPost("akses/delete", data).subscribe(
          (res: any) => {
            if (res.status_code === 200) {
              this.LandaService.alertSuccess(
                "Berhasil",
                "Data Hak Akses telah dihapus !"
              );
              this.reloadDataTable();
            } else {
              this.LandaService.alertError("Mohon Maaf", res.errors);
            }
          }
        );
      }
    });
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  check(type: string) {
    if (type == "master") {
      const bool = [];
      for (const i in this.model.akses.master) {
        bool.push(this.model.akses.master[i]);
      }
      if (!bool.includes(false)) {
        this.modelCheck.DataMaster = true;
      } else {
        this.modelCheck.DataMaster = false;
      }
    }
  }

  checkData(val) {
    const boolMaster = [];

    Object.keys(val.akses).forEach((akses) => {
      if (akses.substr(0, 1) == "m") {
        this.model.akses.master[akses] = val.akses[akses];
        boolMaster.push(this.model.akses.master[akses]);
      }
    });

    if (!boolMaster.includes(false)) {
      this.modelCheck.DataMaster = true;
    } else {
      this.modelCheck.DataMaster = false;
    }
  }
  
  filter() {
    this.filterCollapsed = !this.filterCollapsed;
  }
}
