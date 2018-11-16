import './inputSelectionAdapter'

function renderSelect() {
  $('#example').select2({
    placeholder: 'Select a month',
    theme: 'classic',
    selectionAdapter: $.fn.select2.amd.require("InputSelectionAdapter")
  });
}

document.addEventListener("DOMContentLoaded", renderSelect);


if (module.hot) {
  module.hot.dispose(function () {
    $('#example').select2('destroy');
  })

  module.hot.accept(function () {
    renderSelect();
  })
}
