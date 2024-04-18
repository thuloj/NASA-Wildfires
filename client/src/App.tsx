import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Docs from "./pages/Docs";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
//import Data from "./pages/Data";
//import InputForm from "./pages/InputForm";
import DataForm from "./pages/DataForm";
import Footer from "./components/Footer";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/node/" element={<Navigate to="/node/final" />} />
          <Route path="/node/final" element={<Home />} />
          <Route path="/node/Docs" element={<Docs />} />
          <Route path="/node/Data" element={<DataForm />} />
          <Route path="/node/Analysis" element={<Analysis />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}
