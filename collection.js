
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
  const data_cal = [];
  const data_tree = [];
  col_len = newCollection.length;
  data_cal.push(newCollection[col_len-1].element_texts[0].text);
  data_tree.push(newCollection[col_len-1].element_texts[0].text);
  for(var i = col_len-1; i > 0; i--) {
    for(var j = 1; j < 5; j++){
      data_cal.push(newCollection[i].element_texts[j].text);
      data_tree.push(newCollection[i].element_texts[j].text);    
    }
    //data_cal.push("\"" + newCollection[i].element_texts[5].text.replaceAll('"', '') + '\"\n' + newCollection[i-1].element_texts[0].text);
      data_cal.push("\"" + newCollection[i].element_texts[5].text.replaceAll('"', '') + '\"\n' + newCollection[i-1].element_texts[0].text);
      data_tree.push("\"" + newCollection[i].element_texts[3].text + ": " + newCollection[i].element_texts[5].text.replaceAll('"', '') + '\"\n' + newCollection[i-1].element_texts[0].text);
  }
  for(var j = 1; j < 5; j++){
    data_cal.push(newCollection[i].element_texts[j].text); 
    data_tree.push(newCollection[i].element_texts[j].text);     
  }
  data_cal.push("\"" + newCollection[i].element_texts[5].text.replaceAll('"', '') + '\"\n');
  data_tree.push("\"" + newCollection[i].element_texts[3].text + ": " + newCollection[i].element_texts[5].text.replaceAll('"', '') + '\"\n');

  fs.writeFile("./calendar/data.csv", "Date,Year,Month,Day,Weekday,Event\n" + data_cal.toString(), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("success: calendar")
  })
  fs.writeFile("./chronology-tree/data.csv", "Date,Year,Month,Day,Weekday,Event\n" + data_tree.toString(), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("success: tree");
  });
})
.catch(error => console.log(error));