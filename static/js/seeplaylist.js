lis = []
async function seeall(grpid,songs,lkSongs) {
  const seeall_id = document.getElementById('seeall_id');
  let html_data = '';
  let likedSongs = lkSongs;
  if(typeof(lkSongs)==="string")likedSongs = lkSongs.split(",");
  if(typeof(songs)==="string")songs = songs.split(",");
 
  let allsong = []
  await fetch(`../../data/loop.json`)
    .then((response1) => response1.json()
    ).then((data) => {
        for(let i = 0;i<songs.length;i++){
            for(const x of data.data)if(x.id==songs[i])allsong.push(x);
        }
    })
    for (let i = 0; i < allsong.length; i++) {
        lis.push(allsong[i])
        let checkLiked = allsong[i].id;
        let lkColor = "white";
        for (const x of likedSongs) { if(x==checkLiked) lkColor="red";}
        let id = `likedColor-${i}`;
        let id2 = `SongName-${i}`;
        let item = `
                      <tr>
                      <th scope="row">${i + 1}.</th>
                      <td><img src=${allsong[i].Image_s} width="50" height="50" alt=""></td>
                      <td class="${id2}" class="text-primary" onclick=songtofooter("${allsong[i].id}")><p class="text-primary">${allsong[i].songName}</p></td>
                      <td class="${id2}">${allsong[i].artistsName}</td>
                      <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick=remove_from_playlist("remove/${grpid}/${allsong[i].id}")>
                      Remove from Playlist
                    </button></td>
                      <!-- <td><a class="${id}" onclick=changeColor("${allsong[i].id}",this.className)> <i id="00${id}" class="fa fa-heart-o" style="font-size:26px;color:white"></i></a></td> -->
                      <td><a class="${id}" onclick=changeColor('${i}',"${allsong[i].id}")> <i id="00${id}" class="fas fa-heart" style="font-size:26px;color:${lkColor}"></i></a></td>
                      <td>${Math.floor((allsong[i].time) / 60000)}:${Math.floor(((allsong[i].time) / 1000) % 60)}</td>
                    </tr>`
    
        html_data += item;
    
      }
      seeall_id.innerHTML = html_data;


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


function remove_from_playlist(data){
  $.ajax({
    url:data,
    method:"post",
    success:function (data) {
      seeall(data.grpid,data.song,data.lkSongs)
    }
  })
}


