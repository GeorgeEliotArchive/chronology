var years = [];

var decades = {
  name: "",
  children: [
    {
      name: "1819-1840",
      startYear: 1819,
      endYear: 1840,
      children: [

      ]
    }
  ]
};

decades.children.push({ "name": "1841-1850", startYear: 1841, endYear: 1850, children: [] })
decades.children.push({ "name": "1851-1860", startYear: 1851, endYear: 1860, children: [] })
decades.children.push({ "name": "1861-1870", startYear: 1861, endYear: 1870, children: [] })
decades.children.push({ "name": "1871-1880", startYear: 1871, endYear: 1880, children: [] })

var parseData = d3.csv('GeorgeEliotChronologyEditedFinal.csv', function (data) {
  if (data.Month) { //skip months with no data (year dividers on excel sheet)
    //check if current year is in the year array
    var year = years.find(y => y.name == data.Year);

    if (!year) {
      //create the object
      year = new Object();
      year.name = data.Year;
      year.children = [];

      years.push(year);

    }


    var month = year.children.find(m => m.name == getMonthString(data.Month));
    if (!month) {  //skip empty months (year dividers on excel sheet)
      month = new Object();
      if (data.Month) {
        month.name = getMonthString(data.Month);
      } else {
        month.name = "Unknown Date"
      }
      month.children = [];
      year.children.push(month);
    }

    dayEvent = new Object();
    //if (data.Day) {
      dayEvent.name = data.Event;
    //} else {
      //dayEvent.name = "Unknown Date " + data.Event;
    //}
    //day.children = [];
    month.children.push(dayEvent);


    // var event = new Object();
    // event.name = data.Event;
    // day.children.push(event);

  }
});

const margin = { top: 4000, right: 20, bottom: 0, left: 100 },
  width = 4000 - margin.left - margin.right,
  height = 8000 - margin.top - margin.bottom;
const svg = d3.select("svg")
  //.append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
const g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let i = 0;
  let duration = 750;
  let counter = 0;

parseData.then(function () {

  for (var i = 0; i < years.length; i++) {
    var currentYear = parseInt(years[i].name);
    if (currentYear >= 1819 && currentYear <= 1840) {
      decades.children[0].children.push(years[i]);
    } else if (currentYear >= 1841 && currentYear <= 1850) {
      decades.children[1].children.push(years[i]);
    } else if (currentYear >= 1851 && currentYear <= 1860) {
      decades.children[2].children.push(years[i]);
    } else if (currentYear >= 1861 && currentYear <= 1870) {
      decades.children[3].children.push(years[i]);
    } else if (currentYear >= 1871 && currentYear <= 1880) {
      decades.children[4].children.push(years[i]);
    }
  }



  root = d3.hierarchy(decades, function (d) { return d.children; });

  root.x0 = height / 2;
  root.y0 = 0;

  root.children.forEach(collapse);

  update(root);

  const chronology = document.getElementById('chronology');
  chronology.scrollIntoView({ behavior: "smooth", inline: "start", block: "center"});
  
});

function update(source) {
  var tree = d3.tree().nodeSize([50, 50]);
  var dataTree = tree(root);
  var nodes = dataTree.descendants();
  var links = dataTree.descendants().slice(1);
  nodes.forEach(function (d) { d.y = d.depth * 120; });
  var node = g.selectAll('g.node')
    .data(nodes, function (d) { return d.id || (d.id = ++i); });
  var nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr("transform", function (d) {
      return "translate(" + source.y0  + "," + source.x0 + ")";
    })
    .on('click', click);
  nodeEnter.append('circle')
    .attr('class', 'node')
    .attr('r', 1e-6)
    .style("fill", function (d) {
      return d._children ? "#C72E2E" : "#C72E2E";
    });
  nodeEnter.append('text')
    .attr("dy", ".35em")
    .attr("x", function (d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr("text-anchor", function (d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function (d) { return d.data.name; })
    .call(wrap, 1500);
  var nodeUpdate = nodeEnter.merge(node);
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    });
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function (d) {
      return d._children ? "#C72E2E" : "#C72E2E";
    })
    .attr('cursor', 'pointer');
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + source.y + "," + source.x + ")";
    })
    .remove();
  nodeExit.select('circle')
    .attr('r', 1e-6);
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);
  var link = g.selectAll('path.link')
    .data(links, function (d) { return d.id; });
  var linkEnter = link.enter().insert('path', "g")
    .attr("class", "link")
    .attr('d', function (d) {
      var o = { x: source.x0, y: source.y0 }
      return diagonal(o, o)
    });
  var linkUpdate = linkEnter.merge(link);
  linkUpdate.transition()
    .duration(duration)
    .attr('d', function (d) { return diagonal(d, d.parent) });
  var linkExit = link.exit().transition()
    .duration(duration)
    .attr('d', function (d) {
      var o = { x: source.x, y: source.y }
      return diagonal(o, o)
    })
    .remove();
  nodes.forEach(function (d, i) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}
function getChildren(i, arr) {
  var childs = [];
  if (arr[i + 1 + i]) {
    childs[0] = { name: arr[i * 2 + 1], children: [] }
    if (arr[i + i + 2]) {
      childs[1] = { name: arr[i * 2 + 2], children: [] };
    }
  }
  var nextin = i * 2 + 1;
  if (arr[nextin * 2 + 1]) {
    childs[0].children = getChildren(nextin, arr)
    childs[0]._children = null;
    if (arr[nextin * 2 + 2]) {
      childs[1].children = getChildren(nextin + 1, arr);
      childs[1]._children = null;
    }
  }
  return childs;
}
function diagonal(s, d) {
  path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`
  return path
}
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse)
    d.children = null;
  }
}

function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 10,
      lineHeight = .1,
      x = text.attr("x"),
      y = text.attr("y"),
      dy = 0,
      tspan = text.text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}

var months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
function getMonthString(month) {
  return months[month - 1];
}
