import React from 'react'
import PropTypes from 'prop-types';
import './dice.min.css'

const Dice = ({variant}) => {
    return <div className={"dice dice-"+variant} />
}

Dice.propTypes = {
    variant: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired
}

export default Dice;