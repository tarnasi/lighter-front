import { create } from 'zustand'
import { DateObject } from 'react-multi-date-picker'

type DateStore = {
    date: DateObject | null;
    setDate: (date: DateObject | null) => void
}

export const useDaeStore = create<DateStore>((set) => ({
    date: null,
    setDate: (date) => set({ date })
}))
