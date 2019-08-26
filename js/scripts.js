//Wrangle NBA data and populate a chart

let regSeasonData = [];
let playoffsData = [];
let mergedData = [];
let teamNameConfMapping = [
                        { "Milwaukee Bucks":"MIL",
                          "Conference": "Eastern",
                        },
                        { "Toronto Raptors":"TOR",
                          "Conference": "Eastern",
                        },
                        { "Golden State Warriors":"GSW",
                          "Conference": "Western",
                        },
                        { "Philadelphia 76ers":"PHI",
                          "Conference": "Eastern",
                        },
                        { "Boston Celtics":"BOS",
                          "Conference": "Eastern",
                        },
                        { "Houston Rockets":"HOU",
                          "Conference": "Western",
                        },
                        { "Denver Nuggets":"DEN",
                          "Conference": "Western",
                        },
                        { "Portland Trail Blazers":"POR",
                          "Conference": "Western",
                        },
                        { "San Antonio Spurs":"SAS",
                          "Conference": "Western",
                        },
                        { "LA Clippers":"LAC",
                          "Conference": "Western",
                        },
                        { "Brooklyn Nets":"BKN",
                          "Conference": "Eastern",
                        },
                        { "Oklahoma City Thunder":"OKC",
                          "Conference": "Western",
                        },
                        { "Orlando Magic":"ORL",
                          "Conference": "Eastern",
                        },
                        { "Utah Jazz":"UTA",
                          "Conference": "Western",
                        },
                        { "Detroit Pistons":"DET",
                          "Conference": "Eastern",
                        },
                        { "Indiana Pacers":"IND",
                          "Conference": "Eastern",
                        },
                      ];

function parseData (data) {
  console.log('Data passed to parseData()', data);
  let headers = data.headers;
  let rowSet = data.rowSet;
  let cleanData = [];
  
  //combine separate arrays into a single array of objects with headers as keys
  for (let row of rowSet) {
    let newObj = {};
    for (let [i,header] of headers.entries()) {
      newObj[header] = row[i];
    }
    
    //add team abbreviation and conference
    for (let team of teamNameConfMapping) {
      //if matching on team name then add new properties of TEAM_ABR and TEAM_CONF
      if (team[newObj["TEAM_NAME"]]) {
        newObj["TEAM_ABR"] = team[newObj["TEAM_NAME"]];
        newObj["TEAM_CONF"] = team["Conference"];
      }
    }
    
    cleanData.push(newObj);
  }
    
  return cleanData;
}

function getRegSeason () {
    fetch("./data/2018_19_RegSeason_Team_Data.json")
    .then(response => response.json())
    .then(data => {
      regSeasonData = parseData(data.resultSets[0]);
      
      getPlayoffs();
    });
}

function getPlayoffs () {
  fetch("./data/2018_19_Playoffs_Team_Data.json")
    .then(response => response.json())
    .then(data => {
      
      playoffsData = parseData(data.resultSets[0]);
      
      mergeDataSets();
    });
}

function mergeDataSets () {
  console.log('regSeasonData ->',regSeasonData);
  console.log('playoffData ->',playoffsData);

  //merge the import elements from the two data sets
  for (let p of playoffsData) {
    let mergedObj = {};
    for (let r of regSeasonData) {
      if (p.TEAM_ABR === r.TEAM_ABR) {
        mergedObj["TEAM_ABR"] = p.TEAM_ABR;
        mergedObj["TEAM_CONF"] = p.TEAM_CONF;
        mergedObj["REG_W_PCT"] = Math.round(r.W_PCT*100);
        mergedObj["PLYOFF_W_PCT"] = Math.round(p.W_PCT*100);
      }
    }
    mergedData.push(mergedObj);
  }
  
  console.log('mergedData ->', mergedData)
  
  render('All');
}

function onDimChange () {
  //get updated dimension value from drop-down
  let newDim = document.querySelector('#dim1').value;
  
  render(newDim)
}

function render (dim) {
  console.log ('Running render function with dimensiion ->',dim);

  let chart = document.querySelector('#chart');
  chart.innerHTML = '';
  
  // create the chart content using data from merged data set
  for (let item of mergedData) {
    if (dim === "All" || dim === item["TEAM_CONF"]) {
      chart.innerHTML += `<div class="Viz-item" onClick="alert('${item["TEAM_ABR"]} won ${item["REG_W_PCT"] - item["PLYOFF_W_PCT"]}% fewer of their games during the playoffs.')">
                      <div class="Viz-data Viz-regular" style="height: ${item["REG_W_PCT"]}%"><label>${item["REG_W_PCT"]}</label></div>
                      <div class="Viz-data Viz-playoff" style="height: ${item["PLYOFF_W_PCT"]}%"><label>${item["PLYOFF_W_PCT"]}</label></div>
                      <div class="Viz-label">${item["TEAM_ABR"]}</div>
                  </div>`
    }
  }
  
}


//initiate data load
getRegSeason();

