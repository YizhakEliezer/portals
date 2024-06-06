import './App.css';
import MainComponent from './comp/main'
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './comp/Login';
import { auth, database } from './firebaseConfig';
import Loading from './comp/Loading';

// function App() {
//   return (
//     <div className="App">
//       <MainComponent/>
      
//     </div>
//   );
// }

// export default App;





const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {

      try {
        if (currentUser.displayName) {
          setUser(currentUser.displayName)
        } else if (currentUser.email) {
          setUser(currentUser.email)
        }
        else {
          setUser(null)
        }
      } catch (e) { console.log(e) }


      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);



  if (isLoading) {
    return <Loading />;
  }







  return (



      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path={`/user`} element={user ? <MainComponent /> : <Navigate to="/" />} />
        </Routes>
      </HashRouter>


 
  );
};

export default App;


