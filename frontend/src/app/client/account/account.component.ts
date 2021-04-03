import { Component, OnInit } from '@angular/core';
import { AccountTab } from './accountTab.enum';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public activeTab: AccountTab = AccountTab.AccountSettings;
  public accountTab = AccountTab;
  
  constructor() { }

  ngOnInit(): void {
  }

}
