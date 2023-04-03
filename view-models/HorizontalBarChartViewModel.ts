import {IEditExpense} from "@/custom-types/IEditExpense";

export default class HorizontalBarChartViewModel {
    public billsTotal:number | null = null;
    public groceriesTotal:number | null = null;
    public gasTotal:number | null = null;
    public fastFoodTotal:number | null = null;
    public subscriptionServicesTotal:number | null = null;

    public calculateTotals(entries:IEditExpense[]){
        this.billsTotal = 0;
        this.groceriesTotal = 0;
        this.gasTotal = 0;
        this.fastFoodTotal = 0;
        this.subscriptionServicesTotal = 0;

        for (const expense of entries){
            if(expense.type === 'Bill'){
                this.billsTotal! += expense.amount
            }
            if(expense.type === 'Fast Food'){
                this.fastFoodTotal! += expense.amount
            }
            if(expense.type === 'Gas'){
                this.gasTotal! += expense.amount
            }
            if(expense.type === 'Groceries'){
                this.groceriesTotal! += expense.amount
            }
            if(expense.type === 'Subscription Service'){
                this.subscriptionServicesTotal! += expense.amount
            }
        }
    }
    public initializeChartData() {
        return {
            series: [{
                data: [
                    this.billsTotal,
                    this.groceriesTotal,
                    this.gasTotal,
                    this.fastFoodTotal,
                    this.subscriptionServicesTotal,
                ]
            }],
            chartOptions: {
                chart: {
                    type: 'bar',
                    toolbar: {show: false},
                },
                colors: ['#4fff6e'],
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                        barHeight: '40%'
                    }
                },
                dataLabels: {

                    enabled: true,
                    formatter: function (val: string) {
                        return !val ? "" : "$" + parseFloat(val).toFixed(2).toString();
                    },
                    style: {
                        fontSize: '18px'
                    },
                    offsetX: -10
                },
                title:{
                    text: "Expenses",
                    align: 'center',
                    style:{
                        fontSize: '18px',
                        color: 'white'
                    }
                },
                tooltip: {
                    enabled: true,
                    fillSeriesColor: true,
                    theme: 'dark',
                    style: {
                        fontSize: '16px'
                    },
                    x:{
                        show:true
                    },
                    y:{
                        formatter: function(val: number){
                            return "$" + val.toFixed(2)
                        },
                    }
                },
                xaxis: {
                    labels: {
                        style: {
                            colors: ['white'],
                        },
                        formatter: (val: any) => {return '$' + val.toFixed(2)},
                    },
                    categories: ['Bills', 'Groceries', 'Gas', 'Fast Food', 'Subscription Service',]
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: ['white'],
                        },
                    },
                },
            },
        }
    }
}