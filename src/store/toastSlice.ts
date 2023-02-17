import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToast, NotificationType } from "../types/toast";


const initialState: IToast[] = [
    // { message: 'Success', type: NotificationType.Success, id: 1 },
    // { message: 'Info', type: NotificationType.Info, id: 2 },
    // { message: 'Warning', type: NotificationType.Warning, id: 3 },
    // { message: 'Error', type: NotificationType.Error, id: 4 },
]

export const toastSlice = createSlice({
    name: 'toasts',
    initialState,
    reducers: {
        notifySuccess: (state, action: PayloadAction<{ message?: string, id: number }>) => { state.push({ message: action.payload.message || "Success", type: NotificationType.Success, id: action.payload.id }); return state },
        notifyInfo: (state, action: PayloadAction<{ message?: string, id: number }>) => { state.push({ message: action.payload.message || "Info", type: NotificationType.Info, id: action.payload.id }); return state },
        notifyWarning: (state, action: PayloadAction<{ message?: string, id: number }>) => { state.push({ message: action.payload.message || "Warning", type: NotificationType.Warning, id: action.payload.id }); return state },
        notifyError: (state, action: PayloadAction<{ message?: string, id: number }>) => { state.push({ message: action.payload.message || "Error", type: NotificationType.Error, id: action.payload.id }); return state },
        removeOne: (state, action: PayloadAction<{ id: number }>) => state.filter(n => n.id !== action.payload.id),
    }
})

export default toastSlice.reducer
export const { notifyError, notifyInfo, notifySuccess, notifyWarning, removeOne } = toastSlice.actions
