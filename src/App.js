import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './routes/Home';

function App() {
  return (
    <div className="App">
       <div style={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
          <BrowserRouter>
          
            <Routes>
              <Route path='/' element={<Home/>}></Route>
            </Routes>
          
          </BrowserRouter>

      </div>
      
    </div>
  );
}

export default App;
