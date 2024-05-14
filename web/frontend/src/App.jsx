import ProjectList from "./Components/ProjectList";
import AddProject from "./Components/AddProject";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/" element={<AddProject />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
};

export default App;
