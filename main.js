const searchButton = document.querySelector(".searchButton");
const searchBar = document.querySelector("#searchBar");

const resultCont = document.querySelector(".resultContainer");
const ulElement = document.querySelector("ul");
const resHead = document.querySelector(".resultHeading");

const createCards =(data) =>{
    let obj = data[0].meanings;
    let len = obj.length;

    for(i=0; i<len; i++){
        
        const li = document.createElement("li");
        let heading = document.createElement("h4");
        heading.textContent= obj[i].partOfSpeech;
        let def = document.createElement("p");
        def.textContent = `Def: ${obj[i].definitions[0].definition}`;
        let eg = document.createElement("p");
        eg.textContent =`Eg: ${ obj[i].definitions[0].example}`;
        li.appendChild(heading);
        li.appendChild(def);
        li.appendChild(eg);
        li.classList.add("resultElement");
        ulElement.appendChild(li);  

        // console.log(li);
    }
    
}

const getResult = async (finalLink) =>{
    let response = await fetch(finalLink);
    if(response.status==200){
        let data = await response.json();
        resHead.innerHTML="Result";
        createCards(data);
    }
    else{
        resHead.innerHTML ="Wrong word!!";
    }
   
}



const searchWord = () =>{
    const link = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    let word = searchBar.value;
    const finalLink = link+word;
    while(ulElement.firstChild){
        ulElement.removeChild(ulElement.firstChild);
    }

    getResult(finalLink);
}


searchButton.addEventListener("click", searchWord);

