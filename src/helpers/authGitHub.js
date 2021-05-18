import firebase from 'firebase/app';

const signInGitHubUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    const { credential } = result;
    const token = credential.accessToken;
    const { user } = result;
    console.warn(token, user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const { email } = error;
    const { credential } = error;
    console.warn(errorCode, errorMessage, email, credential);
  });
};
const signOutUser = () => new Promise((resolve, reject) => {
  firebase.auth().signOut().then(resolve).catch(reject);
});
export { signInGitHubUser, signOutUser };
