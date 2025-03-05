import { create } from 'zustand';

type Store = {
    packageForm: {
        type: string;
        weight: number;
        length: number;
        width: number;
        height: number;
        fechaEntrega: string;
        fechaEnvio: string;
        description: string;
        origin: string;
        destination: string;
        recipientName: string;
        recipientPhone: string;
        recipientEmail: string;
    };
    setPackageForm: (data: Partial<Store['packageForm']>) => void;
    getTotal: () => number;
};

export const useShipingStore = create<Store>((set, x, state) => ({
    packageForm: {
        type: 'Estándar',
        weight: 1,
        length: 20,
        width: 15,
        height: 10,
        description: '',
        origin: '',
        destination: '',
        recipientName: '',
        recipientPhone: '',
        recipientEmail: '',
        fechaEntrega: '',
        fechaEnvio: '',
    },
    setPackageForm: (data) => set((state) => ({ packageForm: { ...state.packageForm, ...data } })),
    /*   const baseRate = 3; // Base rate in Bs
        const weightRate = packageForm.weight * 2; // Additional cost per weight
        const volumeRate = ((packageForm.length * packageForm.width * packageForm.height) / 1000) * 1; // Volume-based cost

        const totalCost = baseRate + weightRate + volumeRate; */

    getTotal: () => {
        const { packageForm } = state.getState();
        const baseRate = 3; // Base rate in Bs
        const weightRate = packageForm.weight * 2; // Additional cost per weight
        const volumeRate = ((packageForm.length * packageForm.width * packageForm.height) / 1000) * 1; // Volume-based cost

        return baseRate + weightRate + volumeRate;
    },
}));
