import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';


function LikeCount() {
  const counter = useSelector(state => state.counter.number);
  return (
    <Fragment>
      {counter > 0 &&
        <span className="favourite">{counter}</span>
      }
    </Fragment>
  )
}

export default LikeCount;