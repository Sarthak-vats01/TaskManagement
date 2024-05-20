import Task from "./pages/tasks.jsx";
import LoginSignup from "./pages/loginSignup.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountProvider from "./context/AccountProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Routes>
          <Route path="/task/:id" element={<Task />} />
          <Route path="/" element={<LoginSignup />} />
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
