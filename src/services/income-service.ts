import {ExpenseServiceEnums} from "@/Enums/ExpenseServiceEnums";
import DatabaseService from "@/services/database-service";

export default class IncomeService extends DatabaseService{
    protected colName = "Income";
    protected totalsColName = "Totals"
    protected subColName = "Entries";
    protected enums = ExpenseServiceEnums;


}