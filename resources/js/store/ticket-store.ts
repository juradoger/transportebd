import { ViajeResult } from '@/types/viaje';
import { create } from 'zustand';

export interface SeatSelect {
    id: number;
    status: 'available' | 'selected' | 'occupied';
    boleto_id?: number | null;
}

type Store = {
    ticketForm: {
        origin: string;
        destination: string;
        date: string;
        passengers: number;
    };
    selectedViaje: ViajeResult | null;
    setTicketForm: (data: Partial<Store['ticketForm']>) => void;
    setSelectedViaje: (viaje: ViajeResult) => void;
    seats: SeatSelect[];
    selectedSeats: number[];
    totalPassengers: number;
    generateSeats: (viaje: ViajeResult) => void;
    selectSeat: (seat: SeatSelect) => void;
    unselectSeat: (seatId: number) => void;
};

export const useTicketStore = create<Store>((set) => ({
    ticketForm: { origin: '', destination: '', date: '', passengers: 1 },
    setTicketForm: (data) => set((state) => ({ ticketForm: { ...state.ticketForm, ...data } })),
    selectedViaje: null,
    setSelectedViaje: (viaje) => set({ selectedViaje: viaje }),
    seats: [],
    selectedSeats: [],
    totalPassengers: 1,

    generateSeats: (viaje) => {
        const seats: SeatSelect[] = [];
        const asientosDisponibles = viaje.asientos_disponibles;

        for (let i = 1; i <= viaje.total_asientos; i++) {
            const asiento = asientosDisponibles.find((a: any) => a.nro_asiento === i);
            console.log('🚀 ~ asiento:', asiento);

            seats.push({
                id: i,
                status: asiento ? 'available' : 'occupied',
                boleto_id: asiento ? asiento.boleto_id : null,
            });
        }
        console.log('🚀 ~ asientosDisponibles:', asientosDisponibles);

        console.log('🚀 ~ seats:', seats);
        set({
            seats,
            selectedSeats: [],
            totalPassengers: viaje.vehiculo.capacidad || 1,
        });
    },

    selectSeat: (seat) => {
        set((state) => {
            console.log('🚀 ~ seat:', seat);
            if (seat.status === 'occupied') return state;

            if (seat.status === 'selected') {
                state.unselectSeat(seat.boleto_id!);

                return {};
            }

            if (state.selectedSeats.length >= state.ticketForm.passengers) {
                return state;
            }

            const updatedSeats: SeatSelect[] = state.seats.map((s) => (s.id === seat.id ? { ...s, status: 'selected' } : s));

            return {
                ...state,
                seats: updatedSeats,
                selectedSeats: [...state.selectedSeats, seat.boleto_id || seat.id],
            };
        });
    },

    unselectSeat: (seatId) => {
        set((state) => {
            const updatedSeats: SeatSelect[] = state.seats.map((s) => (s.boleto_id === seatId ? { ...s, status: 'available' } : s));

            return {
                seats: updatedSeats,
                selectedSeats: state.selectedSeats.filter((id) => id !== seatId),
            };
        });
    },
}));
