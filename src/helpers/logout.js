import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const logout = () => {
    signOut(auth).then(() => {
        window.open('/', "_self")
    }).catch((error) => {
        // An error happened.
    });
}