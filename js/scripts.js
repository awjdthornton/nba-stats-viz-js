//Wrangle NBA data and populate a chart

let regSeasonData = [];
let playoffsData = [];
let mergedData = [];
let teamNameMapping = {
                        "Milwaukee Bucks":"MIL",
                        "Toronto Raptors":"TOR",
                        "Golden State Warriors":"GSW",
                        "Philadelphia 76ers":"PHI",
                        "Boston Celtics":"BOS",
                        "Houston Rockets":"HOU",
                        "Denver Nuggets":"DEN",
                        "Portland Trail Blazers":"POR",
                        "San Antonio Spurs":"SAS",
                        "LA Clippers":"LAC",
                        "Brooklyn Nets":"BKN",
                        "Oklahoma City Thunder":"OKC",
                        "Orlando Magic":"ORL",
                        "Utah Jazz":"UTA",
                        "Detroit Pistons":"DET",
                        "Indiana Pacers":"IND",
                      };

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
    
    //add team abbreviation for chart label
    newObj["TEAM_ABR"] = (teamNameMapping[newObj["TEAM_NAME"]]) ? teamNameMapping[newObj["TEAM_NAME"]] : '';
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
        mergedObj["REG_W_PCT"] = Math.round(r.W_PCT*100);
        mergedObj["PLYOFF_W_PCT"] = Math.round(p.W_PCT*100);
      }
    }
    mergedData.push(mergedObj);
  }
  
  console.log('mergedData array ->', mergedData)
  
  //TODO Mutate the array to order by regular season winning percentage in DESC order (i.e. highest win percentage to lowest)
  
  render();
}

function render () {
  console.log ('Running render function');

  let chart = document.querySelector('#chart');
  
  // create the chart content using data from merged data set
  for (let item of mergedData) {
    chart.innerHTML += `<div class="Viz-item" onClick="alert('${item["TEAM_ABR"]} won ${item["REG_W_PCT"] - item["PLYOFF_W_PCT"]}% fewer of their games during the playoffs.')">
                    <div class="Viz-data Viz-regular" style="height: ${item["REG_W_PCT"]}%"><label>${item["REG_W_PCT"]}</label></div>
                    <div class="Viz-data Viz-playoff" style="height: ${item["PLYOFF_W_PCT"]}%"><label>${item["PLYOFF_W_PCT"]}</label></div>
                    <div class="Viz-label">${item["TEAM_ABR"]}</div>
                </div>`
  }
  
}


//initiate data load
getRegSeason();

