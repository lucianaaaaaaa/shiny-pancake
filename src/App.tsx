import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

import { routes } from "./data/routes";

// IMPORTAR
import { UserProvider } from "./context/UserContext";

export default function App() {

  return (

    <UserProvider>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Layout />}>

            {routes.map((route, index) => (
              <Route
                key={index}
                index={route.path === "/"}
                path={route.path === "/" ? undefined : route.path.slice(1)}
                element={route.element}
              />
            ))}

          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>

      </BrowserRouter>

    </UserProvider>
  );
}