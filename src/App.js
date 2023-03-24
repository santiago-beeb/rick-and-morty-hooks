import "./App.css";
import Characters from "./components/Characters";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Rick and Morty</h1>
      <Characters />
    </div>
  );
}

export default App;
