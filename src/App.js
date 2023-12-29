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
      const accessToken = localStorage.getItem("accessToken");
      dispatch(getInformation({ accessToken: accessToken }));
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
