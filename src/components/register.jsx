import { Builder } from '@builder.io/react'
import Signup from './Signup';

export default function RegisterComponents() {
    Builder.registerComponent(Signup, {
        name: "SignUp",
    });
}
