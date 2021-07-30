import React from "react"
import ReactDOM from "react-dom"
import TestDiv from "./uicomponents/TestDiv"

const App = () => (
  <div>
    <h1>Тестовый компонент</h1>
    <TestDiv />
  </div>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
