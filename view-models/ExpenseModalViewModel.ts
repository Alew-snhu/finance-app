import {DateTime} from "luxon";
import {ref} from "vue";
import {IEditExpense} from "@/custom-types/IEditExpense";


export class ExpenseModalViewModel  {
    public newExpenseMonth!: string;
    public date!: string;
    public recordId!: string;
    public expenseDate!: DateTime | string;
    public validAmount!: boolean;
    public validType!: boolean;
    public validLocation!: boolean;
    public validData!:boolean;
    public amountRegex = /^(((\d{1,3},?)(\d{3},?)+|\d{1,3})|\d+)(\.\d{1,2})?$/;

    //region Getters/Setters
    private _amount!: number | string;
    public get amount(){
        return this._amount;
    }
    public set amount(val){
        this.validAmount = this.amountRegex.test(`${val}`)
        this.validAmount ? this.validData = true : this.validData = false;
        this._amount = val;
    }
    private _location!: string;
    public get location(){
        return this._location;
    }
    public set location(val){
        this.validLocation = val.length > 1;
        this.validLocation ? this.validData = true : this.validData = false;
        this._location = val;
    }

    private _expenseType!: string;
    public get expenseType(){
        return this._expenseType;
    }
    public set expenseType(val){
        this.validType = !!val;
        this._expenseType = val;
    }

    //endregion


    public initMonthListView(){
        this.newExpenseMonth = DateTime.now().toISO();
        this.validData = true;
    }
    public initAddModal(){
        this.expenseDate = DateTime.now().toISO();
        this.validAmount = this.amountRegex.test(`${this.amount}`)
        this.validType = ref(false).value;
        this.validLocation = ref(false).value;
        this.validData = false;
    }
    public initEditModal(selectedItem:IEditExpense){
        this.amount = ref(selectedItem.amount).value;
        this.date = ref(selectedItem.date).value;
        this.expenseType = ref(selectedItem.type).value;
        this.recordId = selectedItem.id;
        this.location = ref(selectedItem.location).value;

        // it is required to strip the comma from the date string for the modal to recognize it.
        const strippedDateString = this.date.toString().replace(/,/g, '');
        this.expenseDate = DateTime.fromFormat(strippedDateString, "LLLL dd yyyy");
        if(isNaN(this.expenseDate.valueOf())){
            this.expenseDate = DateTime.fromFormat(strippedDateString, "LLLL d yyyy");
        }

        // validation setup for data entry
        this.validAmount = this.amountRegex.test(`${this.amount}`)
        this.validType  = ref(true).value;
        this.validLocation = ref(true).value;
        this.validData = ref(true).value;
    }

    public toMonthListModel(){
        return{
            date : DateTime.fromISO(this.newExpenseMonth!)
        }
    }
    public toAddModalModel(){
        return {
            date: this.expenseDate,
            expenseType: this.expenseType,
            location: this.location,
            amount: this.amount,
        }
    }
    public toEditModalModel(){
        return{
            date: this.expenseDate,
            type: this.expenseType,
            location: this.location,
            amount: this.amount,
            id: this.recordId,
        }
    }
}