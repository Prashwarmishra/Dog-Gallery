const breedDropDown = $('#drop-down');
const breedBtn = $('#get-breed');
const subBreedDropDown = $('#sub-drop-down');
const subBreedBtn = $('#get-sub-breed');
const imageContainer = $('.image-container');

let currentBreed;
let currentSubBreed;

$.get('https://dog.ceo/api/breeds/list/all', function(data) {
    const breeds = Object.keys(data.message);
    for (let breed of breeds) {
        breedDropDown.append(`<option value=${breed}>${breed}</option>`)
    }
});

function updateImages(data) {
    imageContainer.empty();
    const photos = data.message;
    for (let photo of photos) {
        imageContainer.append(`<img src=${photo}>`);
    }
}

function updateSubBreed() {
    subBreedDropDown.empty();
    $.get(`https://dog.ceo/api/breed/${currentBreed}/list`, function(data) {
        let subBreeds = data.message;
        if (subBreeds.length == 0) {
            $('.sub-breed-section').css({
                display: "none",
            });
        } else {
            $('.sub-breed-section').css({
                display: "block",
            });
            for (let subBreed of subBreeds) {
                subBreedDropDown.append(`<option value='${subBreed}'>${subBreed}</option>`);
            }
        }
    });
}

function updateSubBreedImages(event) {
    event.preventDefault();
    currentSubBreed = subBreedDropDown.val();
    $.get(`https://dog.ceo/api/breed/${currentBreed}/${currentSubBreed}/images`, updateImages);
}

function updateBreed(event) {
    event.preventDefault();
    currentBreed = breedDropDown.val();
    $.get(`https://dog.ceo/api/breed/${currentBreed}/images`, updateImages);
    updateSubBreed();
}

breedBtn.click(updateBreed);
subBreedBtn.click(updateSubBreedImages);