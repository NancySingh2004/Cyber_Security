import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Cases from "./pages/Cases";
import CaseWorkspace from "./pages/CaseWorkspace";

import { ThemeProvider } from "./context/ThemeContext";


function App() {

  return (

    <ThemeProvider>

      <Routes>

        <Route 
          path="/" 
          element={<Dashboard />} 
        />

        <Route 
          path="/cases" 
          element={<Cases />} 
        />


        <Route
          path="/cases/:caseId"
          element={<CaseWorkspace />}
        />


        <Route
          path="/upload/:caseId"
          element={<Upload />}
        />


        <Route 
          path="/analysis" 
          element={<Analysis />} 
        />


        <Route 
          path="/reports" 
          element={<Reports />} 
        />


        <Route 
          path="/settings" 
          element={<Settings />} 
        />

      </Routes>

    </ThemeProvider>

  );

}


export default App;