import { Builder } from '@builder.io/react'
import Signup from './auth/Signup';
import Login from './auth/Login';
import LoginSignup from './auth/LoginSignup';
import DynamicStockTable from './DynamicStockTable';

export default function RegisterComponents() {
    Builder.registerComponent(Signup, {
        name: "SignUp",
    });
    Builder.registerComponent(Login, {
        name: "Login",
        inputs: [{ name: "redirect", type: "uri" }]
    });
    Builder.registerComponent(LoginSignup, {
        name: "LoginSignup",
        inputs: [{ name: "showLogin", type: "boolean"}, { name: "redirect", type: "uri" }]
    });
    Builder.registerComponent(DynamicStockTable, {
        name: "DynamicStockTable",
        inputs: [{ name: "Start Amount", type: "number", defaultValue: 10000}]
    });
}
