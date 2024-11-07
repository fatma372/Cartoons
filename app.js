let charactersContainer = document.querySelector(".characters");  
let requestInfo;  
let charactersUrl = `https://api.disneyapi.dev/character?pageSize=20`;  

async function getCharacters(url) {  
    try {  
        let response = await fetch(url);  
        if (!response.ok) throw new Error('Network response was not ok');  
        
        let data = await response.json();  
        requestInfo = data.info;  
        console.log(requestInfo);  
        let characters = data.data;  
        console.log(characters);  

        //character cards  
        characters.forEach(character => {  
            let films = character.films.map(film => `<span class="char-film">${film}</span>`).join(' ');  
            let shows = character.tvShows.map(show => `<span class="char-show">${show}</span>`).join(' ');  

            charactersContainer.innerHTML += `  
                <div class="character-card">  
                    <img class="character-img" src="${character.imageUrl}" alt="${character.name}">  
                    <h3 class="character-title">${character.name}</h3>  
                    <p class="shows">Shows: ${shows ? shows : `<span class="invalid-text">No TV Shows found!</span>`}</p>   
                    <p class="films">Films: ${films ? films :  `<span class="invalid-text">No Films found!</span>`}</p>  
                </div>`;  
        });  
    } catch (error) {  
        console.error('Error fetching characters:', error);  
    }  
}  

getCharacters(charactersUrl);  

// Pagination Variables  
let page = 1;  
let currentPage = document.querySelector(".page-counter");  
let prevBtn = document.querySelector(".prev-btn");  
let nextBtn = document.querySelector(".next-btn");  

prevBtn.addEventListener("click", function() {  
    if (requestInfo?.previousPage) { 
        charactersContainer.innerHTML = "";
        page--;  
        currentPage.innerHTML = `${page}`;  
        getCharacters(requestInfo.previousPage);  
    }  
});  

nextBtn.addEventListener("click", function() {  
    if (requestInfo?.nextPage) {  
        charactersContainer.innerHTML = "";
        page++;  
        currentPage.innerHTML = `${page}`;  
        getCharacters(requestInfo.nextPage);  
    }  
});  

// Additional button for more characters  
let moreBtn = document.querySelector(".float-btn");  
moreBtn.addEventListener("click", function() {  
    if (requestInfo?.nextPage) {  
        page++;  
        currentPage.innerHTML = `${page}`;  
        getCharacters(requestInfo.nextPage);  
    }  
});