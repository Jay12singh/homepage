import React, { useState } from 'react'
import "./mix.css";
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [passShow, setpassShow] = useState(false);
    const [CpassShow, setCpassShow] = useState(false);


    const [inputVal, setinputVal] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
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

    const addUserData = async (e) => {
        e.preventDefault();
        const { fname, email, password, cpassword } = inputVal;
        if (fname === "") {
            alert("please enter your name");
        } else if (email === "") {
            alert("Please enter your email");
        } else if (!email.includes("@")) {
            alert("enter valid email");
        } else if (password === "") {
            alert(" enter your password");
        } else if (password.length < 6) {
            alert("password must be atleast 6 char");
        } else if (cpassword === "") {
            alert("enter your confirm password");
        } else if (cpassword.length < 6) {
            alert("password must be atleast 6 char");
        } else if (password !== cpassword) {
            alert("password mismatch");
        } else {
            // console.log("user registration successfully done");
            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            if (!data.ok) {
                console.error(`HTTP Error! Status: ${data.status}`);
            } else {
                const res = await data.json();
                // console.log(res.status);
                if (res.status === 201) {
                    alert("user registration done");
                    setinputVal({ ...inputVal, fname: "", email: "", password: "", cpassword: "" });
                }
            }
        }


    }
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>SignUp</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using project cloud to manage<br /> your task! We hpe that you will get like it. </p>
                    </div>
                    <form>

                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input
                                type="text"
                                onChange={setVal}
                                value={inputVal.fname}
                                name="fname"
                                id="fname"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                onChange={setVal}
                                value={inputVal.email}
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

                            <div className="form_input">
                                <label htmlFor="email">Confirm Password</label>
                                <div className="two">
                                    <input
                                        type={!CpassShow ? "password" : "text"}
                                        onChange={setVal}
                                        value={inputVal.cpassword}
                                        name="cpassword"
                                        id="cpassword"
                                        placeholder="Confirm password"
                                    />
                                    <div className="showpass" onClick={() => setCpassShow(!CpassShow)}>
                                        {!CpassShow ? "Show" : "Hide"}
                                    </div>

                                </div>
                            </div>
                            <div className="btn" onClick={addUserData}>SignUp</div>
                            <p>Already have an account? <NavLink to="/">Login</NavLink></p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Register;