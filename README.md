# nba-stats-viz
Vizualizations for data from [stats.nba.com]

Documentation support for the stats.nba.com api provided at 
[nbasense.com/nba-api/]  (php package)

[github.com/bttmly/nba] (nodeJS package)

[github.com/swar/nba_api] (pypi package)

Recent analysis of endpoints
[https://github.com/swar/nba_api/blob/master/analysis_archive/stats/analysis.json]

# Initial data 

2018-19 team totals for regular season and playoffs

regular season UI -> [https://stats.nba.com/teams/traditional/?Season=2018-19&SeasonType=Regular%20Season]
regular season API -> [https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2018-19&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=&TwoWay=&VsConference=&VsDivision=]

playoffs UI -> [https://stats.nba.com/teams/traditional/?Season=2018-19&SeasonType=Playoffs]
playoffs API -> [https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2018-19&SeasonSegment=&SeasonType=Playoffs&ShotClockRange=&StarterBench=&TeamID=&TwoWay=&VsConference=&VsDivision=]

using WIN% (aka W_PCT) column

# goal
Upon completion, this visualization project will allow people to easily incorporate visualizations for NBA statistics in blog posts, etc...

# initial viz html/css only
The first vizualization will be a vertical bar chart showing 2018-19 regular season vs playoffs team winning percentage for all teams that made the playoffs (16). There will be side by side columns showing winning % for regular season and playoffs.

# this version incorporates javascript
This second version incorporates javascript and retrieves data from a JSON file or the stats.nba.com api

#color pallete
https://colorhunt.co/palette/155241
