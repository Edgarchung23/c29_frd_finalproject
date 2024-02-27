
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------

export interface CheckOutTransactionType {
    room: string;
    building: string;
    street: string;
    district: string;
    contact_number: string;
    contact_name: string;
    confirmed_date: string;
    confirmed_session: string;
  }

  export interface CheckInType {
    checkin_id:number
  }

  export interface CheckOutState {
    rentalList : CheckInType
    checkoutTransaction: CheckOutTransactionType

  }

// ---------------------------------------------------------------

const initialState: CheckOutState = {
    rentalList: { checkin_id : 0},
    checkoutTransaction: {
        room: '',
        building: '',
        street: '',
        district: '',
        contact_number: '',
        contact_name: '',
        confirmed_date: '',
        confirmed_session: ''
    }
}

// ---------------------------------------------------------------

export const checkOutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers:{
        updateRentalList: (state: CheckOutState, action : PayloadAction<CheckInType>) => {
            state.rentalList = action.payload
        },
        updateCheckOutTransaction: (state: CheckOutState, action : PayloadAction<CheckInType>) => {
            state.rentalList = action.payload
        },
        clearForm: (state: CheckOutState) => {
            state = initialState
        },
    },

});

export default checkOutSlice.reducer;
export const {updateRentalList, updateCheckOutTransaction, clearForm} = checkOutSlice.actions;