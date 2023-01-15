
import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getDocs, getFirestore } from "firebase/firestore";
import {ref, onUnmounted} from "vue";

export default class Firebase {
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
    public db = getFirestore(this.app)

    // public  finances{} = await getDocs(collection(this.db, "Finances"))

    public debtRef = collection(this.db, "Finances", "Debts", "Debt");

    public async  getDebts() {
        return await getDocs(this.debtRef);
    }

}

