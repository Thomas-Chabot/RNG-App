function loadData(links, index){
  return new Promise((fulfill, reject)=>{
    if (index >= links.length) fulfill([]);
    else{
      let link = links[index];
      $.get(link, (data)=>{
        let lyrics = $("div.ringtone", data).next().next().next().next().text().trim().split("\n");
        loadData(links, index+1).then((result)=>{
          fulfill (result.concat(...lyrics));
        }).catch((err)=>reject(err));
      })
    }
  });
}

let links = $.get("a[href*='lyrics/threedaysgrace']");
loadData(links, 0).then((data)=>{
  console.log(JSON.stringify(data));
})
