/* radioTabber 1.0  -- (c) 2015 Hugsmiðjan ehf. - MIT/GPL   @preserve */

// (c) 2015 Hugsmiðjan ehf  -- http://www.hugsmidjan.is
//  written by:
//   * Már Örlygsson        -- http://mar.anomy.net
//
// Dual licensed under a MIT licence (http://en.wikipedia.org/wiki/MIT_License)
// and GPL 2.0 or above (http://www.gnu.org/licenses/old-licenses/gpl-2.0.html).
// ----------------------------------------------------------------------------------

/* global module */
(function() {
  'use strict';

  var radioTabber = function(inputGroup, opts) {
    opts = opts || {};
    inputGroup = [].slice.call(inputGroup); // inputGroup might be NodeList, or jQuery collection or whatevs...
    var toggleFieldsetFor = function(input, visible) {
      if (input) {
        var fieldset = document.getElementById(input.getAttribute('aria-controls'));
        var hidden = !visible;
        [].slice
          .call(fieldset.querySelectorAll('input,select,button,textarea'))
          .forEach(function(field) {
            field.disabled = hidden;
          });
        fieldset.setAttribute('aria-hidden', hidden);
        setTimeout(function() {
          fieldset.setAttribute('aria-disabled', hidden);
          // Slightly delayed removal of aria-disabled allows for fancy CSS transitions, etc.
        }, 50);
      }
    };
    var selectedInput;
    var click = function(e) {
      var clickedInput = this;
      if (clickedInput !== selectedInput) {
        toggleFieldsetFor(selectedInput, false);
        selectedInput = clickedInput;
        toggleFieldsetFor(clickedInput, true);
      }
    };

    var initialInput;
    inputGroup.forEach(function(input) {
      if (input.checked) {
        initialInput = input;
      } else {
        toggleFieldsetFor(input, false);
      }
      input.addEventListener('click', click);
    });

    if (!initialInput && opts.defaultFirst) {
      initialInput = inputGroup[0];
      initialInput.checked = true;
    }
    if (initialInput) {
      click.call(initialInput);
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = radioTabber;
  } else {
    window.radioTabber = radioTabber;
  }
})();
