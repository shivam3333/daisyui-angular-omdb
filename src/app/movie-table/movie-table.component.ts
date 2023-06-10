import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const APIKEY = "638472b7";

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css']
})


export class MovieTableComponent implements OnInit {
  
  movies: any[] = [];
  page: number = 1;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http.get(`https://www.omdbapi.com/?s=movie&apikey=${APIKEY}`)
      .subscribe((response: any) => {
        this.movies = response.Search;
        this.sortByReleaseDate();
        console.log('response.Search', response.Search);
      });
  }

  sortByReleaseDate() {
    this.movies.sort((a, b) => {
      const dateA = new Date(a.Year);
      const dateB = new Date(b.Year);
      return dateB.getTime() - dateA.getTime();
    });
  }

}
