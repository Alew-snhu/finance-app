import {createAnimation, Animation} from '@ionic/vue';

export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
    const DURATION = 1000;

    console.log('baseEl: ', baseEl);
    console.log('opts: ', opts);

    const animationCtrl = createAnimation();
    if (opts.direction === 'forward') {
        return animationCtrl
            .addElement(opts.enteringEl)
            .duration(DURATION)
            .easing('ease-in')
            .fromTo('opacity', 0, 1);
    } else {
        const rootAnimation = animationCtrl
            .addElement(opts.enteringEl)
            .duration(DURATION)
            .easing('ease-in')
            .fromTo('opacity', 0, 1);

        const leavingAnimation = animationCtrl
            .addElement(opts.enteringEl)
            .duration(DURATION)
            .easing('ease-out')
            .fromTo('opacity', 1, 0);

        return animationCtrl.addAnimation([rootAnimation, leavingAnimation])
    }
}