import { Component, OnInit, ViewChild } from "@angular/core";
import { LandaService } from "src/app/core/services/landa.service";
import { DataTableDirective } from "angular-datatables";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;
  pageTitle: string = "Users";
  breadCrumbItems: Array<{}> = [
    {
      label: "Master Admin",
    },
    {
      label: "Pengguna",
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

  model: any;
  modelParams: { nama; username };
  listAkses: any;
  listData: any;
  totalItems: any;

  constructor(private landaService: LandaService) {}

  ngOnInit(): void {
    this.empty();
    this.getData();
  }

  empty() {
    this.model = {};
    this.modelParams = {
      nama: "",
      username: "",
    };
  }

  getData() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      searching: false,
      lengthChange: false,
      pagingType: "full_numbers",
      ajax: (dataTablesParameter: any, callback) => {
        const params = {
          filter: JSON.stringify(this.modelParams),
          offset: dataTablesParameter.start,
          limit: dataTablesParameter.length,
        };
        this.landaService
          .DataGet("/user/index", params)
          .subscribe((res: any) => {
            this.listData = res.data.list;
            this.totalItems = res.data.totalItems;
            callback({
              recordsTotal: res.data.totalItems,
              recordsFiltered: res.data.totalItems,
              data: [],
            });
          });
      },
    };
  }

  index() {
    this.empty();
    this.is = {
      showForm: !this.is.showForm,
      view: false,
      edit: false,
      create: false,
      search: false,
    };
    this.getData();
  }

  create() {
    this.empty();
    this.is = {
      showForm: !this.is.showForm,
      view: false,
      edit: false,
      create: true,
      search: false,
    };
    this.getAkses();
  }

  edit(val) {
    this.model = val;
    this.is = {
      showForm: !this.is.showForm,
      view: false,
      edit: true,
      create: false,
    };
    this.getAkses();
  }

  view(val) {
    this.model = val;
    this.is = {
      showForm: !this.is.showForm,
      view: true,
      edit: false,
      create: false,
    };
    this.getAkses();
  }

  delete(val) {
    this.landaService
      .DataPost("user/delete", { id: val.id })
      .subscribe((res: any) => {
        if (res.status_code == 200) {
          this.landaService.alertSuccess("Berhasil", "User berhasil dihapus!");
          this.reloadDataTable();
        } else {
          this.landaService.alertError("Gagal", res.errors);
        }
      });
  }

  save() {
    this.landaService
      .DataPost("user/save", this.model)
      .subscribe((res: any) => {
        if (res.status_code == 200) {
          this.landaService.alertSuccess("Berhasil", "User berhasil dibuat!");
          this.index();
        } else {
          this.landaService.alertError("Gagal", res.errors);
        }
      });
  }

  getAkses() {
    this.landaService.DataGet("akses/index", {}).subscribe((res: any) => {
      this.listAkses = res.data.list;
    });
  }

  toggle(object, key) {
    this[object][key] = !this[object][key];
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}
