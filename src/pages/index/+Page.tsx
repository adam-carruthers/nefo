import Footer from "./footer";
import Menu from "./Menu";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Menu />
      </div>
      <Footer />
    </>
  );
}

export default App;
