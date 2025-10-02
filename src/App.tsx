import { Routes, Route } from "react-router-dom";
import Index from "./routes/index/Index";
import LyricTest from "./routes/lyric_test/LyricTest";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/LyricTest" element={<LyricTest />} />
      </Routes>
    </div>
  );
}

export default App;
