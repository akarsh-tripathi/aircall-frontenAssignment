import React from 'react';
import ReactDOM from 'react-dom';
import ActivityFeed from './components/CallLogFile.js';
import ArchivedCalls from './components/ArchivedLogFile.js';
import Header from './Header.jsx';
import { useState } from "react";

const App = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className='container'>
      <Header currentTab={currentTab} handleTabChange={handleTabChange}/>
      <div className="container-view">
        {currentTab === 0 && <ActivityFeed />}
        {currentTab === 1 && <ArchivedCalls />}
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
