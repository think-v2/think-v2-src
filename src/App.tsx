import { Routes, Route } from "react-router-dom";
import Index from "./routes/index/Index";
import LyricTest from "./routes/lyric_test/LyricTest";
import PickupParty from "./routes/pickup_party/PickupParty";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/LyricTest" element={<LyricTest />} />
        <Route path="/PickupParty" element={<PickupParty />} />
      </Routes>
    </div>
  );
}

export default App;
