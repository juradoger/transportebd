import ClientLayout from '@/layouts/client-layout';
import { useTicketStore } from '@/store/ticket-store';
import { Head } from '@inertiajs/react';

type Props = {
    a: any[];
};

export default function TicketViajePage(props: Props) {
    const ticketStore = useTicketStore();

    const selectRoute = () => {};

    return (
        <ClientLayout>
            <Head title="Tickets - Viaje" />
            awdaw
        </ClientLayout>
    );
}
