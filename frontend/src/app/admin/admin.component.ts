import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminTab } from './AdminTab.enum';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public activeTab: AdminTab = AdminTab.Orders;
  public adminTab = AdminTab;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let tab: AdminTab = <AdminTab>this.route.snapshot.paramMap.get('tab');

    if (tab !== null) {
      this.activeTab = tab;
    }
  }

}
