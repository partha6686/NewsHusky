import Navbar from './components/Navbar';
import React, {useState} from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = () => {
  const apiKey=process.env.REACT_APP_API_KEY;
  const pageSize=12;
  const [progress, setProgress] = useState(0)
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color="#16E2F5"
          progress={progress}
        />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} category="general"/></Route>
          <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} category="business"/></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} category="entertainment"/></Route>
          <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} category="health"/></Route>
          <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} category="science"/></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} category="sports"/></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} category="technology"/></Route>
          {/* <Route exact path="/query/:search"><News setProgress={setProgress} apiKey={apiKey} key="query" pageSize={pageSize} category="general" globalStore={this.params.}/></Route> */}
        </Switch>
      </Router>
    </div>
  )
}

export default App;