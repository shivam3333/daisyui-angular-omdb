import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
const APIKEY = '638472b7';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  id!: string;
  movieDetail!: any
  errorMessage!: string;
  isSearching!: Boolean;

  constructor(private http: HttpClient, private router: Router, private movieService: MovieService ) {
    const state:any = this.router.getCurrentNavigation();
    const currentState = state.extras.state;
    this.id = currentState ? currentState.id : null;
  }

  ngOnInit(): void {
    this.isSearching = true;
    this.http
      .get(
        `https://www.omdbapi.com/?apikey=${APIKEY}&i=${this.id}`
      )
      .subscribe((response: any) => {
        this.isSearching = false;
        if(response.Response == 'True'){
          this.movieDetail = response;
        } else{
          this.movieDetail= {};
          this.errorMessage = response.Error;
        }
        
      });
  }

  goBack() {
    // Navigate back to the listing page
    const movieName = this.movieService.getSelectedMovie();
    console.log('movieName', movieName)
    this.router.navigate(['/'], { state: { movieName: movieName } });
  }
}
