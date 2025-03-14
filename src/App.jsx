import { useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  return (
    <div className="app">
      {!user ? (
        <button onClick={signIn} className="sign-in">Sign In with Google</button>
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
}

export default App;
