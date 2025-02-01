search = document.getElementById('search_val')
onsearch = document.getElementById('onsearch')
const fs = require("fs");
const save_to = "";
search.addEventListener('input',async function() {
    await fetch("../../data/loop.json").then((response1) => response1.json()).then((data)=>{
        data.data.forEach((ele)=>{
            cardtxt = ele.songName.toLowerCase();
            cardart = ele.artistsName.toLowerCase();
            console.log(cardtxt);
            if(cardtxt.includes(search.value.toLowerCase())){
                console.log(ele);
                save_to = ele+ ","+save_to;
                
            }
        })
    })
})

fs.writeFile("search.json", JSON.stringify(save_to), err => {
});

