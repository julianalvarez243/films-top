let pagina = 1;
const buttonPrevious = document.getElementById('btnPrevious');
const buttonNext = document.getElementById('btnNext');

buttonNext.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        loadFilms();
    }
});

buttonPrevious.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        loadFilms();
    }
});


const loadFilms = async() => {

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=6fb66c673ee1da915a9c06774c339b15&language=en-US&page=${pagina}`);
        console.log(respuesta);

        if (respuesta.status == 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => { 
               let forAdult = "+10 years"
                if (pelicula.adult) {
                    forAdult = "+18 years"
                }
                peliculas += `
                <div class="film">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}
                ">
                <h3 class="title">${pelicula.title}</h3>
                <p class="description">${pelicula.overview}</p>
                </div>
                `;
            });

            document.getElementById('content').innerHTML = peliculas;

        } else if(respuesta.status == 401) {
            console.log("Error in the key");
        } else {
            console.log("Film not found")
        }
    } catch (error) {
        console.log(error);
    } 

}

loadFilms();