let container = document.querySelector('.container');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');
let seatsCount = document.getElementById('count');
let moneyTotal = document.getElementById('total');
let moviesSelect = document.getElementById('movie');
let ticketPrice = +moviesSelect.value;

populateUi();

function updateCounts(){
    let selectedCounts = document.querySelectorAll('.row .seat.selected');
    let seatsArray = [...selectedCounts].map(function(seat){
        return [...seats].indexOf(seat)
    })
    let counts = selectedCounts.length;
    seatsCount.innerText = counts;
    moneyTotal.innerText = ticketPrice*counts;
    localStorage.setItem('seats',JSON.stringify(seatsArray));
}

function selectedMovieData(movie,movieValue){
    localStorage.setItem('Movie Selected',movie)
    localStorage.setItem('Movie Value Selected',movieValue)
}

function populateUi(){
    let seatsSelected = JSON.parse(localStorage.getItem('seats'));
    if(seatsSelected !== null && seatsSelected.length > 0){
        seats.forEach((seat,index) => {
            if(seatsSelected.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        });
    }
    let selectedMovie = localStorage.getItem('Movie Selected');
    if(selectedMovie !== null){
        moviesSelect.selectedIndex = selectedMovie;
    }
    updateCounts()
}

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateCounts()
    }
})

moviesSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    selectedMovieData(e.target.selectedIndex,+e.target.value);
    updateCounts()
})