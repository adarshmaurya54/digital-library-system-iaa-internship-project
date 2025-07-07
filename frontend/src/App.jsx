import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import bg  from './assets/landing-bg'

function App() {
  return (
    <div className="h-screen font-poppins">
      <Header />
      <div style={{backgroundImage: `url(src/)`}} className="flex items-center py-10 justify-center">
        <Login />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
