import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../actions';

function Tally(props) {
  const result = props.info;
  const block = useSelector(state => state.counter.title);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <button onClick={() => dispatch(increment(result))}>
        <span className={`material-icons ${block.includes(result.Title) ? "control" : null}`}>star</span>
      </button>
    </Fragment>
  )
}

export default Tally;
