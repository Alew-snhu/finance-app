import FirebaseConfig from "@/firebase-config";
import {DateTime} from "luxon";
import {collection, getDocs, query, where} from "firebase/firestore";

export default class DatabaseService extends FirebaseConfig {
    public async getParentDocs(getPreviousMonths: boolean, collectionName: string){
        const currentDocId = DateTime.now().toFormat('LLLL yyyy');
        const strArray: string[] = [];
        let q;
        if(getPreviousMonths){
            q = query(collection(this.db, collectionName),  where('name', '!=', currentDocId))
        }
        else {
            q = query(collection(this.db, collectionName),  where('name', '==', currentDocId))
        }
        const docRef = await getDocs(q);
        docRef.forEach((doc) => {
            strArray.push(doc.id);
        })
        return strArray;
    }

}
