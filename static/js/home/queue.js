lis = []
async function listofsong(type) {
    if(type.length!=0){
        if(typeof(type)==="string")type = type.split(",");
        songs= []
        lis = []
        await fetch(`../../data/loop.json`)
            .then((response1) => response1.json()
            ).then(data=>{
                songs = data.data;
            })
        for(let i = 0;i<type.length;i++){
            console.log(type[i]);
                for(let j = 0;j<songs.length;j++){
                 if(songs[j].id==type[i]){
                    lis.push(songs[j]);
                    console.log(songs[j]);
                }
                }
        }
        printdata(lis,"red")
    }
    else if(type.length==0){
        await fetch(`../../data/loop.json`)
            .then((response1) => response1.json()
            ).then((data) => {
                for(let i = 0;i<30;i++){
                let x =Math.floor((Math.random() * 290));
                   lis.push(data.data[x])
                }
                printdata(lis,"white");
            });
    }
}



function printdata(data,color) {
    const seeall_id = document.getElementById('seeall_id');
    let html_data = '';
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        let id = `likedColor-${i}`;
        let item = `
                      <tr>
                      <th scope="row">${i + 1}.</th>
                      <td><img src=${data[i].Image_s} width="50" height="50" alt=""></td>
                      <td><p class="text-primary" onclick=songtofooter("${data[i].id}")>${data[i].songName}</p></td>
                      <td>${data[i].artistsName}</td>
                      <td><a class="${id}" onclick=changeColor("${data[i].id}",this.className)> <i id ="00${id}" class="fa fa-heart-o" style="font-size:26px;color:${color}"></i></a></td>
                      <td>${Math.floor((data[i].time) / 60000)}:${Math.floor(((data[i].time) / 1000) % 60)}</td>
                    
                    </tr>`

        html_data += item;
    }
    seeall_id.innerHTML = html_data;
}






function changeColor(song_id,x) {
    // console.log(x);
    // var liked = document.getElementsByClassName("fa-heart-o");
    var liked = document.getElementById(`00${x}`);
    var likedColor = document.getElementsByClassName(`${x}`);
    
    if(liked.style.cssText.match('white')!=null) {
      likedColor[0].innerHTML = `<i id="00${x}" class="fa fa-heart-o" style="font-size:26px;color:red"></i>`;
      $.ajax({
        url:`/liked/add/${song_id}`,
        method:"POST",
        success: function(data){
            console.log(done);
        }
      })
    }
    else {
      likedColor[0].innerHTML = `<i id="00${x}" class="fa fa-heart-o" style="font-size:26px;color:white"></i>`;
      $.ajax({
        url:`/liked/remove/${song_id}`,
        method:"POST",
        success: function(data){
            console.log(data.list)
            listofsong(data.list);
        }
      })
    }
}