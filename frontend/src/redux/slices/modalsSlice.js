import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
  modalType: null,
  modalProps: {},
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => ({
      ...state,
      modalType: payload.modalType,
      isShow: true,
      modalProps: payload.modalProps,
    }),
    closeModal: () => ({
      initialState,
    }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
