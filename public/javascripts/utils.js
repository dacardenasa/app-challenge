'use strict'

export const getInputErrors = (data) => {
  let inputErrors = {};
  for (const input in data) {
    if (data[input].val().length === 0) {
      inputErrors[input] = true;
    }
  }
  return inputErrors;
}

export const matchPasswords = (firstPass, secondPass) => {
  if (firstPass === secondPass) { return true }
  return false;
}

export const validateInputs = (data) => {
  $.each( data, function( index, value){
    if ( value.hasClass("is-invalid") ) {
      value.removeClass("is-invalid");
      $(`#${value.attr("id")}Help`).css({ display: "none" });
    }
  });
}

