
let regSeasonData = null;
let playoffsData = null;
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


function getRegSeason () {
    fetch("./data/2018_19_RegSeason_Team_Data.json")
    .then(response => response.json())
    .then(data => {
      console.log("Got the Regular Season data!");
      
      regSeasonData = parseData(data.resultSets[0]);
      
      // TODO call a function to do something with this data
      getPlayoffs();
    });
}

function getPlayoffs () {
  fetch("./data/2018_19_Playoffs_Team_Data.json")
    .then(response => response.json())
    .then(data => {
      console.log("Got the Playoff data!");
      
      playoffsData = parseData(data.resultSets[0]);
      
      // TODO: Call a function to do something with this data
      render()
    });
}

function render () {
  // TODO add render function code
  console.log ('Running render function');
  console.log('regSeasonData ->',regSeasonData);
  console.log('playoffData ->',playoffsData);
  
  /*
  Combine the key elements from each data set into an object within an array  that looks like
  [
    { "TEAM_ABR": "GSW", 
      "REG_WIN_PCT": "72.3", 
      "PLYOFF_WIN_PCT": "65.4",
    },
    ...
  ]
  
  Note: only include playoff teams
  
  mutate the array to order by regular season winning percentage in DESC order (i.e. highest win percentage to lowest)
  
  inject html into DOM for each team with found in this new object
  
  */
  
}

function parseData (data) {
  console.log('Data passed to parseData()', data);
  let headers = data.headers;
  let rowSet = data.rowSet;
  console.log('headers ->',headers);
  console.log('rowSet ->',rowSet);
  let cleanData = [];
  
  for (let row of rowSet) {
    let newObj = {};
    for (let [i,header] of headers.entries()) {
//      console.log('header: value', header+':',row[i]);
      newObj[header] = row[i];
    }
    //add team abbreviation for label
    newObj["TEAM_ABR"] = (teamNameMapping[newObj["TEAM_NAME"]]) ? teamNameMapping[newObj["TEAM_NAME"]] : '';
    cleanData.push(newObj);
  }
    
  return cleanData;
}

//initiate data load
getRegSeason();

