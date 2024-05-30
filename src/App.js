import React, { useState } from 'react';
import './App.css';
import Navbar from './Componants/Navbar';
import News from './Componants/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 15;
  // const apikey = '5368eff9ff7c47d895ca45cc64bd91fe';
  const apikey = '8cfe109aaa314af4b4b96e1433055bb7';
  // apikey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgres]=useState(0)

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={2}
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgres={setProgres} apiKey={apikey} key="general" pageSize={pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgres={setProgres} apiKey={apikey} key="business" pageSize={pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgres={setProgres} apiKey={apikey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgres={setProgres} apiKey={apikey} key="general" pageSize={pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgres={setProgres} apiKey={apikey} key="health" pageSize={pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgres={setProgres} apiKey={apikey} key="science" pageSize={pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgres={setProgres} apiKey={apikey} key="sports" pageSize={pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgres={setProgres} apiKey={apikey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
}
export default App;