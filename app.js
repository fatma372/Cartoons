let charactersContainer = document.querySelector(".characters");
let requestInfo;
let charactersUrl = `https://api.disneyapi.dev/character?pageSize=20`
async function getCharacters(url) {
    let response = await fetch(url);
    let data = await response.json();
    requestInfo = data.info;
    console.log(requestInfo);
    let characters = data.data
    console.log(characters);
    characters.map(function (character) {
        //imageUrl, tvShows, films
        let films = character.films.map(film => `<span class="char-film">${film}</span>`).join(' ');
        let shows = character.tvShows.map(show => `<span class="char-show">${show}</span>`).join(' ');
        charactersContainer.innerHTML += `  
        <div class="characters">  
            <div class="character-card">  
                <img class="character-img" src="${character.imageUrl}" alt="cartoon character">  
                <h3 class="character-title">Toma Chan</h3>  
                <p class="shows"> Shows: ${shows ? shows : `<span class="invalid-text"> No TV Shows found!</span>`}</p> 
                <p class="films">Films: ${films ? films :  `<span class="invalid-text"> No Films found!</span>`}</p>  
            </div>  
        </div>  
    `;
    })
}
getCharacters(charactersUrl);

// Pagination Buttons
let page=1;
let currentPage= document.querySelector(".page-counter");
let prevBtn = document.querySelector(".prev-btn");

prevBtn.addEventListener("click", function(){
    
    if(requestInfo.previousPage){
        charactersContainer.innerHTML="";
        page--;
        currentPage.innerHTML=`${page}`;
        //moreCounter.innerHTML=`${requestInfo.totalPages-page}`;

        getCharacters(requestInfo.previousPage);
    }
})   

let nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", function(){
    if(requestInfo.nextPage){
        charactersContainer.innerHTML=""
        page++;
        currentPage.innerHTML=`${page}`;
        //moreCounter.innerHTML=`${requestInfo.totalPages-page}`;
        getCharacters(requestInfo.nextPage);
    }
})


let moreBtn = document.querySelector(".float-btn");
// let moreCounter= document.querySelector(".more-counter");
moreBtn.addEventListener("click", function(){
    console.log(requestInfo.totalPages)
    if(requestInfo.nextPage){
        page++;
        //moreCounter.innerHTML=`${requestInfo.totalPages-page}`;
        currentPage.innerHTML=`${page}`;
        getCharacters(requestInfo.nextPage);
    }
});