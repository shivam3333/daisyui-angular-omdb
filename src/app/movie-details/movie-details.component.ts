import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  id!: string;

  constructor(private router: Router) {
    // Retrieve the ID from the router state
    const state = this.router.getCurrentNavigation()
    console.log("state", state);
  }

  ngOnInit(): void {

  }

}
