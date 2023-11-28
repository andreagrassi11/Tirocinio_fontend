import {BrowserRouter, Route, Routes} from 'react-router-dom';	
// Desktop
import Login from './Pages/Desktop/Login/Login';
import Homepage from './Pages/Desktop/Homepage/Homepage';
import Home from './Pages/Desktop/Homepage/Home';
import Spettacoli from './Pages/Desktop/Spettacoli/Spettacoli';
import VisualizzaSpettacoli from './Pages/Desktop/Spettacoli/VisualizzaSpettacoli';
import CreaSpettacoli from './Pages/Desktop/Spettacoli/CreaSpettacoli';
import ModificaSpettacoli from './Pages/Desktop/Spettacoli/ModificaSpettacoli';
import Risultati from './Pages/Desktop/Risultati/Risultati';
import VisualizzaRisultati from './Pages/Desktop/Risultati/VisualizzaRisultati';
import LandingPage from './Pages/Desktop/Spettacoli/LandingPage';
import AvviaSpettacoli from './Pages/Desktop/Avvia spettacoli/Avvia';
import VisualizzaAvvio from './Pages/Desktop/Avvia spettacoli/VisualizzaAvvio';
import CreaSpettacoloRel from './Pages/Desktop/Spettacoli/CreaSpettacoloRel';
import AvvioSpettacolo from './Pages/Desktop/Avvia spettacoli/AvvioSpettacolo';
import FineSpettacolo from './Pages/Desktop/Avvia spettacoli/FineSpettacolo';

//Big Screen
import BigScreen from './Pages/BigScreen/BigScreen';

// Mobile
import HomeMobile from './Pages/Mobile/HomeMobile';
import WaitingMobile from './Pages/Mobile/WaitingMobile';
import QuestionMobile from './Pages/Mobile/QuestionMobile';
import SubmitMobile from './Pages/Mobile/SubmitMobile';
import TerminedMobile from './Pages/Mobile/TerminedMobile';
import BigGraph from './Pages/BigScreen/BigGraph';


function App() {
  return (
	<>
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<Login/>}/>
				<Route index path="/homepage" element={<Homepage componentToRender={Home}/>}/>
				<Route index path="/homepage/spettacoli" element={<Homepage componentToRender={Spettacoli}/>}/>
				<Route index path="/homepage/visualizza/spettacoli/:id" element={<Homepage componentToRender={VisualizzaSpettacoli}/>}/>
				<Route index path="/homepage/crea/spettacolo/:id" element={<Homepage componentToRender={CreaSpettacoloRel}/>}/>
				<Route index path="/homepage/crea/spettacoli" element={<Homepage componentToRender={CreaSpettacoli}/>}/>
				<Route index path="/homepage/crea/spettacoli/landingpage/:err" element={<Homepage componentToRender={LandingPage}/>}/>
				<Route index path="/homepage/modifica/spettacoli/:id" element={<Homepage componentToRender={ModificaSpettacoli}/>}/>
				<Route index path="/homepage/risultati" element={<Homepage componentToRender={Risultati}/>}/>
				<Route index path="/homepage/avvia/spettacoli" element={<Homepage componentToRender={AvviaSpettacoli}/>}/>
				<Route index path="/homepage/inizio/spettacolo/:showId/:showReId" element={<Homepage componentToRender={AvvioSpettacolo}/>}/>
				<Route index path="/homepage/fine/spettacolo" element={<Homepage componentToRender={FineSpettacolo}/>}/>
				<Route index path="/homepage/visualizza/avvia/spettacoli/:showId/:showReId" element={<Homepage componentToRender={VisualizzaAvvio}/>}/>
				<Route index path="/homepage/visualizza/risultati/:showId/:showReId" element={<Homepage componentToRender={VisualizzaRisultati}/>}/>

				<Route index path="/bigscreen/:showId" element={<BigScreen/>}/>
				<Route index path="/bigGraph/:showId" element={<BigGraph/>}/>

				<Route index path="/mobile/:showId" element={<HomeMobile/>}/>
				<Route index path="/mobile/waiting/:showId" element={<WaitingMobile/>}/>
				<Route index path="/mobile/question/:showId" element={<QuestionMobile/>}/>
				<Route index path="/mobile/confirm/submit/:showId/:textCod" element={<SubmitMobile/>}/>
				<Route index path="/mobile/termined" element={<TerminedMobile/>}/>
			</Routes>
		</BrowserRouter>
	</>
  );
}

export default App;
