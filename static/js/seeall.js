lis = []
async function seeall(type,lkSongs) {
  const seeall_id = document.getElementById('seeall_id');
  let html_data = '';
  const likedSongs = lkSongs.split(",");
 

  await fetch(`../../data/${type}.json`)
    .then((response1) => response1.json()
    ).then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        lis.push(data.data[i])
        let checkLiked = data.data[i].id;

        let lkColor = "white";
        for (const x of likedSongs) { if(x==checkLiked) lkColor="red";}
        let id = `likedColor-${i}`;
        let id2 = `SongName-${i}`;
        let item = `
                      <tr>
                      <th scope="row">${i + 1}.</th>
                      <td><img src=${data.data[i].Image_s} width="50" height="50" alt=""></td>
                      <td class="${id2}" onclick=songtofooter("${data.data[i].id}")><p class="text-primary">${data.data[i].songName}</p></td>
                      <td class="${id2}">${data.data[i].artistsName}</td>
                      <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick=createmodal("${data.data[i].id}")>
                      Add to Playlist
                    </button></td>
                      <!-- <td><a class="${id}" onclick=changeColor("${data.data[i].id}",this.className)> <i id="00${id}" class="fa fa-heart-o" style="font-size:26px;color:white"></i></a></td> -->
                      <td><a class="${id}" onclick=changeColor('${i}',"${data.data[i].id}")> <i id="00${id}" class="fas fa-heart" style="font-size:26px;color:${lkColor}"></i></a></td>
                      <td>${Math.floor((data.data[i].time) / 60000)}:${Math.floor(((data.data[i].time) / 1000) % 60)}</td>
                    </tr>`

        html_data += item;

      }
      seeall_id.innerHTML = html_data;
    })

}

function changeColor(i,song_id) {
  let x = `likedColor-${i}`
  var liked = document.getElementById(`00${x}`);
  var likedColor = document.getElementsByClassName(`${x}`);
  let songClass = document.getElementsByClassName(`SongName-${i}`);
  let songCode = songClass[0].innerHTML + "-" + songClass[1].innerHTML;
  let data = {songC: songCode}

  console.log(song_id);
  if (liked.style.cssText.match('white') != null) {
    likedColor[0].innerHTML = `<i id="00${x}" class="fas fa-heart" style="font-size:26px;color:red"></i>`;
    $.ajax({
      url:`/liked/add/${song_id}`,
      method:"POST",
      success: function(data){
          console.log(done);
      }
    })
  }
  else {
    likedColor[0].innerHTML = `<i id="00${x}" class="fas fa-heart" style="font-size:26px;color:white"></i>`;
    $.ajax({
      url:`/liked/remove/${song_id}`,
      method:"POST",
      success: function(data){
          console.log(data.list)
      }
    })
  }
}


function createmodal(songid){
  let target = document.getElementById('add_modal_byme');
  $.ajax({
    url:`/playlist/data`,
    method:"get",
    success: function(data){
      let html1 = ''
      for(let i = 0;i<data.length;i++){
          html1 += `<h3 onclick=sendsong("/addsong/${data[i]._id}/${songid}")>
          <span data-dismiss="modal"><a href = '#'>${data[i].name}</a></span>
          </h3>`
      }
      target.innerHTML = html1;
    }
  })
}

function sendsong(url){
  $.ajax({
    url:url,
    method:"post",
    success:function (data) {
      console.log("data send");
    }
  })
}