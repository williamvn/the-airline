import './App.css';
import {Panel} from '../Panel/Panel';

function App() {
  return (
    <div className="App">
     <div className='navbar-title'>
        Wellcome to the airline
     </div>
      <header className="App-header">
        <div className='column'>
          <Panel title="Balance" data="Some Data: Lorem itsu maki tuki"></Panel>
          <Panel title="Loyality points - refundable ether" data="Some Data: Lorem itsu maki tuki"></Panel>
        </div>
        <div className='column'>
          <Panel title="Your flights" data="Some Data: Lorem itsu maki tuki"></Panel>
          <Panel title="Available Flights" data="Some Data: Lorem itsu maki tuki"></Panel>
      </div>
      </header>
    </div>
  );
}

export default App;
