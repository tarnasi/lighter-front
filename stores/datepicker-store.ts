import { DateObject } from 'react-multi-date-picker'
import { createStore } from 'zustand/vanilla'


export type DatePickerState = {
    selectedData: DateObject
}

export type DatePickerActions = {}

export type DatePickerStore = DatePickerState & DatePickerActions

export const defaultInitState: DatePickerState = {
    selectedData: new DateObject(),
}

export const createDatePickerStore = (
    initStore: DatePickerState = defaultInitState,
) => {
    return createStore<DatePickerStore>()((set) => ({
        ...initStore,
        // functions like as example
        decrementCount: () => set((state) => ({ selectedData: state.selectedData })),
        incrementCount: () => set((state) => ({ selectedData: state.selectedData })),
    }))
}
