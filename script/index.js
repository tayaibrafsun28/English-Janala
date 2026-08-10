const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then(res => res.json()) // promise of json data
    .then(json => displayLessons(json.data));
}

const displayLessons = (lessons) =>{
    
    // step 1 : get container and make it empty
    
    const levelContainer = document.getElementById("level-container")

    levelContainer.innerHTML = ``;


    // step 2 : get into every lessons

    for(let lesson of lessons){

    
    
    // step 3 : create element

    const btnDiv = document.createElement("div")

    btnDiv.innerHTML = `
    
    <a class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open">
        </i>Lesson -${lesson.level_no}
    </a> `
    
    // step 4 : append to container

    levelContainer.append(btnDiv)

}

}

loadLessons();