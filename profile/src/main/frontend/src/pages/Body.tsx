import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

export default function Body({ currentPage, onReset }: { currentPage: string; onReset: () => void }) {
  return (
    <div
      style={{
        height: "80dvh",
        width: "100%",
        textAlign: "center",
        overflowY: "scroll",
      }}
    >
      {currentPage === "home" && <Home />}
      {currentPage === "signin" && <Login onSuccess={onReset} />}
      {currentPage === "signup" && <Signup onSuccess={onReset} />}
    </div>
  );
}