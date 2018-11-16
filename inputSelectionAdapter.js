$.fn.select2.amd.define("InputSelectionAdapter",
  [
    "select2/utils",
    "select2/keys",
    "select2/selection/base",
  ],
  function (Utils, Keys, BaseSelection) {
    function InputSelection(params) {
      InputSelection.__super__.constructor.apply(this, arguments);
    }

    Utils.Extend(InputSelection, BaseSelection);

    InputSelection.prototype.render = function () {
      var $selection = InputSelection.__super__.render.call(this);

      $selection.addClass('select2-selection--single');

      $selection.html(
        '<input class="select2-selection__rendered" type="text"></input>' +
        '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
        '</span>'
      );

      return $selection;
    };

    InputSelection.prototype.bind = function (container, $container) {
      var self = this;

      InputSelection.__super__.bind.apply(this, arguments);

      var id = container.id + '-container';

      var $input = $(this.$selection.find('input'));

      this.$selection.find('.select2-selection__rendered')
        .attr('id', id)
        .attr('role', 'textbox')
        .attr('aria-readonly', 'true');
      this.$selection.attr('aria-labelledby', id);

      this.$selection.find('.select2-selection__arrow').on('mousedown', function (evt) {
        // Only respond to left clicks
        if (evt.which !== 1) {
          return;
        }

        self.trigger('toggle', {
          originalEvent: evt
        });
      });

      $input.on('input', function (event) {
        if (!container.isOpen()) {
          self.trigger('toggle');
        }

        self.trigger('keyup', event);
      });

      $input.on('blur', function (event) {

      })

      this.$selection.on('focus', function (evt) {
        // User focuses on the container
      });

      this.$selection.on('blur', function (evt) {
        // User exits the container
      });

      container.on('focus', function (evt) {
        if (!container.isOpen()) {
          self.$selection.focus();
        }
      });
    };

    InputSelection.prototype.clear = function () {
      var $rendered = this.$selection.find('.select2-selection__rendered');
      $rendered.empty();
      $rendered.removeAttr('title'); // clear tooltip on empty
    };

    InputSelection.prototype.display = function (data, container) {
      var template = this.options.get('templateSelection');
      var escapeMarkup = this.options.get('escapeMarkup');

      return escapeMarkup(template(data, container));
    };

    InputSelection.prototype.selectionContainer = function () {
      return $('<span></span>');
    };

    InputSelection.prototype.update = function (data) {
      if (data.length === 0) {
        this.clear();
        return;
      }

      var selection = data[0];

      var $rendered = this.$selection.find('.select2-selection__rendered');
      var formatted = this.display(selection, $rendered);

      $rendered.empty().append(formatted);
      $rendered.attr('title', selection.title || selection.text);
    };

    return InputSelection;
  }
);
