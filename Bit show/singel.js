let id=localStorage.getItem("user")
let main=document.querySelector("main")
main.classList.add("main-singel")
let divSumery=document.createElement("div")
divSumery.classList.add("sumeryCllas")
let side=document.createElement("div")

let input=document.querySelector("input")
let btn=document.querySelector("button")
let serchDiv=document.getElementsByClassName("Serch")
let listSerch=document.querySelector("ul")





let renderSingelShow=(show)=>{
    console.log(show);
    let card=document.createElement("div")
    let titel=document.createElement("h2")
    let poster=document.createElement("img")
    let sumery=document.createElement("h2")
    let sumeryText=document.createElement("p")
    
    
    
    titel.innerHTML=show.name
    poster.setAttribute("src",show.image.original)
    sumery.innerHTML=`Sumery`
    sumeryText.innerHTML=show.summary
    card.classList.add("singel")
    card.append(titel,poster)
    
    main.appendChild(card)
    divSumery.append(sumery,sumeryText)
    main.appendChild(divSumery)
     }


     let renderSingelShowSesons=(show)=>{
        console.log(show);  
        let div=document.createElement("div")
        div.classList.add("sesons")      
        let seson=document.createElement("h2")
        seson.innerHTML=`Sesons ${show.length}`
        div.appendChild(seson)        
        show.forEach((e) => {
            let name=document.createElement("p")
            name.innerHTML=`${e.premiereDate} - ${e.endDate}`
            div.appendChild(name)            
        });       
        side.appendChild(div)
         }
    


    let renderSingelShowCast=(show)=>{
        let div=document.createElement("div")
        div.classList.add("cast")      
        let casting=document.createElement("h2")
        casting.innerHTML="Cast"
        div.appendChild(casting)        
        show.forEach((e) => {
            let name=document.createElement("p")
            name.innerHTML=e.person.name
            div.appendChild(name)            
        });       
        side.appendChild(div)
         }
            side.classList.add("sideDiv")
            main.appendChild(side)
        

    
            let serchData=(names)=>{
                listSerch.innerHTML=""
                names.forEach((e)=>{
                let elements=document.createElement("li")
                elements.innerHTML=e.show.name
                listSerch.appendChild(elements)
                elements.addEventListener("click", ()=>{
                    window.location.href="./singel.html"
                    localStorage.setItem("user",e.show.id)
                })
            
            })
            }
            





let fetchData=fetch(`http://api.tvmaze.com/shows/${id}`)
.then((response)=>response.json()).then((res)=>{renderSingelShow(res)})

let fetchDataCast=fetch(`http://api.tvmaze.com/shows/${id}/cast`)
.then((response)=>response.json()).then((res)=>{renderSingelShowCast(res)})

let fetchDataSesons=fetch(`http://api.tvmaze.com/shows/${id}/seasons`)
.then((response)=>response.json()).then((res)=>{renderSingelShowSesons(res)})


input.addEventListener("keyup",(e)=>{
    fetchDataSerch();
})


function fetchDataSerch(){
    fetch(`https://api.tvmaze.com/search/shows?q=${input.value}`)
            .then((response)=>response.json())
            .then((res)=>{serchData(res)}) 


}


window.addEventListener("load",fetchData)
window.addEventListener("load",fetchDataCast)
window.addEventListener("load",fetchDataSesons)
