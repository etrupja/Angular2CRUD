import { Component, OnInit,AfterViewInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements AfterViewInit,OnInit   {
    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
      $(document).ready(function() {
        $('.modal').modal();
        console.log(".modal is ready");
        $('.tooltipped').tooltip({delay: 50});
        console.log(".tooltipped is ready");

      });
    } 
}