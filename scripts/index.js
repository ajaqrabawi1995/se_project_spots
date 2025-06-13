

const intialCards = [
    {
        name:"Val Thorens",
     link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
    },
{name:"Restaurant terrace",
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
},{ name:"An outdoor cafe",
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
},{ name:"A very long bridge, over the forest and through the trees",
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
},{ name:"Tunnel with morning light",
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
},{ name:"Mountain house",
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
}]



const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector('#edit-profile-modal'); // or correct ID
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");



const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const nameInput = document.querySelector("#profile-post-caption");
const linkInput = document.querySelector("#profile-image-link");
const newPostForm = newPostModal.querySelector(".modal__form");




const profileNameEl= document.querySelector(".profile__name");
const profileDescriptionEl= document.querySelector(".profile__description");
const cardSubmitBtn= document.querySelector(".modal__submit-btn");

const cardTemplate= document.querySelector("#card-template")

const cardList= document.querySelector(".cards__list");
const previewModal=document.querySelector("#preview-modal");
const previewModalCloseBtn= previewModal.querySelector(".modal__close-btn");
const previewImageEl= previewModal.querySelector(".modal__image");
const previewCaptionEl= previewModal.querySelector(".modal__caption");

 
// Global event listener – added only once
previewModalCloseBtn.addEventListener("click", function() {
    closeModal(previewModal);
});

function getCardElement(data){
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardTitleEl= cardElement.querySelector(".card__title");
    const cardImageEl= cardElement.querySelector(".card__image");

    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;
    cardTitleEl.textContent = data.name;

    const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
    cardLikeBtnEl.addEventListener("click", function(evt){
        evt.target.classList.toggle("card__like-button_active");
    });

    const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
    cardDeleteBtnEl.addEventListener("click", function(){
        cardElement.remove();
    });

    cardImageEl.addEventListener("click", function(){
        previewImageEl.src = data.link;
        previewImageEl.alt = data.name;
        previewCaptionEl.textContent = data.name;
        openModal(previewModal);
    });

    return cardElement;
}




function openModal(modal) {
    modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
    
    modal.classList.remove("modal_is-opened");
  }
  
  


editProfileBtn.addEventListener("click", () => {
    openModal(editProfileModal);
    editProfileNameInput.value= profileNameEl.textContent;
    editProfileDescriptionInput.value= profileDescriptionEl.textContent;
    resetValidation(editProfileForm, [editProfileNameInput, editProfileDescriptionInput], settings);
})

editProfileCloseBtn.addEventListener("click", () => {
//   editProfileModal.classList.remove("modal_is-opened");
  closeModal(editProfileModal);
}
)
newPostBtn.addEventListener("click", () => {
//   newPostModal.classList.add("modal_is-opened");
  openModal(newPostModal);
}
)
newPostCloseBtn.addEventListener("click", () => {
//   newPostModal.classList.remove("modal_is-opened");
  closeModal(newPostModal);
}
)
// Escape key close
document.addEventListener("keydown", function(evt) {
    console.log("Key pressed:", evt.key); // 👈 See this in console?
  
    if (evt.key === "Escape") {
      console.log("Escape key detected"); // 👈 See this?
  
      const openedModal = document.querySelector(".modal_is-opened");
      if (openedModal) {
        console.log("Closing modal:", openedModal.id); // 👈 Should confirm which modal
        closeModal(openedModal);
      }
    }
  });
  
  
  
  
  // Overlay click close
  function setupModalOverlay(modal) {
    modal.addEventListener("mousedown", function(evt) {
      if (evt.target === modal) {
        closeModal(modal);
      }
    });
  }
  
  // Apply to all modals
  setupModalOverlay(editProfileModal);
setupModalOverlay(newPostModal);
function handleEditProfileSubmit(evt) {
    evt.preventDefault();
  
    
  
    // 2. Check if any actual changes were made
    const newName = editProfileNameInput.value.trim();
    const newDescription = editProfileDescriptionInput.value.trim();
  
    const currentName = profileNameEl.textContent.trim();
    const currentDescription = profileDescriptionEl.textContent.trim();
  
    const noChange = (newName === currentName && newDescription === currentDescription);
  
    if (noChange) {
      console.log("No changes detected — submission skipped.");
      return; // ✅ Don’t update or close the modal
    }
  
    // 3. Save changes
    profileNameEl.textContent = newName;
    profileDescriptionEl.textContent = newDescription;
  
    // disableButton(cardSubmitBtn);
    closeModal(editProfileModal);

  }
  
  
  
  
  
editProfileForm.addEventListener("submit", handleEditProfileSubmit);


// function handleNewPostSubmit(evt) {
//     evt.preventDefault();
//     const newCardData = {
//         name: nameInput.value,
//         link: linkInput.value
//     }
    
//     const cardElement = getCardElement(newCardData);
//     cardList.prepend(cardElement);
//     disableButton(cardSubmitBtn);
//     closeModal(newPostModal);
    

//     newPostForm.reset();
//   }


function handleNewPostSubmit(evt) {
    evt.preventDefault();
  

  
    const name = nameInput.value.trim();
    const link = linkInput.value.trim();
  
    const newCardData = { name, link };
    const cardElement = getCardElement(newCardData);
    cardList.prepend(cardElement);
  
    newPostForm.reset();
    disableButton(cardSubmitBtn, settings);
    closeModal(newPostModal);
    setupModalOverlay(newPostModal);

  }
  
  
  

newPostForm.addEventListener("submit", handleNewPostSubmit);
// newPostForm.addEventListener("submit", function(evt){
//     evt.preventDefault();
//     const newCardData = {
//         name: nameInput.value,
//         link: linkInput.value
//     }
//     restValidation(newPostForm, [nameInput, linkInput]);
//     const cardElement = getCardElement(newCardData);
//     cardList.prepend(cardElement);   
//     disableButton(cardSubmitBtn);
//     closeModal(newPostModal);
    

//     newPostForm.reset();
// }
// )




intialCards.forEach(function(item){
    const cardElement = getCardElement(item);
    cardList.append(cardElement);

}
)