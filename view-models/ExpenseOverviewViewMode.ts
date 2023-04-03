import {IEditExpense} from "@/custom-types/IEditExpense";
import {IExpense} from "@/custom-types/IExpense";

export default class ExpenseOverviewViewMode {
    public expenseEntries: IEditExpense[] = [];
    public location!: string;
    public amount!: number;
    public loading = false;
    public modalSelectOptions: {title: string, value: string}[] = [
        {title: "Bill", value: "Bill"},
        {title: "Fast Food", value: "Fast Food"},
        {title: "Gas", value: "Gas"},
        {title: "Groceries", value: "Groceries"},
        {title: "Subscription Service", value: "Subscription Service"}
    ]
    public modalManualEntries = [
        {title: "Location", value: this.location},
        {title: "Amount", value: this.amount}
    ]
    public addModalProps = {
        modalTitle: "Add Entry",
        isBalanceOverview: true,
        isAddModal: true,
        selectOptions: this.modalSelectOptions,
        items: this.modalManualEntries
    }

    public toExpenseModel(data: any): IExpense {
        return {
            date: data.date,
            type: data.expenseType,
            location: data.location,
            amount: data.amount,
        }
    }

    public toEditExpenseModel(data: any): IEditExpense {
        return {
            date: data.date,
            type: data.type,
            location: data.location,
            amount: data.amount,
            id: data.id
        }
    }

    public toEditModalProps(item: IEditExpense){
        return {
            modalTitle: "Edit Entry",
            isBalanceOverview: true,
            isEditModal: true,
            selectOptions: this.modalSelectOptions,
            items: this.modalManualEntries,
            selectedItem: item
        }
    }

}