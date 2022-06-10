import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Test from "./routes/Test";
import Createroom from "./routes/Createroom";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="createroom" element={<Createroom />} />
      <Route path="test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);
