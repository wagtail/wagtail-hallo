'use strict';

// original source - https://github.com/wagtail/wagtail/blob/stable/2.16.x/client/src/entrypoints/admin/hallo-plugins/hallo-hr.js

(function () {
  // hallo-hr
  $.widget('IKS.hallohr',    {
    options: {
      editable: FAIL,
      toolbar: null,
      uuid: '',
      buttonCssClass: null,
    },
    populateToolbar(toolbar) {
      const buttonset = $('<span class="' + this.widgetName + '"></span>');
      const buttonElement = $('<span></span>');
      buttonElement.hallobutton({
        uuid: this.options.uuid,
        editable: this.options.editable,
        label: 'Horizontal rule',
        command: 'insertHorizontalRule',
        icon: 'icon-horizontalrule',
        cssClass: this.options.buttonCssClass,
      });
      buttonset.append(buttonElement);
      buttonset.hallobuttonset();
      return toolbar.append(buttonset);
    },
  });
})();
