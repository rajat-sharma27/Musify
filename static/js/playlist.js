let lis = [];

allsongs = [];
async function gettingallsongs(){
    await fetch(`../../data/loop.json`)
    .then((response1) => response1.json()
    ).then((data)=>{
       for(let i = 0;i<data.data.length;i++){
        allsongs.push(data.data[i]);
       }
    })
}   
gettingallsongs();

function having_playlist(playlist){
    const target = document.getElementById('start');
    let html1 = '';
    for(let i = 0;i<playlist.length;i++){
        html1 +=` <div class="swiper mySwiper Recommended">
        <div class="col-lg-6">
            <h3 class="mb-3"><a class="navbar-brand mb-0 h1" href ="/playlist/${playlist[i]._id}">${playlist[i].name}</a></h3>
        </div>
        <div class="swiper-wrapper">`
        console.log(playlist[i]);
        for (const x of playlist[i].songs){
            for(let j = 0;j<allsongs.length;j++){
                if(x==allsongs[j].id){
                    html1 += `
                    <div class="card" style="width: 18rem;">
                    <img class="card-img-top" style="height: 12rem;" src=${allsongs[j].Image_s} alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title"><p onclick=songtofooter("${allsongs[j].id}")>${allsongs[j].songName}</p></h5>
                      <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                    </div>
                  </div>
            `
                }
            }
        }
        html1 += `</div>
        <div class="swiper-pagination"></div>
    </div>
    <br>
    <hr><br>`
    }
    target.innerHTML = html1;
}





