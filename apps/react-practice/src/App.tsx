import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>App Root Page.</h1>
      <Outlet />
    </div>
  );
}

export default App;
