import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../actions';

function CloseTrailer() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);
  
  return (
    <li className={`${modal ? "show include-close" : "hide"}`} onClick={() => dispatch(toggleModal())}>
      <span className="material-icons-outlined">close</span>
    </li>
  )
}

export default CloseTrailer;