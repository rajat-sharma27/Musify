lis = []
async function listofsong(type) {
    if(type.length!=0)printdata(type);
    else if(lis.length==0){
        await fetch(`../../data/loop.json`)
            .then((response1) => response1.json()
            ).then((data) => {
                for(let i = 0;i<30;i++){
                let x =Math.floor((Math.random() * 290));
                   lis.push(data.data[x])
                }
                printdata(lis);
            });
    }
    else{
        printdata(lis)
    }
}



function printdata(data) {
    const seeall_id = document.getElementById('seeall_id');
    let html_data = '';
    for (let i = 0; i < data.length; i++) {
        let id = `likedColor-${i}`;
        let item = `
                      <tr>
                      <th scope="row">${i + 1}.</th>
                      <td><img src=${data[i].Image_s} width="50" height="50" alt=""></td>
                      <td><a href ="#" onclick=songtofooter("${data[i].id}")>${data[i].songName}</a></td>
                      <td>${data[i].artistsName}</td>
                      <td>add to playlist</td>
                      <td><a class="${id}" onclick="changeColor(this.className)"> <i id ="00${id}" class="fa fa-heart-o" style="font-size:26px;color:white"></i></a></td>
                      <td>${Math.floor((data[i].time) / 60000)}:${Math.floor(((data[i].time) / 1000) % 60)}</td>
                    
                    </tr>`

        html_data += item;

    }
    seeall_id.innerHTML = html_data;
}






function changeColor(x) {
    // console.log(x);
    // var liked = document.getElementsByClassName("fa-heart-o");
    var liked = document.getElementById(`00${x}`);
    var likedColor = document.getElementsByClassName(`${x}`);

    
    if(liked.style.cssText.match('white')!=null) {
      
      likedColor[0].innerHTML = `<i id="00${x}" class="fa fa-heart-o" style="font-size:26px;color:red"></i>`;
    }
    else {
      likedColor[0].innerHTML = `<i id="00${x}" class="fa fa-heart-o" style="font-size:26px;color:white"></i>`;
    }
}