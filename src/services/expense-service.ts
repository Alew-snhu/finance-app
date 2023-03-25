import FirebaseConfig from "@/firebase-config";
import {query, getDocs, setDoc, doc, deleteDoc, collection, where, orderBy} from "firebase/firestore";
import {IExpense} from "@/custom-types/IExpense";
import {DateTime} from "luxon";
import StaticUtils from "../../StaticUtils";
import {IExpenseMonth} from "@/custom-types/IExpenseMonth";
import {IEditExpense} from "@/custom-types/IEditExpense";
export default class ExpenseService extends FirebaseConfig {
    protected colName = "Expenses"
    protected subColName = "Entries"

    // returns an array of months containing expenses
    public async getParentDocs(getPreviousMonths: boolean){
        const currentDocId = DateTime.now().toFormat('LLLL yyyy');
        const strArray: string[] = [];
        let q;
        if(getPreviousMonths){
            q = query(collection(this.db, this.colName),  where('name', '!=', currentDocId))
        }
        else {
            q = query(collection(this.db, this.colName),  where('name', '==', currentDocId))
        }
        const docRef = await getDocs(q);
        docRef.forEach((doc) => {
            strArray.push(doc.id);
        })
        return strArray;
    }

    public async getSubDocs(collectionId: string) {
        const entries: any[] = [];
        const ids: any[] = [];
        // this query will order the entries by date ascending
        const q = query(collection(this.db, `${this.colName}/${collectionId}/${this.subColName}`),
            orderBy("date", "asc"));
        const docRef = await getDocs(q)
        docRef.forEach((doc) => {
            entries.push(doc.data())
            ids.push(doc.id)
        })
        // insert ids into each object of the entries array to look up document when editing fields
        for(let i=0; i < entries.length; i++){
            entries[i].id = ids[i]
        }
        return entries;
    }

    public async setParentDocument(expenseMonth: IExpenseMonth){
        const docName = DateTime.fromISO(expenseMonth.date).toFormat('LLLL yyyy');
        const docRef = `${this.colName}/${docName}`

        try{
            await setDoc(doc(this.db, docRef), {
                name: docName,
            })
            await StaticUtils.presentToast("The document was successfully added to the collection!", 3000);
        } catch (e) {
            await StaticUtils.presentToast(`${e}`, 10000)
        }
    }

    public async setSubDocument(expense: IExpense) {
        // Manipulate expense date for document names
        const docName = DateTime.fromISO(expense.date).toFormat('LLLL yyyy');
        const subDocName = DateTime.fromISO(expense.date).toFormat('x');
        const expenseDate = DateTime.fromISO(expense.date).toFormat('DDD');
        const docRef =`/${this.colName}/${docName}/${this.subColName}/${subDocName}`

        try{
            await setDoc(doc(this.db, docRef), {
                date: expenseDate,
                type: expense.type,
                location: expense.location,
                amount: expense.amount,
            })
            await StaticUtils.presentToast("The document was successfully added to the collection!", 3000);
        } catch (e) {
            await StaticUtils.presentToast(`${e}`, 10000)
        }
    }

    public async updateSubDocument(expense: IEditExpense) {
        const docName = DateTime.fromISO(expense.date).toFormat('LLLL yyyy');
        const expenseDate = DateTime.fromISO(expense.date).toFormat('DDD');
        const docRef =`/${this.colName}/${docName}/${this.subColName}/${expense.id}`;
        try{
            await setDoc(doc(this.db, docRef), {
                date: expenseDate,
                type: expense.type,
                location: expense.location,
                amount: expense.amount
            })
            await StaticUtils.presentToast("The document was successfully updated to the collection!", 3000);
        } catch (e) {
            await StaticUtils.presentToast(`${e}`, 10000)
        }
    }
}