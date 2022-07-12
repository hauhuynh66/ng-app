import {
    trigger,
    state,
    style,
    animate,
    transition,
	query,
	animateChild,
	group,
	sequence,
	animation,
	useAnimation} from '@angular/animations';

export const ShakeAnimation = animation([
	style({ transform: 'rotate(0)' }),
	animate('{{length}}', style({ transform: 'rotate(2deg)' })),
	animate('{{length}}', style({ transform: 'rotate(-2deg)' })),
	animate('{{length}}', style({ transform: 'rotate(2deg)' })),
	animate('{{length}}', style({ transform: 'rotate(0)' }))
]);

export const TrackingInAnimation = animation([
	style({ 'letter-spacing' : '{{x}}em', opacity : 0 }),
	animate('{{length}}s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({ opacity: 0.6})),
	animate('{{length}}s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({ opacity: 1}))
])

export const Blur = animation([
	style({ filter: 'blur({{x}}px)', opacity: 0}),
	animate('{{length}}s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({filter: 'blur(0px)', opacity: 1}))

])

export const FadeOutAnimation = animation([
	animate('{{length}}s', style({ opacity: 0, transform: 'translateY({{tx}}px)' }))
])

export const RotateInAnimation = animation([
	style({transform : 'rotate(0)'}),
	animate('{{length}}s cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({transform : 'rotate(360deg)'}))
])

export const SlideInXAnimation = animation([
	style({transform: 'translateX(-{{ix}}px)', opacity: 0}),
	animate('{{length}}s cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({transform: 'translateX(0px)', opacity: 1}))
])

export const FadeInAnimation = animation(
	[
		style({ 
			opacity: '{{opi}}', 
			transform: 'translateY({{height}})' 
		}),		
		animate('1s', style({ 
			opacity: '{{opo}}', 
			transform: 'translateY(0)' 
		}))
	]
);

export const RouteAnimations =
  trigger('routeAnimations', [
    transition('* => login', [useAnimation(ShakeAnimation, {
		params: {
			length: '0.1s'
		}
	})]),
	transition('* => register', [useAnimation(ShakeAnimation, {
		params: {
			length: '0.1s'
		}
	})]),
	transition('* => *', useAnimation(SlideInXAnimation,{
		params: {
			ix: '1000',
			length: '0.5'
		}
	}))
]);