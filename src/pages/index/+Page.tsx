import LanguageProvider from "@/context/language/provider";
import Footer from "./footer";
import Menu from "./Menu";
import Navbar from "./Navbar";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Menu />
      </div>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
