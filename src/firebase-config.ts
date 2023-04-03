import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

export default  class FirebaseConfig {
    protected firebaseConfig = {
        apiKey: "AIzaSyB731ibVXnSe8DWolRKlbIP_gXKJ8enGp4",
        authDomain: "finance-app-4d838.firebaseapp.com",
        projectId: "finance-app-4d838",
        storageBucket: "finance-app-4d838.appspot.com",
        messagingSenderId: "244138604429",
        appId: "1:244138604429:web:1740499bf0be520e41efc4",
        measurementId: "G-GE2HS7LYHH"
    };
    protected app = initializeApp(this.firebaseConfig);
    protected db = getFirestore(this.app)

    public auth = getAuth(this.app);

    public signIn(userEmail: string, password:string){
        signInWithEmailAndPassword(this.auth, userEmail, password)
            .then((userCredential) => {
                if(userCredential.user){
                    console.log(userCredential.user)
                }
                else {
                    console.log("wrong credentials")
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("An error occurred while trying to log in");
                console.log(errorCode, errorMessage);

        })
    }

    public signOut(){
        signOut(this.auth).then(() => {
            console.log("Sign out successful");
        }).catch((error) => {
            console.log("an error happened when trying to sign out." + error)
        })
    }
    public createAccount(userEmail: string, password:string){
        createUserWithEmailAndPassword(this.auth,userEmail, password )
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    }

}

