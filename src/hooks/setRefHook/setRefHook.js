import {useCallback, useState} from 'react';

export default function useRefState() {
  const [refs, setRefState] = useState({});

  const setRef = useCallback((node) => {
    if (node !== null) {
      if (node.select !== undefined && node.select.inputRef) {
        // select fields
        const selectNode = node.select.inputRef;
        const nodeName = node.props.name;
        setRefState((prevRefState) => ({
          ...prevRefState,
          [nodeName]: selectNode,
        }));
      } else if (node.input !== undefined && node.input.name !== undefined) {
        // date field
        const dateNode = node.input;
        const nodeName = node.input.name;
        setRefState((prevRefState) => ({
          ...prevRefState,
          [nodeName]: dateNode,
        }));
      } else if (node.name !== undefined) {
        // input, textarea, radio, checkbox
        setRefState((prevRefState) => ({
          ...prevRefState,
          [node.name]: node,
        }));
      }
    }
  }, []);

  return [refs, setRef];
}

//usage const const [ref, setRef] = useRefState()
// setRef se proslijedi field-u kao ref, name je obavezan
// ref je objekat koji sadrzi sve elemente kojima se proslijedi setRef
// poziva se ref[name]
// focus - ref[name].focus()
