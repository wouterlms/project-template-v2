/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tailwindcssOriginSafelist } = require('@headlessui-float/vue')

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,ts}',
	],
	safelist: [...tailwindcssOriginSafelist],
	theme: {
		extend: {
			zIndex: {
				1: 1,
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				6: 6,
				7: 7,
				8: 8,
				9: 9,
			},
			boxShadow: {
				primary: '0 2px 12px 0 rgba(7, 6, 6, 0.1)',
				light: '0 2px 12px 0 rgba(7, 6, 6, 0.05)',
			},
			gridTemplateColumns: {},
			transitionTimingFunction: {
				'modal': 'cubic-bezier(0.17, 0.67, 0.16, 0.99)',
				'modal-overlay': 'cubic-bezier(0.22, 0.68, 0, 1.51)',
			},
			width: {
				'modal-sm': '28rem',
				'modal-base': '30rem',
				'modal-md': '35rem',
			},
			colors: {
				accent: {
					primary: 'rgba(var(--accent-primary), <alpha-value>)',
					success: {
						100: 'rgba(var(--accent-success-100), <alpha-value>)',
						200: 'rgba(var(--accent-success-200), <alpha-value>)',
						300: 'rgba(var(--accent-success-300), <alpha-value>)',
						400: 'rgba(var(--accent-success-400), <alpha-value>)',
						500: 'rgba(var(--accent-success-500), <alpha-value>)',
						600: 'rgba(var(--accent-success-600), <alpha-value>)',
						700: 'rgba(var(--accent-success-700), <alpha-value>)',
						800: 'rgba(var(--accent-success-800), <alpha-value>)',
						900: 'rgba(var(--accent-success-900), <alpha-value>)',
						DEFAULT: 'rgba(var(--accent-success-500), <alpha-value>)',
					},
					warning: {
						100: 'rgba(var(--accent-warning-100), <alpha-value>)',
						200: 'rgba(var(--accent-warning-200), <alpha-value>)',
						300: 'rgba(var(--accent-warning-300), <alpha-value>)',
						400: 'rgba(var(--accent-warning-400), <alpha-value>)',
						500: 'rgba(var(--accent-warning-500), <alpha-value>)',
						600: 'rgba(var(--accent-warning-600), <alpha-value>)',
						700: 'rgba(var(--accent-warning-700), <alpha-value>)',
						800: 'rgba(var(--accent-warning-800), <alpha-value>)',
						900: 'rgba(var(--accent-warning-900), <alpha-value>)',
						DEFAULT: 'rgba(var(--accent-warning-500), <alpha-value>)',
					},
					danger: {
						100: 'rgba(var(--accent-danger-100), <alpha-value>)',
						200: 'rgba(var(--accent-danger-200), <alpha-value>)',
						300: 'rgba(var(--accent-danger-300), <alpha-value>)',
						400: 'rgba(var(--accent-danger-400), <alpha-value>)',
						500: 'rgba(var(--accent-danger-500), <alpha-value>)',
						600: 'rgba(var(--accent-danger-600), <alpha-value>)',
						700: 'rgba(var(--accent-danger-700), <alpha-value>)',
						800: 'rgba(var(--accent-danger-800), <alpha-value>)',
						900: 'rgba(var(--accent-danger-900), <alpha-value>)',
						DEFAULT: 'rgba(var(--accent-danger-500), <alpha-value>)',
					},
				},
				neutral: {
					50: 'rgba(var(--neutral-50), <alpha-value>)',
					100: 'rgba(var(--neutral-100), <alpha-value>)',
					200: 'rgba(var(--neutral-200), <alpha-value>)',
					300: 'rgba(var(--neutral-300), <alpha-value>)',
					400: 'rgba(var(--neutral-400), <alpha-value>)',
					500: 'rgba(var(--neutral-500), <alpha-value>)',
					600: 'rgba(var(--neutral-600), <alpha-value>)',
					700: 'rgba(var(--neutral-700), <alpha-value>)',
					800: 'rgba(var(--neutral-800), <alpha-value>)',
					900: 'rgba(var(--neutral-900), <alpha-value>)',
					DEFAULT: 'rgba(var(--neutral-500), <alpha-value>)',
				},
			},
			textColor: {
				'primary': 'rgba(var(--text-primary), <alpha-value>)',
				'primary-inverted': 'rgba(var(--text-primary-inverted), <alpha-value>)',
				'secondary': 'rgba(var(--text-secondary), <alpha-value>)',
				'secondary-inverted': 'rgba(var(--text-secondary-inverted), <alpha-value>)',
				'tertiary': 'rgba(var(--text-tertiary), <alpha-value>)',
				'tertiary-inverted': 'rgba(var(--text-tertiary-inverted), <alpha-value>)',
				'input': 'rgba(var(--text-input), <alpha-value>)',
				'input-placeholder': 'rgba(var(--text-input-placeholder), <alpha-value>)',
			},
			backgroundColor: {
				'primary': 'rgba(var(--bg-primary), <alpha-value>)',
				'primary-inverted': 'rgba(var(--bg-primary-inverted), <alpha-value>)',
				'secondary': 'rgba(var(--bg-secondary), <alpha-value>)',
				'secondary-inverted': 'rgba(var(--bg-secondary-inverted), <alpha-value>)',
				'tertiary': 'rgba(var(--bg-tertiary), <alpha-value>)',
				'tertiary-inverted': 'rgba(var(--bg-tertiary-inverted), <alpha-value>)',
				'input': 'rgba(var(--bg-input), <alpha-value>)',
			},
		},
	},
}
