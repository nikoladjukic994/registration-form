import {useEffect, useRef} from 'react';

export default function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// usage const previousVal = usePrevious(value);
// used to compare states or props change
