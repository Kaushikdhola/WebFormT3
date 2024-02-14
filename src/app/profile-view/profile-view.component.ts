import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  formData: any;

  constructor(private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    
    this.formData=JSON.parse(localStorage?.getItem("data") || "")
  }
}