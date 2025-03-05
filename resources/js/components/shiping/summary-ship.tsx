type Props = {
    packageForm: any;
    totalCost: number;
};

const SummaryShip = ({ packageForm, totalCost }: Props) => {
    return (
        <>
            <h3 className="text-md mb-4 font-medium text-white">Resumen de Compra</h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-300">Ruta:</span>
                    <span className="text-white">
                        {packageForm.origin} - {packageForm.destination}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Fecha Entrega:</span>
                    <span className="text-white">
                        {new Date(packageForm.fechaEntrega).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Fecha Envio:</span>
                    <span className="text-white">
                        {new Date(packageForm.fechaEnvio).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>

                <div className="my-3 border-t border-gray-600 pt-3">
                    <div className="mt-1 flex justify-between">
                        <span className="text-gray-300">Subtotal:</span>
                        <span className="text-white">Bs. {totalCost}</span>
                    </div>
                    <div className="mt-1 flex justify-between">
                        <span className="text-gray-300">Impuestos:</span>
                        <span className="text-white">Bs. {totalCost * 0.16}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SummaryShip;
