import { asyncMessage } from './modules/module-a.mjs';

const state = Object.seal({
	counter: 0,
});

export async function main() {
	document
		.querySelector('.js-button')
		.addEventListener('click', async ({ target }) => {
			state.counter = state.counter + 1;

			const { dynamicMessage } = await import('./modules/module-b.mjs');

			dynamicMessage(target);
		});

	// Await is not really needed here...
	await asyncMessage('Hello from the future! 😎');
}
