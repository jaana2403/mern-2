import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Wizard from './components/Wizard';
import AIHelp from './components/AIHelp';
import ProgressTracker from './components/ProgressTracker';
import TemplateViewer from './components/TemplateViewer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/ai" element={<AIHelp />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/templates" element={<TemplateViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
