import { create } from 'zustand'
import { motionOptions } from '../constants/MotionOptions'


export const useMotionStore = create((set) => ({
    motionTipo: motionOptions[0],
    motionSelect: {},

    setMotionTipo: (m) => {
        set({ motionTipo: m })
    },

    setMotionSelect: (row) => {
        set({ motionSelect: row })
    }
}))
