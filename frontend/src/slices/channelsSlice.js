import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const channel = action.payload;
      // const channelId = action.payload.id
      if (state.some((el) => el.id !== channel.id)) {
        state.push(channel);
      }
    },
  },
});

export const { addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
