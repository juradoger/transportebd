import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { paymentMethods } from '@/data/payment-methods';
import { useState } from 'react';

type Props = {
    onCompletePayment: (type: string) => void;
};

const PaymentForm: React.FC<Props> = ({ onCompletePayment }) => {
    const [paymentMethod, setPaymentMethod] = useState('Tarjeta');

    // Estados para cada método de pago
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        termsAccepted: false,
    });

    const [cashData, setCashData] = useState({
        fullName: '',
        idNumber: '',
        termsAccepted: false,
    });

    const [transferData, setTransferData] = useState({
        accountHolder: '',
        bankName: '',
        reference: '',
        transferDate: '',
        termsAccepted: false,
    });

    const [paypalData, setPaypalData] = useState({
        email: '',
        termsAccepted: false,
    });

    // Validaciones por método de pago
    const validateCardPayment = () => {
        const { cardNumber, expiryDate, cvv, cardName, termsAccepted } = cardData;

        if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
            alert('Por favor ingrese un número de tarjeta válido de 16 dígitos');
            return false;
        }

        if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert('Por favor ingrese una fecha de expiración válida en formato MM/AA');
            return false;
        }

        if (!cvv || !/^\d{3}$/.test(cvv)) {
            alert('Por favor ingrese un código CVV válido de 3 dígitos');
            return false;
        }

        if (!cardName) {
            alert('Por favor ingrese el nombre como aparece en la tarjeta');
            return false;
        }

        if (!termsAccepted) {
            alert('Debe aceptar los términos y condiciones para continuar');
            return false;
        }

        return true;
    };

    const validateCashPayment = () => {
        const { fullName, idNumber, termsAccepted } = cashData;

        if (!fullName || fullName.trim().length < 3) {
            alert('Por favor ingrese su nombre completo');
            return false;
        }

        if (!idNumber || idNumber.trim().length < 6) {
            alert('Por favor ingrese un número de identificación válido');
            return false;
        }

        if (!termsAccepted) {
            alert('Debe aceptar los términos y condiciones para continuar');
            return false;
        }

        return true;
    };

    const validateTransferPayment = () => {
        const { accountHolder, bankName, reference, transferDate, termsAccepted } = transferData;

        if (!accountHolder || accountHolder.trim().length < 3) {
            alert('Por favor ingrese el nombre del titular de la cuenta');
            return false;
        }

        if (!bankName) {
            alert('Por favor seleccione un banco');
            return false;
        }

        if (!reference || reference.trim().length < 6) {
            alert('Por favor ingrese un número de referencia válido');
            return false;
        }

        if (!transferDate) {
            alert('Por favor ingrese la fecha de la transferencia');
            return false;
        }

        if (!termsAccepted) {
            alert('Debe aceptar los términos y condiciones para continuar');
            return false;
        }

        return true;
    };

    const validatePaypalPayment = () => {
        const { email, termsAccepted } = paypalData;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Por favor ingrese un correo electrónico válido');
            return false;
        }

        if (!termsAccepted) {
            alert('Debe aceptar los términos y condiciones para continuar');
            return false;
        }

        return true;
    };

    // Manejadores de cambio para cada método de pago
    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCardData({
            ...cardData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCashData({
            ...cashData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleTransferChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setTransferData({
            ...transferData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
    };

    const handlePaypalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setPaypalData({
            ...paypalData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Función para manejar el envío del formulario según el método de pago
    const handlePayment = () => {
        let isValid = false;

        switch (paymentMethod) {
            case 'Tarjeta':
                isValid = validateCardPayment();
                break;
            case 'Efectivo':
                isValid = validateCashPayment();
                break;
            case 'Transferencia':
                isValid = validateTransferPayment();
                break;
            case 'Móvil':
                isValid = validatePaypalPayment();
                break;
            default:
                return;
        }

        if (isValid) {
            onCompletePayment(paymentMethod);
        }
    };

    return (
        <div>
            <Tabs onValueChange={setPaymentMethod} value={paymentMethod}>
                <TabsList className="w-full gap-2 bg-transparent">
                    {paymentMethods.map((method) => (
                        <TabsTrigger
                            key={method.id}
                            value={method.id}
                            className="flex w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border bg-gray-700 p-2"
                        >
                            <div className="mb-1 flex h-8 w-8 items-center justify-center">{method.icon}</div>
                            <span className="text-center text-xs text-gray-300">{method.name}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="Tarjeta" className="mt-10">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Número de Tarjeta</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={cardData.cardNumber}
                                onChange={handleCardChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">Fecha de Expiración</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={cardData.expiryDate}
                                    onChange={handleCardChange}
                                    className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                    placeholder="MM/AA"
                                    maxLength={5}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-300">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={cardData.cvv}
                                    onChange={handleCardChange}
                                    className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                    placeholder="123"
                                    maxLength={3}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Nombre en la Tarjeta</label>
                            <input
                                type="text"
                                name="cardName"
                                value={cardData.cardName}
                                onChange={handleCardChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                placeholder="JUAN PEREZ"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={cardData.termsAccepted}
                                    onChange={handleCardChange}
                                    className="h-4 w-4 rounded border-gray-600 text-[#037995] focus:ring-[#037995]"
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                    Acepto los{' '}
                                    <a href="#" className="text-[#037995] hover:underline">
                                        términos y condiciones
                                    </a>{' '}
                                    y la{' '}
                                    <a href="#" className="text-[#037995] hover:underline">
                                        política de privacidad
                                    </a>
                                </span>
                            </label>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#037995] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]"
                        >
                            <span className="mr-2">Completar Pago</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </button>
                    </div>
                </TabsContent>

                <TabsContent value="Efectivo" className="mt-10">
                    <div className="space-y-4">
                        <div className="mb-6 rounded-lg bg-gray-800 p-4">
                            <p className="text-sm text-gray-300">Debe pagar en oficinas</p>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Nombre Completo</label>
                            <input
                                type="text"
                                name="fullName"
                                value={cashData.fullName}
                                onChange={handleCashChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                placeholder="Juan Carlos Pérez"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">CI</label>
                            <input
                                type="text"
                                name="idNumber"
                                value={cashData.idNumber}
                                onChange={handleCashChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                placeholder="12345678"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={cashData.termsAccepted}
                                    onChange={handleCashChange}
                                    className="h-4 w-4 rounded border-gray-600 text-[#037995] focus:ring-[#037995]"
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                    Acepto los{' '}
                                    <a href="#" className="text-[#037995] hover:underline">
                                        términos y condiciones
                                    </a>{' '}
                                    y la{' '}
                                    <a href="#" className="text-[#037995] hover:underline">
                                        política de privacidad
                                    </a>
                                </span>
                            </label>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#037995] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]"
                        >
                            <span className="mr-2">Confirmar Pago</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <path d="M8 13v4"></path>
                                <path d="M16 13v4"></path>
                                <path d="M12 8v9"></path>
                            </svg>
                        </button>
                    </div>
                </TabsContent>

                <TabsContent value="Transferencia" className="mt-10">
                    <div className="space-y-4">
                        <div className="mb-6 rounded-lg bg-gray-800 p-4">
                            <p className="text-sm text-gray-300">
                                Realice una transferencia bancaria a nuestra cuenta y proporcione los detalles a continuación. El procesamiento puede
                                tardar de 1 a 3 días hábiles.
                            </p>
                            <div className="mt-2 rounded border border-gray-600 bg-gray-700 p-3">
                                <p className="text-xs text-gray-300">
                                    Banco: <span className="text-white">Banco Nacional</span>
                                </p>
                                <p className="text-xs text-gray-300">
                                    Cuenta: <span className="text-white">0012-3456-7890-1234</span>
                                </p>
                                <p className="text-xs text-gray-300">
                                    Titular: <span className="text-white">EMPRESA S.A.</span>
                                </p>
                                <p className="text-xs text-gray-300">
                                    CLABE: <span className="text-white">123456789012345678</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Titular de la Cuenta</label>
                            <input
                                type="text"
                                name="accountHolder"
                                value={transferData.accountHolder}
                                onChange={handleTransferChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                placeholder="Juan Carlos Pérez"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Banco Emisor</label>
                            <select
                                name="bankName"
                                value={transferData.bankName}
                                onChange={handleTransferChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                            >
                                <option value="">Seleccione un banco</option>
                                <option value="BBVA">BBVA</option>
                                <option value="Santander">Santander</option>
                                <option value="Banorte">Banorte</option>
                                <option value="HSBC">HSBC</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Número de Referencia</label>
                            <input
                                type="text"
                                name="reference"
                                value={transferData.reference}
                                onChange={handleTransferChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                placeholder="REF123456"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Fecha de Transferencia</label>
                            <input
                                type="date"
                                name="transferDate"
                                value={transferData.transferDate}
                                onChange={handleTransferChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={transferData.termsAccepted}
                                    onChange={handleTransferChange}
                                    className="h-4 w-4 rounded border-gray-600 text-[#037995] focus:ring-[#037995]"
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                    Acepto los{' '}
                                    <a href="#" className="text-[#037995] hover:underline">
                                        términos y condiciones
                                    </a>{' '}
                                    y la{' '}
                                    <a href="#" className="text-[#037995] hover:underline">
                                        política de privacidad
                                    </a>
                                </span>
                            </label>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#037995] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#026980]"
                        >
                            <span className="mr-2">Confirmar Transferencia</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 18l6-6-6-6"></path>
                            </svg>
                        </button>
                    </div>
                </TabsContent>

                <TabsContent value="Móvil" className="mt-10">
                    <div className="space-y-4">
                        <div className="mb-6 flex justify-center">
                            <svg className="h-12 w-auto" viewBox="0 0 101 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.6463 5.13C12.0163 4.3 10.8963 4 9.36626 4H3.88626C3.41626 4 3.01626 4.32 2.93626 4.78L0.496262 20.22C0.436262 20.56 0.696262 20.88 1.03626 20.88H4.42626L5.17626 16.38L5.15626 16.52C5.23626 16.06 5.63626 15.74 6.10626 15.74H7.93626C11.4863 15.74 14.1463 14.32 15.0163 10.06C15.0363 9.96 15.0463 9.86 15.0663 9.76C14.9463 9.7 14.9463 9.7 15.0663 9.76C15.3463 7.74 15.0663 6.48 14.0263 5.56C13.6563 5.38 13.1763 5.24 12.6463 5.14V5.13Z"
                                    fill="#009EE3"
                                />
                                <path
                                    d="M15.0664 9.75957C15.0464 9.85957 15.0364 9.95957 15.0164 10.0596C14.1464 14.3196 11.4864 15.7396 7.93637 15.7396H6.10637C5.63637 15.7396 5.23637 16.0596 5.15637 16.5196L4.14637 22.9796C4.09637 23.2796 4.31637 23.5596 4.61637 23.5596H7.48637C7.89637 23.5596 8.25637 23.2796 8.32637 22.8796L8.37637 22.6796L8.93637 19.1596L8.99637 18.9196C9.06637 18.5196 9.42637 18.2396 9.83637 18.2396H10.2864C13.3564 18.2396 15.6564 17.0396 16.4064 13.4196C16.7264 11.9196 16.5664 10.6396 15.8564 9.77957C15.6264 9.63957 15.3664 9.52957 15.0664 9.44957C15.0464 9.52957 15.0464 9.75957 15.0664 9.75957Z"
                                    fill="#012169"
                                />
                                <path
                                    d="M14.0264 9.34957C13.9264 9.31957 13.8264 9.29957 13.7164 9.27957C13.6064 9.25957 13.4964 9.23957 13.3764 9.22957C12.9264 9.17957 12.4364 9.16957 11.9164 9.16957H7.18639C7.06639 9.16957 6.95639 9.19957 6.87639 9.26957C6.67639 9.40957 6.53639 9.65957 6.50639 9.95957L5.65639 15.7396L5.15639 16.5196C5.23639 16.0596 5.63639 15.7396 6.10639 15.7396H7.93639C11.4864 15.7396 14.1464 14.3196 15.0164 10.0596C15.0364 9.95957 15.0464 9.85957 15.0664 9.75957C14.9364 9.69957 14.9264 9.69957 15.0664 9.75957C14.8864 9.59957 14.6764 9.47957 14.4564 9.37957C14.3264 9.36957 14.1764 9.35957 14.0264 9.34957Z"
                                    fill="#003087"
                                />
                            </svg>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Correo Electrónico de PayPal</label>
                            <input
                                type="email"
                                name="email"
                                value={paypalData.email}
                                onChange={handlePaypalChange}
                                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-[#037995] focus:outline-none"
                                placeholder="ejemplo@correo.com"
                            />
                        </div>

                        <div className="mt-4 rounded-lg bg-gray-800 p-4">
                            <p className="text-sm text-gray-300">
                                Al hacer clic en "Continuar con PayPal", serás redirigido a PayPal para completar tu pago de forma segura.
                            </p>
                        </div>

                        <div className="mt-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={paypalData.termsAccepted}
                                    onChange={handlePaypalChange}
                                    className="h-4 w-4 rounded border-gray-600 text-[#037995] focus:ring-[#037995]"
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                    Acepto los{' '}
                                    <a href="#" className="text-[#037995] hover:underline">
                                        términos y condiciones
                                    </a>{' '}
                                    y la{' '}
                                    <a href="#" className="text-[#037995] hover:underline">
                                        política de privacidad
                                    </a>
                                </span>
                            </label>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#0070ba] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#003087]"
                        >
                            <span className="mr-2">Continuar con PayPal</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PaymentForm;
