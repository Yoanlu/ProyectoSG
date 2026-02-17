import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

const EleEntradaTextoMascara = ({ inputRef, mascara, placeholder='_', ...otros }) => (
    <MaskedInput
        {...otros}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
        }}
        showMask
        mask={mascara}
        placeholderChar={placeholder}
        keepCharPositions
        // onChange={onChange}
    />
);

EleEntradaTextoMascara.propTypes = {
    inputRef: PropTypes.func.isRequired,

    /**
     * Función onChange del componente
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Máscara a aplicar al input
     */
    mascara: PropTypes.array,

    /**
     * Caracter que se muestra ocupando las posiciones sin rellenar de la máscara.
     */
    placeholder: PropTypes.string
};

export default EleEntradaTextoMascara;
