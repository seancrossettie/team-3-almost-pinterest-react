import firebase from 'firebase/app';

const signInGitHubUser = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('repo');
  provider.setCustomParameters({
    allow_signup: 'false'
  });
  firebase.auth().signInWithPopup(provider).then((result) => {
    const { credential } = result;
    const token = credential.accessToken;
    console.warn(token);
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
