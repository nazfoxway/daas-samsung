import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";


function do_check() {
  const currentTime = new Date().getTime();
  const lastAuthTime = localStorage.getItem("lastAuthTime");

  if (lastAuthTime && currentTime - lastAuthTime < 24 * 60 * 60 * 1000) {
    return true;
  }

  const password = prompt("Password:");
  if (password === "Diamond2023" || password === "Fox2023") {
    localStorage.setItem("lastAuthTime", currentTime);
    localStorage.setItem('pw',password)
    return true;
  }

  return false;
}


async function login_attempt() {
  // const password = prompt("Password:");
  const response = await fetch('https://un61y39pyi.execute-api.eu-west-1.amazonaws.com/dm_daas_auth_samsung_temp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'user':localStorage.getItem('pw')})
  });
  const result = await response.json();
  result=true
  if (result.isValid) {
      return true;
  } else {
      return false;
  }
}



const decision=do_check()
login_attempt()

if (decision){
  // document.onload(do_check())

  ReactDOM.render(
    
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <HashRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/admin`} component={AdminLayout} />
              <Route path={`/rtl`} component={RTLLayout} />
              <Redirect from='/' to='/admin' />
            </Switch>
          </HashRouter>
        </ThemeEditorProvider>
      </React.StrictMode>
    </ChakraProvider>,
    document.getElementById("root")
  );
}