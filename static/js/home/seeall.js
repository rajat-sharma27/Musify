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
        
        let checkLiked = data.data[i].songName+'-'+data.data[i].artistsName;
        let lkColor = "white";
        for (const x of likedSongs) { if(x==checkLiked) lkColor="red"; }
        let id = `likedColor-${i}`;
        let id2 = `SongName-${i}`;
        let item = `
                      <tr>
                      <th scope="row">${i + 1}.</th>
                      <td><img src=${data.data[i].Image_s} width="50" height="50" alt=""></td>
                      <td class="${id2}">${data.data[i].songName}</td>
                      <td class="${id2}">${data.data[i].artistsName}</td>
                      <td>add to playlist</td>
                      <!-- <td><a class="${id}" onclick="changeColor(this.className)"> <i id="00${id}" class="fa fa-heart-o" style="font-size:26px;color:white"></i></a></td> -->
                      <td><a class="${id}" onclick="changeColor('${i}')"> <i id="00${id}" class="fas fa-heart" style="font-size:26px;color:${lkColor}"></i></a></td>
                      <td>${Math.floor((data.data[i].time) / 60000)}:${Math.floor(((data.data[i].time) / 1000) % 60)}</td>
                    </tr>`

        html_data += item;

      }
      seeall_id.innerHTML = html_data;
    })

}

function changeColor(i) {
  let x = `likedColor-${i}`
  var liked = document.getElementById(`00${x}`);
  var likedColor = document.getElementsByClassName(`${x}`);
  let songClass = document.getElementsByClassName(`SongName-${i}`);
  let songCode = songClass[0].innerHTML + "-" + songClass[1].innerHTML;
  // console.log(songCode);
  let data = {songC: songCode}


  if (liked.style.cssText.match('white') != null) {
    likedColor[0].innerHTML = `<i id="00${x}" class="fas fa-heart" style="font-size:26px;color:red"></i>`;
    fetch("/addliked", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)   
    }).then(response => {
      // this line of code depends upon what type of response you're expecting
      return response.text();
    }).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }
  else {
    likedColor[0].innerHTML = `<i id="00${x}" class="fas fa-heart" style="font-size:26px;color:white"></i>`;
    fetch("/rmvliked", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)   
    }).then(response => {
      // this line of code depends upon what type of response you're expecting
      return response.text();
    }).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }
}

