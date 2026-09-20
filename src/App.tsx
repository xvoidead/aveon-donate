import { useEffect, useState } from "react";
import { AppProvider } from "./context/AppContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Showcase } from "./components/Showcase";
import { Integration } from "./components/Integration";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { DashboardPage } from "./components/DashboardPage";
import { ServerDemo } from "./components/ServerDemo";

function useRoute() {
  const route = () => window.location.hash.replace("#", "") || "home";
  const [current, setCurrent] = useState(route);
  useEffect(() => {
    const update = () => {
      const next = route();
      setCurrent(next);
      if (next !== "dashboard-app" && next !== "server-demo") {
        requestAnimationFrame(() => document.getElementById(next)?.scrollIntoView());
      }
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return current;
}

function Application() {
  const route = useRoute();
  if (route === "dashboard-app") return <><DashboardPage /><AuthModal /></>;
  if (route === "server-demo") return <><ServerDemo /><AuthModal /></>;

  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      <Header />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Integration />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return <AppProvider><Application /></AppProvider>;
}
