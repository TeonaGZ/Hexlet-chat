import React from 'react';

const Channels = () => (
  <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>Каналы</b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical">
        <span className="visually-hidden">+</span>
      </button>
    </div>
  </div>
);

export default Channels;
