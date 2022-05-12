import {
    trigger,
    state,
    style,
    animate,
    transition,
	query,
	animateChild,
	group,
	sequence} from '@angular/animations';

const ShakeAnimation = [
	style({ transform: 'rotate(0)' }),
	animate('0.1s', style({ transform: 'rotate(2deg)' })),
	animate('0.1s', style({ transform: 'rotate(-2deg)' })),
	animate('0.1s', style({ transform: 'rotate(2deg)' })),
	animate('0.1s', style({ transform: 'rotate(0)' }))
]

const FadeInAnimation = [
	style({ opacity: 0, transform: 'translateY(100px)' }),
	animate('1s', style({ opacity: 1, transform: 'translateY(0)' }))
]

const FadeOutAnimation = [
	animate('0.3s', style({ opacity: 0, transform: 'translateY(100px)' }))
]

const RotateInAnimation = [
	style({transform : 'rotate(0)'}),
	animate('0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({transform : 'rotate(360deg)'}))
]

const SlideInXAnimation = [
	style({transform: 'translateX(-1000px)', opacity: 0}),
	animate('0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({transform: 'translateX(0px)', opacity: 1}))
]

export const FadeInOut = trigger('fadeInOut', [
	transition(':enter', FadeInAnimation),
	transition(':leave', FadeOutAnimation),
]);

export const RouteAnimations =
  trigger('routeAnimations', [
    transition('* => login', ShakeAnimation),
	transition('* => *', SlideInXAnimation)
]);