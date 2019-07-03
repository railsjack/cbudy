import { errorMessages } from '../constants/messages';
import { Firebase, FirebaseRef } from '../lib/firebase';
import { Actions } from 'react-native-router-flux';

/**
  * Sign Up to Firebase
  */
export function signUp(formData) {
  const {
    email, password, password2, firstName,
  } = formData;

  return () => new Promise(async (resolve, reject) => {
    // Validation rules
    if (!firstName) return reject({ message: errorMessages.missingFirstName });
    if (!email) return reject({ message: errorMessages.missingEmail });
    if (!password) return reject({ message: errorMessages.missingPassword });
    if (!password2) return reject({ message: errorMessages.missingPassword });
    if (password !== password2) return reject({ message: errorMessages.passwordsDontMatch });

    // Go to Firebase
    return Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // Send user details to Firebase database
        if (res && res.user.uid) {
          FirebaseRef.child(`users/${res.user.uid}`).set({
            email: res.user.email,
            firstName,
            signedUp: Firebase.database.ServerValue.TIMESTAMP,
            lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
          }).then(resolve);


          //Firebase.auth().currentUser.sendEmailVerification()
            //.catch(() => console.log('Verification email failed to send'));
        }
      }).catch(reject);
  }).catch((err) => { throw err.message; });
}

/**
  * Get this User's Details
  */
function getUserData(dispatch) {
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;

  const ref = FirebaseRef.child(`users/${UID}`);

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];

    return dispatch({ type: 'USER_DETAILS_UPDATE', data: userData });
  });
}

export function getMemberData() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(getUserData(dispatch));
      }

      return () => new Promise(() => resolve());
    });
  });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {
  const { email, password } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation rules
    if (!email) return reject({ message: errorMessages.missingEmail });
    if (!password) return reject({ message: errorMessages.missingPassword });

    // Go to Firebase
    return Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
      .then(() => Firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          const userDetails = res && res.user ? res.user : null;

          if (userDetails.uid) {
            // Update last logged in data
            const ref = FirebaseRef.child(`users/${userDetails.uid}`);
            ref.on('value', snap => {
              const userData = snap.val() || [];
              ref.off('value');

              if ( !userData.codeVerified ){
                setTimeout(()=>{
                  Actions.verifyCode();
                }, 2000);
                return reject({ message: errorMessages.codeNotverified });
              } else {
                /*FirebaseRef.child(`users/${userDetails.uid}`).update({
                  lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
                });*/
                return resolve(dispatch({ type: 'USER_LOGIN', data: userDetails }));
              }

            });
          }

          return resolve(dispatch({ type: 'USER_LOGIN', data: userDetails }));
        }).catch(reject));
  }).catch((err) => { throw err.message; });
}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation rules
    if (!email) return reject({ message: errorMessages.missingEmail });

    // Go to Firebase
    return Firebase.auth().sendPasswordResetEmail(email)
      .then(() => resolve(dispatch({ type: 'USER_RESET' })))
      .catch(reject);
  }).catch((err) => { throw err.message; });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email, password, password2, firstName, lastName, changeEmail, changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: errorMessages.missingFirstName });

    // Validation rules
    if (!firstName) return reject({ message: errorMessages.missingFirstName });
    if (!lastName) return reject({ message: errorMessages.missingLastName });
    if (changeEmail) {
      if (!email) return reject({ message: errorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: errorMessages.missingPassword });
      if (!password2) return reject({ message: errorMessages.missingPassword });
      if (password !== password2) return reject({ message: errorMessages.passwordsDontMatch });
    }

    // Go to Firebase
    return FirebaseRef.child(`users/${UID}`).update({ firstName, lastName })
      .then(async () => {
        // Update Email address
        if (changeEmail) {
          await Firebase.auth().currentUser.updateEmail(email).catch(reject);
        }

        // Change the password
        if (changePassword) {
          await Firebase.auth().currentUser.updatePassword(password).catch(reject);
        }

        // Update Redux
        return resolve(getUserData(dispatch));
      }).catch(reject);
  }).catch((err) => { throw err.message; });
}



/**
  * Verify Code
  */
export function verifyCode(formData) {
  const {
    verifyCode
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    console.log('UID', UID);
    if (!UID) return reject({ message: errorMessages.missingFirstName });

    // Validation rules
    if (!verifyCode || verifyCode.length !== 6) return reject({ message: errorMessages.missingVerifyCode });

    if (Firebase === null) return () => new Promise(resolve => resolve());


    const ref = FirebaseRef.child(`users/${UID}`);

    return ref.on('value', async (snapshot) => {
      const userData = snapshot.val() || [];
      ref.off('value');
      if (userData.verificationCode === verifyCode )
      {
        setTimeout(()=>{
          FirebaseRef.child(`users/${UID}`).update({ codeVerified: true })
        }, 1000);
        return resolve(dispatch({ type: 'VERIFY_CODE', data: {codeVerified: userData.verifyCode === verifyCode} }));
      }
      else{
        setTimeout(()=>{
          FirebaseRef.child(`users/${UID}`).update({ codeVerified: false });
        }, 1000);
        return reject({ message: errorMessages.verificationFailed });
      }
    });

    //return resolve(verifyCodeIn(verifyCode, dispatch));

  }).catch((err) => { throw err.message; });
}


/**
  * Send Code again
  */
export function resendCode() {
  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;

    if (!UID) return reject({ message: errorMessages.missingFirstName });

    // Go to Firebase
    return FirebaseRef.child(`users/${UID}`).update({ resendCode: true, resendCodeAt: +new Date })
      .then(async () => {
        return resolve(getUserData(dispatch));
      }).catch(reject);
    //return resolve(verifyCodeIn(verifyCode, dispatch));

  }).catch((err) => { throw err.message; });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise((resolve, reject) => Firebase.auth().signOut()
    .then(() => resolve(dispatch({ type: 'USER_RESET' })))
    .catch(reject)).catch((err) => { throw err.message; });
}
