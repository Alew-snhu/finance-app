import {reactive} from "vue";
import {IEditExpense} from "@/custom-types/IEditExpense";

export default class BalanceOverviewViewMode {
    public expenseEntries: IEditExpense[] = reactive([]);
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
    public modalItems = [
        {title: "Location", value: this.location},
        {title: "Amount", value: this.amount}
    ]
    public editModalItems = [
        {title: "Location", value: this.location},
        {title: "Amount", value: this.amount}
    ]
}