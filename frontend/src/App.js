import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path=":id" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
