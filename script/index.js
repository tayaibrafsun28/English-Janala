// load lesson function

const loadLessons = () =>{

    const levelURL = "https://openapi.programming-hero.com/api/levels/all"
    fetch(levelURL) // promise of response
    .then(res => res.json()) // promise of json data
    .then(json => displayLessons(json.data));
}

// load words function

const loadLevelWord = (id) =>{

    const levelWordURL = `https://openapi.programming-hero.com/api/level/${id}`
    
    fetch(levelWordURL) //promise of response
    .then(res => res.json()) // promise of json data
    .then(data => displayLevelWords(data.data))

}


// display words

const displayLevelWords = (words) =>{
    

    // get container and empty it

    const wordContainer = document.getElementById('word-container')

    wordContainer.innerHTML = ``;


//     {
        
// id: 81
// level: 1
// meaning: "বল"
// pronunciation: "বল"
// word: "Ball"
//     }

    // get into every lessons

    words.forEach((word) => {
 
        // create element

    const wordCard = document.createElement('div')

    wordCard.innerHTML = `
    
    <div class="word-card bg-white p-7 text-center rounded-xl">

                <div class="space-y-3">
                    <h1 class="text-2xl md:text-3xl font-bold">${word.word}</h1>
                    <p class="text-lg md:text-xl font-medium">Meaning /Pronounciation</p>
                    <p class=" text-xl md:text-2xl font-semibold">${word.meaning} / ${word.pronunciation}</p>
                </div>

                <div class="flex justify-between mt-8">
                    <span class="p-2 bg-[#E8F4FF] hover:bg-sky-300 rounded-md"><i class="fa-solid fa-circle-info"></i></span>
                    <span class="p-2 bg-[#E8F4FF] hover:bg-sky-300 rounded-md"><i class="fa-solid fa-volume"></i></span>
                </div>

    </div>

    `

    // append to word container

    wordContainer.append(wordCard)

    });
    
    
    

}

// Display lessons

const displayLessons = (lessons) =>{
    
    // step 1 : get container and make it empty
    
    const levelContainer = document.getElementById("level-container")

    levelContainer.innerHTML = ``;


    // step 2 : get into every lessons

    lessons.forEach((lesson) =>{
    
    // step 3 : create element

    const btnDiv = document.createElement("div")

    btnDiv.innerHTML = `
    
    <button onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary"> 
        <i class="fa-solid fa-book-open">
        </i>Lesson -${lesson.level_no}
    </button> `
    
    // step 4 : append to container

    levelContainer.append(btnDiv)

});

}

loadLessons();