import {
	component$,
	Host,
	mutable,
	Slot,
	useClientEffect$,
	useContextProvider,
	useServerMount$,
	useStore,
} from '@builder.io/qwik';
import { APP_STATE } from '~/constants';
import { getActiveOrderQuery, getCollectionsQuery } from '~/graphql/queries';
import { ActiveOrder, AppState, Collection } from '~/types';
import { execute } from '~/utils/api';
import Footer from '../components/footer/Footer';
import Header from '../components/header/header';

export default component$(() => {
	const state = useStore<AppState>({
		collections: [],
		activeOrder: {} as ActiveOrder,
		showCart: false,
	});
	useServerMount$(async () => {
		const { collections } = await execute<{ collections: { items: Collection[] } }>(
			getCollectionsQuery()
		);
		state.collections = collections.items;
	});
	useClientEffect$(async () => {
		const { activeOrder } = await execute<{ activeOrder: ActiveOrder }>(getActiveOrderQuery());
		state.activeOrder = activeOrder;
	});
	useContextProvider(APP_STATE, state);

	return (
		<Host>
			<Header totalQuantity={mutable(state.activeOrder?.totalQuantity || 0)} />
			<main>
				<Slot />
			</main>
			<Footer />
		</Host>
	);
});
