import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import {axiosWithAuth} from "../helpers/axiosWithAuth";

const initialUserInfo = {
    username:"",
    password:"",
    // error:"Username or Password not valid."
}

const Login = () => {

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const {push} = useHistory();

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });
  const updateForm = e=>{
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    })
  }
  
  const login = e=>{
    e.preventDefault();
    axiosWithAuth()
      .post("/login", userInfo)
      .then(res=>{
        localStorage.setItem("token", res.data.payload);
        push("/protected");
        setUserInfo(initialUserInfo);
      })
      .catch(error=>{
        console.log(error);
      })
    
  }

  const error = userInfo.error;
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={login}>
          <label>Username:
              <input
                type="text"
                data-testid="username"
                name="username"
                value={userInfo.username}
                onChange={updateForm}
              />
          </label>
          <label>Password:
              <input
                type="text"
                data-testid="password"
                name="password"
                value={userInfo.password}
                onChange={updateForm}
              />
          </label>
          <button>Login</button>
        </form>
      </div>
      

      {(userInfo.username.length===0 || userInfo.password.length===0) &&<p data-testid="errorMessage" className="error">{error}</p>}
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.