
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './pwaRegistration'
import { setMapboxToken } from './services/mapService'

// Set Mapbox token
setMapboxToken('pk.eyJ1IjoibG92YWJsZWFwcCIsImEiOiJjbDByZWRmYWcwY28wM2NxcTg5MnRxZGlrIn0.OJYzPnzwYXdRDJ2EJ7k_fg');

// Register service worker for PWA functionality
registerServiceWorker();

createRoot(document.getElementById("root")!).render(<App />);
