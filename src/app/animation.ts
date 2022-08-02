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

export const ScaleIn = animation([
	style({transform: 'scale(0)'}),
	animate('{{length}}s', style({transform: 'scale(1)'}))
]);

export const BounceIn = animation([
	style({transition : 'translateY(-500px)', opacity : 0}),
	animate('0.01s ease-out', style({transform : 'translateY(0)', opacity : 1})),
	animate('0.25s ease-in', style({transform : 'translateY(-65px)'})),
	animate('0.25s ease-out', style({transform : 'translateY(0px)'})),
	animate('0.25s ease-in', style({transform : 'translateY(-28px)'})),
	animate('0.25s ease-out', style({transform : 'translateY(0px)'})),
	animate('0.25s ease-in', style({transform : 'translateY(-8px)'})),
	animate('0.25s ease-out', style({transform : 'translateY(0px)'}))
])

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

export const SlideInElliptic = animation([
	style({transform : 'translateY(-600px) rotateX(-30deg) scale(0)', 'transform-origin' : '50% 100%', opacity: 0}),
	animate('{{length}}s cubic-bezier(0.250, 0.460, 0.450, 0.940)', 
		style({transform: 'translateY(0) rotateX(0) scale(1)', 'transform-origin' : '50% 1400px', opacity : 1})
	)
]);

export const FlipScaleUp = animation([
	style({transform : 'scale(1) rotateX(0)'}),
	animate('{{length}}s linear', style({transform : 'scale(1) rotateX(-180deg)'})),
	animate('{{length}}s linear', style({transform : 'scale(1) rotateX(-360deg)'}))
]);

export const RollIn = animation([
	style({transform : 'translateX(-800px) rotate(-540deg)', opacity : 0}),
	animate('{{length}}s ease-out', style({transform : 'translateX(0px) rotate(0deg)', opacity : 1}))
])

export const SwingIn = animation([
	style({transform : 'rotateX(-100deg)', 'transform-origin' : 'top', opacity : 0}),
	animate('{{length}}s cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({transform : 'rotateX(0deg)', 'transform-origin' : 'top', opacity : 1}))

])

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
	transition('* => edit', useAnimation(ScaleIn,{
		params: {
			length: '0.5'
		}
	})),
	transition('* => history', useAnimation(SlideInElliptic,{
		params: {
			length: '1'
		}
	})),
	transition('* => item', useAnimation(SwingIn,{
		params: {
			length: '1'
		}
	})),
	transition('* => *', useAnimation(SlideInXAnimation,{
		params: {
			ix: '1000',
			length: '0.5'
		}
	}))
]);