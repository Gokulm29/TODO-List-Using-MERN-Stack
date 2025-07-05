import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import LoginPage from "./LoginPage";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // clean up
  }, []);

  return (
    <div className="container">
      {user ? <Todo /> : <LoginPage />}
    </div>
  );
}

export default App;
