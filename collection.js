
const axios = require('axios');
const fs = require('fs');

const apiurl = "https://georgeeliotarchive.org/api/items?collection=45";

axios
.get(apiurl)
.then(response => {
  const newCollection = response.data.map(c => {
    return {
      id: c.id.toString(),
      url: c.url,
      public: c.public,
      featured: c.featured,
      added: c.added,
      modified: c.modified,
      owner: c.owner,
      items: c.items,
      element_texts: c.element_texts,
      
    };
  });
  console.log("csv start");
  const data = [];
  col_len = newCollection.length;
  data.push(newCollection[col_len-1].element_texts[0].text);
  for(var i = col_len-1; i > 0; i--) {
    for(var j = 1; j < 5; j++){
      data.push(newCollection[i].element_texts[j].text);    
    }
    data.push("\"" + newCollection[i].element_texts[5].text + '\"\n' + newCollection[i-1].element_texts[0].text);
  }
  for(var j = 1; j < 5; j++){
    data.push(newCollection[i].element_texts[j].text);      
  }
  data.push("\"" + newCollection[i].element_texts[5].text + '\"\n');

  fs.writeFile("./calendar/data.csv", "Date,Year,Month,Day,Weekday,Event\n" + data.toString(), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("success: calendar")
  })
  fs.writeFile("./chronology-tree/data.csv", "Date,Year,Month,Day,Weekday,Event\n" + data.toString(), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("success: tree");
  });
})
.catch(error => console.log(error));