const movieList = document.querySelector('main');
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('nav');
const optionsMenu=document.querySelector('.menu-list');
const searchForm = document.querySelector('form');
const seachInput = document.querySelector('.search input');
const cinemaHouse = new CinemaHouse();
let isMenuOpen = false;


const toggleNav = () =>{
    console.log(navList);
    navList.classList.toggle('pop-menu-list');

};
menuBtn.addEventListener('click',() =>{
    if(!isMenuOpen){
        menuBtn.classList.add('open')
        isMenuOpen = true;
    }else{
        menuBtn.classList.remove('open');
        isMenuOpen = false;
    }
    toggleNav();
});

// render the site in every change in the data.
const render = (item, movie) =>{
    summary=String(movie.overview).length? movie.overview: "no brief for this movie";
    img = movie.poster_path? cinemaHouse.img + movie.poster_path: "/movieProj/img/unAvailable.jpg";
    const vote_average = Number(movie.vote_average);
    const release_year =new Date(movie.release_date).getFullYear();
    item.innerHTML = `
    <img src=${img} alt="">
    <div class="movie-info unAvailable">
        <h3>${String(movie.title).trim()}</h3>
        <span class="${vote_average > 7 ? 'red':'normal'}">${vote_average}</span>
    </div>
    <div class="movie-overview"><p><strong>Summary</strong>:<br><br>${summary}<br><br>Year: ${release_year}</p></div>
    `;
    movieList.appendChild(item);
}

cinemaHouse.getTheMovies(cinemaHouse.operateMenuOption('Most Popular')).then(() =>{
    movieList.innerHTML=``;
    cinemaHouse.db.results.forEach(element => {
        
        const item = document.createElement('div');
        item.classList.add('movie');
      //  console.log(element);
        render(item, element);
    });
}).catch(()=>{
    console.log('NOTHING')
});

searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    if(seachInput.value.trim().length){
        const term = seachInput.value.trim().toLowerCase();
        console.log(term);
        cinemaHouse.getTheMovies(cinemaHouse.search + term).then(()=>{
            movieList.innerHTML=``;
            cinemaHouse.db.results.forEach(element => {
                const item = document.createElement('div');
                item.classList.add('movie');
              //  console.log(element);
                render(item, element);
            });

        }).catch(()=>{
            console.log('No search results');
        });      
    }
});


optionsMenu.addEventListener('click', e =>{

 console.log(e.target.textContent);
 const option =e.target.textContent.toLowerCase();
 console.log(option);

 if(e.target.textContent.toLowerCase()!=='all'){

    cinemaHouse.getTheMovies(cinemaHouse.operateMenuOption(option)).then(() =>{
        movieList.innerHTML=``;
        cinemaHouse.db.results.forEach(element => {
           const item = document.createElement('div');
           item.classList.add('movie');
          console.log(element);
           render(item, element);
        });
   }).catch(()=>{
       console.log('NOTHING');
   });
 }else{
    cinemaHouse.getAllMovies(cinemaHouse.operateMenuOption()).then(() =>{
        movieList.innerHTML=``;
        cinemaHouse.db.forEach(element => {
           const item = document.createElement('div');
           item.classList.add('movie');
          // console.log(element);
           render(item, element);
        });
   }).catch(()=>{
       console.log('NOTHING');
   });
 }
});




