const date = new Date();
const year =date.getFullYear(); // used for the query  
const isoCurrentDate = date.toISOString().substring(0,10); // used for the query 
const apiUrl = 'https:/api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=***&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const search = 'https:/api.themoviedb.org/3/search/movie?api_key=***&query=';
const news =`https:/api.themoviedb.org/3/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&api_key=***&page=1`;
const all = `https://api.themoviedb.org/3/discover/movie?api_key=***&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${year-2}-01-01&primary_release_date.lte=${isoCurrentDate}&vote_average.gte>7`;
const mostRated = 'https:/api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=***';

class CinemaHouse{
    constructor(){
        this.db;
        this.img=imgPath;
        this.search = search;
    }
    /**
     * 
      This function serves as a default to fetch data. 
      The  function will fetch data from the first page only and  according to the query that was ordered.     
      */
    async getTheMovies(urlLink){
        const repo = await fetch(urlLink);
        this.db = await repo.json();
    };
   
   /**
    * In the function 'getAllMovies()' the number of Pagination is intentionally reduced so that if we want to fetch 
      all the data from all the pages that the API owner offer then we just have to replace the line with 

       const total_pages = response.total_pages
    */
   async getAllMovies(){
    const repo = await fetch(all);
    let response = await repo.json();
    let movies = Array.from(response.results);
    const total_pages = Number(response.total_pages)/(Number(response.total_pages)/2)+1; // <-
    let current_page = Number(response.page); 
    if(total_pages && total_pages > current_page){
        while (total_pages > current_page){
            console.log(all.replace('page=1', 'page='+current_page));
            current_page +=1;
            const repo = await fetch(all.replace('page=1', 'page='+current_page));
            response = await repo.json()
            //console.log(response.results);
            movies = movies.concat(Array.from(response.results));
            console.log(response.results, 'current page:'+response.page+' and total page:'+ response.total_pages, current_page);

        } 
     }
     this.db = movies;

   }

   operateMenuOption(option){
    switch(option){

        case 'most popular':
            return apiUrl;  

        case 'the newest':
           return news; 

        case 'highest rated':
          return mostRated;

        default:
          return all;
    }

   };
    
}
//getTheMovies();

