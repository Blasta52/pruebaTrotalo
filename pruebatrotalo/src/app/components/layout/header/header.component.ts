import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username:string = '';

  constructor() { 

    this.username = localStorage.getItem("contratista");

  }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    window.location.href = '/';
  }

}
