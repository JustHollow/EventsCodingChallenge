import firebase from "@fb/client";

const auth = firebase.auth();

export const fbSignUpUser = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

export const fbSignInUser = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

export const fbSignOut = () => auth.signOut();

export const fbCheckAuth = auth.onAuthStateChanged;

export const fbReauthenticateUser = (currentPassword: string) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
    );
    return user.reauthenticateWithCredential(cred);
};

export const fbUpdatePassword = (
    currentPassword: string,
    newPassword: string
) =>
    fbReauthenticateUser(currentPassword).then(() => {
        const user = firebase.auth().currentUser;
        return user.updatePassword(newPassword);
    });
