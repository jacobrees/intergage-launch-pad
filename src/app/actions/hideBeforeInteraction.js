// Change to Class?
export default () => {
  var hideBeforeFields = Array.prototype.slice.call(document.querySelectorAll(".c2form_fields .c2row-hide-before-interaction"));
  var listeningForms = {};

  function showFields() {
    listeningForms[this.id].fields.forEach(function (field) {
      // Show Field Again
      field.style.maxHeight = field.scrollHeight + "px";
    });
    // Remove Listener
    this.removeEventListener('click', showFields);
  };

  hideBeforeFields.forEach(function (hideBeforeField) {
    if(hideBeforeField.querySelector('.c2form_flderror_input')) { return }

    // If it's not an error field - Hide Field
    hideBeforeField.style.transition = 'max-height 0.2s ease-out';
    hideBeforeField.style.maxHeight = '0';
    hideBeforeField.style.overflow = 'hidden';

    // Try Element.closest() else Use Jquery - IE Support
    var parentForm = Element.prototype.closest ? hideBeforeField.closest('form') : $(gallery).closest('form').get(0);
    if(!listeningForms[parentForm.id]) {
      listeningForms[parentForm.id] = {
        fields: [hideBeforeField]
      }
      // Add Event Click Listener to the Parent Form
      parentForm.addEventListener('click', showFields);
    } else {
      listeningForms[parentForm.id].fields.push(hideBeforeField)
    }
  });
}