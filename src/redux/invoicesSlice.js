import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateInvoiceItems: (state, action) => {
      const { productId, updatedProduct } = action.payload;
      state.forEach((invoice) => {
        invoice.items = invoice.items.map((item) => {
          if (item.itemId === productId) {
            return { ...item, ...updatedProduct };
          }
          return item;
        });
      });
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoiceItems
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
