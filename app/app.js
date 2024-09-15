import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page';
import Dashboard from './Dashboard'; // Import your Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other routes as necessary */}
      </Routes>
    </Router>
  );
}

export default App;