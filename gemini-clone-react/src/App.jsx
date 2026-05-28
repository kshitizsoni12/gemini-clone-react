import React,{ useContext } from 'react';
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import Main from "./components/Main/Main.jsx"
import { Context } from './context/Context.jsx';
import "./App.css"

export default function App() {

  // Grab the current theme ("light" or "dark") from Context
  const { theme } = useContext(Context);

  return (
    // We pass the theme directly as the class name!
    <div className={`app ${theme}`}>
      <Sidebar/>
      <Main/>
    </div>
  )
}
