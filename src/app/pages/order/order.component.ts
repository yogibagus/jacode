import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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

}
