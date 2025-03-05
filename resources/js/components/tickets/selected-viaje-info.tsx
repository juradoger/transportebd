import { useTicketStore } from '@/store/ticket-store';

type Props = {
    title: string;
    titleBack: string;
    onBack?: () => void;
    showDestination?: boolean;
};

const SelectedViajeInfo: React.FC<Props> = ({ title, titleBack, showDestination = true, onBack }) => {
    const ticketStore = useTicketStore();

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">{title}</h2>
                <button
                    className="flex items-center text-sm text-[#037995] hover:underline"
                    onClick={() => {
                        if (onBack) {
                            onBack();
                        } else {
                            window.history.back();
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>

                    {titleBack}
                </button>
            </div>
            {showDestination && (
                <div className="mb-4 text-white">
                    <span className="font-medium">{ticketStore.ticketForm.origin}</span> a{' '}
                    <span className="font-medium">{ticketStore.ticketForm.destination}</span> - <span>{ticketStore.ticketForm.date}</span>
                </div>
            )}
        </>
    );
};

export default SelectedViajeInfo;
