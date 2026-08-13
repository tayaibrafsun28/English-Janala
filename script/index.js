// loading spin function

const loadingSpinner = (status) =>{
    if (status == true) {
        document.getElementById("loading-spinner").classList.remove("hidden")

        document.getElementById("word-container").classList.add("hidden")
    }

    else{
        document.getElementById("loading-spinner").classList.add("hidden")

        document.getElementById("word-container").classList.remove("hidden")
    }
}

// load synonyms fucntion
const loadSynonyms = (arr) =>{
    const synonyms = arr.map((synonym) =>
        `<span class="btn bg-[#EDF7FF]">${synonym}</span>`)
        return synonyms.join(" ")

}

// load lesson function

const loadLessons = () =>{

    const levelURL = "https://openapi.programming-hero.com/api/levels/all"
    fetch(levelURL) // promise of response
    .then(res => res.json()) // promise of json data
    .then(json => displayLessons(json.data));
}

// remove active function

const removeActive = () =>{
    const lessonBtn = document.querySelectorAll(".lesson-btn")

    lessonBtn.forEach(btn => btn.classList.remove('active'))
}


// load words function

const loadLevelWord = (id) =>{

    loadingSpinner(true);

    const levelWordURL = `https://openapi.programming-hero.com/api/level/${id}`
    
    fetch(levelWordURL) //promise of response
    .then(res => res.json()) // promise of json data
    .then(data => {

        removeActive(); //remove all active class from word level btns

        const activeBtn = document.getElementById(`lesson-btn-${id}`)
        activeBtn.classList.add('active');

        displayLevelWords(data.data);
    })

}


// load word detail function using async

const loadWordDetail = async(id) =>{

    const wordDetailURL = `https://openapi.programming-hero.com/api/word/${id}`

    const res = await fetch(wordDetailURL);
    const details = await res.json()

    displayWordDetails(details.data)

}

// display word details

const displayWordDetails = (words) =>{

    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML=`
    
                        <div>
                        <h1 class="font-semibold text-2xl md:text-3xl 2xl:text-4xl">${words.word} (<i
                                class="fa-solid fa-microphone-lines"></i>:<span
                                class="font-bangla font-semibold text-2xl md:text-3xl 2xl:text-4xl">${words.pronunciation}</span>)</h1>
                    </div>

                    <div>
                        <h3 class="font-semibold text-lg md:text-xl 2xl:text-2xl mb-3">Meaning</h3>
                        <p class="font-bangla text-lg md:text-xl 2xl:text-2xl font-medium">${words.meaning}</p>
                    </div>

                    <div>
                        <h3 class="font-semibold text-lg md:text-xl 2xl:text-2xl mb-3">Example</h3>
                        <p class="text-lg md:text-xl 2xl:text-2xl">${words.sentence}</p>
                    </div>

                    <div>
                        <h3 class="font-bangla text-lg md:text-xl 2xl:text-2xl font-medium mb-3">সমার্থক শব্দ গুলো</h3>

                        
                        <div class="space-x-1">
                        ${loadSynonyms(words.synonyms)}
                        </div>
                    </div>
    
    `;
    
    document.getElementById("word_modal").showModal();
    

}

// display words

const displayLevelWords = (words) =>{
    
loadingSpinner(true)

    // get container and empty it

    const wordContainer = document.getElementById('word-container')

    wordContainer.innerHTML = ``;


    if(words.length == 0){
       wordContainer.innerHTML = `
       
       <div class="col-span-full text-center space-y-3">
       <img src="./assets/alert-error.png" alt="" class="mx-auto">
                <p class="text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-col1 font-bangla font-medium text-3xl">নেক্সট Lesson এ যান</h1>
            </div>
       
       `;

       loadingSpinner(false)

       return;
    }

    // get into every lessons

    words.forEach((word) => {
 
    // create element

    const wordCard = document.createElement('div')

    wordCard.innerHTML = `
    
    <div class="word-card bg-white p-7 text-center rounded-xl">

                <div class="space-y-3">
                    <h1 class="text-2xl lg:text-3xl font-bold">${word.word}</h1>
                    <p class="text-lg lg:text-xl font-medium">Meaning /Pronounciation</p>
                    <p class=" text-xl lg:text-2xl font-semibold font-bangla">${word.meaning} / ${word.pronunciation}</p>
                </div>

                <div class="flex justify-between mt-8">
                    <button onclick="loadWordDetail(${word.id})" class="p-2 bg-[#E8F4FF] hover:bg-sky-300 rounded-md"><i class="fa-solid fa-circle-info"></i></button>

                    <button onclick="pronounceWord('${word.word}')" class="p-2 bg-[#E8F4FF] hover:bg-sky-300 rounded-md"><i class="fa-solid fa-volume"></i></button>
                </div>

    </div>

    `

    // append to word container

    wordContainer.append(wordCard)

    });
    
    loadingSpinner(false);
    

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
    
    <button id="lesson-btn-${lesson.level_no}" onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn"> 
        <i class="fa-solid fa-book-open">
        </i>Lesson -${lesson.level_no}
    </button> `
    
    // step 4 : append to container

    levelContainer.append(btnDiv)

});

}

// calling loadLessons function

loadLessons();

// search words functionality

const searchWord = () =>{

    removeActive();
    
    const input = document.getElementById("input-search")

    const searchValue = input.value.toLowerCase()

    const allWordURL = "https://openapi.programming-hero.com/api/words/all"

    fetch(allWordURL)
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        
        const filtertedWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));

        displayLevelWords(filtertedWords);
    });

}

// pronounce words functionality

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}