import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { getInformation } from "./actions";
import Routes from "./routing/Routes";
import store from "./store";

window.store = store;

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      const token = localStorage.getItem("token-user");
      if (token != null || token != undefined)
      dispatch(getInformation({ token: token }));
    }
  }, [auth.authenticate]);

  
  return (
   
<>
        {/* <Layout> */}
        <Route component={Routes} />
        {/* </Layout> */}
</>
     
  );
}
export default App;
