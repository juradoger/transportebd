type Props = {
    ticketForm: any;
    selectedViaje: any;
    selectedSeats: any[];
    isReservation?: boolean;
};

const SummaryViaje = ({ ticketForm, selectedViaje, selectedSeats, isReservation = false }: Props) => {
    return (
        <>
            <h3 className="text-md mb-4 font-medium text-white">Resumen de Compra</h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-300">Ruta:</span>
                    <span className="text-white">
                        {ticketForm.origin} - {ticketForm.destination}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Fecha:</span>
                    <span className="text-white">
                        {new Date(ticketForm.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Hora:</span>
                    <span className="text-white">
                        {new Date(ticketForm.date).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Clase:</span>
                    <span className="text-white">{selectedViaje?.ruta.clase}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Asientos:</span>
                    <span className="text-white">{selectedSeats.map((seat) => seat).join(', ')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Pasajeros:</span>
                    <span className="text-white">{ticketForm.passengers}</span>
                </div>
                <div className="my-3 border-t border-gray-600 pt-3">
                    <div className="flex justify-between">
                        <span className="text-gray-300">Precio por boleto:</span>
                        <span className="text-white">Bs. {isReservation ? selectedViaje?.precio / 2 : selectedViaje?.precio}</span>
                    </div>
                    <div className="mt-1 flex justify-between">
                        <span className="text-gray-300">Subtotal:</span>
                        <span className="text-white">
                            Bs. {(isReservation ? selectedViaje?.precio / 2 : selectedViaje?.precio) * ticketForm.passengers}
                        </span>
                    </div>
                    <div className="mt-1 flex justify-between">
                        <span className="text-gray-300">Impuestos:</span>
                        <span className="text-white">
                            Bs. {(isReservation ? selectedViaje?.precio / 2 : selectedViaje?.precio) * ticketForm.passengers * 0.16}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SummaryViaje;
