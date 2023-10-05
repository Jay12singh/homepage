import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

const Login = () => {
    const [passShow, setpassShow] = useState(false);
    const history = useNavigate();


    const [inputVal, setinputVal] = useState({

        email: "",
        password: ""

    });

    // console.log(inputVal);

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setinputVal(() => {
            return {
                ...inputVal,
                [name]: value
            }
        })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = inputVal;
        if (email === "") {
            alert("Please enter your email");
        } else if (!email.includes("@")) {
            alert("enter valid email");
        } else if (password === "") {
            alert(" enter your password");
        } else if (password.length < 6) {
            alert("password must be atleast 6 char");
        } else {
            // console.log("user login successfully")

            const data = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();
            // console.log(res);


            if (res.status === 201) {
                localStorage.setItem("usersdatatoken", res.result.token);
                history("/dash")
                setinputVal({ ...inputVal, email: "", password: "" });
            }

        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back ,Login</h1>
                        <p>Hi , We are you glad you back. Please Login</p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                value={inputVal.email}
                                onChange={setVal}
                                name="email"
                                id="email"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Password</label>
                            <div className="two">
                                <input
                                    type={!passShow ? "password" : "text"}
                                    onChange={setVal}
                                    value={inputVal.password}
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                />
                                <div className="showpass" onClick={() => setpassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>

                            </div>
                        </div>
                        <div className="btn" onClick={loginUser}>Login</div>
                        <p>You Don't have an account? <NavLink to="/register">SignUp</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;
