import React from 'react';
import { PlusSquare } from 'react-bootstrap-icons';

const ChannelsHeader = () => (
  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>Каналы</b>
    <button type="button" className="p-0 text-primary btn btn-group-vertical">
      <PlusSquare size={20} />
      <span className="visually-hidden">+</span>
    </button>
  </div>
);

export default ChannelsHeader;
