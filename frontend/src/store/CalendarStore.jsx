import { create } from 'zustand'
import dayjs from 'dayjs'
import { meses } from '../constants/meses'

export const useCalendarStore = create((set) => ({
    month: meses[dayjs().month()],
    year: dayjs().year(),

    setMonth: (m) => {
        set({ month: m })
    },

    setYear: (a) => {
        set({ year: a })
    }
}))
