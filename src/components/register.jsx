import { Builder } from '@builder.io/react'
import Signup from './auth/Signup';
import Login from './auth/Login';
import LoginSignup from './auth/LoginSignup';

export default function RegisterComponents() {
    Builder.registerComponent(Signup, {
        name: "SignUp",
        inputs: [{ name: "redirect", type: "uri" }]
    });
    Builder.registerComponent(Login, {
        name: "Login",
        inputs: [{ name: "redirect", type: "uri" }]
    })
    Builder.registerComponent(LoginSignup, {
        name: "LoginSignup",
        inputs: [{ name: "showLogin", type: "boolean"}, { name: "redirect", type: "uri" }]
    })
}
