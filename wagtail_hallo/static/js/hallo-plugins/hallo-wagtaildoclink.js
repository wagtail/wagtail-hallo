'use strict';

// original source - https://github.com/wagtail/wagtail/blob/stable/2.16.x/wagtail/documents/static_src/wagtaildocs/js/hallo-plugins/hallo-wagtaildoclink.js

(function () {
  // hallo-wagtaildoclink
  $.widget('IKS.hallowagtaildoclink', {
    options: {
      uuid: '',
      editable: null,
      documentChooser: null,
    },
    populateToolbar: function (toolbar) {
      var button;
      var widget;

      widget = this;
      button = $('<span class="' + this.widgetName + '"></span>');
      button.hallobutton({
        uuid: this.options.uuid,
        editable: this.options.editable,
        label: 'Documents',
        icon: 'icon-doc-full',
        command: null,
      });
      toolbar.append(button);
      return button.on('click', function (event) {
        var lastSelection;

        lastSelection = widget.options.editable.getSelection();
        return ModalWorkflow({
          url: widget.options.documentChooser,
          onload: DOCUMENT_CHOOSER_MODAL_ONLOAD_HANDLERS,
          responses: {
            chosen: function (docData) {
              var link;
              var mustInsertLink = false;

              link = document.createElement('a');
              link.setAttribute('href', docData.url);
              link.setAttribute('data-id', docData.id);
              link.setAttribute('data-linktype', 'document');
              if (!lastSelection.collapsed) {
                try {
                  lastSelection.surroundContents(link);
                } catch (error) {
                  // Range.surroundContents() throws InvalidStateError if the selection
                  // spans multiple nodes. In this case, we fall back to inserting the
                  // link manually.
                  mustInsertLink = true;
                }
              } else {
                mustInsertLink = true;
              }

              if (mustInsertLink) {
                link.appendChild(document.createTextNode(docData.title));
                lastSelection.insertNode(link);
              }

              return widget.options.editable.element.trigger('change');
            },
          },
        });
      });
    },
  });
})();
