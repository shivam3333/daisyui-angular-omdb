import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service'; // Import your data service

const APIKEY = '638472b7';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css'],
})
export class MovieTableComponent implements OnInit {
  movies: any[] = [];
  page: number = 1;
  config: PaginationInstance = {
    id: 'omdb',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  searchMovie!: string ;
  searchMovieName: string ='movie';
  errorMessage!: String;

  constructor(private http: HttpClient, private router: Router, private movieService: MovieService) {
    const state:any = this.router.getCurrentNavigation();
    const currentState = state.extras.state;
    this.searchMovieName = currentState ? currentState.movieName : '';
    if(this.searchMovieName)
      this.searchMovie = this.searchMovieName;
  }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    let searchquery = `&s=${this.searchMovieName}`;
    if(!this.searchMovieName)
      searchquery = `&s=movie`;
    this.http
      .get(
        `https://www.omdbapi.com/?apikey=${APIKEY}&page=${this.config.currentPage}${searchquery}`
      )
      .subscribe((response: any) => {
        console.log('response === ', response);
        if(response.Response == 'True'){
          this.movies = response.Search;
          this.config.totalItems = response.totalResults;
          this.sortByReleaseDate();
          
        } else{
          this.movies=[];
          this.errorMessage = response.Error;
        }
        
      });
  }

  sortByReleaseDate() {
    this.movies.sort((a, b) => {
      const dateA = new Date(a.Year);
      const dateB = new Date(b.Year);
      return dateB.getTime() - dateA.getTime();
    });
  }

  onPageChange(page: number) {
    this.config.currentPage = page;
    this.fetchMovies();
  }

  applyFilter(search: string) {
    this.config.currentPage = 1;
    this.searchMovieName = search;
    this.fetchMovies();
  }

  clearFilter(){
    this.config.currentPage = 1;
    this.searchMovie ='';
    this.searchMovieName = 'movie';
    this.fetchMovies();
  }

  goToDetails(id: string) {
    // Navigate to the details page and store the ID in the router state
    console.log('id', id);
    this.movieService.setSelectedMovie(this.searchMovie);
    this.router.navigate(['/movie-details'], { state: { id: id } });
  }
}
