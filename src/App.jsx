import React, { usestate, useeffect, useState, useEffect } from 'react'
import ScoreCard from "./components/ScoreCard.jsx"
import axios from 'axios'

function App() {

  const [cardsData, setCardsData] = useState([]);

  // const getCurrentWeekScoresEndpoint = /api/getCurrentWeekScores;

  const fetchData = async () => {
    try {
      const response = await fetch('https://football-data-api-92a7c1537ec2.herokuapp.com/getCurrentWeekScores');
      const rawscores = await response.json();
      const scores = JSON.parse(rawscores);
      setCardsData(scores);
      console.log(scores)

    }
    catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData(); // Fetch data on component mount

    // Set up an interval to refresh the data every 5 minutes
    const intervalId = setInterval(fetchData, 300000); // 300000 ms = 5 minutes

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div class="flex flex-wrap m-10 p-10 justify-center">
      {cardsData.map((data, index) => (
        <ScoreCard key={index} 
        teamName_0 = {data.teamName_0}
        teamScore_0 = {data.teamScore_0}
        teamLogo_0 = {data.teamData_0[0].teamLogo}

        teamName_1 = {data.teamName_1}
        teamScore_1 = {data.teamScore_1}
        teamLogo_1 = {data.teamData_1[0].teamLogo}
        
        gameTime = {data.gameTime}
        Date = {data.Date}
        nextEvent_0 = {data.teamData_0[0].nextEvent}
        nextEvent_1 = {data.teamData_1[0].nextEvent}/>
      ))}
    </div>
  )


}

export default App
