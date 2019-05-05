import React from "react";
import PropTypes from "prop-types";

const Keypad = props => {
  const handleOnDigit = e => {
    props.onDigit(e.target.value);
  };

  return (
    <div className="keypad">
      <div className="keypad-row">
        <span>
          <button
            className="btn keypad-secondary-btn"
            value="clear"
            onClick={props.onClear}
          >
            C
          </button>
        </span>

        <span>
          <button
            className="btn keypad-secondary-btn"
            value="backspace"
            onClick={props.onDelete}
          >
            <i className="fa fa-caret-left fa-lg" />
          </button>
        </span>
      </div>
      <div className="keypad-row">
        <button
          className="btn keypad-primary-btn"
          value="0"
          onClick={handleOnDigit}
        >
          0
        </button>

        <button
          className="btn keypad-primary-btn"
          value="1"
          onClick={handleOnDigit}
        >
          1
        </button>

        <button
          className="btn keypad-primary-btn"
          value="2"
          onClick={handleOnDigit}
        >
          2
        </button>

        <button
          className="btn keypad-primary-btn"
          value="3"
          onClick={handleOnDigit}
        >
          3
        </button>

        <button
          className="btn keypad-primary-btn"
          value="4"
          onClick={handleOnDigit}
        >
          4
        </button>

        <button
          className="btn keypad-primary-btn"
          value="5"
          onClick={handleOnDigit}
        >
          5
        </button>

        <button
          className="btn keypad-primary-btn"
          value="6"
          onClick={handleOnDigit}
        >
          6
        </button>

        <button
          className="btn keypad-primary-btn"
          value="7"
          onClick={handleOnDigit}
        >
          7
        </button>

        <button
          className="btn keypad-primary-btn"
          value="8"
          onClick={handleOnDigit}
        >
          8
        </button>

        <button
          className="btn keypad-primary-btn"
          value="9"
          onClick={handleOnDigit}
        >
          9
        </button>
      </div>
      <div className="keypad-row">
        <button
          className="btn keypad-primary-btn"
          value="5"
          onClick={handleOnDigit}
        >
          5
        </button>

        <button
          className="btn keypad-primary-btn"
          value="10"
          onClick={handleOnDigit}
        >
          10
        </button>

        <button
          className="btn keypad-primary-btn"
          value="50"
          onClick={handleOnDigit}
        >
          50
        </button>

        <button
          className="btn keypad-primary-btn"
          value="100"
          onClick={handleOnDigit}
        >
          100
        </button>
      </div>
      <div className="keypad-row">
        <button
          className="btn keypad-secondary-btn"
          value="*"
          onClick={props.onMultiply}
        >
          &times;
        </button>

        <button
          className="btn keypad-secondary-btn"
          value="+"
          onClick={props.onAdd}
        >
          &#43;
        </button>
      </div>
    </div>
  );
};

Keypad.defaultProps = {
  onDigit: digit => alert(digit),
  onClear: () => alert("clear"),
  onClearAll: () => alert("clear-all"),
  onDelete: () => alert("delete"),
  onAdd: () => alert("add"),
  onEquals: () => alert("equals"),
  onDecimalPoint: () => alert("."),
  onSubtract: () => alert("subtract"),
  onToggleSign: () => alert("+/-"),
  onDivide: () => alert("/"),
  onMultiply: () => alert("*")
};

Keypad.propTypes = {
  onDigit: PropTypes.func,
  onClear: PropTypes.func,
  onClearAll: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  onEquals: PropTypes.func,
  onDecimalPoint: PropTypes.func,
  onSubtract: PropTypes.func,
  onDivide: PropTypes.func,
  onMultiply: PropTypes.func,
  onToggleSign: PropTypes.func
};

export default Keypad;
