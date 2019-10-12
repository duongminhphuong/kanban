import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <p>
          <Button variant="success" className="add_button">Add new column</Button>
        </p>
      {/* <header className="App-header">
        
      </header> */}
      
    </div>
  );
}

export default App;
