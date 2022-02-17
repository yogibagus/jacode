import { Component, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public radarChartLabels = [
    "Eating",
    "Drinking",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running",
  ];

  public radarChartData = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 96, 27, 100], label: "Series B" },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {

    (sessionStorage.getItem('token')) ? this.router.navigateByUrl('/dashboard') : "";
    

  }
}
