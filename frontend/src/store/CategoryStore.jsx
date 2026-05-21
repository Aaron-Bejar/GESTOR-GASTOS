import { create } from 'zustand'
import { categoryOptions } from '../constants/categoryOptions'


export const useCategoryStore = create((set) => ({
    category: categoryOptions[0],
    categorySelect: {},

    setCategory: (c) => {
        set({ category: c })
    },

    setCategorySelect: (row) => {
        set({ categorySelect: row })
    }
}))
