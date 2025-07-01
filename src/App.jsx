import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FormA from "./FormA";

function App() {
  const [count, setCount] = useState(0);

  return <FormA />;
}

export default App;
