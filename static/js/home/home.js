let lis = [];
//for rock songs

async function historyofsong(history){
  const recently_id = document.getElementById('recently_id');
  if(typeof(history)==="string")history = history.split(",");
  // console.log(history);
  let html_data = '';
  await fetch("../../data/loop.json")
       .then((response1) => response1.json()
       ).then((data)=>{
          for(let i=0;i<history.length;i++){
                  for (const x of data.data) { 
                  if(x.id==history[i]){
                    let item = `
                    <div class="swiper-slide Recommended-slide">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" style="height: 12rem;" src=${x.Image_s} alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title"><p class="text-primary" onclick=songtofooter("${x.id}")>${x.songName}</p></h5>
                          <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                          <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                        </div>
                      </div>
                  </div>` 
                  html_data+=item;
                  }
              }     
                  }
                  recently_id.innerHTML = html_data;
       })
}


async function rock(){
  const rock_id = document.getElementById('rock_id');
  let html_data = '';
  a = ['rock','pop']
  await fetch("../../data/rock.json")
       .then((response1) => response1.json()
       ).then((data)=>{
         console.log(data.data);
          for(let i=0;i<16;i++){
               let x =Math.floor((Math.random() * 30));
                    let item = `
                    <div class="swiper-slide Recommended-slide">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" style="height: 12rem;" src=${data.data[x].Image_s} alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title"><p class="text-primary" onclick=songtofooter("${data.data[x].id}")>${data.data[x].songName}</p></h5>
                          <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                          <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                        </div>
                      </div>
                  </div>` 
      
                    html_data+=item;
                    
                  }
                  console.log(rock_id);
                  rock_id.innerHTML = html_data;
       })
}rock();



//for romance songs
async function romance(){
  const romance_id = document.getElementById('romance_id');
  let html_data = '';
  
  await fetch("../../data/romance.json")
       .then((response1) => response1.json()
       ).then((data)=>{
         console.log(data.data);
          for(let i=0;i<16;i++){
               let x =Math.floor((Math.random() * 30));
                    let item = `
                    <div class="swiper-slide Recommended-slide">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" style="height: 12rem;" src=${data.data[x].Image_s} alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title"><p class="text-primary" onclick=songtofooter("${data.data[x].id}")>${data.data[x].songName}</p></h5>
                        <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                          <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                        </div>
                      </div>
                  </div>` 
      
                    html_data+=item;
                    
                  }
                  romance_id.innerHTML = html_data;
       })

}romance();


//for P0P songs
async function P0P(){
  const P0P_id = document.getElementById('POP_id');
  let html_data = '';
  
  await fetch("../../data/pop.json")
       .then((response1) => response1.json()
       ).then((data)=>{
         console.log(data.data);
          for(let i=0;i<16;i++){
               let x =Math.floor((Math.random() * 30));
                    let item = `
                    <div class="swiper-slide Recommended-slide">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" style="height: 12rem;" src=${data.data[x].Image_s} alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title"><p class="text-primary" onclick=songtofooter("${data.data[x].id}")>${data.data[x].songName}</p></h5>
                          <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                          <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                        </div>
                      </div>
                  </div>` 
      
                    html_data+=item;
                    
                  }
                  P0P_id.innerHTML = html_data;
       })

}P0P();





// for recommended songs(for heading songs)

async function songid(){
    const recommend_id = document.getElementById('song_id');
    let html_data = '';
    
    await fetch("../../data/loop.json")
         .then((response1) => response1.json()
         ).then((data)=>{
           console.log(data.data);
            for(let i=0;i<16;i++){
                 let x =Math.floor((Math.random() * 290));
                      let item = `
                      <div class="swiper-slide Recommended-slide">
                      <div class="card" style="width: 18rem;">
                          <img class="card-img-top" style="height: 12rem;" src=${data.data[x].Image_s} alt="Card image cap">
                          <div class="card-body">
                          <h5 class="card-title"><p class="text-primary" onclick=songtofooter("${data.data[x].id}")>${data.data[x].songName}</p></h5>
                            <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                          </div>
                        </div>
                    </div>` 
        
                      html_data+=item;
                      
                    }
                    recommend_id.innerHTML = html_data;
         })

}
songid();




