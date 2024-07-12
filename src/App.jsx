import Footer from "./components/footer";
import Header from "./components/header";
import Devices from "./components/devices";
import General from "./components/general";
import Scripts from "./components/scripts";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <General />
        <Scripts />
        <Devices />
      </main>
      <Footer />
    </div>
  );
}

export default App;

