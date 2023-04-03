import {toastController} from "@ionic/vue";

export default class StaticUtils {
    static capFirstLetter(str: string){
        return str.charAt(0).toUpperCase() + str.slice(1);
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