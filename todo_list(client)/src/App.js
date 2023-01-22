import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import ListPage from "./features/list/ListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
