//Get DOM Elements..

let input = document.querySelector("input");
let search__btn = document.querySelector("#search");
let search__word = document.querySelector(".word h2");
let search__pronounce = document.querySelector("#pronouns");
let search__wordMean = document.querySelector("#noun");
let search__defs = document.querySelector("#def");
let search__audio = document.querySelector(".audio");
let not__founds = document.querySelector("#not-found");

//search fun()
search__btn.addEventListener("click", () => {
    //the data ..
    let word = input.value;
    let api_url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=bb3c4ba7-4172-431a-bfde-eaa059bf6d55`;


    if (word == "" || word == "null") {
        alert("Word Required");
    }
    else {
        //if url not valid
        try {
            getdata(api_url);
        }
        catch (error) {
            console.log("Error Occured " + error);
        }
    }
    document.querySelector("input").value = "";
});

//fetching data from Dictionaryapi.com -->valid only 30days
async function getdata(url) {

    let Response = await fetch(url);
    let data = await Response.json();

    if (!data.length == "0" && typeof (data[0]) == "object") {

        //put value in  elemnets..
        let dic__word  = data[0].hwi.hw;
        let dic__noun  = data[0].fl;
        let dic__pro   = data[0].hwi.prs[0].ipa;
        let dic__sound = data[0].hwi.prs[0].sound.audio;
        let dic__defs  = data[0].shortdef[0];

        search__word.textContent      = dic__word;
        search__pronounce.textContent = dic__pro;
        search__wordMean.textContent  = dic__noun;
        search__defs.textContent      = dic__defs;

        //sound
        if (dic__sound) {
            sounder(dic__sound);
        }
    }

    //if it suggest
    else if (typeof (data[0]) == "string") {

        search__word.textContent = "Did You Mean";
        search__wordMean.textContent=`${data[0]},${data[1]},${data[2]}`;
        search__pronounce.textContent = " -- ";
        search__defs.textContent = "-- Definition";
    }

    //if word has no length
    else {
        //when word has no mean
        console.log("not found");
        search__word.textContent = "NOT FOUND";
        search__pronounce.textContent = " ";
        search__wordMean.textContent = "  ";
        search__defs.textContent = "-- Definition";
    }
}

//sounding fun()
let audio = new Audio();
function sounder(soundName) {
    let soundBegin = soundName.charAt(0); //get first letter 
    let subfolder = `https://media.merriam-webster.com/soundc11/${soundBegin}/${soundName}.wav?key=bb3c4ba7-4172-431a-bfde-eaa059bf6d55`;
    // let audio = new Audio();
    search__audio.addEventListener("click", () => {
        audio.src = `${subfolder}`
        audio.play();
    });
}