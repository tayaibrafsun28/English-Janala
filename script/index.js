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

    const levelWordURL = `https://openapi.programming-hero.com/api/level/${id}`
    
    fetch(levelWordURL) //promise of response
    .then(res => res.json()) // promise of json data
    .then(data => {

        removeActive();

        const activeBtn = document.getElementById(`lesson-btn-${id}`)
        activeBtn.classList.add('active');

        displayLevelWords(data.data);
    })

}


// display words

const displayLevelWords = (words) =>{
    

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
                    <button onclick="my_modal_5.showModal()" class="p-2 bg-[#E8F4FF] hover:bg-sky-300 rounded-md"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="p-2 bg-[#E8F4FF] hover:bg-sky-300 rounded-md"><i class="fa-solid fa-volume"></i></button>
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
    
    <button id="lesson-btn-${lesson.level_no}" onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn"> 
        <i class="fa-solid fa-book-open">
        </i>Lesson -${lesson.level_no}
    </button> `
    
    // step 4 : append to container

    levelContainer.append(btnDiv)

});

}

loadLessons();