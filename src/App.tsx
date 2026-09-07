import { Footer, Header } from "./components/chrome";
import { HomePage } from "./components/HomePage";
import { QuizPage } from "./components/QuizPage";
import { useHashRoute } from "./hooks/hooks";

export default function App() {
  const { route, navigate } = useHashRoute();

  return (
    <div className="bg-cosmos min-h-screen">
      <Header route={route} navigate={navigate} />
      <main className="mx-auto max-w-6xl pb-6">
        {route === "home" && <HomePage navigate={navigate} />}
        {route === "personality" && <QuizPage key="personality" testId="personality" navigate={navigate} />}
        {route === "crime" && <QuizPage key="crime" testId="crime" navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
