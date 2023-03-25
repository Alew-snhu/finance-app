import {toastController} from "@ionic/vue";
import {DateTime} from "luxon";

export default class StaticUtils {
    static capFirstLetter(str: string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // will return true or false base on if the expense date resides within the current month
    static isCurrentMonth(expenseDate: string) {
        const currentDate = DateTime.now()
        const dateToCheck = DateTime.fromISO(expenseDate)
        const month = dateToCheck.hasSame(currentDate, "month")
        const year = dateToCheck.hasSame(currentDate, 'year')

        return month && year ;
    }

    static async presentToast(message: string, duration: number){
        const toast = await toastController.create({
            message: message,
            duration: duration,
            position: "bottom"
        });
        await toast.present();
    }
}