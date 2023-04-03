import {collection, doc, getDocs, orderBy, query, runTransaction} from "firebase/firestore";
import {IExpense} from "@/custom-types/IExpense";
import {DateTime} from "luxon";
import StaticUtils from "../../StaticUtils";
import {IExpenseMonth} from "@/custom-types/IExpenseMonth";
import {IEditExpense} from "@/custom-types/IEditExpense";
import {ExpenseServiceEnums} from "@/Enums/ExpenseServiceEnums";
import DatabaseService from "@/services/database-service";

export default class ExpenseService extends DatabaseService {
    public colName = "Expenses";
    protected totalsColName = "Totals"
    protected subColName = "Entries";
    protected enums = ExpenseServiceEnums;


    public async getSubDocs(collectionId: string) {
        const entries: any[] = [];
        // this query will order the entries by date ascending
        const q = query(collection(this.db, `${this.colName}/${collectionId}/${this.subColName}`),
            orderBy("date", "asc"));

        const docRef = await getDocs(q)

        docRef.forEach((doc) => {
            const entry = {
                id: doc.id,
                date: doc.data().date,
                type: doc.data().type,
                amount: doc.data().amount,
                location: doc.data().location,
            }
            entries.push(entry)
        })
        return entries;
    }

    public async setParentDocument(expenseMonth: IExpenseMonth){
        const docInfo = this.transformDocRef(this.enums.SetParent,undefined, expenseMonth)
        try{
            await runTransaction(this.db, async(transaction) => {
                transaction.set(doc(this.db, docInfo.docRef), {
                    name: docInfo!.docName,
                });
                transaction.set(doc(this.db, docInfo.totalsRef!), {
                    name: docInfo.docName,
                    expenseTotal: 0
                });
            })

            await StaticUtils.presentToast("The document was successfully added to the collection!", 3000);
        } catch (e) {
            await StaticUtils.presentToast(`${e}`, 10000)
        }
    }

    public async addSubDocument(expense: IExpense) {
        // Manipulate expense date for document names
        const docInfo = this.transformDocRef(this.enums.SetSub, expense, undefined);
        try{
            await runTransaction(this.db, async(transaction) =>{
                const expenseTotal = await transaction.get(doc(this.db, docInfo.totalsRef!));
                if(!expenseTotal.exists()) {
                    throw "No document here!   ¯|_(ツ)_/¯";
                }
                let total = expenseTotal.data().expenseTotal;
                total += expense.amount
                transaction.set(doc(this.db, docInfo!.totalsRef!), {
                    expenseTotal: total,
                })
                transaction.set(doc(this.db, docInfo!.docRef), {
                    date: docInfo!.expenseDate,
                    type: expense.type,
                    location: expense.location,
                    amount: expense.amount,
                });
            })
            await StaticUtils.presentToast("The document was successfully added to the collection!", 3000);
        } catch (e) {
            await StaticUtils.presentToast(`${e}`, 10000)
        }
    }

    public async updateSubDocument(expense: IEditExpense) {
        const docInfo = this.transformDocRef(this.enums.UpdateSub, expense, undefined);

        try{
            await runTransaction(this.db, async(transaction) => {
                const savedExpense = await transaction.get(doc(this.db, docInfo.docRef));
                const expenseTotal = await transaction.get(doc(this.db, docInfo.totalsRef!));
                if(!savedExpense.exists() || !expenseTotal.exists()) {
                    throw "No document here!  ¯|_(ツ)_/¯";
                }
                const previousAmount = savedExpense.data().amount;
                let total = expenseTotal.data().expenseTotal;
                let amountDif;
                if(expense.amount < previousAmount){
                    amountDif = previousAmount - expense.amount;
                    total -= amountDif;
                }
                else if (expense.amount > previousAmount) {
                    amountDif = expense.amount - previousAmount
                    total += amountDif;
                }

                transaction.set(doc(this.db, docInfo!.totalsRef!), {
                    expenseTotal: total,
                })
                transaction.set(doc(this.db, docInfo!.docRef), {
                    date: docInfo!.expenseDate,
                    type: expense.type,
                    location: expense.location,
                    amount: expense.amount
                })
            })

            await StaticUtils.presentToast("The document was successfully updated in the collection!", 3000);
        } catch (e) {
            await StaticUtils.presentToast(`${e}`, 10000)
        }
    }

