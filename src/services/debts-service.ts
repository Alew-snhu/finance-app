import FirebaseConfig from "@/firebase-config";
import {collection, getDocs, setDoc, doc, deleteDoc} from "firebase/firestore";
import {IDebt} from "@/custom-types/IDebt";
export default class DebtsService extends FirebaseConfig {

    protected debtsCollectionString = "Debts";
    public async getAllDocs(){
        const debtRef = await getDocs(collection(this.db,"Debts"));
        debtRef.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
    }
    // if a document does not exist in the collection, it will be created.
    // if the document does exist, its contents will be overwritten with new data.
    public async setDocument(docName: string, debt: IDebt) {
        const docRef = `${this.debtsCollectionString}/${docName}`

        await setDoc(doc(this.db, docRef), {
            type: debt.type,
            amount: debt.amount,
        });
    }
    // Sub collections related to parent documents will need to be deleted manually.
    public async deleteDocument(docName: string){
        await deleteDoc(doc(this.db, this.debtsCollectionString, docName))
    }
}