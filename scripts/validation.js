
 const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  }
  
  // Passing the configuration object to enableValidation when we call it.
 




const hideInputError = (formEL, inputEL,config) => {
    const errorMsgEL = formEL.querySelector(`#${inputEL.id}-error`);
    
        errorMsgEL.textContent = '';
        inputEL.classList.remove(config.inputErrorClass);
    
};

const showInputError = (formEL, inputEL, errorMsg ,config) => {
    const errorMsgEL = formEL.querySelector(`#${inputEL.id}-error`);
   
        errorMsgEL.textContent = errorMsg;
        inputEL.classList.add(config.inputErrorClass);
};

const checkInputValidity = (formEL, inputEL , config) => {
    if (!inputEL.validity.valid) {
        showInputError(formEL, inputEL, inputEL.validationMessage , config);
    } else {
        hideInputError(formEL, inputEL , config);
    }
};

const hasInvalidInput= (inputList) =>{
 return inputList.some((input)=>{
    return !input.validity.valid;

 })

}
const toggleButtonState = (inputList, buttonElement , config) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, config);
    } else {
        
      buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass); // Modifier class
    }
  };
  
  const disableButton = (buttonElement , config) => {
    buttonElement.disabled = true;
    buttonElement.classList.remove(config.inactiveButtonClass); // Modifier class 
     
  };
   
  const resetValidation = (formEL, inputList, config) => {
    inputList.forEach((inputElement) => {
      hideInputError(formEL, inputElement, config);
    });
  };
const setEventListeners = (formEL, config) => {
    const inputList = Array.from(formEL.querySelectorAll(config.inputSelector));
    const buttonElement = formEL.querySelector(config.submitButtonSelector);
toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formEL, inputElement, config);
            toggleButtonState(inputList, buttonElement , config);
        }                   
        )
    })}
    function enableValidation(config) {
        // Use config.formSelector instead of ".modal__form"
        const formList = document.querySelectorAll(config.formSelector);
        formList.forEach((formEl) => {
          // Pass the config object to setEventListeners.
          setEventListeners(formEl, config);
        })
      }



    enableValidation(settings);