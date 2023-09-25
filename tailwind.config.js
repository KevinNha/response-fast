/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				default: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
			}
		}
	},
	plugins: []
};
