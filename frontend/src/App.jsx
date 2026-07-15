import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Cases from "./pages/Cases";
import CaseWorkspace from "./pages/CaseWorkspace";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/cases" element={<Cases />} />

      {/* Investigation Workspace */}
      <Route
        path="/cases/:caseId"
        element={<CaseWorkspace />}
      />

      {/* Upload evidence for a case */}
      <Route
        path="/upload/:caseId"
        element={<Upload />}
      />

      <Route path="/analysis" element={<Analysis />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;