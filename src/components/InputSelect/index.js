// import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useField } from '@rocketseat/unform';
// import Select from 'react-select';

// export default function ReactSelect({ name, options, setChange }) {
//   const { fieldName, registerField, defaultValue, error } = useField(name);
//   const [value, setValue] = useState(defaultValue && defaultValue);
//   const ref = useRef();

//   useEffect(() => setValue(defaultValue), [defaultValue]);

//   useEffect(() => {
//     registerField({
//       name: fieldName,
//       ref: ref.current,
//       path: 'state.value',
//     });
//   }, [ref.current, fieldName]); // eslint-disable-line

//   function handleChange(data) {
//     setValue(data);
//     if (setChange) {
//       setChange(data);
//     }
//   }

//   return (
//     <Container>
//       <Select
//         name={fieldName}
//         options={options}
//         value={value}
//         defaultValue
//         placeholder="Selecione o Aluno"
//         onChange={handleChange}
//         ref={ref}
//         className="asyncInput"
//       />

//       {error && <span>{error}</span>}
//     </Container>
//   );
// }

// ReactSelect.propTypes = {
//   name: PropTypes.string.isRequired,
//   setChange: PropTypes.func,
//   options: PropTypes.oneOfType([
//     PropTypes.object,
//     PropTypes.arrayOf(PropTypes.object),
//   ]).isRequired,
// };

// ReactSelect.defaultProps = {
//   setChange: PropTypes.null,
// };

import React, { useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function CustomSelect({ name, options, ...props }) {
  const ref = useRef();
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value[value]',
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      <Select
        name={fieldName}
        options={options}
        classNamePrefix="select"
        ref={ref}
        placeholder="Selecione o plano"
        {...props}
        className="asyncInput"
      />

      {error && <span className="error">{error}</span>}
    </Container>
  );
}

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      duration: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
};
