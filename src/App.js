import React, { Component } from 'react';
import './App.css';
import Navbar from './Componants/Navbar';
import LoadingBar from 'react-top-loading-bar'
import News from './Componants/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  pageSize = 15;
  apikey = '5368eff9ff7c47d895ca45cc64bd91fe';
  // apikey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgres = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={2}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgres={this.setProgres} apiKey={this.apikey}  key="genera" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgres={this.setProgres} apiKey={this.apikey}  key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgres={this.setProgres} apKkey={this.apikey}  key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgres={this.setProgres} apiKey={this.apikey}  key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgres={this.setProgres} apiKey={this.apikey}  key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgres={this.setProgres} apiKey={this.apikey}  key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgres={this.setProgres} apiKey={this.apikey}  key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgres={this.setProgres} apiKey={this.apikey}  key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