    public async deleteSubDocument(expense: IEditExpense){
        const docInfo = this.transformDocRef(this.enums.DeleteSub, expense, undefined);
        try{
            await runTransaction(this.db, async(transaction) => {
                const savedExpense = await transaction.get(doc(this.db, docInfo.docRef));
                const expenseTotal = await transaction.get(doc(this.db, docInfo.totalsRef!));
                if(!savedExpense.exists() || !expenseTotal.exists()) {
                    throw "No document here!  ¯|_(ツ)_/¯";
                }
                const previousAmount = savedExpense.data().amount;
                let total = expenseTotal.data().expenseTotal;

                total -= previousAmount
                transaction.set(doc(this.db, docInfo!.totalsRef!), {
                    expenseTotal: total,
                })

                transaction. delete(doc(this.db, docInfo!.docRef));
            })

            await StaticUtils.presentToast("The document was successfully deleted from the collection!", 3000);
        } catch (e) {
            await StaticUtils.presentToast(`${e}`, 10000)
        }
    }

    private transformDocRef(
        methodType: ExpenseServiceEnums,
        expense?: IExpense | IEditExpense,
        expenseMonth?: IExpenseMonth)
    {
        switch (methodType){
            case ExpenseServiceEnums.SetParent: {
                const docName = DateTime.fromISO(expenseMonth!.date).toFormat('LLLL yyyy');
                return {
                    docRef: `${this.colName}/${docName}`,
                    docName: docName,
                    totalsRef: `${this.totalsColName}/${docName}`
                }
            }
            case ExpenseServiceEnums.SetSub: {
                const docName = DateTime.fromISO(expense!.date).toFormat('LLLL yyyy');
                const subDocName = DateTime.fromISO(expense!.date).toFormat('x');
                const expenseDate = DateTime.fromISO(expense!.date).toFormat('DDD');
                return {
                    docRef:`/${this.colName}/${docName}/${this.subColName}/${subDocName}`,
                    expenseDate: expenseDate,
                    totalsRef: `/${this.totalsColName}/${docName}`,
                }
            }
            case ExpenseServiceEnums.UpdateSub: {
                const docName = DateTime.fromISO(expense!.date).toFormat('LLLL yyyy');
                const expenseDate = DateTime.fromISO(expense!.date).toFormat('DDD');
                if('id' in expense!){
                    return {
                        docRef:`/${this.colName}/${docName}/${this.subColName}/${expense.id}`,
                        expenseDate: expenseDate,
                        totalsRef: `/${this.totalsColName}/${docName}`,
                    }
                }
                else {
                    throw new Error("Invalid document Id")
                }
            }
            case ExpenseServiceEnums.DeleteSub: {
                const strippedDateString = expense!.date.toString().replace(/,/g, '');
                let isoDate = DateTime.fromFormat(strippedDateString, "LLLL dd yyyy");
                if(isNaN(isoDate.valueOf())){
                    isoDate = DateTime.fromFormat(strippedDateString, "LLLL d yyyy");
                }
                expense!.date = DateTime.fromISO(isoDate.toString()).toFormat('LLLL yyyy');
                if('id' in expense!){
                    return{
                        docRef:`/${this.colName}/${expense.date}/${this.subColName}/${expense.id}`,
                        totalsRef: `/${this.totalsColName}/${expense.date}`,
                    };
                }
                else {
                    throw new Error("Invalid document id");
                }
            }
            default:{
                throw new Error("No enumeration was entered into the function call.");
            }
        }
    }

}