import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        const newCurrentChannelID = state.ids[0];
        state.currentChannelId = newCurrentChannelID;
      }
      channelsAdapter.removeOne(state, payload);
    },
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
const selectors = channelsAdapter.getSelectors((state) => state.channels);
const customSelectors = {
  selectAll: selectors.selectAll,
  selectById: selectors.selectById,
  selectCurrentChannelId: (state) => state.channels.currentChannelId,
  selectCurrentChannel: (state) => {
    const { currentChannelId } = state.channels;
    return selectors.selectById(state, currentChannelId);
  },
  selectChannelsNames: (state) => {
    const channels = selectors.selectAll(state);
    return channels.map(({ name }) => name);
  },
};

export { customSelectors as selectors };
export default channelsSlice.reducer;
