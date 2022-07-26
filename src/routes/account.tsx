import { $, component$, useClientEffect$, useContext } from '@builder.io/qwik';
import { APP_STATE } from '~/constants';
import { logoutMutation } from '~/graphql/mutations';
import { getActiveCustomerQuery } from '~/graphql/queries';
import { ActiveCustomer } from '~/types';
import { execute } from '~/utils/api';

export default component$(() => {
	const appState = useContext(APP_STATE);

	useClientEffect$(async () => {
		const data = await execute<{ activeCustomer: ActiveCustomer }>(getActiveCustomerQuery());
		appState.customer = data.activeCustomer;
	});

	const logout = $(async function myFunc() {
		await execute(logoutMutation());
		window.location.href = '/';
	});
	return (
		<div className="max-w-6xl xl:mx-auto px-4">
			<h2 className="text-3xl sm:text-5xl font-light text-gray-900 my-8">My Account</h2>
			<p className="text-gray-700 text-lg -mt-4">Welcome back!</p>
			<button onClick$={logout}>
				<input type="hidden" name="action" value="logout" />
				<button
					onClick$={logout}
					className="underline my-4 text-primary-600 hover:text-primary-800"
				>
					Sign out
				</button>
			</button>
			<div className="h-96 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center">
				<div className="text-xl text-gray-500 text-center">
					Account dashboard not done yet.
					<br />
					<a
						className="text-primary-600"
						target="_blank"
						href="https://github.com/vendure-ecommerce/storefront-qwik-starter"
					>
						Want to help?
					</a>
				</div>
			</div>
		</div>
	);
});
