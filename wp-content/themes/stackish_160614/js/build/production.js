/* ========================================================================
 * Bootstrap: affix.js v3.3.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.1'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && colliderTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $('body').height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.1'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.1'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.1'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var delta = direction == 'prev' ? -1 : 1
    var activeIndex = this.getItemIndex(active)
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.1'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true,
    trigger: '[data-toggle="collapse"]'
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.find('> .panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $.extend({}, $this.data(), { trigger: this })

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.1'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.3.1'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.1'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.1'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (that.options.backdrop) that.adjustBackdrop()
      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .prependTo(this.$element)
        .on('click.dismiss.bs.modal', $.proxy(function (e) {
          if (e.target !== e.currentTarget) return
          this.options.backdrop == 'static'
            ? this.$element[0].focus.call(this.$element[0])
            : this.hide.call(this)
        }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    if (this.options.backdrop) this.adjustBackdrop()
    this.adjustDialog()
  }

  Modal.prototype.adjustBackdrop = function () {
    this.$backdrop
      .css('height', 0)
      .css('height', this.$element[0].scrollHeight)
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.1'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
    this.arrow()
      .css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isHorizontal ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this)
      var data     = $this.data('bs.tooltip')
      var options  = typeof option == 'object' && option
      var selector = options && options.selector

      if (!data && option == 'destroy') return
      if (selector) {
        if (!data) $this.data('bs.tooltip', (data = {}))
        if (!data[selector]) data[selector] = new Tooltip(this, options)
      } else {
        if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      }
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.1'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this)
      var data     = $this.data('bs.popover')
      var options  = typeof option == 'object' && option
      var selector = options && options.selector

      if (!data && option == 'destroy') return
      if (selector) {
        if (!data) $this.data('bs.popover', (data = {}))
        if (!data[selector]) data[selector] = new Popover(this, options)
      } else {
        if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      }
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);


/*!
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.11
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(a){"use strict";var b,c=this;if(this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=10,this.layer=a,!a||!a.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return FastClick.prototype.onClick.apply(c,arguments)},this.onMouse=function(){return FastClick.prototype.onMouse.apply(c,arguments)},this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(c,arguments)},this.onTouchMove=function(){return FastClick.prototype.onTouchMove.apply(c,arguments)},this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(c,arguments)},this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(c,arguments)},FastClick.notNeeded(a)||(this.deviceIsAndroid&&(a.addEventListener("mouseover",this.onMouse,!0),a.addEventListener("mousedown",this.onMouse,!0),a.addEventListener("mouseup",this.onMouse,!0)),a.addEventListener("click",this.onClick,!0),a.addEventListener("touchstart",this.onTouchStart,!1),a.addEventListener("touchmove",this.onTouchMove,!1),a.addEventListener("touchend",this.onTouchEnd,!1),a.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(a.removeEventListener=function(b,c,d){var e=Node.prototype.removeEventListener;"click"===b?e.call(a,b,c.hijacked||c,d):e.call(a,b,c,d)},a.addEventListener=function(b,c,d){var e=Node.prototype.addEventListener;"click"===b?e.call(a,b,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),d):e.call(a,b,c,d)}),"function"==typeof a.onclick&&(b=a.onclick,a.addEventListener("click",function(a){b(a)},!1),a.onclick=null))}FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),FastClick.prototype.needsClick=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled)return!0;break;case"input":if(this.deviceIsIOS&&"file"===a.type||a.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(a.className)},FastClick.prototype.needsFocus=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!this.deviceIsAndroid;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}},FastClick.prototype.sendClick=function(a,b){"use strict";var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur(),d=b.changedTouches[0],c=document.createEvent("MouseEvents"),c.initMouseEvent(this.determineEventType(a),!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),c.forwardedTouchEvent=!0,a.dispatchEvent(c)},FastClick.prototype.determineEventType=function(a){"use strict";return this.deviceIsAndroid&&"select"===a.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(a){"use strict";var b;this.deviceIsIOS&&a.setSelectionRange&&0!==a.type.indexOf("date")&&"time"!==a.type?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()},FastClick.prototype.updateScrollParent=function(a){"use strict";var b,c;if(b=a.fastClickScrollParent,!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c,a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(a){"use strict";return a.nodeType===Node.TEXT_NODE?a.parentNode:a},FastClick.prototype.onTouchStart=function(a){"use strict";var b,c,d;if(a.targetTouches.length>1)return!0;if(b=this.getTargetElementFromEventTarget(a.target),c=a.targetTouches[0],this.deviceIsIOS){if(d=window.getSelection(),d.rangeCount&&!d.isCollapsed)return!0;if(!this.deviceIsIOS4){if(c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier,this.updateScrollParent(b)}}return this.trackingClick=!0,this.trackingClickStart=a.timeStamp,this.targetElement=b,this.touchStartX=c.pageX,this.touchStartY=c.pageY,a.timeStamp-this.lastClickTime<200&&a.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(a){"use strict";var b=a.changedTouches[0],c=this.touchBoundary;return Math.abs(b.pageX-this.touchStartX)>c||Math.abs(b.pageY-this.touchStartY)>c?!0:!1},FastClick.prototype.onTouchMove=function(a){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(a){"use strict";return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(a){"use strict";var b,c,d,e,f,g=this.targetElement;if(!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<200)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=a.timeStamp,c=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,this.deviceIsIOSWithBadTarget&&(f=a.changedTouches[0],g=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||g,g.fastClickScrollParent=this.targetElement.fastClickScrollParent),d=g.tagName.toLowerCase(),"label"===d){if(b=this.findControl(g)){if(this.focus(g),this.deviceIsAndroid)return!1;g=b}}else if(this.needsFocus(g))return a.timeStamp-c>100||this.deviceIsIOS&&window.top!==window&&"input"===d?(this.targetElement=null,!1):(this.focus(g),this.deviceIsIOS4&&"select"===d||(this.targetElement=null,a.preventDefault()),!1);return this.deviceIsIOS&&!this.deviceIsIOS4&&(e=g.fastClickScrollParent,e&&e.fastClickLastScrollTop!==e.scrollTop)?!0:(this.needsClick(g)||(a.preventDefault(),this.sendClick(g,a)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(a){"use strict";return this.targetElement?a.forwardedTouchEvent?!0:a.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0:!0},FastClick.prototype.onClick=function(a){"use strict";var b;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===a.target.type&&0===a.detail?!0:(b=this.onMouse(a),b||(this.targetElement=null),b)},FastClick.prototype.destroy=function(){"use strict";var a=this.layer;this.deviceIsAndroid&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0)),a.removeEventListener("click",this.onClick,!0),a.removeEventListener("touchstart",this.onTouchStart,!1),a.removeEventListener("touchmove",this.onTouchMove,!1),a.removeEventListener("touchend",this.onTouchEnd,!1),a.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(a){"use strict";var b,c;if("undefined"==typeof window.ontouchstart)return!0;if(c=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!FastClick.prototype.deviceIsAndroid)return!0;if(b=document.querySelector("meta[name=viewport]")){if(-1!==b.content.indexOf("user-scalable=no"))return!0;if(c>31&&window.innerWidth<=window.screen.width)return!0}}return"none"===a.style.msTouchAction?!0:!1},FastClick.attach=function(a){"use strict";return new FastClick(a)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick;

/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *          Changed comparision font to default from sans-default-default,
 *          as in FF3.0 font of child element didn't fallback
 *          to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *          Comparing font against all the 3 generic font families ie,
 *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *          then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *          Replaced sans with serif in the list of baseFonts
 */

/**
 * Usage: d = new Detector();
 *        d.detect('font name');
 */
var Detector = function() {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];

    // we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '72px';

    var h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
        var detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }

    this.detect = detect;
};

var fonts = [];
var results = [];
var d = new Detector();
/**
 * other stuff
 */
 
// function font_init() {
//     // fonts.push("cursive");
//     // fonts.push("monospace");
//     // fonts.push("serif");
//     // fonts.push("sans-serif");
//     // fonts.push("fantasy");
//     // fonts.push("default");
//     // fonts.push("Arial");
//     // fonts.push("Arial Black");
//     // fonts.push("Arial Narrow");
//     // fonts.push("Arial Rounded MT Bold");
//     // fonts.push("Bookman Old Style");
//     // fonts.push("Bradley Hand ITC");
//     // fonts.push("Century");
//     // fonts.push("Century Gothic");
//     // fonts.push("Comic Sans MS");
//     // fonts.push("Courier");
//     // fonts.push("Courier New");
//     // fonts.push("Georgia");
//     // fonts.push("Gentium");
//     // fonts.push("Impact");
//     // fonts.push("King");
//     // fonts.push("Lucida Console");
//     // fonts.push("Lalit");
//     // fonts.push("Modena");
//     // fonts.push("Monotype Corsiva");
//     // fonts.push("Papyrus");
//     // fonts.push("Tahoma");
//     // fonts.push("TeX");
//     // fonts.push("Times");
//     // fonts.push("Times New Roman");
//     // fonts.push("Trebuchet MS");
//     // fonts.push("Verdana");
//     // fonts.push("Verona");
//     // BEGIN Mac OS X Fonts - http://en.wikipedia.org/wiki/List_of_typefaces_included_with_OS_X
//     fonts.push("Al Bayan");
//     fonts.push("American Typewriter");
//     fonts.push("Andale Mono");
//     fonts.push("Apple Casual");
//     fonts.push("Apple Chancery");
//     fonts.push("Apple Garamond");
//     fonts.push("Apple Gothic");
//     fonts.push("Apple LiGothic");
//     fonts.push("Apple LiSung");
//     fonts.push("Apple Myungjo");
//     fonts.push("Apple Symbols");
//     fonts.push("AquaKana");
//     fonts.push("Arial");
//     fonts.push("Arial Hebrew");
//     fonts.push("Ayuthaya");
//     fonts.push("Baghdad");
//     fonts.push("Baskerville");
//     fonts.push("Beijing");
//     fonts.push("BiauKai");
//     fonts.push("Big Caslon");
//     fonts.push("Brush Script");
//     fonts.push("Chalkboard");
//     fonts.push("Chalkduster");
//     fonts.push("Charcoal");
//     fonts.push("Charcoal CY");
//     fonts.push("Chicago");
//     fonts.push("Cochin");
//     fonts.push("Comic Sans");
//     fonts.push("Cooper");
//     fonts.push("Copperplate");
//     fonts.push("Corsiva Hebrew");
//     fonts.push("Courier");
//     fonts.push("Courier New");
//     fonts.push("DecoType Naskh");
//     fonts.push("Devanagari");
//     fonts.push("Didot");
//     fonts.push("Euphemia UCAS");
//     fonts.push("Fang Song");
//     fonts.push("Futura");
//     fonts.push("Gadget");
//     fonts.push("Geeza Pro");
//     fonts.push("Geezah");
//     fonts.push("Geneva");
//     fonts.push("Geneva CY");
//     fonts.push("Georgia");
//     fonts.push("Gill Sans");
//     fonts.push("Gujarati");
//     fonts.push("Gung Seoche");
//     fonts.push("Gurmukhi");
//     fonts.push("Hangangche");
//     fonts.push("HeadlineA");
//     fonts.push("Hei");
//     fonts.push("Helvetica");
//     fonts.push("Helvetica CY");
//     fonts.push("Helvetica Neue");
//     fonts.push("Herculanum");
//     fonts.push("Hiragino Kaku Gothic Pro");
//     fonts.push("Hiragino Kaku Gothic ProN");
//     fonts.push("Hiragino Kaku Gothic Std");
//     fonts.push("Hiragino Kaku Gothic StdN");
//     fonts.push("Hiragino Maru Gothic Pro");
//     fonts.push("Hiragino Maru Gothic ProN");
//     fonts.push("Hiragino Mincho Pro");
//     fonts.push("Hiragino Mincho ProN");
//     fonts.push("Hoefler Text");
//     fonts.push("Inai Mathi");
//     fonts.push("Impact");
//     fonts.push("Jung Gothic");
//     fonts.push("Kai");
//     fonts.push("Keyboard");
//     fonts.push("Krungthep");
//     fonts.push("KufiStandard GK");
//     fonts.push("LastResort");
//     fonts.push("LiHei Pro");
//     fonts.push("LiSong Pro");
//     fonts.push("Lucida Grande");
//     fonts.push("Marker Felt");
//     fonts.push("Menlo");
//     fonts.push("Monaco");
//     fonts.push("Monaco CY");
//     fonts.push("Mshtakan");
//     fonts.push("Nadeem");
//     fonts.push("New Peninim");
//     fonts.push("New York");
//     fonts.push("NISC GB18030");
//     fonts.push("Optima");
//     fonts.push("Osaka");
//     fonts.push("Palatino");
//     fonts.push("Papyrus");
//     fonts.push("PC Myungjo");
//     fonts.push("Pilgiche");
//     fonts.push("Plantagenet Cherokee");
//     fonts.push("Raanana");
//     fonts.push("Sand");
//     fonts.push("Sathu");
//     fonts.push("Seoul");
//     fonts.push("Shin Myungjo Neue");
//     fonts.push("Silom");
//     fonts.push("Skia");
//     fonts.push("Song");
//     fonts.push("ST FangSong");
//     fonts.push("ST Heiti");
//     fonts.push("ST Kaiti");
//     fonts.push("ST Song");
//     fonts.push("Symbol");
//     fonts.push("Tae Graphic");
//     fonts.push("Tahoma");
//     fonts.push("Taipei");
//     fonts.push("Techno");
//     fonts.push("Textile");
//     fonts.push("Thonburi");
//     fonts.push("Times");
//     fonts.push("Times CY");
//     fonts.push("Times New Roman");
//     fonts.push("Trebuchet MS");
//     fonts.push("Verdana");
//     fonts.push("Zapf Chancery");
//     fonts.push("Zapf Dingbats");
//     fonts.push("Zapfinofonts");
//     // BEGIN Windows Fonts - http://en.wikipedia.org/wiki/List_of_Microsoft_Windows_fonts
//     fonts.push("Abadi MT Condensed Light");
//     fonts.push("Aharoni");
//     fonts.push("Aldhabi");
//     fonts.push("Andalus");
//     fonts.push("Angsana New");
//     fonts.push("AngsanaUPC");
//     fonts.push("Aparajita");
//     fonts.push("Arabic Typesetting");
//     fonts.push("Arial");
//     fonts.push("Arial Black");
//     fonts.push("Batang");
//     fonts.push("BatangChe");
//     fonts.push("Book Antiqua");
//     fonts.push("Browallia New");
//     fonts.push("BrowalliaUPC");
//     fonts.push("Calibri");
//     fonts.push("Calibri Light");
//     fonts.push("Calisto MT");
//     fonts.push("Cambria");
//     fonts.push("Cambria Math");
//     fonts.push("Candara");
//     fonts.push("Century Gothic");
//     fonts.push("Comic Sans MS");
//     fonts.push("Consolas");
//     fonts.push("Constantia");
//     fonts.push("Copperplate GothicBold");
//     fonts.push("Copperplate Gothic Light");
//     fonts.push("Corbel");
//     fonts.push("Cordia New");
//     fonts.push("CordiaUPC");
//     fonts.push("Courier New");
//     fonts.push("DaunPenh");
//     fonts.push("David");
//     fonts.push("DFKai-SB");
//     fonts.push("DilleniaUPC");
//     fonts.push("DokChampa");
//     fonts.push("Dotum");
//     fonts.push("DotumChe");
//     fonts.push("Ebrima");
//     fonts.push("Estrangelo Edessa");
//     fonts.push("EucrosiaUPC");
//     fonts.push("Euphemia");
//     fonts.push("FangSong");
//     fonts.push("Franklin Gothic Medium");
//     fonts.push("FrankRuehl");
//     fonts.push("FreesiaUPC");
//     fonts.push("Gabriola");
//     fonts.push("Gadugi");
//     fonts.push("Gautami");
//     fonts.push("Georgia");
//     fonts.push("Gisha");
//     fonts.push("Gulim");
//     fonts.push("GulimChe");
//     fonts.push("Gungsuh");
//     fonts.push("GungsuhChe");
//     fonts.push("Impact");
//     fonts.push("IrisUPC");
//     fonts.push("Iskoola Pota");
//     fonts.push("JasmineUPC");
//     fonts.push("KaiTi");
//     fonts.push("Kalinga");
//     fonts.push("Kartika");
//     fonts.push("Khmer UI");
//     fonts.push("KodchiangUPC");
//     fonts.push("Kokila");
//     fonts.push("Lao UI");
//     fonts.push("Latha");
//     fonts.push("Leelawadee");
//     fonts.push("Levenim MT");
//     fonts.push("LilyUPC");
//     fonts.push("Lucida Console");
//     fonts.push("Lucida Handwriting Italic");
//     fonts.push("Lucida Sans Unicode");
//     fonts.push("Malgun Gothic");
//     fonts.push("Mangal");
//     fonts.push("Marlett");
//     fonts.push("Meiryo");
//     fonts.push("Meiryo UI");
//     fonts.push("Microsoft Himalaya");
//     fonts.push("Microsoft JhengHei");
//     fonts.push("Microsoft JhengHei UI");
//     fonts.push("Microsoft New Tai Lue");
//     fonts.push("Microsoft PhagsPa");
//     fonts.push("Microsoft Sans Serif");
//     fonts.push("Microsoft Tai Le");
//     fonts.push("Microsoft Uighur");
//     fonts.push("Microsoft YaHei");
//     fonts.push("Microsoft YaHei UI");
//     fonts.push("Microsoft Yi Baiti");
//     fonts.push("MingLiU, PMingLiU");
//     fonts.push("MingLiU-ExtB, PMingLiU-ExtB");
//     fonts.push("MingLiU_HKSCS");
//     fonts.push("MingLiU_HKSCS-ExtB");
//     fonts.push("Miriam");
//     fonts.push("Mongolian Baiti");
//     fonts.push("MoolBoran");
//     fonts.push("MS Gothic, MS PGothic");
//     fonts.push("MS Mincho, MS PMincho");
//     fonts.push("MS UI Gothic");
//     fonts.push("MV Boli");
//     fonts.push("Myanmar Text");
//     fonts.push("Narkisim");
//     fonts.push("Nirmala UI");
//     fonts.push("News Gothic MT");
//     fonts.push("NSimSun");
//     fonts.push("Nyala");
//     fonts.push("Palatino Linotype");
//     fonts.push("Plantagenet Cherokee");
//     fonts.push("Raavi");
//     fonts.push("Rod");
//     fonts.push("Sakkal Majalla");
//     fonts.push("Segoe Print");
//     fonts.push("Segoe Script");
//     fonts.push("Segoe UI v5.00[3]");
//     fonts.push("Segoe UI v5.01[4]");
//     fonts.push("Segoe UI v5.27[5]");
//     fonts.push("Segoe UI Symbol");
//     fonts.push("Shonar Bangla");
//     fonts.push("Shruti");
//     fonts.push("SimHei");
//     fonts.push("SimKai");
//     fonts.push("Simplified Arabic");
//     fonts.push("SimSun");
//     fonts.push("SimSun-ExtB");
//     fonts.push("Sylfaen");
//     fonts.push("Symbol");
//     fonts.push("Tahoma");
//     fonts.push("Times New Roman");
//     fonts.push("Traditional Arabic");
//     fonts.push("Trebuchet MS");
//     fonts.push("Tunga");
//     fonts.push("Urdu Typesetting");
//     fonts.push("Utsaah");
//     fonts.push("Vani");
//     fonts.push("Verdana");
//     fonts.push("Vijaya");
//     fonts.push("Vrinda");
//     fonts.push("Webdings");
//     fonts.push("Westminster");
//     fonts.push("Wingdingsfonts.push");
//     // BEGIN Wikipedia List - http://en.wikipedia.org/wiki/List_of_typefaces
//     fonts.push("Adobe Jenson");
//     fonts.push("Adobe Text");
//     fonts.push("Albertus");
//     fonts.push("Aldus");
//     fonts.push("Alexandria");
//     fonts.push("Algerian");
//     fonts.push("American Typewriter");
//     fonts.push("Antiqua");
//     fonts.push("Arno");
//     fonts.push("Aster");
//     fonts.push("Aurora");
//     fonts.push("News 706");
//     fonts.push("Baskerville");
//     fonts.push("Bebas");
//     fonts.push("Bebas Neue");
//     fonts.push("Bell");
//     fonts.push("Bembo");
//     fonts.push("Bembo Schoolbook");
//     fonts.push("Berkeley Old Style");
//     fonts.push("Bernhard Modern");
//     fonts.push("Bodoni");
//     fonts.push("Bauer Bodoni");
//     fonts.push("Book Antiqua");
//     fonts.push("Bookman");
//     fonts.push("Bordeaux Roman");
//     fonts.push("Bulmer");
//     fonts.push("Caledonia");
//     fonts.push("Californian FB");
//     fonts.push("Calisto MT");
//     fonts.push("Cambria");
//     fonts.push("Capitals");
//     fonts.push("Cartier");
//     fonts.push("Caslon");
//     fonts.push("Wyld");
//     fonts.push("Caslon Antique");
//     fonts.push("Fifteenth Century");
//     fonts.push("Catull");
//     fonts.push("Centaur");
//     fonts.push("Century Old Style");
//     fonts.push("Century Schoolbook");
//     fonts.push("New Century Schoolbook");
//     fonts.push("Century Schoolbook Infant");
//     fonts.push("Chaparral");
//     fonts.push("Charis SIL");
//     fonts.push("Charter");
//     fonts.push("Cheltenham");
//     fonts.push("Clearface");
//     fonts.push("Cochin");
//     fonts.push("Colonna");
//     fonts.push("Computer Modern");
//     fonts.push("Concrete Roman");
//     fonts.push("Constantia");
//     fonts.push("Cooper Black");
//     fonts.push("Corona");
//     fonts.push("News 705");
//     fonts.push("DejaVu Serif");
//     fonts.push("Didot");
//     fonts.push("Droid Serif");
//     fonts.push("Ecotype");
//     fonts.push("Elephant");
//     fonts.push("Emerson");
//     fonts.push("Espy Serif");
//     fonts.push("Excelsior");
//     fonts.push("News 702");
//     fonts.push("Fairfield");
//     fonts.push("FF Scala");
//     fonts.push("Footlight");
//     fonts.push("FreeSerif");
//     fonts.push("Friz Quadrata");
//     fonts.push("Garamond");
//     fonts.push("Gentium");
//     fonts.push("Georgia");
//     fonts.push("Gloucester");
//     fonts.push("Goudy");
//     fonts.push("Goudy Old Style");
//     fonts.push("Goudy Pro Font");
//     fonts.push("Goudy Schoolbook");
//     fonts.push("Granjon");
//     fonts.push("Heather");
//     fonts.push("Hercules");
//     fonts.push("High Tower Text");
//     fonts.push("Hiroshige");
//     fonts.push("Hoefler Text");
//     fonts.push("Humana Serif");
//     fonts.push("Imprint");
//     fonts.push("Ionic No. 5");
//     fonts.push("News 701");
//     fonts.push("ITC Benguiat");
//     fonts.push("Janson");
//     fonts.push("Jenson");
//     fonts.push("Joanna");
//     fonts.push("Korinna");
//     fonts.push("Kursivschrift");
//     fonts.push("Legacy Serif");
//     fonts.push("Lexicon");
//     fonts.push("Liberation Serif");
//     fonts.push("Linux Libertine");
//     fonts.push("Literaturnaya");
//     fonts.push("Lucida Bright");
//     fonts.push("Melior");
//     fonts.push("Memphis");
//     fonts.push("Miller");
//     fonts.push("Minion");
//     fonts.push("Modern");
//     fonts.push("Mona Lisa");
//     fonts.push("Mrs Eaves");
//     fonts.push("MS Serif");
//     fonts.push("New York");
//     fonts.push("Nimbus Roman");
//     fonts.push("NPS Rawlinson Roadway");
//     fonts.push("OCR A Extended");
//     fonts.push("Palatino");
//     fonts.push("Book Antiqua");
//     fonts.push("Perpetua");
//     fonts.push("Plantin");
//     fonts.push("Plantin Schoolbook");
//     fonts.push("Playbill");
//     fonts.push("Poor Richard");
//     fonts.push("Renault");
//     fonts.push("Requiem");
//     fonts.push("Roman");
//     fonts.push("Rotis Serif");
//     fonts.push("Sabon");
//     fonts.push("Seagull");
//     fonts.push("Sistina");
//     fonts.push("Souvenir");
//     fonts.push("STIX");
//     fonts.push("Stone Informal");
//     fonts.push("Stone Serif");
//     fonts.push("Sylfaen");
//     fonts.push("Times New Roman");
//     fonts.push("Times");
//     fonts.push("Trajan");
//     fonts.push("Trinité");
//     fonts.push("Trump Mediaeval");
//     fonts.push("Utopia");
//     fonts.push("Vale Type");
//     fonts.push("Vera Serif");
//     fonts.push("Versailles");
//     fonts.push("Wanted");
//     fonts.push("Weiss");
//     fonts.push("Wide Latin");
//     fonts.push("Windsor");
//     fonts.push("XITSfonts");
//     fonts.push("Alexandria");
//     fonts.push("Apex");
//     fonts.push("Archer");
//     fonts.push("Athens");
//     fonts.push("Cholla Slab");
//     fonts.push("City");
//     fonts.push("Clarendon");
//     fonts.push("Concrete Roman");
//     fonts.push("Courier");
//     fonts.push("Egyptienne");
//     fonts.push("Guardian Egyptian");
//     fonts.push("Ionic No. 5");
//     fonts.push("Lexia");
//     fonts.push("Museo Slab");
//     fonts.push("Nilland");
//     fonts.push("Rockwell");
//     fonts.push("Skeleton Antique");
//     fonts.push("Tower");
//     fonts.push("Abadi");
//     fonts.push("Agency FB");
//     fonts.push("Akzidenz-Grotesk");
//     fonts.push("Andalé Sans");
//     fonts.push("Aptifer");
//     fonts.push("Arial");
//     fonts.push("Arial Unicode MS");
//     fonts.push("Avant Garde Gothic");
//     fonts.push("Avenir");
//     fonts.push("Bank Gothic");
//     fonts.push("Barmeno");
//     fonts.push("Bauhaus");
//     fonts.push("Bell Centennial");
//     fonts.push("Bell Gothic");
//     fonts.push("Benguiat Gothic");
//     fonts.push("Berlin Sans");
//     fonts.push("Beteckna");
//     fonts.push("Blue Highway");
//     fonts.push("Brandon Grotesque");
//     fonts.push("Cabin");
//     fonts.push("Cafeteria");
//     fonts.push("Calibri");
//     fonts.push("Casey");
//     fonts.push("Century Gothic");
//     fonts.push("Charcoal");
//     fonts.push("Chicago");
//     fonts.push("Clearface Gothic");
//     fonts.push("Clearview");
//     fonts.push("Co Headline");
//     fonts.push("Co Text");
//     fonts.push("Compacta");
//     fonts.push("Corbel");
//     fonts.push("DejaVu Sans");
//     fonts.push("Dotum");
//     fonts.push("Droid Sans");
//     fonts.push("Dyslexie");
//     fonts.push("Ecofont");
//     fonts.push("Eras");
//     fonts.push("Espy Sans");
//     fonts.push("Nu Sans[1]");
//     fonts.push("Eurocrat");
//     fonts.push("Eurostile");
//     fonts.push("Square 721");
//     fonts.push("FF Dax");
//     fonts.push("FF Meta");
//     fonts.push("FF Scala Sans");
//     fonts.push("Flama");
//     fonts.push("Formata");
//     fonts.push("Franklin Gothic");
//     fonts.push("FreeSans");
//     fonts.push("Frutiger");
//     fonts.push("Frutiger Next");
//     fonts.push("Futura");
//     fonts.push("Geneva");
//     fonts.push("Gill Sans");
//     fonts.push("Gill Sans Schoolbook");
//     fonts.push("Gotham");
//     fonts.push("Haettenschweiler");
//     fonts.push("Handel Gothic");
//     fonts.push("Denmark");
//     fonts.push("Hei");
//     fonts.push("Helvetica");
//     fonts.push("Helvetica Neue");
//     fonts.push("Swiss 721");
//     fonts.push("Highway Gothic");
//     fonts.push("Hiroshige Sans");
//     fonts.push("Hobo");
//     fonts.push("Impact");
//     fonts.push("Industria");
//     fonts.push("Interstate");
//     fonts.push("Johnston/New Johnston");
//     fonts.push("Kabel");
//     fonts.push("Lato");
//     fonts.push("ITC Legacy Sans");
//     fonts.push("Lexia Readable");
//     fonts.push("Liberation Sans");
//     fonts.push("Lucida Sans");
//     fonts.push("Meiryo");
//     fonts.push("Microgramma");
//     fonts.push("Modern");
//     fonts.push("Motorway");
//     fonts.push("MS Sans Serif");
//     fonts.push("Museo Sans");
//     fonts.push("Myriad");
//     fonts.push("Neutraface");
//     fonts.push("Neuzeit S");
//     fonts.push("News Gothic");
//     fonts.push("Nimbus Sans L");
//     fonts.push("Nina");
//     fonts.push("Open Sans");
//     fonts.push("Optima");
//     fonts.push("Parisine");
//     fonts.push("Pricedown");
//     fonts.push("Prima Sans");
//     fonts.push("PT Sans");
//     fonts.push("Rail Alphabet");
//     fonts.push("Revue");
//     fonts.push("Roboto");
//     fonts.push("Rotis Sans");
//     fonts.push("Segoe UI");
//     fonts.push("Skia");
//     fonts.push("Souvenir Gothic");
//     fonts.push("ITC Stone Sans");
//     fonts.push("Syntax");
//     fonts.push("Tahoma");
//     fonts.push("Template Gothic");
//     fonts.push("Thesis Sans");
//     fonts.push("Tiresias");
//     fonts.push("Trade Gothic");
//     fonts.push("Transport");
//     fonts.push("Trebuchet MS");
//     fonts.push("Trump Gothic");
//     fonts.push("Twentieth Century");
//     fonts.push("Ubuntu");
//     fonts.push("Univers");
//     fonts.push("Zurich");
//     fonts.push("Vera Sans");
//     fonts.push("Verdana");
//     fonts.push("Virtue");
//     fonts.push("Amsterdam Old Style");
//     fonts.push("Divona");
//     fonts.push("Nyala");
//     fonts.push("Portobello");
//     fonts.push("Rotis Semi Serif");
//     fonts.push("Tema Cantante");
//     fonts.push("Andale Mono");
//     fonts.push("Anonymous and Anonymous Pro");
//     fonts.push("Arial Monospaced");
//     fonts.push("Bitstream Vera");
//     fonts.push("Consolas");
//     fonts.push("Courier");
//     fonts.push("CourierHP");
//     fonts.push("Courier New");
//     fonts.push("CourierPS");
//     fonts.push("Fontcraft Courier");
//     fonts.push("DejaVu Sans Mono");
//     fonts.push("Droid Sans Mono");
//     fonts.push("Everson Mono");
//     fonts.push("Fedra Mono");
//     fonts.push("Fixed");
//     fonts.push("Fixedsys");
//     fonts.push("Fixedsys Excelsior");
//     fonts.push("HyperFont");
//     fonts.push("Inconsolata");
//     fonts.push("Letter Gothic");
//     fonts.push("Liberation Mono");
//     fonts.push("Lucida Console");
//     fonts.push("Lucida Sans Typewriter");
//     fonts.push("Lucida Typewriter");
//     fonts.push("Menlo");
//     fonts.push("MICR");
//     fonts.push("Miriam Fixed");
//     fonts.push("Monaco");
//     fonts.push("Monofur");
//     fonts.push("Monospace");
//     fonts.push("MS Gothic");
//     fonts.push("MS Mincho");
//     fonts.push("Nimbus Mono L");
//     fonts.push("OCR-A");
//     fonts.push("OCR-B");
//     fonts.push("Orator");
//     fonts.push("Ormaxx");
//     fonts.push("PragmataPro");
//     fonts.push("Prestige Elite");
//     fonts.push("ProFont");
//     fonts.push("Proggy programming fonts");
//     fonts.push("Small Fonts");
//     fonts.push("Sydnie");
//     fonts.push("Terminal");
//     fonts.push("Tex Gyre Cursor");
//     fonts.push("Trixie");
//     fonts.push("Ubuntu Mono");
//     fonts.push("UM Typewriter");
//     fonts.push("Vera Sans Mono");
//     fonts.push("William Monospace");
//     fonts.push("Balloon");
//     fonts.push("Brush Script");
//     fonts.push("Choc");
//     fonts.push("Dom Casual");
//     fonts.push("Dragonwick");
//     fonts.push("Mistral");
//     fonts.push("Papyrus");
//     fonts.push("Segoe Script");
//     fonts.push("Tempus Sans");
//     fonts.push("Utopia");
//     fonts.push("Amazone");
//     fonts.push("American Scribe");
//     fonts.push("AMS Euler");
//     fonts.push("Apple Chancery");
//     fonts.push("Aquiline");
//     fonts.push("Aristocrat");
//     fonts.push("Bickley Script");
//     fonts.push("Civitype");
//     fonts.push("Codex");
//     fonts.push("Edwardian Script");
//     fonts.push("Forte");
//     fonts.push("French Script");
//     fonts.push("ITC Zapf Chancery");
//     fonts.push("Kuenstler Script");
//     fonts.push("Monotype Corsiva");
//     fonts.push("Old English Text MT");
//     fonts.push("Palace Script");
//     fonts.push("Park Avenue");
//     fonts.push("Scriptina");
//     fonts.push("Shelley Volante");
//     fonts.push("Vivaldi");
//     fonts.push("Vladimir Script");
//     fonts.push("Zapfino");
//     fonts.push("Andy");
//     fonts.push("Ashley Script");
//     fonts.push("Cézanne");
//     fonts.push("Chalkboard");
//     fonts.push("Comic Sans MS");
//     fonts.push("Dom Casual");
//     fonts.push("Fontoon");
//     fonts.push("Irregularis");
//     fonts.push("Jefferson");
//     fonts.push("Kristen");
//     fonts.push("Lucida Handwriting");
//     fonts.push("Rage Italic");
//     fonts.push("Rufscript");
//     fonts.push("Scribble");
//     fonts.push("Soupbone");
//     fonts.push("Tekton");
//     fonts.push("Alecko");
//     fonts.push("Cinderella");
//     fonts.push("Coronet");
//     fonts.push("Cupola");
//     fonts.push("Curlz");
//     fonts.push("Magnificat");
//     fonts.push("Script");
//     fonts.push("Stone Informal");
//     fonts.push("American Text");
//     fonts.push("Bastard");
//     fonts.push("Breitkopf Fraktur");
//     fonts.push("Cloister Black");
//     fonts.push("Fette Fraktur");
//     fonts.push("Fletcher");
//     fonts.push("Fraktur");
//     fonts.push("Goudy Text");
//     fonts.push("Lucida Blackletter");
//     fonts.push("Old English Text");
//     fonts.push("Schwabacher");
//     fonts.push("Wedding Text");
//     fonts.push("Aegyptus");
//     fonts.push("Aharoni");
//     fonts.push("Aisha");
//     fonts.push("Amienne");
//     fonts.push("Batak Script");
//     fonts.push("Chandas");
//     fonts.push("Grecs du roi");
//     fonts.push("Hanacaraka");
//     fonts.push("Japanese Gothic");
//     fonts.push("Jomolhari");
//     fonts.push("Kochi");
//     fonts.push("Koren");
//     fonts.push("Lontara Script");
//     fonts.push("Maiola");
//     fonts.push("Malgun Gothic");
//     fonts.push("Meiryo");
//     fonts.push("Microsoft JhengHei");
//     fonts.push("Microsoft YaHei");
//     fonts.push("Minchō");
//     fonts.push("Ming");
//     fonts.push("Mona");
//     fonts.push("MS Gothic");
//     fonts.push("Nassim");
//     fonts.push("Nastaliq Navees");
//     fonts.push("Neacademia");
//     fonts.push("Perpetua Greek[2]");
//     fonts.push("Porson");
//     fonts.push("SimSun");
//     fonts.push("Skolar");
//     fonts.push("Skolar Devanagari");
//     fonts.push("Sundanese Unicode");
//     fonts.push("Sutturah");
//     fonts.push("Sylfaen");
//     fonts.push("Tai Le Valentinium");
//     fonts.push("Tengwar");
//     fonts.push("Tibetan Machine Uni");
//     fonts.push("Tunga");
//     fonts.push("Wadalab");
//     fonts.push("Wilson Greek");
//     fonts.push("Apple Symbols");
//     fonts.push("Asana-Math");
//     fonts.push("Blackboard bold");
//     fonts.push("Bookshelf Symbol 7");
//     fonts.push("Braille");
//     fonts.push("Cambria Math");
//     fonts.push("Commercial Pi");
//     fonts.push("Computer Modern");
//     fonts.push("Corel");
//     fonts.push("Erler Dingbats");
//     fonts.push("HM Phonetic");
//     fonts.push("Lucida Math");
//     fonts.push("Marlett");
//     fonts.push("Mathematical Pi");
//     fonts.push("Morse Code");
//     fonts.push("OpenSymbol");
//     fonts.push("RichStyle");
//     fonts.push("Symbol");
//     fonts.push("SymbolPS");
//     fonts.push("Webdings");
//     fonts.push("Wingdings");
//     fonts.push("Wingdings 2");
//     fonts.push("Wingdings 3");
//     fonts.push("Zapf Dingbats");
//     fonts.push("Abracadabra");
//     fonts.push("Ad Lib");
//     fonts.push("Allegro");
//     fonts.push("Andreas");
//     fonts.push("Arnold Böcklin");
//     fonts.push("Astur");
//     fonts.push("Balloon Pop Outlaw Black");
//     fonts.push("Banco");
//     fonts.push("Bauhaus");
//     fonts.push("Beat");
//     fonts.push("Braggadocio");
//     fonts.push("Broadway");
//     fonts.push("Caslon Antique");
//     fonts.push("Cooper Black");
//     fonts.push("Curlz");
//     fonts.push("Ellington");
//     fonts.push("Exablock");
//     fonts.push("Exocet");
//     fonts.push("FIG Script");
//     fonts.push("Forte");
//     fonts.push("Gabriola");
//     fonts.push("Gigi");
//     fonts.push("Harlow Solid");
//     fonts.push("Harrington");
//     fonts.push("Horizon");
//     fonts.push("Jim Crow");
//     fonts.push("Jokerman");
//     fonts.push("Juice");
//     fonts.push("Lo-Type");
//     fonts.push("Magneto");
//     fonts.push("Megadeth");
//     fonts.push("Neuland");
//     fonts.push("Peignot");
//     fonts.push("Ravie");
//     fonts.push("San Francisco");
//     fonts.push("Showcard Gothic");
//     fonts.push("Snap");
//     fonts.push("Stencil");
//     fonts.push("Umbra");
//     fonts.push("Westminster");
//     fonts.push("Willow");
//     fonts.push("Windsor");
//     // BEGIN Google Fonts - http://worknotes.scripting.com/february2012/22612ByDw/listOfGoogleFonts
//     fonts.push("ABeeZee");
//     fonts.push("Abel");
//     fonts.push("Abril Fatface");
//     fonts.push("Aclonica");
//     fonts.push("Acme");
//     fonts.push("Actor");
//     fonts.push("Adamina");
//     fonts.push("Advent Pro");
//     fonts.push("Aguafina Script");
//     fonts.push("Akronim");
//     fonts.push("Aladin");
//     fonts.push("Aldrich");
//     fonts.push("Alef");
//     fonts.push("Alegreya");
//     fonts.push("Alegreya Sans");
//     fonts.push("Alegreya Sans SC");
//     fonts.push("Alegreya SC");
//     fonts.push("Alex Brush");
//     fonts.push("Alfa Slab One");
//     fonts.push("Alice");
//     fonts.push("Alike");
//     fonts.push("Alike Angular");
//     fonts.push("Allan");
//     fonts.push("Allerta");
//     fonts.push("Allerta Stencil");
//     fonts.push("Allura");
//     fonts.push("Almendra");
//     fonts.push("Almendra Display");
//     fonts.push("Almendra SC");
//     fonts.push("Amarante");
//     fonts.push("Amaranth");
//     fonts.push("Amatic SC");
//     fonts.push("Amethysta");
//     fonts.push("Anaheim");
//     fonts.push("Andada");
//     fonts.push("Andika");
//     fonts.push("Angkor");
//     fonts.push("Annie Use Your Telescope");
//     fonts.push("Anonymous Pro");
//     fonts.push("Antic");
//     fonts.push("Antic Didone");
//     fonts.push("Antic Slab");
//     fonts.push("Anton");
//     fonts.push("Arapey");
//     fonts.push("Arbutus");
//     fonts.push("Arbutus Slab");
//     fonts.push("Architects Daughter");
//     fonts.push("Archivo Black");
//     fonts.push("Archivo Narrow");
//     fonts.push("Arimo");
//     fonts.push("Arizonia");
//     fonts.push("Armata");
//     fonts.push("Artifika");
//     fonts.push("Arvo");
//     fonts.push("Asap");
//     fonts.push("Asset");
//     fonts.push("Astloch");
//     fonts.push("Asul");
//     fonts.push("Atomic Age");
//     fonts.push("Aubrey");
//     fonts.push("Audiowide");
//     fonts.push("Autour One");
//     fonts.push("Average");
//     fonts.push("Average Sans");
//     fonts.push("Averia Gruesa Libre");
//     fonts.push("Averia Libre");
//     fonts.push("Averia Sans Libre");
//     fonts.push("Averia Serif Libre");
//     fonts.push("Bad Script");
//     fonts.push("Balthazar");
//     fonts.push("Bangers");
//     fonts.push("Basic");
//     fonts.push("Battambang");
//     fonts.push("Baumans");
//     fonts.push("Bayon");
//     fonts.push("Belgrano");
//     fonts.push("Belleza");
//     fonts.push("BenchNine");
//     fonts.push("Bentham");
//     fonts.push("Berkshire Swash");
//     fonts.push("Bevan");
//     fonts.push("Bigelow Rules");
//     fonts.push("Bigshot One");
//     fonts.push("Bilbo");
//     fonts.push("Bilbo Swash Caps");
//     fonts.push("Bitter");
//     fonts.push("Black Ops One");
//     fonts.push("Bokor");
//     fonts.push("Bonbon");
//     fonts.push("Boogaloo");
//     fonts.push("Bowlby One");
//     fonts.push("Bowlby One SC");
//     fonts.push("Brawler");
//     fonts.push("Bree Serif");
//     fonts.push("Bubblegum Sans");
//     fonts.push("Bubbler One");
//     fonts.push("Buda");
//     fonts.push("Buenard");
//     fonts.push("Butcherman");
//     fonts.push("Butterfly Kids");
//     fonts.push("Cabin");
//     fonts.push("Cabin Condensed");
//     fonts.push("Cabin Sketch");
//     fonts.push("Caesar Dressing");
//     fonts.push("Cagliostro");
//     fonts.push("Calligraffitti");
//     fonts.push("Cambo");
//     fonts.push("Candal");
//     fonts.push("Cantarell");
//     fonts.push("Cantata One");
//     fonts.push("Cantora One");
//     fonts.push("Capriola");
//     fonts.push("Cardo");
//     fonts.push("Carme");
//     fonts.push("Carrois Gothic");
//     fonts.push("Carrois Gothic SC");
//     fonts.push("Carter One");
//     fonts.push("Caudex");
//     fonts.push("Cedarville Cursive");
//     fonts.push("Ceviche One");
//     fonts.push("Changa One");
//     fonts.push("Chango");
//     fonts.push("Chau Philomene One");
//     fonts.push("Chela One");
//     fonts.push("Chelsea Market");
//     fonts.push("Chenla");
//     fonts.push("Cherry Cream Soda");
//     fonts.push("Cherry Swash");
//     fonts.push("Chewy");
//     fonts.push("Chicle");
//     fonts.push("Chivo");
//     fonts.push("Cinzel");
//     fonts.push("Cinzel Decorative");
//     fonts.push("Clicker Script");
//     fonts.push("Coda");
//     fonts.push("Coda Caption");
//     fonts.push("Codystar");
//     fonts.push("Combo");
//     fonts.push("Comfortaa");
//     fonts.push("Coming Soon");
//     fonts.push("Concert One");
//     fonts.push("Condiment");
//     fonts.push("Content");
//     fonts.push("Contrail One");
//     fonts.push("Convergence");
//     fonts.push("Cookie");
//     fonts.push("Copse");
//     fonts.push("Corben");
//     fonts.push("Courgette");
//     fonts.push("Cousine");
//     fonts.push("Coustard");
//     fonts.push("Covered By Your Grace");
//     fonts.push("Crafty Girls");
//     fonts.push("Creepster");
//     fonts.push("Crete Round");
//     fonts.push("Crimson Text");
//     fonts.push("Croissant One");
//     fonts.push("Crushed");
//     fonts.push("Cuprum");
//     fonts.push("Cutive");
//     fonts.push("Cutive Mono");
//     fonts.push("Damion");
//     fonts.push("Dancing Script");
//     fonts.push("Dangrek");
//     fonts.push("Dawning of a New Day");
//     fonts.push("Days One");
//     fonts.push("Delius");
//     fonts.push("Delius Swash Caps");
//     fonts.push("Delius Unicase");
//     fonts.push("Della Respira");
//     fonts.push("Denk One");
//     fonts.push("Devonshire");
//     fonts.push("Didact Gothic");
//     fonts.push("Diplomata");
//     fonts.push("Diplomata SC");
//     fonts.push("Domine");
//     fonts.push("Donegal One");
//     fonts.push("Doppio One");
//     fonts.push("Dorsa");
//     fonts.push("Dosis");
//     fonts.push("Dr Sugiyama");
//     fonts.push("Droid Sans");
//     fonts.push("Droid Sans Mono");
//     fonts.push("Droid Serif");
//     fonts.push("Duru Sans");
//     fonts.push("Dynalight");
//     fonts.push("Eagle Lake");
//     fonts.push("Eater");
//     fonts.push("EB Garamond");
//     fonts.push("Economica");
//     fonts.push("Ek Mukta");
//     fonts.push("Electrolize");
//     fonts.push("Elsie");
//     fonts.push("Elsie Swash Caps");
//     fonts.push("Emblema One");
//     fonts.push("Emilys Candy");
//     fonts.push("Engagement");
//     fonts.push("Englebert");
//     fonts.push("Enriqueta");
//     fonts.push("Erica One");
//     fonts.push("Esteban");
//     fonts.push("Euphoria Script");
//     fonts.push("Ewert");
//     fonts.push("Exo");
//     fonts.push("Exo 2");
//     fonts.push("Expletus Sans");
//     fonts.push("Fanwood Text");
//     fonts.push("Fascinate");
//     fonts.push("Fascinate Inline");
//     fonts.push("Faster One");
//     fonts.push("Fasthand");
//     fonts.push("Fauna One");
//     fonts.push("Federant");
//     fonts.push("Federo");
//     fonts.push("Felipa");
//     fonts.push("Fenix");
//     fonts.push("Finger Paint");
//     fonts.push("Fira Mono");
//     fonts.push("Fira Sans");
//     fonts.push("Fjalla One");
//     fonts.push("Fjord One");
//     fonts.push("Flamenco");
//     fonts.push("Flavors");
//     fonts.push("Fondamento");
//     fonts.push("Fontdiner Swanky");
//     fonts.push("Forum");
//     fonts.push("Francois One");
//     fonts.push("Freckle Face");
//     fonts.push("Fredericka the Great");
//     fonts.push("Fredoka One");
//     fonts.push("Freehand");
//     fonts.push("Fresca");
//     fonts.push("Frijole");
//     fonts.push("Fruktur");
//     fonts.push("Fugaz One");
//     fonts.push("Gabriela");
//     fonts.push("Gafata");
//     fonts.push("Galdeano");
//     fonts.push("Galindo");
//     fonts.push("Gentium Basic");
//     fonts.push("Gentium Book Basic");
//     fonts.push("Geo");
//     fonts.push("Geostar");
//     fonts.push("Geostar Fill");
//     fonts.push("Germania One");
//     fonts.push("GFS Didot");
//     fonts.push("GFS Neohellenic");
//     fonts.push("Gilda Display");
//     fonts.push("Give You Glory");
//     fonts.push("Glass Antiqua");
//     fonts.push("Glegoo");
//     fonts.push("Gloria Hallelujah");
//     fonts.push("Goblin One");
//     fonts.push("Gochi Hand");
//     fonts.push("Gorditas");
//     fonts.push("Goudy Bookletter 1911");
//     fonts.push("Graduate");
//     fonts.push("Grand Hotel");
//     fonts.push("Gravitas One");
//     fonts.push("Great Vibes");
//     fonts.push("Griffy");
//     fonts.push("Gruppo");
//     fonts.push("Gudea");
//     fonts.push("Habibi");
//     fonts.push("Hammersmith One");
//     fonts.push("Hanalei");
//     fonts.push("Hanalei Fill");
//     fonts.push("Handlee");
//     fonts.push("Hanuman");
//     fonts.push("Happy Monkey");
//     fonts.push("Headland One");
//     fonts.push("Henny Penny");
//     fonts.push("Herr Von Muellerhoff");
//     fonts.push("Hind");
//     fonts.push("Holtwood One SC");
//     fonts.push("Homemade Apple");
//     fonts.push("Homenaje");
//     fonts.push("Iceberg");
//     fonts.push("Iceland");
//     fonts.push("IM Fell Double Pica");
//     fonts.push("IM Fell Double Pica SC");
//     fonts.push("IM Fell DW Pica");
//     fonts.push("IM Fell DW Pica SC");
//     fonts.push("IM Fell English");
//     fonts.push("IM Fell English SC");
//     fonts.push("IM Fell French Canon");
//     fonts.push("IM Fell French Canon SC");
//     fonts.push("IM Fell Great Primer");
//     fonts.push("IM Fell Great Primer SC");
//     fonts.push("Imprima");
//     fonts.push("Inconsolata");
//     fonts.push("Inder");
//     fonts.push("Indie Flower");
//     fonts.push("Inika");
//     fonts.push("Irish Grover");
//     fonts.push("Istok Web");
//     fonts.push("Italiana");
//     fonts.push("Italianno");
//     fonts.push("Jacques Francois");
//     fonts.push("Jacques Francois Shadow");
//     fonts.push("Jim Nightshade");
//     fonts.push("Jockey One");
//     fonts.push("Jolly Lodger");
//     fonts.push("Josefin Sans");
//     fonts.push("Josefin Slab");
//     fonts.push("Joti One");
//     fonts.push("Judson");
//     fonts.push("Julee");
//     fonts.push("Julius Sans One");
//     fonts.push("Junge");
//     fonts.push("Jura");
//     fonts.push("Just Another Hand");
//     fonts.push("Just Me Again Down Here");
//     fonts.push("Kalam");
//     fonts.push("Kameron");
//     fonts.push("Kantumruy");
//     fonts.push("Karla");
//     fonts.push("Karma");
//     fonts.push("Kaushan Script");
//     fonts.push("Kavoon");
//     fonts.push("Kdam Thmor");
//     fonts.push("Keania One");
//     fonts.push("Kelly Slab");
//     fonts.push("Kenia");
//     fonts.push("Khmer");
//     fonts.push("Kite One");
//     fonts.push("Knewave");
//     fonts.push("Kotta One");
//     fonts.push("Koulen");
//     fonts.push("Kranky");
//     fonts.push("Kreon");
//     fonts.push("Kristi");
//     fonts.push("Krona One");
//     fonts.push("La Belle Aurore");
//     fonts.push("Lancelot");
//     fonts.push("Lato");
//     fonts.push("League Script");
//     fonts.push("Leckerli One");
//     fonts.push("Ledger");
//     fonts.push("Lekton");
//     fonts.push("Lemon");
//     fonts.push("Libre Baskerville");
//     fonts.push("Life Savers");
//     fonts.push("Lilita One");
//     fonts.push("Lily Script One");
//     fonts.push("Limelight");
//     fonts.push("Linden Hill");
//     fonts.push("Lobster");
//     fonts.push("Lobster Two");
//     fonts.push("Londrina Outline");
//     fonts.push("Londrina Shadow");
//     fonts.push("Londrina Sketch");
//     fonts.push("Londrina Solid");
//     fonts.push("Lora");
//     fonts.push("Love Ya Like A Sister");
//     fonts.push("Loved by the King");
//     fonts.push("Lovers Quarrel");
//     fonts.push("Luckiest Guy");
//     fonts.push("Lusitana");
//     fonts.push("Lustria");
//     fonts.push("Macondo");
//     fonts.push("Macondo Swash Caps");
//     fonts.push("Magra");
//     fonts.push("Maiden Orange");
//     fonts.push("Mako");
//     fonts.push("Marcellus");
//     fonts.push("Marcellus SC");
//     fonts.push("Marck Script");
//     fonts.push("Margarine");
//     fonts.push("Marko One");
//     fonts.push("Marmelad");
//     fonts.push("Marvel");
//     fonts.push("Mate");
//     fonts.push("Mate SC");
//     fonts.push("Maven Pro");
//     fonts.push("McLaren");
//     fonts.push("Meddon");
//     fonts.push("MedievalSharp");
//     fonts.push("Medula One");
//     fonts.push("Megrim");
//     fonts.push("Meie Script");
//     fonts.push("Merienda");
//     fonts.push("Merienda One");
//     fonts.push("Merriweather");
//     fonts.push("Merriweather Sans");
//     fonts.push("Metal");
//     fonts.push("Metal Mania");
//     fonts.push("Metamorphous");
//     fonts.push("Metrophobic");
//     fonts.push("Michroma");
//     fonts.push("Milonga");
//     fonts.push("Miltonian");
//     fonts.push("Miltonian Tattoo");
//     fonts.push("Miniver");
//     fonts.push("Miss Fajardose");
//     fonts.push("Modern Antiqua");
//     fonts.push("Molengo");
//     fonts.push("Molle");
//     fonts.push("Monda");
//     fonts.push("Monofett");
//     fonts.push("Monoton");
//     fonts.push("Monsieur La Doulaise");
//     fonts.push("Montaga");
//     fonts.push("Montez");
//     fonts.push("Montserrat");
//     fonts.push("Montserrat Alternates");
//     fonts.push("Montserrat Subrayada");
//     fonts.push("Moul");
//     fonts.push("Moulpali");
//     fonts.push("Mountains of Christmas");
//     fonts.push("Mouse Memoirs");
//     fonts.push("Mr Bedfort");
//     fonts.push("Mr Dafoe");
//     fonts.push("Mr De Haviland");
//     fonts.push("Mrs Saint Delafield");
//     fonts.push("Mrs Sheppards");
//     fonts.push("Muli");
//     fonts.push("Mystery Quest");
//     fonts.push("Neucha");
//     fonts.push("Neuton");
//     fonts.push("New Rocker");
//     fonts.push("News Cycle");
//     fonts.push("Niconne");
//     fonts.push("Nixie One");
//     fonts.push("Nobile");
//     fonts.push("Nokora");
//     fonts.push("Norican");
//     fonts.push("Nosifer");
//     fonts.push("Nothing You Could Do");
//     fonts.push("Noticia Text");
//     fonts.push("Noto Sans");
//     fonts.push("Noto Serif");
//     fonts.push("Nova Cut");
//     fonts.push("Nova Flat");
//     fonts.push("Nova Mono");
//     fonts.push("Nova Oval");
//     fonts.push("Nova Round");
//     fonts.push("Nova Script");
//     fonts.push("Nova Slim");
//     fonts.push("Nova Square");
//     fonts.push("Numans");
//     fonts.push("Nunito");
//     fonts.push("Odor Mean Chey");
//     fonts.push("Offside");
//     fonts.push("Old Standard TT");
//     fonts.push("Oldenburg");
//     fonts.push("Oleo Script");
//     fonts.push("Oleo Script Swash Caps");
//     fonts.push("Open Sans");
//     fonts.push("Open Sans Condensed");
//     fonts.push("Oranienbaum");
//     fonts.push("Orbitron");
//     fonts.push("Oregano");
//     fonts.push("Orienta");
//     fonts.push("Original Surfer");
//     fonts.push("Oswald");
//     fonts.push("Over the Rainbow");
//     fonts.push("Overlock");
//     fonts.push("Overlock SC");
//     fonts.push("Ovo");
//     fonts.push("Oxygen");
//     fonts.push("Oxygen Mono");
//     fonts.push("Pacifico");
//     fonts.push("Paprika");
//     fonts.push("Parisienne");
//     fonts.push("Passero One");
//     fonts.push("Passion One");
//     fonts.push("Pathway Gothic One");
//     fonts.push("Patrick Hand");
//     fonts.push("Patrick Hand SC");
//     fonts.push("Patua One");
//     fonts.push("Paytone One");
//     fonts.push("Peralta");
//     fonts.push("Permanent Marker");
//     fonts.push("Petit Formal Script");
//     fonts.push("Petrona");
//     fonts.push("Philosopher");
//     fonts.push("Piedra");
//     fonts.push("Pinyon Script");
//     fonts.push("Pirata One");
//     fonts.push("Plaster");
//     fonts.push("Play");
//     fonts.push("Playball");
//     fonts.push("Playfair Display");
//     fonts.push("Playfair Display SC");
//     fonts.push("Podkova");
//     fonts.push("Poiret One");
//     fonts.push("Poller One");
//     fonts.push("Poly");
//     fonts.push("Pompiere");
//     fonts.push("Pontano Sans");
//     fonts.push("Port Lligat Sans");
//     fonts.push("Port Lligat Slab");
//     fonts.push("Prata");
//     fonts.push("Preahvihear");
//     fonts.push("Press Start 2P");
//     fonts.push("Princess Sofia");
//     fonts.push("Prociono");
//     fonts.push("Prosto One");
//     fonts.push("PT Mono");
//     fonts.push("PT Sans");
//     fonts.push("PT Sans Caption");
//     fonts.push("PT Sans Narrow");
//     fonts.push("PT Serif");
//     fonts.push("PT Serif Caption");
//     fonts.push("Puritan");
//     fonts.push("Purple Purse");
//     fonts.push("Quando");
//     fonts.push("Quantico");
//     fonts.push("Quattrocento");
//     fonts.push("Quattrocento Sans");
//     fonts.push("Questrial");
//     fonts.push("Quicksand");
//     fonts.push("Quintessential");
//     fonts.push("Qwigley");
//     fonts.push("Racing Sans One");
//     fonts.push("Radley");
//     fonts.push("Rajdhani");
//     fonts.push("Raleway");
//     fonts.push("Raleway Dots");
//     fonts.push("Rambla");
//     fonts.push("Rammetto One");
//     fonts.push("Ranchers");
//     fonts.push("Rancho");
//     fonts.push("Rationale");
//     fonts.push("Redressed");
//     fonts.push("Reenie Beanie");
//     fonts.push("Revalia");
//     fonts.push("Ribeye");
//     fonts.push("Ribeye Marrow");
//     fonts.push("Righteous");
//     fonts.push("Risque");
//     fonts.push("Roboto");
//     fonts.push("Roboto Condensed");
//     fonts.push("Roboto Slab");
//     fonts.push("Rochester");
//     fonts.push("Rock Salt");
//     fonts.push("Rokkitt");
//     fonts.push("Romanesco");
//     fonts.push("Ropa Sans");
//     fonts.push("Rosario");
//     fonts.push("Rosarivo");
//     fonts.push("Rouge Script");
//     fonts.push("Rubik Mono One");
//     fonts.push("Rubik One");
//     fonts.push("Ruda");
//     fonts.push("Rufina");
//     fonts.push("Ruge Boogie");
//     fonts.push("Ruluko");
//     fonts.push("Rum Raisin");
//     fonts.push("Ruslan Display");
//     fonts.push("Russo One");
//     fonts.push("Ruthie");
//     fonts.push("Rye");
//     fonts.push("Sacramento");
//     fonts.push("Sail");
//     fonts.push("Salsa");
//     fonts.push("Sanchez");
//     fonts.push("Sancreek");
//     fonts.push("Sansita One");
//     fonts.push("Sarina");
//     fonts.push("Satisfy");
//     fonts.push("Scada");
//     fonts.push("Schoolbell");
//     fonts.push("Seaweed Script");
//     fonts.push("Sevillana");
//     fonts.push("Seymour One");
//     fonts.push("Shadows Into Light");
//     fonts.push("Shadows Into Light Two");
//     fonts.push("Shanti");
//     fonts.push("Share");
//     fonts.push("Share Tech");
//     fonts.push("Share Tech Mono");
//     fonts.push("Shojumaru");
//     fonts.push("Short Stack");
//     fonts.push("Siemreap");
//     fonts.push("Sigmar One");
//     fonts.push("Signika");
//     fonts.push("Signika Negative");
//     fonts.push("Simonetta");
//     fonts.push("Sintony");
//     fonts.push("Sirin Stencil");
//     fonts.push("Six Caps");
//     fonts.push("Skranji");
//     fonts.push("Slackey");
//     fonts.push("Smokum");
//     fonts.push("Smythe");
//     fonts.push("Sniglet");
//     fonts.push("Snippet");
//     fonts.push("Snowburst One");
//     fonts.push("Sofadi One");
//     fonts.push("Sofia");
//     fonts.push("Sonsie One");
//     fonts.push("Sorts Mill Goudy");
//     fonts.push("Source Code Pro");
//     fonts.push("Source Sans Pro");
//     fonts.push("Source Serif Pro");
//     fonts.push("Special Elite");
//     fonts.push("Spicy Rice");
//     fonts.push("Spinnaker");
//     fonts.push("Spirax");
//     fonts.push("Squada One");
//     fonts.push("Stalemate");
//     fonts.push("Stalinist One");
//     fonts.push("Stardos Stencil");
//     fonts.push("Stint Ultra Condensed");
//     fonts.push("Stint Ultra Expanded");
//     fonts.push("Stoke");
//     fonts.push("Strait");
//     fonts.push("Sue Ellen Francisco");
//     fonts.push("Sunshiney");
//     fonts.push("Supermercado One");
//     fonts.push("Suwannaphum");
//     fonts.push("Swanky and Moo Moo");
//     fonts.push("Syncopate");
//     fonts.push("Tangerine");
//     fonts.push("Taprom");
//     fonts.push("Tauri");
//     fonts.push("Teko");
//     fonts.push("Telex");
//     fonts.push("Tenor Sans");
//     fonts.push("Text Me One");
//     fonts.push("The Girl Next Door");
//     fonts.push("Tienne");
//     fonts.push("Tinos");
//     fonts.push("Titan One");
//     fonts.push("Titillium Web");
//     fonts.push("Trade Winds");
//     fonts.push("Trocchi");
//     fonts.push("Trochut");
//     fonts.push("Trykker");
//     fonts.push("Tulpen One");
//     fonts.push("Ubuntu");
//     fonts.push("Ubuntu Condensed");
//     fonts.push("Ubuntu Mono");
//     fonts.push("Ultra");
//     fonts.push("Uncial Antiqua");
//     fonts.push("Underdog");
//     fonts.push("Unica One");
//     fonts.push("UnifrakturCook");
//     fonts.push("UnifrakturMaguntia");
//     fonts.push("Unkempt");
//     fonts.push("Unlock");
//     fonts.push("Unna");
//     fonts.push("Vampiro One");
//     fonts.push("Varela");
//     fonts.push("Varela Round");
//     fonts.push("Vast Shadow");
//     fonts.push("Vibur");
//     fonts.push("Vidaloka");
//     fonts.push("Viga");
//     fonts.push("Voces");
//     fonts.push("Volkhov");
//     fonts.push("Vollkorn");
//     fonts.push("Voltaire");
//     fonts.push("VT323");
//     fonts.push("Waiting for the Sunrise");
//     fonts.push("Wallpoet");
//     fonts.push("Walter Turncoat");
//     fonts.push("Warnes");
//     fonts.push("Wellfleet");
//     fonts.push("Wendy One");
//     fonts.push("Wire One");
//     fonts.push("Yanone Kaffeesatz");
//     fonts.push("Yellowtail");
//     fonts.push("Yeseva One");
//     fonts.push("Yesteryear");
//     fonts.push("Zeyada");
//     var table = document.getElementById('font-table');
//     for (i = 0; i < fonts.length; i++) {
//         var result = d.detect(fonts[i]);
//         if(result == true) {
//             row = table.insertRow(-1);
//             col = row.insertCell(-1);
//             col.appendChild(document.createTextNode(fonts[i]))
//             col.style.fontFamily = fonts[i];
//             col = row.insertCell(-1);
//             result ? col.className = "f_green" : col.className = "f_red";
//             col.appendChild(document.createTextNode(result));
//         }
//     }
// }
// jQuery(function(){
//     font_init()
// });
/*
  html2canvas 0.4.1 <http://html2canvas.hertzen.com>
  Copyright (c) 2013 Niklas von Hertzen

  Released under MIT License
*/

(function(window, document, undefined){

"use strict";

var _html2canvas = {},
previousElement,
computedCSS,
html2canvas;

_html2canvas.Util = {};

_html2canvas.Util.log = function(a) {
  if (_html2canvas.logging && window.console && window.console.log) {
    window.console.log(a);
  }
};

_html2canvas.Util.trimText = (function(isNative){
  return function(input) {
    return isNative ? isNative.apply(input) : ((input || '') + '').replace( /^\s+|\s+$/g , '' );
  };
})(String.prototype.trim);

_html2canvas.Util.asFloat = function(v) {
  return parseFloat(v);
};

(function() {
  // TODO: support all possible length values
  var TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
  var TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
  _html2canvas.Util.parseTextShadows = function (value) {
    if (!value || value === 'none') {
      return [];
    }

    // find multiple shadow declarations
    var shadows = value.match(TEXT_SHADOW_PROPERTY),
      results = [];
    for (var i = 0; shadows && (i < shadows.length); i++) {
      var s = shadows[i].match(TEXT_SHADOW_VALUES);
      results.push({
        color: s[0],
        offsetX: s[1] ? s[1].replace('px', '') : 0,
        offsetY: s[2] ? s[2].replace('px', '') : 0,
        blur: s[3] ? s[3].replace('px', '') : 0
      });
    }
    return results;
  };
})();


_html2canvas.Util.parseBackgroundImage = function (value) {
    var whitespace = ' \r\n\t',
        method, definition, prefix, prefix_i, block, results = [],
        c, mode = 0, numParen = 0, quote, args;

    var appendResult = function(){
        if(method) {
            if(definition.substr( 0, 1 ) === '"') {
                definition = definition.substr( 1, definition.length - 2 );
            }
            if(definition) {
                args.push(definition);
            }
            if(method.substr( 0, 1 ) === '-' &&
                    (prefix_i = method.indexOf( '-', 1 ) + 1) > 0) {
                prefix = method.substr( 0, prefix_i);
                method = method.substr( prefix_i );
            }
            results.push({
                prefix: prefix,
                method: method.toLowerCase(),
                value: block,
                args: args
            });
        }
        args = []; //for some odd reason, setting .length = 0 didn't work in safari
        method =
            prefix =
            definition =
            block = '';
    };

    appendResult();
    for(var i = 0, ii = value.length; i<ii; i++) {
        c = value[i];
        if(mode === 0 && whitespace.indexOf( c ) > -1){
            continue;
        }
        switch(c) {
            case '"':
                if(!quote) {
                    quote = c;
                }
                else if(quote === c) {
                    quote = null;
                }
                break;

            case '(':
                if(quote) { break; }
                else if(mode === 0) {
                    mode = 1;
                    block += c;
                    continue;
                } else {
                    numParen++;
                }
                break;

            case ')':
                if(quote) { break; }
                else if(mode === 1) {
                    if(numParen === 0) {
                        mode = 0;
                        block += c;
                        appendResult();
                        continue;
                    } else {
                        numParen--;
                    }
                }
                break;

            case ',':
                if(quote) { break; }
                else if(mode === 0) {
                    appendResult();
                    continue;
                }
                else if (mode === 1) {
                    if(numParen === 0 && !method.match(/^url$/i)) {
                        args.push(definition);
                        definition = '';
                        block += c;
                        continue;
                    }
                }
                break;
        }

        block += c;
        if(mode === 0) { method += c; }
        else { definition += c; }
    }
    appendResult();

    return results;
};

_html2canvas.Util.Bounds = function (element) {
  var clientRect, bounds = {};

  if (element.getBoundingClientRect){
    clientRect = element.getBoundingClientRect();

    // TODO add scroll position to bounds, so no scrolling of window necessary
    bounds.top = clientRect.top;
    bounds.bottom = clientRect.bottom || (clientRect.top + clientRect.height);
    bounds.left = clientRect.left;

    bounds.width = element.offsetWidth;
    bounds.height = element.offsetHeight;
  }

  return bounds;
};

// TODO ideally, we'd want everything to go through this function instead of Util.Bounds,
// but would require further work to calculate the correct positions for elements with offsetParents
_html2canvas.Util.OffsetBounds = function (element) {
  var parent = element.offsetParent ? _html2canvas.Util.OffsetBounds(element.offsetParent) : {top: 0, left: 0};

  return {
    top: element.offsetTop + parent.top,
    bottom: element.offsetTop + element.offsetHeight + parent.top,
    left: element.offsetLeft + parent.left,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
};

function toPX(element, attribute, value ) {
    var rsLeft = element.runtimeStyle && element.runtimeStyle[attribute],
        left,
        style = element.style;

    // Check if we are not dealing with pixels, (Opera has issues with this)
    // Ported from jQuery css.js
    // From the awesome hack by Dean Edwards
    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels

    if ( !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test( value ) && /^-?\d/.test(value) ) {
        // Remember the original values
        left = style.left;

        // Put in the new values to get a computed value out
        if (rsLeft) {
            element.runtimeStyle.left = element.currentStyle.left;
        }
        style.left = attribute === "fontSize" ? "1em" : (value || 0);
        value = style.pixelLeft + "px";

        // Revert the changed values
        style.left = left;
        if (rsLeft) {
            element.runtimeStyle.left = rsLeft;
        }
    }

    if (!/^(thin|medium|thick)$/i.test(value)) {
        return Math.round(parseFloat(value)) + "px";
    }

    return value;
}

function asInt(val) {
    return parseInt(val, 10);
}

function parseBackgroundSizePosition(value, element, attribute, index) {
    value = (value || '').split(',');
    value = value[index || 0] || value[0] || 'auto';
    value = _html2canvas.Util.trimText(value).split(' ');

    if(attribute === 'backgroundSize' && (!value[0] || value[0].match(/cover|contain|auto/))) {
        //these values will be handled in the parent function
    } else {
        value[0] = (value[0].indexOf( "%" ) === -1) ? toPX(element, attribute + "X", value[0]) : value[0];
        if(value[1] === undefined) {
            if(attribute === 'backgroundSize') {
                value[1] = 'auto';
                return value;
            } else {
                // IE 9 doesn't return double digit always
                value[1] = value[0];
            }
        }
        value[1] = (value[1].indexOf("%") === -1) ? toPX(element, attribute + "Y", value[1]) : value[1];
    }
    return value;
}

_html2canvas.Util.getCSS = function (element, attribute, index) {
    if (previousElement !== element) {
      computedCSS = document.defaultView.getComputedStyle(element, null);
    }

    var value = computedCSS[attribute];

    if (/^background(Size|Position)$/.test(attribute)) {
        return parseBackgroundSizePosition(value, element, attribute, index);
    } else if (/border(Top|Bottom)(Left|Right)Radius/.test(attribute)) {
      var arr = value.split(" ");
      if (arr.length <= 1) {
          arr[1] = arr[0];
      }
      return arr.map(asInt);
    }

  return value;
};

_html2canvas.Util.resizeBounds = function( current_width, current_height, target_width, target_height, stretch_mode ){
  var target_ratio = target_width / target_height,
    current_ratio = current_width / current_height,
    output_width, output_height;

  if(!stretch_mode || stretch_mode === 'auto') {
    output_width = target_width;
    output_height = target_height;
  } else if(target_ratio < current_ratio ^ stretch_mode === 'contain') {
    output_height = target_height;
    output_width = target_height * current_ratio;
  } else {
    output_width = target_width;
    output_height = target_width / current_ratio;
  }

  return {
    width: output_width,
    height: output_height
  };
};

function backgroundBoundsFactory( prop, el, bounds, image, imageIndex, backgroundSize ) {
    var bgposition =  _html2canvas.Util.getCSS( el, prop, imageIndex ) ,
    topPos,
    left,
    percentage,
    val;

    if (bgposition.length === 1){
      val = bgposition[0];

      bgposition = [];

      bgposition[0] = val;
      bgposition[1] = val;
    }

    if (bgposition[0].toString().indexOf("%") !== -1){
      percentage = (parseFloat(bgposition[0])/100);
      left = bounds.width * percentage;
      if(prop !== 'backgroundSize') {
        left -= (backgroundSize || image).width*percentage;
      }
    } else {
      if(prop === 'backgroundSize') {
        if(bgposition[0] === 'auto') {
          left = image.width;
        } else {
          if (/contain|cover/.test(bgposition[0])) {
            var resized = _html2canvas.Util.resizeBounds(image.width, image.height, bounds.width, bounds.height, bgposition[0]);
            left = resized.width;
            topPos = resized.height;
          } else {
            left = parseInt(bgposition[0], 10);
          }
        }
      } else {
        left = parseInt( bgposition[0], 10);
      }
    }


    if(bgposition[1] === 'auto') {
      topPos = left / image.width * image.height;
    } else if (bgposition[1].toString().indexOf("%") !== -1){
      percentage = (parseFloat(bgposition[1])/100);
      topPos =  bounds.height * percentage;
      if(prop !== 'backgroundSize') {
        topPos -= (backgroundSize || image).height * percentage;
      }

    } else {
      topPos = parseInt(bgposition[1],10);
    }

    return [left, topPos];
}

_html2canvas.Util.BackgroundPosition = function( el, bounds, image, imageIndex, backgroundSize ) {
    var result = backgroundBoundsFactory( 'backgroundPosition', el, bounds, image, imageIndex, backgroundSize );
    return { left: result[0], top: result[1] };
};

_html2canvas.Util.BackgroundSize = function( el, bounds, image, imageIndex ) {
    var result = backgroundBoundsFactory( 'backgroundSize', el, bounds, image, imageIndex );
    return { width: result[0], height: result[1] };
};

_html2canvas.Util.Extend = function (options, defaults) {
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      defaults[key] = options[key];
    }
  }
  return defaults;
};


/*
 * Derived from jQuery.contents()
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
_html2canvas.Util.Children = function( elem ) {
  var children;
  try {
    children = (elem.nodeName && elem.nodeName.toUpperCase() === "IFRAME") ? elem.contentDocument || elem.contentWindow.document : (function(array) {
      var ret = [];
      if (array !== null) {
        (function(first, second ) {
          var i = first.length,
          j = 0;

          if (typeof second.length === "number") {
            for (var l = second.length; j < l; j++) {
              first[i++] = second[j];
            }
          } else {
            while (second[j] !== undefined) {
              first[i++] = second[j++];
            }
          }

          first.length = i;

          return first;
        })(ret, array);
      }
      return ret;
    })(elem.childNodes);

  } catch (ex) {
    _html2canvas.Util.log("html2canvas.Util.Children failed with exception: " + ex.message);
    children = [];
  }
  return children;
};

_html2canvas.Util.isTransparent = function(backgroundColor) {
  return (backgroundColor === "transparent" || backgroundColor === "rgba(0, 0, 0, 0)");
};
_html2canvas.Util.Font = (function () {

  var fontData = {};

  return function(font, fontSize, doc) {
    if (fontData[font + "-" + fontSize] !== undefined) {
      return fontData[font + "-" + fontSize];
    }

    var container = doc.createElement('div'),
    img = doc.createElement('img'),
    span = doc.createElement('span'),
    sampleText = 'Hidden Text',
    baseline,
    middle,
    metricsObj;

    container.style.visibility = "hidden";
    container.style.fontFamily = font;
    container.style.fontSize = fontSize;
    container.style.margin = 0;
    container.style.padding = 0;

    doc.body.appendChild(container);

    // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever (handtinywhite.gif)
    img.src = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=";
    img.width = 1;
    img.height = 1;

    img.style.margin = 0;
    img.style.padding = 0;
    img.style.verticalAlign = "baseline";

    span.style.fontFamily = font;
    span.style.fontSize = fontSize;
    span.style.margin = 0;
    span.style.padding = 0;

    span.appendChild(doc.createTextNode(sampleText));
    container.appendChild(span);
    container.appendChild(img);
    baseline = (img.offsetTop - span.offsetTop) + 1;

    container.removeChild(span);
    container.appendChild(doc.createTextNode(sampleText));

    container.style.lineHeight = "normal";
    img.style.verticalAlign = "super";

    middle = (img.offsetTop-container.offsetTop) + 1;
    metricsObj = {
      baseline: baseline,
      lineWidth: 1,
      middle: middle
    };

    fontData[font + "-" + fontSize] = metricsObj;

    doc.body.removeChild(container);

    return metricsObj;
  };
})();

(function(){
  var Util = _html2canvas.Util,
    Generate = {};

  _html2canvas.Generate = Generate;

  var reGradients = [
  /^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,
  /^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,
  /^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/
  ];

  /*
 * TODO: Add IE10 vendor prefix (-ms) support
 * TODO: Add W3C gradient (linear-gradient) support
 * TODO: Add old Webkit -webkit-gradient(radial, ...) support
 * TODO: Maybe some RegExp optimizations are possible ;o)
 */
  Generate.parseGradient = function(css, bounds) {
    var gradient, i, len = reGradients.length, m1, stop, m2, m2Len, step, m3, tl,tr,br,bl;

    for(i = 0; i < len; i+=1){
      m1 = css.match(reGradients[i]);
      if(m1) {
        break;
      }
    }

    if(m1) {
      switch(m1[1]) {
        case '-webkit-linear-gradient':
        case '-o-linear-gradient':

          gradient = {
            type: 'linear',
            x0: null,
            y0: null,
            x1: null,
            y1: null,
            colorStops: []
          };

          // get coordinates
          m2 = m1[2].match(/\w+/g);
          if(m2){
            m2Len = m2.length;
            for(i = 0; i < m2Len; i+=1){
              switch(m2[i]) {
                case 'top':
                  gradient.y0 = 0;
                  gradient.y1 = bounds.height;
                  break;

                case 'right':
                  gradient.x0 = bounds.width;
                  gradient.x1 = 0;
                  break;

                case 'bottom':
                  gradient.y0 = bounds.height;
                  gradient.y1 = 0;
                  break;

                case 'left':
                  gradient.x0 = 0;
                  gradient.x1 = bounds.width;
                  break;
              }
            }
          }
          if(gradient.x0 === null && gradient.x1 === null){ // center
            gradient.x0 = gradient.x1 = bounds.width / 2;
          }
          if(gradient.y0 === null && gradient.y1 === null){ // center
            gradient.y0 = gradient.y1 = bounds.height / 2;
          }

          // get colors and stops
          m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
          if(m2){
            m2Len = m2.length;
            step = 1 / Math.max(m2Len - 1, 1);
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
              if(m3[2]){
                stop = parseFloat(m3[2]);
                if(m3[3] === '%'){
                  stop /= 100;
                } else { // px - stupid opera
                  stop /= bounds.width;
                }
              } else {
                stop = i * step;
              }
              gradient.colorStops.push({
                color: m3[1],
                stop: stop
              });
            }
          }
          break;

        case '-webkit-gradient':

          gradient = {
            type: m1[2] === 'radial' ? 'circle' : m1[2], // TODO: Add radial gradient support for older mozilla definitions
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            colorStops: []
          };

          // get coordinates
          m2 = m1[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/);
          if(m2){
            gradient.x0 = (m2[1] * bounds.width) / 100;
            gradient.y0 = (m2[2] * bounds.height) / 100;
            gradient.x1 = (m2[3] * bounds.width) / 100;
            gradient.y1 = (m2[4] * bounds.height) / 100;
          }

          // get colors and stops
          m2 = m1[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g);
          if(m2){
            m2Len = m2.length;
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/);
              stop = parseFloat(m3[2]);
              if(m3[1] === 'from') {
                stop = 0.0;
              }
              if(m3[1] === 'to') {
                stop = 1.0;
              }
              gradient.colorStops.push({
                color: m3[3],
                stop: stop
              });
            }
          }
          break;

        case '-moz-linear-gradient':

          gradient = {
            type: 'linear',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            colorStops: []
          };

          // get coordinates
          m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);

          // m2[1] == 0%   -> left
          // m2[1] == 50%  -> center
          // m2[1] == 100% -> right

          // m2[2] == 0%   -> top
          // m2[2] == 50%  -> center
          // m2[2] == 100% -> bottom

          if(m2){
            gradient.x0 = (m2[1] * bounds.width) / 100;
            gradient.y0 = (m2[2] * bounds.height) / 100;
            gradient.x1 = bounds.width - gradient.x0;
            gradient.y1 = bounds.height - gradient.y0;
          }

          // get colors and stops
          m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g);
          if(m2){
            m2Len = m2.length;
            step = 1 / Math.max(m2Len - 1, 1);
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/);
              if(m3[2]){
                stop = parseFloat(m3[2]);
                if(m3[3]){ // percentage
                  stop /= 100;
                }
              } else {
                stop = i * step;
              }
              gradient.colorStops.push({
                color: m3[1],
                stop: stop
              });
            }
          }
          break;

        case '-webkit-radial-gradient':
        case '-moz-radial-gradient':
        case '-o-radial-gradient':

          gradient = {
            type: 'circle',
            x0: 0,
            y0: 0,
            x1: bounds.width,
            y1: bounds.height,
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            colorStops: []
          };

          // center
          m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);
          if(m2){
            gradient.cx = (m2[1] * bounds.width) / 100;
            gradient.cy = (m2[2] * bounds.height) / 100;
          }

          // size
          m2 = m1[3].match(/\w+/);
          m3 = m1[4].match(/[a-z\-]*/);
          if(m2 && m3){
            switch(m3[0]){
              case 'farthest-corner':
              case 'cover': // is equivalent to farthest-corner
              case '': // mozilla removes "cover" from definition :(
                tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
                tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
                gradient.rx = gradient.ry = Math.max(tl, tr, br, bl);
                break;
              case 'closest-corner':
                tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
                tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
                gradient.rx = gradient.ry = Math.min(tl, tr, br, bl);
                break;
              case 'farthest-side':
                if(m2[0] === 'circle'){
                  gradient.rx = gradient.ry = Math.max(
                    gradient.cx,
                    gradient.cy,
                    gradient.x1 - gradient.cx,
                    gradient.y1 - gradient.cy
                    );
                } else { // ellipse

                  gradient.type = m2[0];

                  gradient.rx = Math.max(
                    gradient.cx,
                    gradient.x1 - gradient.cx
                    );
                  gradient.ry = Math.max(
                    gradient.cy,
                    gradient.y1 - gradient.cy
                    );
                }
                break;
              case 'closest-side':
              case 'contain': // is equivalent to closest-side
                if(m2[0] === 'circle'){
                  gradient.rx = gradient.ry = Math.min(
                    gradient.cx,
                    gradient.cy,
                    gradient.x1 - gradient.cx,
                    gradient.y1 - gradient.cy
                    );
                } else { // ellipse

                  gradient.type = m2[0];

                  gradient.rx = Math.min(
                    gradient.cx,
                    gradient.x1 - gradient.cx
                    );
                  gradient.ry = Math.min(
                    gradient.cy,
                    gradient.y1 - gradient.cy
                    );
                }
                break;

            // TODO: add support for "30px 40px" sizes (webkit only)
            }
          }

          // color stops
          m2 = m1[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
          if(m2){
            m2Len = m2.length;
            step = 1 / Math.max(m2Len - 1, 1);
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
              if(m3[2]){
                stop = parseFloat(m3[2]);
                if(m3[3] === '%'){
                  stop /= 100;
                } else { // px - stupid opera
                  stop /= bounds.width;
                }
              } else {
                stop = i * step;
              }
              gradient.colorStops.push({
                color: m3[1],
                stop: stop
              });
            }
          }
          break;
      }
    }

    return gradient;
  };

  function addScrollStops(grad) {
    return function(colorStop) {
      try {
        grad.addColorStop(colorStop.stop, colorStop.color);
      }
      catch(e) {
        Util.log(['failed to add color stop: ', e, '; tried to add: ', colorStop]);
      }
    };
  }

  Generate.Gradient = function(src, bounds) {
    if(bounds.width === 0 || bounds.height === 0) {
      return;
    }

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    gradient, grad;

    canvas.width = bounds.width;
    canvas.height = bounds.height;

    // TODO: add support for multi defined background gradients
    gradient = _html2canvas.Generate.parseGradient(src, bounds);

    if(gradient) {
      switch(gradient.type) {
        case 'linear':
          grad = ctx.createLinearGradient(gradient.x0, gradient.y0, gradient.x1, gradient.y1);
          gradient.colorStops.forEach(addScrollStops(grad));
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, bounds.width, bounds.height);
          break;

        case 'circle':
          grad = ctx.createRadialGradient(gradient.cx, gradient.cy, 0, gradient.cx, gradient.cy, gradient.rx);
          gradient.colorStops.forEach(addScrollStops(grad));
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, bounds.width, bounds.height);
          break;

        case 'ellipse':
          var canvasRadial = document.createElement('canvas'),
            ctxRadial = canvasRadial.getContext('2d'),
            ri = Math.max(gradient.rx, gradient.ry),
            di = ri * 2;

          canvasRadial.width = canvasRadial.height = di;

          grad = ctxRadial.createRadialGradient(gradient.rx, gradient.ry, 0, gradient.rx, gradient.ry, ri);
          gradient.colorStops.forEach(addScrollStops(grad));

          ctxRadial.fillStyle = grad;
          ctxRadial.fillRect(0, 0, di, di);

          ctx.fillStyle = gradient.colorStops[gradient.colorStops.length - 1].color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(canvasRadial, gradient.cx - gradient.rx, gradient.cy - gradient.ry, 2 * gradient.rx, 2 * gradient.ry);
          break;
      }
    }

    return canvas;
  };

  Generate.ListAlpha = function(number) {
    var tmp = "",
    modulus;

    do {
      modulus = number % 26;
      tmp = String.fromCharCode((modulus) + 64) + tmp;
      number = number / 26;
    }while((number*26) > 26);

    return tmp;
  };

  Generate.ListRoman = function(number) {
    var romanArray = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
    decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    roman = "",
    v,
    len = romanArray.length;

    if (number <= 0 || number >= 4000) {
      return number;
    }

    for (v=0; v < len; v+=1) {
      while (number >= decimal[v]) {
        number -= decimal[v];
        roman += romanArray[v];
      }
    }

    return roman;
  };
})();
function h2cRenderContext(width, height) {
  var storage = [];
  return {
    storage: storage,
    width: width,
    height: height,
    clip: function() {
      storage.push({
        type: "function",
        name: "clip",
        'arguments': arguments
      });
    },
    translate: function() {
      storage.push({
        type: "function",
        name: "translate",
        'arguments': arguments
      });
    },
    fill: function() {
      storage.push({
        type: "function",
        name: "fill",
        'arguments': arguments
      });
    },
    save: function() {
      storage.push({
        type: "function",
        name: "save",
        'arguments': arguments
      });
    },
    restore: function() {
      storage.push({
        type: "function",
        name: "restore",
        'arguments': arguments
      });
    },
    fillRect: function () {
      storage.push({
        type: "function",
        name: "fillRect",
        'arguments': arguments
      });
    },
    createPattern: function() {
      storage.push({
        type: "function",
        name: "createPattern",
        'arguments': arguments
      });
    },
    drawShape: function() {

      var shape = [];

      storage.push({
        type: "function",
        name: "drawShape",
        'arguments': shape
      });

      return {
        moveTo: function() {
          shape.push({
            name: "moveTo",
            'arguments': arguments
          });
        },
        lineTo: function() {
          shape.push({
            name: "lineTo",
            'arguments': arguments
          });
        },
        arcTo: function() {
          shape.push({
            name: "arcTo",
            'arguments': arguments
          });
        },
        bezierCurveTo: function() {
          shape.push({
            name: "bezierCurveTo",
            'arguments': arguments
          });
        },
        quadraticCurveTo: function() {
          shape.push({
            name: "quadraticCurveTo",
            'arguments': arguments
          });
        }
      };

    },
    drawImage: function () {
      storage.push({
        type: "function",
        name: "drawImage",
        'arguments': arguments
      });
    },
    fillText: function () {
      storage.push({
        type: "function",
        name: "fillText",
        'arguments': arguments
      });
    },
    setVariable: function (variable, value) {
      storage.push({
        type: "variable",
        name: variable,
        'arguments': value
      });
      return value;
    }
  };
}
_html2canvas.Parse = function (images, options) {
  window.scroll(0,0);

  var element = (( options.elements === undefined ) ? document.body : options.elements[0]), // select body by default
  numDraws = 0,
  doc = element.ownerDocument,
  Util = _html2canvas.Util,
  support = Util.Support(options, doc),
  ignoreElementsRegExp = new RegExp("(" + options.ignoreElements + ")"),
  body = doc.body,
  getCSS = Util.getCSS,
  pseudoHide = "___html2canvas___pseudoelement",
  hidePseudoElements = doc.createElement('style');

  hidePseudoElements.innerHTML = '.' + pseudoHide + '-before:before { content: "" !important; display: none !important; }' +
  '.' + pseudoHide + '-after:after { content: "" !important; display: none !important; }';

  body.appendChild(hidePseudoElements);

  images = images || {};

  function documentWidth () {
    return Math.max(
      Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
      Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
      Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
      );
  }

  function documentHeight () {
    return Math.max(
      Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
      Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
      Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
      );
  }

  function getCSSInt(element, attribute) {
    var val = parseInt(getCSS(element, attribute), 10);
    return (isNaN(val)) ? 0 : val; // borders in old IE are throwing 'medium' for demo.html
  }

  function renderRect (ctx, x, y, w, h, bgcolor) {
    if (bgcolor !== "transparent"){
      ctx.setVariable("fillStyle", bgcolor);
      ctx.fillRect(x, y, w, h);
      numDraws+=1;
    }
  }

  function capitalize(m, p1, p2) {
    if (m.length > 0) {
      return p1 + p2.toUpperCase();
    }
  }

  function textTransform (text, transform) {
    switch(transform){
      case "lowercase":
        return text.toLowerCase();
      case "capitalize":
        return text.replace( /(^|\s|:|-|\(|\))([a-z])/g, capitalize);
      case "uppercase":
        return text.toUpperCase();
      default:
        return text;
    }
  }

  function noLetterSpacing(letter_spacing) {
    return (/^(normal|none|0px)$/.test(letter_spacing));
  }

  function drawText(currentText, x, y, ctx){
    if (currentText !== null && Util.trimText(currentText).length > 0) {
      ctx.fillText(currentText, x, y);
      numDraws+=1;
    }
  }

  function setTextVariables(ctx, el, text_decoration, color) {
    var align = false,
    bold = getCSS(el, "fontWeight"),
    family = getCSS(el, "fontFamily"),
    size = getCSS(el, "fontSize"),
    shadows = Util.parseTextShadows(getCSS(el, "textShadow"));

    switch(parseInt(bold, 10)){
      case 401:
        bold = "bold";
        break;
      case 400:
        bold = "normal";
        break;
    }

    ctx.setVariable("fillStyle", color);
    ctx.setVariable("font", [getCSS(el, "fontStyle"), getCSS(el, "fontVariant"), bold, size, family].join(" "));
    ctx.setVariable("textAlign", (align) ? "right" : "left");

    if (shadows.length) {
      // TODO: support multiple text shadows
      // apply the first text shadow
      ctx.setVariable("shadowColor", shadows[0].color);
      ctx.setVariable("shadowOffsetX", shadows[0].offsetX);
      ctx.setVariable("shadowOffsetY", shadows[0].offsetY);
      ctx.setVariable("shadowBlur", shadows[0].blur);
    }

    if (text_decoration !== "none"){
      return Util.Font(family, size, doc);
    }
  }

  function renderTextDecoration(ctx, text_decoration, bounds, metrics, color) {
    switch(text_decoration) {
      case "underline":
        // Draws a line at the baseline of the font
        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
        renderRect(ctx, bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, color);
        break;
      case "overline":
        renderRect(ctx, bounds.left, Math.round(bounds.top), bounds.width, 1, color);
        break;
      case "line-through":
        // TODO try and find exact position for line-through
        renderRect(ctx, bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, color);
        break;
    }
  }

  function getTextBounds(state, text, textDecoration, isLast, transform) {
    var bounds;
    if (support.rangeBounds && !transform) {
      if (textDecoration !== "none" || Util.trimText(text).length !== 0) {
        bounds = textRangeBounds(text, state.node, state.textOffset);
      }
      state.textOffset += text.length;
    } else if (state.node && typeof state.node.nodeValue === "string" ){
      var newTextNode = (isLast) ? state.node.splitText(text.length) : null;
      bounds = textWrapperBounds(state.node, transform);
      state.node = newTextNode;
    }
    return bounds;
  }

  function textRangeBounds(text, textNode, textOffset) {
    var range = doc.createRange();
    range.setStart(textNode, textOffset);
    range.setEnd(textNode, textOffset + text.length);
    return range.getBoundingClientRect();
  }

  function textWrapperBounds(oldTextNode, transform) {
    var parent = oldTextNode.parentNode,
    wrapElement = doc.createElement('wrapper'),
    backupText = oldTextNode.cloneNode(true);

    wrapElement.appendChild(oldTextNode.cloneNode(true));
    parent.replaceChild(wrapElement, oldTextNode);

    var bounds = transform ? Util.OffsetBounds(wrapElement) : Util.Bounds(wrapElement);
    parent.replaceChild(backupText, wrapElement);
    return bounds;
  }

  function renderText(el, textNode, stack) {
    var ctx = stack.ctx,
    color = getCSS(el, "color"),
    textDecoration = getCSS(el, "textDecoration"),
    textAlign = getCSS(el, "textAlign"),
    metrics,
    textList,
    state = {
      node: textNode,
      textOffset: 0
    };

    if (Util.trimText(textNode.nodeValue).length > 0) {
      textNode.nodeValue = textTransform(textNode.nodeValue, getCSS(el, "textTransform"));
      textAlign = textAlign.replace(["-webkit-auto"],["auto"]);

      textList = (!options.letterRendering && /^(left|right|justify|auto)$/.test(textAlign) && noLetterSpacing(getCSS(el, "letterSpacing"))) ?
      textNode.nodeValue.split(/(\b| )/)
      : textNode.nodeValue.split("");

      metrics = setTextVariables(ctx, el, textDecoration, color);

      if (options.chinese) {
        textList.forEach(function(word, index) {
          if (/.*[\u4E00-\u9FA5].*$/.test(word)) {
            word = word.split("");
            word.unshift(index, 1);
            textList.splice.apply(textList, word);
          }
        });
      }

      textList.forEach(function(text, index) {
        var bounds = getTextBounds(state, text, textDecoration, (index < textList.length - 1), stack.transform.matrix);
        if (bounds) {
          drawText(text, bounds.left, bounds.bottom, ctx);
          renderTextDecoration(ctx, textDecoration, bounds, metrics, color);
        }
      });
    }
  }

  function listPosition (element, val) {
    var boundElement = doc.createElement( "boundelement" ),
    originalType,
    bounds;

    boundElement.style.display = "inline";

    originalType = element.style.listStyleType;
    element.style.listStyleType = "none";

    boundElement.appendChild(doc.createTextNode(val));

    element.insertBefore(boundElement, element.firstChild);

    bounds = Util.Bounds(boundElement);
    element.removeChild(boundElement);
    element.style.listStyleType = originalType;
    return bounds;
  }

  function elementIndex(el) {
    var i = -1,
    count = 1,
    childs = el.parentNode.childNodes;

    if (el.parentNode) {
      while(childs[++i] !== el) {
        if (childs[i].nodeType === 1) {
          count++;
        }
      }
      return count;
    } else {
      return -1;
    }
  }

  function listItemText(element, type) {
    var currentIndex = elementIndex(element), text;
    switch(type){
      case "decimal":
        text = currentIndex;
        break;
      case "decimal-leading-zero":
        text = (currentIndex.toString().length === 1) ? currentIndex = "0" + currentIndex.toString() : currentIndex.toString();
        break;
      case "upper-roman":
        text = _html2canvas.Generate.ListRoman( currentIndex );
        break;
      case "lower-roman":
        text = _html2canvas.Generate.ListRoman( currentIndex ).toLowerCase();
        break;
      case "lower-alpha":
        text = _html2canvas.Generate.ListAlpha( currentIndex ).toLowerCase();
        break;
      case "upper-alpha":
        text = _html2canvas.Generate.ListAlpha( currentIndex );
        break;
    }

    return text + ". ";
  }

  function renderListItem(element, stack, elBounds) {
    var x,
    text,
    ctx = stack.ctx,
    type = getCSS(element, "listStyleType"),
    listBounds;

    if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(type)) {
      text = listItemText(element, type);
      listBounds = listPosition(element, text);
      setTextVariables(ctx, element, "none", getCSS(element, "color"));

      if (getCSS(element, "listStylePosition") === "inside") {
        ctx.setVariable("textAlign", "left");
        x = elBounds.left;
      } else {
        return;
      }

      drawText(text, x, listBounds.bottom, ctx);
    }
  }

  function loadImage (src){
    var img = images[src];
    return (img && img.succeeded === true) ? img.img : false;
  }

  function clipBounds(src, dst){
    var x = Math.max(src.left, dst.left),
    y = Math.max(src.top, dst.top),
    x2 = Math.min((src.left + src.width), (dst.left + dst.width)),
    y2 = Math.min((src.top + src.height), (dst.top + dst.height));

    return {
      left:x,
      top:y,
      width:x2-x,
      height:y2-y
    };
  }

  function setZ(element, stack, parentStack){
    var newContext,
    isPositioned = stack.cssPosition !== 'static',
    zIndex = isPositioned ? getCSS(element, 'zIndex') : 'auto',
    opacity = getCSS(element, 'opacity'),
    isFloated = getCSS(element, 'cssFloat') !== 'none';

    // https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context
    // When a new stacking context should be created:
    // the root element (HTML),
    // positioned (absolutely or relatively) with a z-index value other than "auto",
    // elements with an opacity value less than 1. (See the specification for opacity),
    // on mobile WebKit and Chrome 22+, position: fixed always creates a new stacking context, even when z-index is "auto" (See this post)

    stack.zIndex = newContext = h2czContext(zIndex);
    newContext.isPositioned = isPositioned;
    newContext.isFloated = isFloated;
    newContext.opacity = opacity;
    newContext.ownStacking = (zIndex !== 'auto' || opacity < 1);

    if (parentStack) {
      parentStack.zIndex.children.push(stack);
    }
  }

  function renderImage(ctx, element, image, bounds, borders) {

    var paddingLeft = getCSSInt(element, 'paddingLeft'),
    paddingTop = getCSSInt(element, 'paddingTop'),
    paddingRight = getCSSInt(element, 'paddingRight'),
    paddingBottom = getCSSInt(element, 'paddingBottom');

    drawImage(
      ctx,
      image,
      0, //sx
      0, //sy
      image.width, //sw
      image.height, //sh
      bounds.left + paddingLeft + borders[3].width, //dx
      bounds.top + paddingTop + borders[0].width, // dy
      bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight), //dw
      bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom) //dh
      );
  }

  function getBorderData(element) {
    return ["Top", "Right", "Bottom", "Left"].map(function(side) {
      return {
        width: getCSSInt(element, 'border' + side + 'Width'),
        color: getCSS(element, 'border' + side + 'Color')
      };
    });
  }

  function getBorderRadiusData(element) {
    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
      return getCSS(element, 'border' + side + 'Radius');
    });
  }

  var getCurvePoints = (function(kappa) {

    return function(x, y, r1, r2) {
      var ox = (r1) * kappa, // control point offset horizontal
      oy = (r2) * kappa, // control point offset vertical
      xm = x + r1, // x-middle
      ym = y + r2; // y-middle
      return {
        topLeft: bezierCurve({
          x:x,
          y:ym
        }, {
          x:x,
          y:ym - oy
        }, {
          x:xm - ox,
          y:y
        }, {
          x:xm,
          y:y
        }),
        topRight: bezierCurve({
          x:x,
          y:y
        }, {
          x:x + ox,
          y:y
        }, {
          x:xm,
          y:ym - oy
        }, {
          x:xm,
          y:ym
        }),
        bottomRight: bezierCurve({
          x:xm,
          y:y
        }, {
          x:xm,
          y:y + oy
        }, {
          x:x + ox,
          y:ym
        }, {
          x:x,
          y:ym
        }),
        bottomLeft: bezierCurve({
          x:xm,
          y:ym
        }, {
          x:xm - ox,
          y:ym
        }, {
          x:x,
          y:y + oy
        }, {
          x:x,
          y:y
        })
      };
    };
  })(4 * ((Math.sqrt(2) - 1) / 3));

  function bezierCurve(start, startControl, endControl, end) {

    var lerp = function (a, b, t) {
      return {
        x:a.x + (b.x - a.x) * t,
        y:a.y + (b.y - a.y) * t
      };
    };

    return {
      start: start,
      startControl: startControl,
      endControl: endControl,
      end: end,
      subdivide: function(t) {
        var ab = lerp(start, startControl, t),
        bc = lerp(startControl, endControl, t),
        cd = lerp(endControl, end, t),
        abbc = lerp(ab, bc, t),
        bccd = lerp(bc, cd, t),
        dest = lerp(abbc, bccd, t);
        return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
      },
      curveTo: function(borderArgs) {
        borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
      },
      curveToReversed: function(borderArgs) {
        borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
      }
    };
  }

  function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
      corner1[0].curveTo(borderArgs);
      corner1[1].curveTo(borderArgs);
    } else {
      borderArgs.push(["line", x, y]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
      borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
    }
  }

  function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
    var borderArgs = [];

    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
      outer1[1].curveTo(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
      borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
      outer2[0].curveTo(borderArgs);
      borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
      inner2[0].curveToReversed(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c2[0], borderData.c2[1]]);
      borderArgs.push([ "line", borderData.c3[0], borderData.c3[1]]);
    }

    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
      inner1[1].curveToReversed(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c4[0], borderData.c4[1]]);
    }

    return borderArgs;
  }

  function calculateCurvePoints(bounds, borderRadius, borders) {

    var x = bounds.left,
    y = bounds.top,
    width = bounds.width,
    height = bounds.height,

    tlh = borderRadius[0][0],
    tlv = borderRadius[0][1],
    trh = borderRadius[1][0],
    trv = borderRadius[1][1],
    brh = borderRadius[2][0],
    brv = borderRadius[2][1],
    blh = borderRadius[3][0],
    blv = borderRadius[3][1],

    topWidth = width - trh,
    rightHeight = height - brv,
    bottomWidth = width - brh,
    leftHeight = height - blv;

    return {
      topLeftOuter: getCurvePoints(
        x,
        y,
        tlh,
        tlv
        ).topLeft.subdivide(0.5),

      topLeftInner: getCurvePoints(
        x + borders[3].width,
        y + borders[0].width,
        Math.max(0, tlh - borders[3].width),
        Math.max(0, tlv - borders[0].width)
        ).topLeft.subdivide(0.5),

      topRightOuter: getCurvePoints(
        x + topWidth,
        y,
        trh,
        trv
        ).topRight.subdivide(0.5),

      topRightInner: getCurvePoints(
        x + Math.min(topWidth, width + borders[3].width),
        y + borders[0].width,
        (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width,
        trv - borders[0].width
        ).topRight.subdivide(0.5),

      bottomRightOuter: getCurvePoints(
        x + bottomWidth,
        y + rightHeight,
        brh,
        brv
        ).bottomRight.subdivide(0.5),

      bottomRightInner: getCurvePoints(
        x + Math.min(bottomWidth, width + borders[3].width),
        y + Math.min(rightHeight, height + borders[0].width),
        Math.max(0, brh - borders[1].width),
        Math.max(0, brv - borders[2].width)
        ).bottomRight.subdivide(0.5),

      bottomLeftOuter: getCurvePoints(
        x,
        y + leftHeight,
        blh,
        blv
        ).bottomLeft.subdivide(0.5),

      bottomLeftInner: getCurvePoints(
        x + borders[3].width,
        y + leftHeight,
        Math.max(0, blh - borders[3].width),
        Math.max(0, blv - borders[2].width)
        ).bottomLeft.subdivide(0.5)
    };
  }

  function getBorderClip(element, borderPoints, borders, radius, bounds) {
    var backgroundClip = getCSS(element, 'backgroundClip'),
    borderArgs = [];

    switch(backgroundClip) {
      case "content-box":
      case "padding-box":
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
        break;

      default:
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
        break;
    }

    return borderArgs;
  }

  function parseBorders(element, bounds, borders){
    var x = bounds.left,
    y = bounds.top,
    width = bounds.width,
    height = bounds.height,
    borderSide,
    bx,
    by,
    bw,
    bh,
    borderArgs,
    // http://www.w3.org/TR/css3-background/#the-border-radius
    borderRadius = getBorderRadiusData(element),
    borderPoints = calculateCurvePoints(bounds, borderRadius, borders),
    borderData = {
      clip: getBorderClip(element, borderPoints, borders, borderRadius, bounds),
      borders: []
    };

    for (borderSide = 0; borderSide < 4; borderSide++) {

      if (borders[borderSide].width > 0) {
        bx = x;
        by = y;
        bw = width;
        bh = height - (borders[2].width);

        switch(borderSide) {
          case 0:
            // top border
            bh = borders[0].width;

            borderArgs = drawSide({
              c1: [bx, by],
              c2: [bx + bw, by],
              c3: [bx + bw - borders[1].width, by + bh],
              c4: [bx + borders[3].width, by + bh]
            }, borderRadius[0], borderRadius[1],
            borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
            break;
          case 1:
            // right border
            bx = x + width - (borders[1].width);
            bw = borders[1].width;

            borderArgs = drawSide({
              c1: [bx + bw, by],
              c2: [bx + bw, by + bh + borders[2].width],
              c3: [bx, by + bh],
              c4: [bx, by + borders[0].width]
            }, borderRadius[1], borderRadius[2],
            borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
            break;
          case 2:
            // bottom border
            by = (by + height) - (borders[2].width);
            bh = borders[2].width;

            borderArgs = drawSide({
              c1: [bx + bw, by + bh],
              c2: [bx, by + bh],
              c3: [bx + borders[3].width, by],
              c4: [bx + bw - borders[3].width, by]
            }, borderRadius[2], borderRadius[3],
            borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
            break;
          case 3:
            // left border
            bw = borders[3].width;

            borderArgs = drawSide({
              c1: [bx, by + bh + borders[2].width],
              c2: [bx, by],
              c3: [bx + bw, by + borders[0].width],
              c4: [bx + bw, by + bh]
            }, borderRadius[3], borderRadius[0],
            borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
            break;
        }

        borderData.borders.push({
          args: borderArgs,
          color: borders[borderSide].color
        });

      }
    }

    return borderData;
  }

  function createShape(ctx, args) {
    var shape = ctx.drawShape();
    args.forEach(function(border, index) {
      shape[(index === 0) ? "moveTo" : border[0] + "To" ].apply(null, border.slice(1));
    });
    return shape;
  }

  function renderBorders(ctx, borderArgs, color) {
    if (color !== "transparent") {
      ctx.setVariable( "fillStyle", color);
      createShape(ctx, borderArgs);
      ctx.fill();
      numDraws+=1;
    }
  }

  function renderFormValue (el, bounds, stack){

    var valueWrap = doc.createElement('valuewrap'),
    cssPropertyArray = ['lineHeight','textAlign','fontFamily','color','fontSize','paddingLeft','paddingTop','width','height','border','borderLeftWidth','borderTopWidth'],
    textValue,
    textNode;

    cssPropertyArray.forEach(function(property) {
      try {
        valueWrap.style[property] = getCSS(el, property);
      } catch(e) {
        // Older IE has issues with "border"
        Util.log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
      }
    });

    valueWrap.style.borderColor = "black";
    valueWrap.style.borderStyle = "solid";
    valueWrap.style.display = "block";
    valueWrap.style.position = "absolute";

    if (/^(submit|reset|button|text|password)$/.test(el.type) || el.nodeName === "SELECT"){
      valueWrap.style.lineHeight = getCSS(el, "height");
    }

    valueWrap.style.top = bounds.top + "px";
    valueWrap.style.left = bounds.left + "px";

    textValue = (el.nodeName === "SELECT") ? (el.options[el.selectedIndex] || 0).text : el.value;
    if(!textValue) {
      textValue = el.placeholder;
    }

    textNode = doc.createTextNode(textValue);

    valueWrap.appendChild(textNode);
    body.appendChild(valueWrap);

    renderText(el, textNode, stack);
    body.removeChild(valueWrap);
  }

  function drawImage (ctx) {
    ctx.drawImage.apply(ctx, Array.prototype.slice.call(arguments, 1));
    numDraws+=1;
  }

  function getPseudoElement(el, which) {
    var elStyle = window.getComputedStyle(el, which);
    if(!elStyle || !elStyle.content || elStyle.content === "none" || elStyle.content === "-moz-alt-content" || elStyle.display === "none") {
      return;
    }
    var content = elStyle.content + '',
    first = content.substr( 0, 1 );
    //strips quotes
    if(first === content.substr( content.length - 1 ) && first.match(/'|"/)) {
      content = content.substr( 1, content.length - 2 );
    }

    var isImage = content.substr( 0, 3 ) === 'url',
    elps = document.createElement( isImage ? 'img' : 'span' );

    elps.className = pseudoHide + "-before " + pseudoHide + "-after";

    Object.keys(elStyle).filter(indexedProperty).forEach(function(prop) {
      // Prevent assigning of read only CSS Rules, ex. length, parentRule
      try {
        elps.style[prop] = elStyle[prop];
      } catch (e) {
        Util.log(['Tried to assign readonly property ', prop, 'Error:', e]);
      }
    });

    if(isImage) {
      elps.src = Util.parseBackgroundImage(content)[0].args[0];
    } else {
      elps.innerHTML = content;
    }
    return elps;
  }

  function indexedProperty(property) {
    return (isNaN(window.parseInt(property, 10)));
  }

  function injectPseudoElements(el, stack) {
    var before = getPseudoElement(el, ':before'),
    after = getPseudoElement(el, ':after');
    if(!before && !after) {
      return;
    }

    if(before) {
      el.className += " " + pseudoHide + "-before";
      el.parentNode.insertBefore(before, el);
      parseElement(before, stack, true);
      el.parentNode.removeChild(before);
      el.className = el.className.replace(pseudoHide + "-before", "").trim();
    }

    if (after) {
      el.className += " " + pseudoHide + "-after";
      el.appendChild(after);
      parseElement(after, stack, true);
      el.removeChild(after);
      el.className = el.className.replace(pseudoHide + "-after", "").trim();
    }

  }

  function renderBackgroundRepeat(ctx, image, backgroundPosition, bounds) {
    var offsetX = Math.round(bounds.left + backgroundPosition.left),
    offsetY = Math.round(bounds.top + backgroundPosition.top);

    ctx.createPattern(image);
    ctx.translate(offsetX, offsetY);
    ctx.fill();
    ctx.translate(-offsetX, -offsetY);
  }

  function backgroundRepeatShape(ctx, image, backgroundPosition, bounds, left, top, width, height) {
    var args = [];
    args.push(["line", Math.round(left), Math.round(top)]);
    args.push(["line", Math.round(left + width), Math.round(top)]);
    args.push(["line", Math.round(left + width), Math.round(height + top)]);
    args.push(["line", Math.round(left), Math.round(height + top)]);
    createShape(ctx, args);
    ctx.save();
    ctx.clip();
    renderBackgroundRepeat(ctx, image, backgroundPosition, bounds);
    ctx.restore();
  }

  function renderBackgroundColor(ctx, backgroundBounds, bgcolor) {
    renderRect(
      ctx,
      backgroundBounds.left,
      backgroundBounds.top,
      backgroundBounds.width,
      backgroundBounds.height,
      bgcolor
      );
  }

  function renderBackgroundRepeating(el, bounds, ctx, image, imageIndex) {
    var backgroundSize = Util.BackgroundSize(el, bounds, image, imageIndex),
    backgroundPosition = Util.BackgroundPosition(el, bounds, image, imageIndex, backgroundSize),
    backgroundRepeat = getCSS(el, "backgroundRepeat").split(",").map(Util.trimText);

    image = resizeImage(image, backgroundSize);

    backgroundRepeat = backgroundRepeat[imageIndex] || backgroundRepeat[0];

    switch (backgroundRepeat) {
      case "repeat-x":
        backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
          bounds.left, bounds.top + backgroundPosition.top, 99999, image.height);
        break;

      case "repeat-y":
        backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
          bounds.left + backgroundPosition.left, bounds.top, image.width, 99999);
        break;

      case "no-repeat":
        backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
          bounds.left + backgroundPosition.left, bounds.top + backgroundPosition.top, image.width, image.height);
        break;

      default:
        renderBackgroundRepeat(ctx, image, backgroundPosition, {
          top: bounds.top,
          left: bounds.left,
          width: image.width,
          height: image.height
        });
        break;
    }
  }

  function renderBackgroundImage(element, bounds, ctx) {
    var backgroundImage = getCSS(element, "backgroundImage"),
    backgroundImages = Util.parseBackgroundImage(backgroundImage),
    image,
    imageIndex = backgroundImages.length;

    while(imageIndex--) {
      backgroundImage = backgroundImages[imageIndex];

      if (!backgroundImage.args || backgroundImage.args.length === 0) {
        continue;
      }

      var key = backgroundImage.method === 'url' ?
      backgroundImage.args[0] :
      backgroundImage.value;

      image = loadImage(key);

      // TODO add support for background-origin
      if (image) {
        renderBackgroundRepeating(element, bounds, ctx, image, imageIndex);
      } else {
        Util.log("html2canvas: Error loading background:", backgroundImage);
      }
    }
  }

  function resizeImage(image, bounds) {
    if(image.width === bounds.width && image.height === bounds.height) {
      return image;
    }

    var ctx, canvas = doc.createElement('canvas');
    canvas.width = bounds.width;
    canvas.height = bounds.height;
    ctx = canvas.getContext("2d");
    drawImage(ctx, image, 0, 0, image.width, image.height, 0, 0, bounds.width, bounds.height );
    return canvas;
  }

  function setOpacity(ctx, element, parentStack) {
    return ctx.setVariable("globalAlpha", getCSS(element, "opacity") * ((parentStack) ? parentStack.opacity : 1));
  }

  function removePx(str) {
    return str.replace("px", "");
  }

  var transformRegExp = /(matrix)\((.+)\)/;

  function getTransform(element, parentStack) {
    var transform = getCSS(element, "transform") || getCSS(element, "-webkit-transform") || getCSS(element, "-moz-transform") || getCSS(element, "-ms-transform") || getCSS(element, "-o-transform");
    var transformOrigin = getCSS(element, "transform-origin") || getCSS(element, "-webkit-transform-origin") || getCSS(element, "-moz-transform-origin") || getCSS(element, "-ms-transform-origin") || getCSS(element, "-o-transform-origin") || "0px 0px";

    transformOrigin = transformOrigin.split(" ").map(removePx).map(Util.asFloat);

    var matrix;
    if (transform && transform !== "none") {
      var match = transform.match(transformRegExp);
      if (match) {
        switch(match[1]) {
          case "matrix":
            matrix = match[2].split(",").map(Util.trimText).map(Util.asFloat);
            break;
        }
      }
    }

    return {
      origin: transformOrigin,
      matrix: matrix
    };
  }

  function createStack(element, parentStack, bounds, transform) {
    var ctx = h2cRenderContext((!parentStack) ? documentWidth() : bounds.width , (!parentStack) ? documentHeight() : bounds.height),
    stack = {
      ctx: ctx,
      opacity: setOpacity(ctx, element, parentStack),
      cssPosition: getCSS(element, "position"),
      borders: getBorderData(element),
      transform: transform,
      clip: (parentStack && parentStack.clip) ? Util.Extend( {}, parentStack.clip ) : null
    };

    setZ(element, stack, parentStack);

    // TODO correct overflow for absolute content residing under a static position
    if (options.useOverflow === true && /(hidden|scroll|auto)/.test(getCSS(element, "overflow")) === true && /(BODY)/i.test(element.nodeName) === false){
      stack.clip = (stack.clip) ? clipBounds(stack.clip, bounds) : bounds;
    }

    return stack;
  }

  function getBackgroundBounds(borders, bounds, clip) {
    var backgroundBounds = {
      left: bounds.left + borders[3].width,
      top: bounds.top + borders[0].width,
      width: bounds.width - (borders[1].width + borders[3].width),
      height: bounds.height - (borders[0].width + borders[2].width)
    };

    if (clip) {
      backgroundBounds = clipBounds(backgroundBounds, clip);
    }

    return backgroundBounds;
  }

  function getBounds(element, transform) {
    var bounds = (transform.matrix) ? Util.OffsetBounds(element) : Util.Bounds(element);
    transform.origin[0] += bounds.left;
    transform.origin[1] += bounds.top;
    return bounds;
  }

  function renderElement(element, parentStack, pseudoElement, ignoreBackground) {
    var transform = getTransform(element, parentStack),
    bounds = getBounds(element, transform),
    image,
    stack = createStack(element, parentStack, bounds, transform),
    borders = stack.borders,
    ctx = stack.ctx,
    backgroundBounds = getBackgroundBounds(borders, bounds, stack.clip),
    borderData = parseBorders(element, bounds, borders),
    backgroundColor = (ignoreElementsRegExp.test(element.nodeName)) ? "#efefef" : getCSS(element, "backgroundColor");


    createShape(ctx, borderData.clip);

    ctx.save();
    ctx.clip();

    if (backgroundBounds.height > 0 && backgroundBounds.width > 0 && !ignoreBackground) {
      renderBackgroundColor(ctx, bounds, backgroundColor);
      renderBackgroundImage(element, backgroundBounds, ctx);
    } else if (ignoreBackground) {
      stack.backgroundColor =  backgroundColor;
    }

    ctx.restore();

    borderData.borders.forEach(function(border) {
      renderBorders(ctx, border.args, border.color);
    });

    if (!pseudoElement) {
      injectPseudoElements(element, stack);
    }

    switch(element.nodeName){
      case "IMG":
        if ((image = loadImage(element.getAttribute('src')))) {
          renderImage(ctx, element, image, bounds, borders);
        } else {
          Util.log("html2canvas: Error loading <img>:" + element.getAttribute('src'));
        }
        break;
      case "INPUT":
        // TODO add all relevant type's, i.e. HTML5 new stuff
        // todo add support for placeholder attribute for browsers which support it
        if (/^(text|url|email|submit|button|reset)$/.test(element.type) && (element.value || element.placeholder || "").length > 0){
          renderFormValue(element, bounds, stack);
        }
        break;
      case "TEXTAREA":
        if ((element.value || element.placeholder || "").length > 0){
          renderFormValue(element, bounds, stack);
        }
        break;
      case "SELECT":
        if ((element.options||element.placeholder || "").length > 0){
          renderFormValue(element, bounds, stack);
        }
        break;
      case "LI":
        renderListItem(element, stack, backgroundBounds);
        break;
      case "CANVAS":
        renderImage(ctx, element, element, bounds, borders);
        break;
    }

    return stack;
  }

  function isElementVisible(element) {
    return (getCSS(element, 'display') !== "none" && getCSS(element, 'visibility') !== "hidden" && !element.hasAttribute("data-html2canvas-ignore"));
  }

  function parseElement (element, stack, pseudoElement) {
    if (isElementVisible(element)) {
      stack = renderElement(element, stack, pseudoElement, false) || stack;
      if (!ignoreElementsRegExp.test(element.nodeName)) {
        parseChildren(element, stack, pseudoElement);
      }
    }
  }

  function parseChildren(element, stack, pseudoElement) {
    Util.Children(element).forEach(function(node) {
      if (node.nodeType === node.ELEMENT_NODE) {
        parseElement(node, stack, pseudoElement);
      } else if (node.nodeType === node.TEXT_NODE) {
        renderText(element, node, stack);
      }
    });
  }

  function init() {
    var background = getCSS(document.documentElement, "backgroundColor"),
      transparentBackground = (Util.isTransparent(background) && element === document.body),
      stack = renderElement(element, null, false, transparentBackground);
    parseChildren(element, stack);

    if (transparentBackground) {
      background = stack.backgroundColor;
    }

    body.removeChild(hidePseudoElements);
    return {
      backgroundColor: background,
      stack: stack
    };
  }

  return init();
};

function h2czContext(zindex) {
  return {
    zindex: zindex,
    children: []
  };
}

_html2canvas.Preload = function( options ) {

  var images = {
    numLoaded: 0,   // also failed are counted here
    numFailed: 0,
    numTotal: 0,
    cleanupDone: false
  },
  pageOrigin,
  Util = _html2canvas.Util,
  methods,
  i,
  count = 0,
  element = options.elements[0] || document.body,
  doc = element.ownerDocument,
  domImages = element.getElementsByTagName('img'), // Fetch images of the present element only
  imgLen = domImages.length,
  link = doc.createElement("a"),
  supportCORS = (function( img ){
    return (img.crossOrigin !== undefined);
  })(new Image()),
  timeoutTimer;

  link.href = window.location.href;
  pageOrigin  = link.protocol + link.host;

  function isSameOrigin(url){
    link.href = url;
    link.href = link.href; // YES, BELIEVE IT OR NOT, that is required for IE9 - http://jsfiddle.net/niklasvh/2e48b/
    var origin = link.protocol + link.host;
    return (origin === pageOrigin);
  }

  function start(){
    Util.log("html2canvas: start: images: " + images.numLoaded + " / " + images.numTotal + " (failed: " + images.numFailed + ")");
    if (!images.firstRun && images.numLoaded >= images.numTotal){
      Util.log("Finished loading images: # " + images.numTotal + " (failed: " + images.numFailed + ")");

      if (typeof options.complete === "function"){
        options.complete(images);
      }

    }
  }

  // TODO modify proxy to serve images with CORS enabled, where available
  function proxyGetImage(url, img, imageObj){
    var callback_name,
    scriptUrl = options.proxy,
    script;

    link.href = url;
    url = link.href; // work around for pages with base href="" set - WARNING: this may change the url

    callback_name = 'html2canvas_' + (count++);
    imageObj.callbackname = callback_name;

    if (scriptUrl.indexOf("?") > -1) {
      scriptUrl += "&";
    } else {
      scriptUrl += "?";
    }
    scriptUrl += 'url=' + encodeURIComponent(url) + '&callback=' + callback_name;
    script = doc.createElement("script");

    window[callback_name] = function(a){
      if (a.substring(0,6) === "error:"){
        imageObj.succeeded = false;
        images.numLoaded++;
        images.numFailed++;
        start();
      } else {
        setImageLoadHandlers(img, imageObj);
        img.src = a;
      }
      window[callback_name] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
      try {
        delete window[callback_name];  // for all browser that support this
      } catch(ex) {}
      script.parentNode.removeChild(script);
      script = null;
      delete imageObj.script;
      delete imageObj.callbackname;
    };

    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", scriptUrl);
    imageObj.script = script;
    window.document.body.appendChild(script);

  }

  function loadPseudoElement(element, type) {
    var style = window.getComputedStyle(element, type),
    content = style.content;
    if (content.substr(0, 3) === 'url') {
      methods.loadImage(_html2canvas.Util.parseBackgroundImage(content)[0].args[0]);
    }
    loadBackgroundImages(style.backgroundImage, element);
  }

  function loadPseudoElementImages(element) {
    loadPseudoElement(element, ":before");
    loadPseudoElement(element, ":after");
  }

  function loadGradientImage(backgroundImage, bounds) {
    var img = _html2canvas.Generate.Gradient(backgroundImage, bounds);

    if (img !== undefined){
      images[backgroundImage] = {
        img: img,
        succeeded: true
      };
      images.numTotal++;
      images.numLoaded++;
      start();
    }
  }

  function invalidBackgrounds(background_image) {
    return (background_image && background_image.method && background_image.args && background_image.args.length > 0 );
  }

  function loadBackgroundImages(background_image, el) {
    var bounds;

    _html2canvas.Util.parseBackgroundImage(background_image).filter(invalidBackgrounds).forEach(function(background_image) {
      if (background_image.method === 'url') {
        methods.loadImage(background_image.args[0]);
      } else if(background_image.method.match(/\-?gradient$/)) {
        if(bounds === undefined) {
          bounds = _html2canvas.Util.Bounds(el);
        }
        loadGradientImage(background_image.value, bounds);
      }
    });
  }

  function getImages (el) {
    var elNodeType = false;

    // Firefox fails with permission denied on pages with iframes
    try {
      Util.Children(el).forEach(getImages);
    }
    catch( e ) {}

    try {
      elNodeType = el.nodeType;
    } catch (ex) {
      elNodeType = false;
      Util.log("html2canvas: failed to access some element's nodeType - Exception: " + ex.message);
    }

    if (elNodeType === 1 || elNodeType === undefined) {
      loadPseudoElementImages(el);
      try {
        loadBackgroundImages(Util.getCSS(el, 'backgroundImage'), el);
      } catch(e) {
        Util.log("html2canvas: failed to get background-image - Exception: " + e.message);
      }
      loadBackgroundImages(el);
    }
  }

  function setImageLoadHandlers(img, imageObj) {
    img.onload = function() {
      if ( imageObj.timer !== undefined ) {
        // CORS succeeded
        window.clearTimeout( imageObj.timer );
      }

      images.numLoaded++;
      imageObj.succeeded = true;
      img.onerror = img.onload = null;
      start();
    };
    img.onerror = function() {
      if (img.crossOrigin === "anonymous") {
        // CORS failed
        window.clearTimeout( imageObj.timer );

        // let's try with proxy instead
        if ( options.proxy ) {
          var src = img.src;
          img = new Image();
          imageObj.img = img;
          img.src = src;

          proxyGetImage( img.src, img, imageObj );
          return;
        }
      }

      images.numLoaded++;
      images.numFailed++;
      imageObj.succeeded = false;
      img.onerror = img.onload = null;
      start();
    };
  }

  methods = {
    loadImage: function( src ) {
      var img, imageObj;
      if ( src && images[src] === undefined ) {
        img = new Image();
        if ( src.match(/data:image\/.*;base64,/i) ) {
          img.src = src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, '');
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          setImageLoadHandlers(img, imageObj);
        } else if ( isSameOrigin( src ) || options.allowTaint ===  true ) {
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          setImageLoadHandlers(img, imageObj);
          img.src = src;
        } else if ( supportCORS && !options.allowTaint && options.useCORS ) {
          // attempt to load with CORS

          img.crossOrigin = "anonymous";
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          setImageLoadHandlers(img, imageObj);
          img.src = src;
        } else if ( options.proxy ) {
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          proxyGetImage( src, img, imageObj );
        }
      }

    },
    cleanupDOM: function(cause) {
      var img, src;
      if (!images.cleanupDone) {
        if (cause && typeof cause === "string") {
          Util.log("html2canvas: Cleanup because: " + cause);
        } else {
          Util.log("html2canvas: Cleanup after timeout: " + options.timeout + " ms.");
        }

        for (src in images) {
          if (images.hasOwnProperty(src)) {
            img = images[src];
            if (typeof img === "object" && img.callbackname && img.succeeded === undefined) {
              // cancel proxy image request
              window[img.callbackname] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
              try {
                delete window[img.callbackname];  // for all browser that support this
              } catch(ex) {}
              if (img.script && img.script.parentNode) {
                img.script.setAttribute("src", "about:blank");  // try to cancel running request
                img.script.parentNode.removeChild(img.script);
              }
              images.numLoaded++;
              images.numFailed++;
              Util.log("html2canvas: Cleaned up failed img: '" + src + "' Steps: " + images.numLoaded + " / " + images.numTotal);
            }
          }
        }

        // cancel any pending requests
        if(window.stop !== undefined) {
          window.stop();
        } else if(document.execCommand !== undefined) {
          document.execCommand("Stop", false);
        }
        if (document.close !== undefined) {
          document.close();
        }
        images.cleanupDone = true;
        if (!(cause && typeof cause === "string")) {
          start();
        }
      }
    },

    renderingDone: function() {
      if (timeoutTimer) {
        window.clearTimeout(timeoutTimer);
      }
    }
  };

  if (options.timeout > 0) {
    timeoutTimer = window.setTimeout(methods.cleanupDOM, options.timeout);
  }

  Util.log('html2canvas: Preload starts: finding background-images');
  images.firstRun = true;

  getImages(element);

  Util.log('html2canvas: Preload: Finding images');
  // load <img> images
  for (i = 0; i < imgLen; i+=1){
    methods.loadImage( domImages[i].getAttribute( "src" ) );
  }

  images.firstRun = false;
  Util.log('html2canvas: Preload: Done.');
  if (images.numTotal === images.numLoaded) {
    start();
  }

  return methods;
};

_html2canvas.Renderer = function(parseQueue, options){

  // http://www.w3.org/TR/CSS21/zindex.html
  function createRenderQueue(parseQueue) {
    var queue = [],
    rootContext;

    rootContext = (function buildStackingContext(rootNode) {
      var rootContext = {};
      function insert(context, node, specialParent) {
        var zi = (node.zIndex.zindex === 'auto') ? 0 : Number(node.zIndex.zindex),
        contextForChildren = context, // the stacking context for children
        isPositioned = node.zIndex.isPositioned,
        isFloated = node.zIndex.isFloated,
        stub = {node: node},
        childrenDest = specialParent; // where children without z-index should be pushed into

        if (node.zIndex.ownStacking) {
          // '!' comes before numbers in sorted array
          contextForChildren = stub.context = { '!': [{node:node, children: []}]};
          childrenDest = undefined;
        } else if (isPositioned || isFloated) {
          childrenDest = stub.children = [];
        }

        if (zi === 0 && specialParent) {
          specialParent.push(stub);
        } else {
          if (!context[zi]) { context[zi] = []; }
          context[zi].push(stub);
        }

        node.zIndex.children.forEach(function(childNode) {
          insert(contextForChildren, childNode, childrenDest);
        });
      }
      insert(rootContext, rootNode);
      return rootContext;
    })(parseQueue);

    function sortZ(context) {
      Object.keys(context).sort().forEach(function(zi) {
        var nonPositioned = [],
        floated = [],
        positioned = [],
        list = [];

        // positioned after static
        context[zi].forEach(function(v) {
          if (v.node.zIndex.isPositioned || v.node.zIndex.opacity < 1) {
            // http://www.w3.org/TR/css3-color/#transparency
            // non-positioned element with opactiy < 1 should be stacked as if it were a positioned element with ‘z-index: 0’ and ‘opacity: 1’.
            positioned.push(v);
          } else if (v.node.zIndex.isFloated) {
            floated.push(v);
          } else {
            nonPositioned.push(v);
          }
        });

        (function walk(arr) {
          arr.forEach(function(v) {
            list.push(v);
            if (v.children) { walk(v.children); }
          });
        })(nonPositioned.concat(floated, positioned));

        list.forEach(function(v) {
          if (v.context) {
            sortZ(v.context);
          } else {
            queue.push(v.node);
          }
        });
      });
    }

    sortZ(rootContext);

    return queue;
  }

  function getRenderer(rendererName) {
    var renderer;

    if (typeof options.renderer === "string" && _html2canvas.Renderer[rendererName] !== undefined) {
      renderer = _html2canvas.Renderer[rendererName](options);
    } else if (typeof rendererName === "function") {
      renderer = rendererName(options);
    } else {
      throw new Error("Unknown renderer");
    }

    if ( typeof renderer !== "function" ) {
      throw new Error("Invalid renderer defined");
    }
    return renderer;
  }

  return getRenderer(options.renderer)(parseQueue, options, document, createRenderQueue(parseQueue.stack), _html2canvas);
};

_html2canvas.Util.Support = function (options, doc) {

  function supportSVGRendering() {
    var img = new Image(),
    canvas = doc.createElement("canvas"),
    ctx = (canvas.getContext === undefined) ? false : canvas.getContext("2d");
    if (ctx === false) {
      return false;
    }
    canvas.width = canvas.height = 10;
    img.src = [
    "data:image/svg+xml,",
    "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>",
    "<foreignObject width='10' height='10'>",
    "<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>",
    "sup",
    "</div>",
    "</foreignObject>",
    "</svg>"
    ].join("");
    try {
      ctx.drawImage(img, 0, 0);
      canvas.toDataURL();
    } catch(e) {
      return false;
    }
    _html2canvas.Util.log('html2canvas: Parse: SVG powered rendering available');
    return true;
  }

  // Test whether we can use ranges to measure bounding boxes
  // Opera doesn't provide valid bounds.height/bottom even though it supports the method.

  function supportRangeBounds() {
    var r, testElement, rangeBounds, rangeHeight, support = false;

    if (doc.createRange) {
      r = doc.createRange();
      if (r.getBoundingClientRect) {
        testElement = doc.createElement('boundtest');
        testElement.style.height = "123px";
        testElement.style.display = "block";
        doc.body.appendChild(testElement);

        r.selectNode(testElement);
        rangeBounds = r.getBoundingClientRect();
        rangeHeight = rangeBounds.height;

        if (rangeHeight === 123) {
          support = true;
        }
        doc.body.removeChild(testElement);
      }
    }

    return support;
  }

  return {
    rangeBounds: supportRangeBounds(),
    svgRendering: options.svgRendering && supportSVGRendering()
  };
};
window.html2canvas = function(elements, opts) {
  elements = (elements.length) ? elements : [elements];
  var queue,
  canvas,
  options = {
    // general
    logging: false,
    elements: elements,
    background: "#fff",

    // preload options
    proxy: null,
    timeout: 0,    // no timeout
    useCORS: false, // try to load images as CORS (where available), before falling back to proxy
    allowTaint: false, // whether to allow images to taint the canvas, won't need proxy if set to true

    // parse options
    svgRendering: false, // use svg powered rendering where available (FF11+)
    ignoreElements: "IFRAME|OBJECT|PARAM",
    useOverflow: true,
    letterRendering: false,
    chinese: false,

    // render options

    width: null,
    height: null,
    taintTest: true, // do a taint test with all images before applying to canvas
    renderer: "Canvas"
  };

  options = _html2canvas.Util.Extend(opts, options);

  _html2canvas.logging = options.logging;
  options.complete = function( images ) {

    if (typeof options.onpreloaded === "function") {
      if ( options.onpreloaded( images ) === false ) {
        return;
      }
    }
    queue = _html2canvas.Parse( images, options );

    if (typeof options.onparsed === "function") {
      if ( options.onparsed( queue ) === false ) {
        return;
      }
    }

    canvas = _html2canvas.Renderer( queue, options );

    if (typeof options.onrendered === "function") {
      options.onrendered( canvas );
    }


  };

  // for pages without images, we still want this to be async, i.e. return methods before executing
  window.setTimeout( function(){
    _html2canvas.Preload( options );
  }, 0 );

  return {
    render: function( queue, opts ) {
      return _html2canvas.Renderer( queue, _html2canvas.Util.Extend(opts, options) );
    },
    parse: function( images, opts ) {
      return _html2canvas.Parse( images, _html2canvas.Util.Extend(opts, options) );
    },
    preload: function( opts ) {
      return _html2canvas.Preload( _html2canvas.Util.Extend(opts, options) );
    },
    log: _html2canvas.Util.log
  };
};

window.html2canvas.log = _html2canvas.Util.log; // for renderers
window.html2canvas.Renderer = {
  Canvas: undefined // We are assuming this will be used
};
_html2canvas.Renderer.Canvas = function(options) {
  options = options || {};

  var doc = document,
  safeImages = [],
  testCanvas = document.createElement("canvas"),
  testctx = testCanvas.getContext("2d"),
  Util = _html2canvas.Util,
  canvas = options.canvas || doc.createElement('canvas');

  function createShape(ctx, args) {
    ctx.beginPath();
    args.forEach(function(arg) {
      ctx[arg.name].apply(ctx, arg['arguments']);
    });
    ctx.closePath();
  }

  function safeImage(item) {
    if (safeImages.indexOf(item['arguments'][0].src ) === -1) {
      testctx.drawImage(item['arguments'][0], 0, 0);
      try {
        testctx.getImageData(0, 0, 1, 1);
      } catch(e) {
        testCanvas = doc.createElement("canvas");
        testctx = testCanvas.getContext("2d");
        return false;
      }
      safeImages.push(item['arguments'][0].src);
    }
    return true;
  }

  function renderItem(ctx, item) {
    switch(item.type){
      case "variable":
        ctx[item.name] = item['arguments'];
        break;
      case "function":
        switch(item.name) {
          case "createPattern":
            if (item['arguments'][0].width > 0 && item['arguments'][0].height > 0) {
              try {
                ctx.fillStyle = ctx.createPattern(item['arguments'][0], "repeat");
              }
              catch(e) {
                Util.log("html2canvas: Renderer: Error creating pattern", e.message);
              }
            }
            break;
          case "drawShape":
            createShape(ctx, item['arguments']);
            break;
          case "drawImage":
            if (item['arguments'][8] > 0 && item['arguments'][7] > 0) {
              if (!options.taintTest || (options.taintTest && safeImage(item))) {
                ctx.drawImage.apply( ctx, item['arguments'] );
              }
            }
            break;
          default:
            ctx[item.name].apply(ctx, item['arguments']);
        }
        break;
    }
  }

  return function(parsedData, options, document, queue, _html2canvas) {
    var ctx = canvas.getContext("2d"),
    newCanvas,
    bounds,
    fstyle,
    zStack = parsedData.stack;

    canvas.width = canvas.style.width =  options.width || zStack.ctx.width;
    canvas.height = canvas.style.height = options.height || zStack.ctx.height;

    fstyle = ctx.fillStyle;
    ctx.fillStyle = (Util.isTransparent(zStack.backgroundColor) && options.background !== undefined) ? options.background : parsedData.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fstyle;

    queue.forEach(function(storageContext) {
      // set common settings for canvas
      ctx.textBaseline = "bottom";
      ctx.save();

      if (storageContext.transform.matrix) {
        ctx.translate(storageContext.transform.origin[0], storageContext.transform.origin[1]);
        ctx.transform.apply(ctx, storageContext.transform.matrix);
        ctx.translate(-storageContext.transform.origin[0], -storageContext.transform.origin[1]);
      }

      if (storageContext.clip){
        ctx.beginPath();
        ctx.rect(storageContext.clip.left, storageContext.clip.top, storageContext.clip.width, storageContext.clip.height);
        ctx.clip();
      }

      if (storageContext.ctx.storage) {
        storageContext.ctx.storage.forEach(function(item) {
          renderItem(ctx, item);
        });
      }

      ctx.restore();
    });

    Util.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj");

    if (options.elements.length === 1) {
      if (typeof options.elements[0] === "object" && options.elements[0].nodeName !== "BODY") {
        // crop image to the bounds of selected (single) element
        bounds = _html2canvas.Util.Bounds(options.elements[0]);
        newCanvas = document.createElement('canvas');
        newCanvas.width = Math.ceil(bounds.width);
        newCanvas.height = Math.ceil(bounds.height);
        ctx = newCanvas.getContext("2d");

        ctx.drawImage(canvas, bounds.left, bounds.top, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
        canvas = null;
        return newCanvas;
      }
    }

    return canvas;
  };
};
})(window,document);
/*

$.Link (part of noUiSlider) - WTFPL */
(function(c){function m(a,c,d){if((a[c]||a[d])&&a[c]===a[d])throw Error("(Link) '"+c+"' can't match '"+d+"'.'");}function r(a){void 0===a&&(a={});if("object"!==typeof a)throw Error("(Format) 'format' option must be an object.");var h={};c(u).each(function(c,n){if(void 0===a[n])h[n]=A[c];else if(typeof a[n]===typeof A[c]){if("decimals"===n&&(0>a[n]||7<a[n]))throw Error("(Format) 'format.decimals' option must be between 0 and 7.");h[n]=a[n]}else throw Error("(Format) 'format."+n+"' must be a "+typeof A[c]+
".");});m(h,"mark","thousand");m(h,"prefix","negative");m(h,"prefix","negativeBefore");this.r=h}function k(a,h){"object"!==typeof a&&c.error("(Link) Initialize with an object.");return new k.prototype.p(a.target||function(){},a.method,a.format||{},h)}var u="decimals mark thousand prefix postfix encoder decoder negative negativeBefore to from".split(" "),A=[2,".","","","",function(a){return a},function(a){return a},"-","",function(a){return a},function(a){return a}];r.prototype.a=function(a){return this.r[a]};
r.prototype.L=function(a){function c(a){return a.split("").reverse().join("")}a=this.a("encoder")(a);var d=this.a("decimals"),n="",k="",m="",r="";0===parseFloat(a.toFixed(d))&&(a="0");0>a&&(n=this.a("negative"),k=this.a("negativeBefore"));a=Math.abs(a).toFixed(d).toString();a=a.split(".");this.a("thousand")?(m=c(a[0]).match(/.{1,3}/g),m=c(m.join(c(this.a("thousand"))))):m=a[0];this.a("mark")&&1<a.length&&(r=this.a("mark")+a[1]);return this.a("to")(k+this.a("prefix")+n+m+r+this.a("postfix"))};r.prototype.w=
function(a){function c(a){return a.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g,"\\$&")}var d;if(null===a||void 0===a)return!1;a=this.a("from")(a);a=a.toString();d=a.replace(RegExp("^"+c(this.a("negativeBefore"))),"");a!==d?(a=d,d="-"):d="";a=a.replace(RegExp("^"+c(this.a("prefix"))),"");this.a("negative")&&(d="",a=a.replace(RegExp("^"+c(this.a("negative"))),"-"));a=a.replace(RegExp(c(this.a("postfix"))+"$"),"").replace(RegExp(c(this.a("thousand")),"g"),"").replace(this.a("mark"),".");a=this.a("decoder")(parseFloat(d+
a));return isNaN(a)?!1:a};k.prototype.K=function(a,h){this.method=h||"html";this.j=c(a.replace("-tooltip-","")||"<div/>")[0]};k.prototype.H=function(a){this.method="val";this.j=document.createElement("input");this.j.name=a;this.j.type="hidden"};k.prototype.G=function(a){function h(a,c){return[c?null:a,c?a:null]}var d=this;this.method="val";this.target=a.on("change",function(a){d.B.val(h(c(a.target).val(),d.t),{link:d,set:!0})})};k.prototype.p=function(a,h,d,k){this.g=d;this.update=!k;if("string"===
typeof a&&0===a.indexOf("-tooltip-"))this.K(a,h);else if("string"===typeof a&&0!==a.indexOf("-"))this.H(a);else if("function"===typeof a)this.target=!1,this.method=a;else{if(a instanceof c||c.zepto&&c.zepto.isZ(a)){if(!h){if(a.is("input, select, textarea")){this.G(a);return}h="html"}if("function"===typeof h||"string"===typeof h&&a[h]){this.method=h;this.target=a;return}}throw new RangeError("(Link) Invalid Link.");}};k.prototype.write=function(a,c,d,k){if(!this.update||!1!==k)if(this.u=a,this.F=a=
this.format(a),"function"===typeof this.method)this.method.call(this.target[0]||d[0],a,c,d);else this.target[this.method](a,c,d)};k.prototype.q=function(a){this.g=new r(c.extend({},a,this.g instanceof r?this.g.r:this.g))};k.prototype.J=function(a){this.B=a};k.prototype.I=function(a){this.t=a};k.prototype.format=function(a){return this.g.L(a)};k.prototype.A=function(a){return this.g.w(a)};k.prototype.p.prototype=k.prototype;c.Link=k})(window.jQuery||window.Zepto);/*

$.fn.noUiSlider - WTFPL - refreshless.com/nouislider/ */
(function(c){function m(e){return"number"===typeof e&&!isNaN(e)&&isFinite(e)}function r(e){return c.isArray(e)?e:[e]}function k(e,b){e.addClass(b);setTimeout(function(){e.removeClass(b)},300)}function u(e,b){return 100*b/(e[1]-e[0])}function A(e,b){if(b>=e.d.slice(-1)[0])return 100;for(var a=1,c,f,d;b>=e.d[a];)a++;c=e.d[a-1];f=e.d[a];d=e.c[a-1];c=[c,f];return d+u(c,0>c[0]?b+Math.abs(c[0]):b-c[0])/(100/(e.c[a]-d))}function a(e,b){if(100<=b)return e.d.slice(-1)[0];for(var a=1,c,f,d;b>=e.c[a];)a++;c=
e.d[a-1];f=e.d[a];d=e.c[a-1];c=[c,f];return 100/(e.c[a]-d)*(b-d)*(c[1]-c[0])/100+c[0]}function h(a,b){for(var c=1,g;(a.dir?100-b:b)>=a.c[c];)c++;if(a.m)return g=a.c[c-1],c=a.c[c],b-g>(c-g)/2?c:g;a.h[c-1]?(g=a.h[c-1],c=a.c[c-1]+Math.round((b-a.c[c-1])/g)*g):c=b;return c}function d(a,b){if(!m(b))throw Error("noUiSlider: 'step' is not numeric.");a.h[0]=b}function n(a,b){if("object"!==typeof b||c.isArray(b))throw Error("noUiSlider: 'range' is not an object.");if(void 0===b.min||void 0===b.max)throw Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
c.each(b,function(b,g){var d;"number"===typeof g&&(g=[g]);if(!c.isArray(g))throw Error("noUiSlider: 'range' contains invalid value.");d="min"===b?0:"max"===b?100:parseFloat(b);if(!m(d)||!m(g[0]))throw Error("noUiSlider: 'range' value isn't numeric.");a.c.push(d);a.d.push(g[0]);d?a.h.push(isNaN(g[1])?!1:g[1]):isNaN(g[1])||(a.h[0]=g[1])});c.each(a.h,function(b,c){if(!c)return!0;a.h[b]=u([a.d[b],a.d[b+1]],c)/(100/(a.c[b+1]-a.c[b]))})}function E(a,b){"number"===typeof b&&(b=[b]);if(!c.isArray(b)||!b.length||
2<b.length)throw Error("noUiSlider: 'start' option is incorrect.");a.b=b.length;a.start=b}function I(a,b){a.m=b;if("boolean"!==typeof b)throw Error("noUiSlider: 'snap' option must be a boolean.");}function J(a,b){if("lower"===b&&1===a.b)a.i=1;else if("upper"===b&&1===a.b)a.i=2;else if(!0===b&&2===a.b)a.i=3;else if(!1===b)a.i=0;else throw Error("noUiSlider: 'connect' option doesn't match handle count.");}function D(a,b){switch(b){case "horizontal":a.k=0;break;case "vertical":a.k=1;break;default:throw Error("noUiSlider: 'orientation' option is invalid.");
}}function K(a,b){if(2<a.c.length)throw Error("noUiSlider: 'margin' option is only supported on linear sliders.");a.margin=u(a.d,b);if(!m(b))throw Error("noUiSlider: 'margin' option must be numeric.");}function L(a,b){switch(b){case "ltr":a.dir=0;break;case "rtl":a.dir=1;a.i=[0,2,1,3][a.i];break;default:throw Error("noUiSlider: 'direction' option was not recognized.");}}function M(a,b){if("string"!==typeof b)throw Error("noUiSlider: 'behaviour' must be a string containing options.");var c=0<=b.indexOf("snap");
a.n={s:0<=b.indexOf("tap")||c,extend:0<=b.indexOf("extend"),v:0<=b.indexOf("drag"),fixed:0<=b.indexOf("fixed"),m:c}}function N(a,b,d){a.o=[b.lower,b.upper];a.g=b.format;c.each(a.o,function(a,e){if(!c.isArray(e))throw Error("noUiSlider: 'serialization."+(a?"upper":"lower")+"' must be an array.");c.each(e,function(){if(!(this instanceof c.Link))throw Error("noUiSlider: 'serialization."+(a?"upper":"lower")+"' can only contain Link instances.");this.I(a);this.J(d);this.q(b.format)})});a.dir&&1<a.b&&a.o.reverse()}
function O(a,b){var f={c:[],d:[],h:[!1],margin:0},g;g={step:{e:!1,f:d},start:{e:!0,f:E},connect:{e:!0,f:J},direction:{e:!0,f:L},range:{e:!0,f:n},snap:{e:!1,f:I},orientation:{e:!1,f:D},margin:{e:!1,f:K},behaviour:{e:!0,f:M},serialization:{e:!0,f:N}};a=c.extend({connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"},a);a.serialization=c.extend({lower:[],upper:[],format:{}},a.serialization);c.each(g,function(c,d){if(void 0===a[c]){if(d.e)throw Error("noUiSlider: '"+c+"' is required.");
return!0}d.f(f,a[c],b)});f.style=f.k?"top":"left";return f}function P(a,b){var d=c("<div><div/></div>").addClass(f[2]),g=["-lower","-upper"];a.dir&&g.reverse();d.children().addClass(f[3]+" "+f[3]+g[b]);return d}function Q(a,b){b.j&&(b=new c.Link({target:c(b.j).clone().appendTo(a),method:b.method,format:b.g},!0));return b}function R(a,b){var d,f=[];for(d=0;d<a.b;d++){var k=f,h=d,m=a.o[d],n=b[d].children(),r=a.g,s=void 0,v=[],s=new c.Link({},!0);s.q(r);v.push(s);for(s=0;s<m.length;s++)v.push(Q(n,m[s]));
k[h]=v}return f}function S(a,b,c){switch(a){case 1:b.addClass(f[7]);c[0].addClass(f[6]);break;case 3:c[1].addClass(f[6]);case 2:c[0].addClass(f[7]);case 0:b.addClass(f[6])}}function T(a,b){var c,d=[];for(c=0;c<a.b;c++)d.push(P(a,c).appendTo(b));return d}function U(a,b){b.addClass([f[0],f[8+a.dir],f[4+a.k]].join(" "));return c("<div/>").appendTo(b).addClass(f[1])}function V(d,b,m){function g(){return t[["width","height"][b.k]]()}function n(a){var b,c=[q.val()];for(b=0;b<a.length;b++)q.trigger(a[b],
c)}function u(d,p,e){var g=d[0]!==l[0][0]?1:0,H=x[0]+b.margin,k=x[1]-b.margin;e&&1<l.length&&(p=g?Math.max(p,H):Math.min(p,k));100>p&&(p=h(b,p));p=Math.max(Math.min(parseFloat(p.toFixed(7)),100),0);if(p===x[g])return 1===l.length?!1:p===H||p===k?0:!1;d.css(b.style,p+"%");d.is(":first-child")&&d.toggleClass(f[17],50<p);x[g]=p;b.dir&&(p=100-p);c(y[g]).each(function(){this.write(a(b,p),d.children(),q)});return!0}function B(a,b,c){c||k(q,f[14]);u(a,b,!1);n(["slide","set","change"])}function w(a,c,d,e){a=
a.replace(/\s/g,".nui ")+".nui";c.on(a,function(a){var c=q.attr("disabled");if(q.hasClass(f[14])||void 0!==c&&null!==c)return!1;a.preventDefault();var c=0===a.type.indexOf("touch"),p=0===a.type.indexOf("mouse"),F=0===a.type.indexOf("pointer"),g,k,l=a;0===a.type.indexOf("MSPointer")&&(F=!0);a.originalEvent&&(a=a.originalEvent);c&&(g=a.changedTouches[0].pageX,k=a.changedTouches[0].pageY);if(p||F)F||void 0!==window.pageXOffset||(window.pageXOffset=document.documentElement.scrollLeft,window.pageYOffset=
document.documentElement.scrollTop),g=a.clientX+window.pageXOffset,k=a.clientY+window.pageYOffset;l.C=[g,k];l.cursor=p;a=l;a.l=a.C[b.k];d(a,e)})}function C(a,c){var b=c.b||l,d,e=!1,e=100*(a.l-c.start)/g(),f=b[0][0]!==l[0][0]?1:0;var k=c.D;d=e+k[0];e+=k[1];1<b.length?(0>d&&(e+=Math.abs(d)),100<e&&(d-=e-100),d=[Math.max(Math.min(d,100),0),Math.max(Math.min(e,100),0)]):d=[d,e];e=u(b[0],d[f],1===b.length);1<b.length&&(e=u(b[1],d[f?0:1],!1)||e);e&&n(["slide"])}function s(a){c("."+f[15]).removeClass(f[15]);
a.cursor&&c("body").css("cursor","").off(".nui");G.off(".nui");q.removeClass(f[12]);n(["set","change"])}function v(a,b){1===b.b.length&&b.b[0].children().addClass(f[15]);a.stopPropagation();w(z.move,G,C,{start:a.l,b:b.b,D:[x[0],x[l.length-1]]});w(z.end,G,s,null);a.cursor&&(c("body").css("cursor",c(a.target).css("cursor")),1<l.length&&q.addClass(f[12]),c("body").on("selectstart.nui",!1))}function D(a){var d=a.l,e=0;a.stopPropagation();c.each(l,function(){e+=this.offset()[b.style]});e=d<e/2||1===l.length?
0:1;d-=t.offset()[b.style];d=100*d/g();B(l[e],d,b.n.m);b.n.m&&v(a,{b:[l[e]]})}function E(a){var c=(a=a.l<t.offset()[b.style])?0:100;a=a?0:l.length-1;B(l[a],c,!1)}var q=c(d),x=[-1,-1],t,y,l;if(q.hasClass(f[0]))throw Error("Slider was already initialized.");t=U(b,q);l=T(b,t);y=R(b,l);S(b.i,q,l);(function(a){var b;if(!a.fixed)for(b=0;b<l.length;b++)w(z.start,l[b].children(),v,{b:[l[b]]});a.s&&w(z.start,t,D,{b:l});a.extend&&(q.addClass(f[16]),a.s&&w(z.start,q,E,{b:l}));a.v&&(b=t.find("."+f[7]).addClass(f[10]),
a.fixed&&(b=b.add(t.children().not(b).children())),w(z.start,b,v,{b:l}))})(b.n);d.vSet=function(){var a=Array.prototype.slice.call(arguments,0),d,e,g,h,m,s,t=r(a[0]);"object"===typeof a[1]?(d=a[1].set,e=a[1].link,g=a[1].update,h=a[1].animate):!0===a[1]&&(d=!0);b.dir&&1<b.b&&t.reverse();h&&k(q,f[14]);a=1<l.length?3:1;1===t.length&&(a=1);for(m=0;m<a;m++)h=e||y[m%2][0],h=h.A(t[m%2]),!1!==h&&(h=A(b,h),b.dir&&(h=100-h),!0!==u(l[m%2],h,!0)&&c(y[m%2]).each(function(a){if(!a)return s=this.u,!0;this.write(s,
l[m%2].children(),q,g)}));!0===d&&n(["set"]);return this};d.vGet=function(){var a,c=[];for(a=0;a<b.b;a++)c[a]=y[a][0].F;return 1===c.length?c[0]:b.dir?c.reverse():c};d.destroy=function(){c.each(y,function(){c.each(this,function(){this.target&&this.target.off(".nui")})});c(this).off(".nui").removeClass(f.join(" ")).empty();return m};q.val(b.start)}function W(a){if(!this.length)throw Error("noUiSlider: Can't initialize slider on empty selection.");var b=O(a,this);return this.each(function(){V(this,
b,a)})}function X(a){return this.each(function(){var b=c(this).val(),d=this.destroy(),f=c.extend({},d,a);c(this).noUiSlider(f);d.start===f.start&&c(this).val(b)})}function B(){return this[0][arguments.length?"vSet":"vGet"].apply(this[0],arguments)}var G=c(document),C=c.fn.val,z=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",
end:"mouseup touchend"},f="noUi-target noUi-base noUi-origin noUi-handle noUi-horizontal noUi-vertical noUi-background noUi-connect noUi-ltr noUi-rtl noUi-dragable  noUi-state-drag  noUi-state-tap noUi-active noUi-extended noUi-stacking".split(" ");c.fn.val=function(){var a=arguments,b=c(this[0]);return arguments.length?this.each(function(){(c(this).hasClass(f[0])?B:C).apply(c(this),a)}):(b.hasClass(f[0])?B:C).call(b)};c.noUiSlider={Link:c.Link};c.fn.noUiSlider=function(a,b){return(b?X:W).call(this,
a)}})(window.jQuery||window.Zepto);

/* Copyright © 2011-2013 by Neil Jenkins. MIT Licensed. */

( function ( doc, undefined ) {

"use strict";
/*jshint strict:false, undef:false, unused:false */

var DOCUMENT_POSITION_PRECEDING = 2; // Node.DOCUMENT_POSITION_PRECEDING
var ELEMENT_NODE = 1;                // Node.ELEMENT_NODE;
var TEXT_NODE = 3;                   // Node.TEXT_NODE;
var SHOW_ELEMENT = 1;                // NodeFilter.SHOW_ELEMENT;
var SHOW_TEXT = 4;                   // NodeFilter.SHOW_TEXT;

var START_TO_START = 0; // Range.START_TO_START
var START_TO_END = 1;   // Range.START_TO_END
var END_TO_END = 2;     // Range.END_TO_END
var END_TO_START = 3;   // Range.END_TO_START

var win = doc.defaultView;

var ua = navigator.userAgent;

var isIOS = /iP(?:ad|hone|od)/.test( ua );
var isMac = /Mac OS X/.test( ua );

var isGecko = /Gecko\//.test( ua );
var isIE8or9or10 = /Trident\/[456]\./.test( ua );
var isIE8 = ( win.ie === 8 );
var isPresto = !!win.opera;
var isWebKit = /WebKit\//.test( ua );

var ctrlKey = isMac ? 'meta-' : 'ctrl-';

var useTextFixer = isIE8or9or10 || isPresto;
var cantFocusEmptyTextNodes = isIE8or9or10 || isWebKit;
var losesSelectionOnBlur = isIE8or9or10;
var hasBuggySplit = function ( doc ) {
    var div = doc.createElement( 'DIV' ),
        text = doc.createTextNode( '12' );
    div.appendChild( text );
    text.splitText( 2 );
    return div.childNodes.length !== 2;
};

// Use [^ \t\r\n] instead of \S so that nbsp does not count as white-space
var notWS = /[^ \t\r\n]/;

var indexOf = Array.prototype.indexOf;
/*jshint strict:false */

/*
    Native TreeWalker is buggy in IE and Opera:
    * IE9/10 sometimes throw errors when calling TreeWalker#nextNode or
      TreeWalker#previousNode. No way to feature detect this.
    * Some versions of Opera have a bug in TreeWalker#previousNode which makes
      it skip to the wrong node.

    Rather than risk further bugs, it's easiest just to implement our own
    (subset) of the spec in all browsers.
*/

var typeToBitArray = {
    // ELEMENT_NODE
    1: 1,
    // ATTRIBUTE_NODE
    2: 2,
    // TEXT_NODE
    3: 4,
    // COMMENT_NODE
    8: 128,
    // DOCUMENT_NODE
    9: 256,
    // DOCUMENT_FRAGMENT_NODE
    11: 1024
};

function TreeWalker ( root, nodeType, filter ) {
    this.root = this.currentNode = root;
    this.nodeType = nodeType;
    this.filter = filter;
}

TreeWalker.prototype.nextNode = function () {
    var current = this.currentNode,
        root = this.root,
        nodeType = this.nodeType,
        filter = this.filter,
        node;
    while ( true ) {
        node = current.firstChild;
        while ( !node && current ) {
            if ( current === root ) {
                break;
            }
            node = current.nextSibling;
            if ( !node ) { current = current.parentNode; }
        }
        if ( !node ) {
            return null;
        }
        if ( ( typeToBitArray[ node.nodeType ] & nodeType ) &&
                filter( node ) ) {
            this.currentNode = node;
            return node;
        }
        current = node;
    }
};

TreeWalker.prototype.previousNode = function () {
    var current = this.currentNode,
        root = this.root,
        nodeType = this.nodeType,
        filter = this.filter,
        node;
    while ( true ) {
        if ( current === root ) {
            return null;
        }
        node = current.previousSibling;
        if ( node ) {
            while ( current = node.lastChild ) {
                node = current;
            }
        } else {
            node = current.parentNode;
        }
        if ( !node ) {
            return null;
        }
        if ( ( typeToBitArray[ node.nodeType ] & nodeType ) &&
                filter( node ) ) {
            this.currentNode = node;
            return node;
        }
        current = node;
    }
};
/*jshint strict:false, undef:false, unused:false */

var inlineNodeNames  = /^(?:#text|A(?:BBR|CRONYM)?|B(?:R|D[IO])?|C(?:ITE|ODE)|D(?:ATA|FN|EL)|EM|FONT|HR|I(?:NPUT|MG|NS)?|KBD|Q|R(?:P|T|UBY)|S(?:U[BP]|PAN|TR(?:IKE|ONG)|MALL|AMP)?|U|VAR|WBR)$/;

var leafNodeNames = {
    BR: 1,
    IMG: 1,
    INPUT: 1
};

function every ( nodeList, fn ) {
    var l = nodeList.length;
    while ( l-- ) {
        if ( !fn( nodeList[l] ) ) {
            return false;
        }
    }
    return true;
}

// ---

function hasTagAttributes ( node, tag, attributes ) {
    if ( node.nodeName !== tag ) {
        return false;
    }
    for ( var attr in attributes ) {
        if ( node.getAttribute( attr ) !== attributes[ attr ] ) {
            return false;
        }
    }
    return true;
}
function areAlike ( node, node2 ) {
    return (
        node.nodeType === node2.nodeType &&
        node.nodeName === node2.nodeName &&
        node.className === node2.className &&
        ( ( !node.style && !node2.style ) ||
          node.style.cssText === node2.style.cssText )
    );
}

function isLeaf ( node ) {
    return node.nodeType === ELEMENT_NODE &&
        !!leafNodeNames[ node.nodeName ];
}
function isInline ( node ) {
    return inlineNodeNames.test( node.nodeName );
}
function isBlock ( node ) {
    return node.nodeType === ELEMENT_NODE &&
        !isInline( node ) && every( node.childNodes, isInline );
}
function isContainer ( node ) {
    return node.nodeType === ELEMENT_NODE &&
        !isInline( node ) && !isBlock( node );
}

function getBlockWalker ( node ) {
    var doc = node.ownerDocument,
        walker = new TreeWalker(
            doc.body, SHOW_ELEMENT, isBlock, false );
    walker.currentNode = node;
    return walker;
}

function getPreviousBlock ( node ) {
    return getBlockWalker( node ).previousNode();
}
function getNextBlock ( node ) {
    return getBlockWalker( node ).nextNode();
}
function getNearest ( node, tag, attributes ) {
    do {
        if ( hasTagAttributes( node, tag, attributes ) ) {
            return node;
        }
    } while ( node = node.parentNode );
    return null;
}

function getPath ( node ) {
    var parent = node.parentNode,
        path, id, className, classNames;
    if ( !parent || node.nodeType !== ELEMENT_NODE ) {
        path = parent ? getPath( parent ) : '';
    } else {
        path = getPath( parent );
        path += ( path ? '>' : '' ) + node.nodeName;
        if ( id = node.id ) {
            path += '#' + id;
        }
        if ( className = node.className.trim() ) {
            classNames = className.split( /\s\s*/ );
            classNames.sort();
            path += '.';
            path += classNames.join( '.' );
        }
    }
    return path;
}

function getLength ( node ) {
    var nodeType = node.nodeType;
    return nodeType === ELEMENT_NODE ?
        node.childNodes.length : node.length || 0;
}

function detach ( node ) {
    var parent = node.parentNode;
    if ( parent ) {
        parent.removeChild( node );
    }
    return node;
}
function replaceWith ( node, node2 ) {
    var parent = node.parentNode;
    if ( parent ) {
        parent.replaceChild( node2, node );
    }
}
function empty ( node ) {
    var frag = node.ownerDocument.createDocumentFragment(),
        childNodes = node.childNodes,
        l = childNodes ? childNodes.length : 0;
    while ( l-- ) {
        frag.appendChild( node.firstChild );
    }
    return frag;
}

function createElement ( doc, tag, props, children ) {
    var el = doc.createElement( tag ),
        attr, value, i, l;
    if ( props instanceof Array ) {
        children = props;
        props = null;
    }
    if ( props ) {
        for ( attr in props ) {
            value = props[ attr ];
            if ( value !== undefined ) {
                el.setAttribute( attr, props[ attr ] );
            }
        }
    }
    if ( children ) {
        for ( i = 0, l = children.length; i < l; i += 1 ) {
            el.appendChild( children[i] );
        }
    }
    return el;
}

function fixCursor ( node ) {
    // In Webkit and Gecko, block level elements are collapsed and
    // unfocussable if they have no content. To remedy this, a <BR> must be
    // inserted. In Opera and IE, we just need a textnode in order for the
    // cursor to appear.
    var doc = node.ownerDocument,
        root = node,
        fixer, child,
        l, instance;

    if ( node.nodeName === 'BODY' ) {
        if ( !( child = node.firstChild ) || child.nodeName === 'BR' ) {
            fixer = doc.createElement( 'DIV' );
            if ( child ) {
                node.replaceChild( fixer, child );
            }
            else {
                node.appendChild( fixer );
            }
            node = fixer;
            fixer = null;
        }
    }

    if ( isInline( node ) ) {
        child = node.firstChild;
        while ( cantFocusEmptyTextNodes && child &&
                child.nodeType === TEXT_NODE && !child.data ) {
            node.removeChild( child );
            child = node.firstChild;
        }
        if ( !child ) {
            if ( cantFocusEmptyTextNodes ) {
                fixer = doc.createTextNode( '\u200B' );
                // Find the relevant Squire instance and notify
                l = instances.length;
                while ( l-- ) {
                    instance = instances[l];
                    if ( instance._doc === doc ) {
                        instance._didAddZWS();
                    }
                }
            } else {
                fixer = doc.createTextNode( '' );
            }
        }
    } else {
        if ( useTextFixer ) {
            while ( node.nodeType !== TEXT_NODE && !isLeaf( node ) ) {
                child = node.firstChild;
                if ( !child ) {
                    fixer = doc.createTextNode( '' );
                    break;
                }
                node = child;
            }
            if ( node.nodeType === TEXT_NODE ) {
                // Opera will collapse the block element if it contains
                // just spaces (but not if it contains no data at all).
                if ( /^ +$/.test( node.data ) ) {
                    node.data = '';
                }
            } else if ( isLeaf( node ) ) {
                node.parentNode.insertBefore( doc.createTextNode( '' ), node );
            }
        }
        else if ( !node.querySelector( 'BR' ) ) {
            fixer = doc.createElement( 'BR' );
            while ( ( child = node.lastElementChild ) && !isInline( child ) ) {
                node = child;
            }
        }
    }
    if ( fixer ) {
        node.appendChild( fixer );
    }

    return root;
}

// Recursively examine container nodes and wrap any inline children.
function fixContainer ( container ) {
    var children = container.childNodes,
        doc = container.ownerDocument,
        wrapper = null,
        i, l, child, isBR;
    for ( i = 0, l = children.length; i < l; i += 1 ) {
        child = children[i];
        isBR = child.nodeName === 'BR';
        if ( !isBR && isInline( child ) ) {
            if ( !wrapper ) { wrapper = createElement( doc, 'DIV' ); }
            wrapper.appendChild( child );
            i -= 1;
            l -= 1;
        } else if ( isBR || wrapper ) {
            if ( !wrapper ) { wrapper = createElement( doc, 'DIV' ); }
            fixCursor( wrapper );
            if ( isBR ) {
                container.replaceChild( wrapper, child );
            } else {
                container.insertBefore( wrapper, child );
                i += 1;
                l += 1;
            }
            wrapper = null;
        }
        if ( isContainer( child ) ) {
            fixContainer( child );
        }
    }
    if ( wrapper ) {
        container.appendChild( fixCursor( wrapper ) );
    }
    return container;
}

function split ( node, offset, stopNode ) {
    var nodeType = node.nodeType,
        parent, clone, next;
    if ( nodeType === TEXT_NODE && node !== stopNode ) {
        return split( node.parentNode, node.splitText( offset ), stopNode );
    }
    if ( nodeType === ELEMENT_NODE ) {
        if ( typeof( offset ) === 'number' ) {
            offset = offset < node.childNodes.length ?
                node.childNodes[ offset ] : null;
        }
        if ( node === stopNode ) {
            return offset;
        }

        // Clone node without children
        parent = node.parentNode;
        clone = node.cloneNode( false );

        // Add right-hand siblings to the clone
        while ( offset ) {
            next = offset.nextSibling;
            clone.appendChild( offset );
            offset = next;
        }

        // DO NOT NORMALISE. This may undo the fixCursor() call
        // of a node lower down the tree!

        // We need something in the element in order for the cursor to appear.
        fixCursor( node );
        fixCursor( clone );

        // Inject clone after original node
        if ( next = node.nextSibling ) {
            parent.insertBefore( clone, next );
        } else {
            parent.appendChild( clone );
        }

        // Keep on splitting up the tree
        return split( parent, clone, stopNode );
    }
    return offset;
}

function mergeInlines ( node, range ) {
    if ( node.nodeType !== ELEMENT_NODE ) {
        return;
    }
    var children = node.childNodes,
        l = children.length,
        frags = [],
        child, prev, len;
    while ( l-- ) {
        child = children[l];
        prev = l && children[ l - 1 ];
        if ( l && isInline( child ) && areAlike( child, prev ) &&
                !leafNodeNames[ child.nodeName ] ) {
            if ( range.startContainer === child ) {
                range.startContainer = prev;
                range.startOffset += getLength( prev );
            }
            if ( range.endContainer === child ) {
                range.endContainer = prev;
                range.endOffset += getLength( prev );
            }
            if ( range.startContainer === node ) {
                if ( range.startOffset > l ) {
                    range.startOffset -= 1;
                }
                else if ( range.startOffset === l ) {
                    range.startContainer = prev;
                    range.startOffset = getLength( prev );
                }
            }
            if ( range.endContainer === node ) {
                if ( range.endOffset > l ) {
                    range.endOffset -= 1;
                }
                else if ( range.endOffset === l ) {
                    range.endContainer = prev;
                    range.endOffset = getLength( prev );
                }
            }
            detach( child );
            if ( child.nodeType === TEXT_NODE ) {
                prev.appendData( child.data );
            }
            else {
                frags.push( empty( child ) );
            }
        }
        else if ( child.nodeType === ELEMENT_NODE ) {
            len = frags.length;
            while ( len-- ) {
                child.appendChild( frags.pop() );
            }
            mergeInlines( child, range );
        }
    }
}

function mergeWithBlock ( block, next, range ) {
    var container = next,
        last, offset, _range;
    while ( container.parentNode.childNodes.length === 1 ) {
        container = container.parentNode;
    }
    detach( container );

    offset = block.childNodes.length;

    // Remove extra <BR> fixer if present.
    last = block.lastChild;
    if ( last && last.nodeName === 'BR' ) {
        block.removeChild( last );
        offset -= 1;
    }

    _range = {
        startContainer: block,
        startOffset: offset,
        endContainer: block,
        endOffset: offset
    };

    block.appendChild( empty( next ) );
    mergeInlines( block, _range );

    range.setStart( _range.startContainer, _range.startOffset );
    range.collapse( true );

    // Opera inserts a BR if you delete the last piece of text
    // in a block-level element. Unfortunately, it then gets
    // confused when setting the selection subsequently and
    // refuses to accept the range that finishes just before the
    // BR. Removing the BR fixes the bug.
    // Steps to reproduce bug: Type "a-b-c" (where - is return)
    // then backspace twice. The cursor goes to the top instead
    // of after "b".
    if ( isPresto && ( last = block.lastChild ) && last.nodeName === 'BR' ) {
        block.removeChild( last );
    }
}

function mergeContainers ( node ) {
    var prev = node.previousSibling,
        first = node.firstChild,
        doc = node.ownerDocument,
        isListItem = ( node.nodeName === 'LI' ),
        needsFix, block;

    // Do not merge LIs, unless it only contains a UL
    if ( isListItem && ( !first || !/^[OU]L$/.test( first.nodeName ) ) ) {
        return;
    }

    if ( prev && areAlike( prev, node ) ) {
        if ( !isContainer( prev ) ) {
            if ( isListItem ) {
                block = doc.createElement( 'DIV' );
                block.appendChild( empty( prev ) );
                prev.appendChild( block );
            } else {
                return;
            }
        }
        detach( node );
        needsFix = !isContainer( node );
        prev.appendChild( empty( node ) );
        if ( needsFix ) {
            fixContainer( prev );
        }
        if ( first ) {
            mergeContainers( first );
        }
    } else if ( isListItem ) {
        prev = doc.createElement( 'DIV' );
        node.insertBefore( prev, first );
        fixCursor( prev );
    }
}
/*jshint strict:false, undef:false, unused:false */

var getNodeBefore = function ( node, offset ) {
    var children = node.childNodes;
    while ( offset && node.nodeType === ELEMENT_NODE ) {
        node = children[ offset - 1 ];
        children = node.childNodes;
        offset = children.length;
    }
    return node;
};

var getNodeAfter = function ( node, offset ) {
    if ( node.nodeType === ELEMENT_NODE ) {
        var children = node.childNodes;
        if ( offset < children.length ) {
            node = children[ offset ];
        } else {
            while ( node && !node.nextSibling ) {
                node = node.parentNode;
            }
            if ( node ) { node = node.nextSibling; }
        }
    }
    return node;
};

// ---

var forEachTextNodeInRange = function ( range, fn ) {
    range = range.cloneRange();
    moveRangeBoundariesDownTree( range );

    var startContainer = range.startContainer,
        endContainer = range.endContainer,
        root = range.commonAncestorContainer,
        walker = new TreeWalker(
            root, SHOW_TEXT, function (/* node */) {
                return true;
        }, false ),
        textnode = walker.currentNode = startContainer;

    while ( !fn( textnode, range ) &&
        textnode !== endContainer &&
        ( textnode = walker.nextNode() ) ) {}
};

var getTextContentInRange = function ( range ) {
    var textContent = '';
    forEachTextNodeInRange( range, function ( textnode, range ) {
        var value = textnode.data;
        if ( value && ( /\S/.test( value ) ) ) {
            if ( textnode === range.endContainer ) {
                value = value.slice( 0, range.endOffset );
            }
            if ( textnode === range.startContainer ) {
                value = value.slice( range.startOffset );
            }
            textContent += value;
        }
    });
    return textContent;
};

// ---

var insertNodeInRange = function ( range, node ) {
    // Insert at start.
    var startContainer = range.startContainer,
        startOffset = range.startOffset,
        endContainer = range.endContainer,
        endOffset = range.endOffset,
        parent, children, childCount, afterSplit;

    // If part way through a text node, split it.
    if ( startContainer.nodeType === TEXT_NODE ) {
        parent = startContainer.parentNode;
        children = parent.childNodes;
        if ( startOffset === startContainer.length ) {
            startOffset = indexOf.call( children, startContainer ) + 1;
            if ( range.collapsed ) {
                endContainer = parent;
                endOffset = startOffset;
            }
        } else {
            if ( startOffset ) {
                afterSplit = startContainer.splitText( startOffset );
                if ( endContainer === startContainer ) {
                    endOffset -= startOffset;
                    endContainer = afterSplit;
                }
                else if ( endContainer === parent ) {
                    endOffset += 1;
                }
                startContainer = afterSplit;
            }
            startOffset = indexOf.call( children, startContainer );
        }
        startContainer = parent;
    } else {
        children = startContainer.childNodes;
    }

    childCount = children.length;

    if ( startOffset === childCount) {
        startContainer.appendChild( node );
    } else {
        startContainer.insertBefore( node, children[ startOffset ] );
    }
    if ( startContainer === endContainer ) {
        endOffset += children.length - childCount;
    }

    range.setStart( startContainer, startOffset );
    range.setEnd( endContainer, endOffset );
};

var extractContentsOfRange = function ( range, common ) {
    var startContainer = range.startContainer,
        startOffset = range.startOffset,
        endContainer = range.endContainer,
        endOffset = range.endOffset;

    if ( !common ) {
        common = range.commonAncestorContainer;
    }

    if ( common.nodeType === TEXT_NODE ) {
        common = common.parentNode;
    }

    var endNode = split( endContainer, endOffset, common ),
        startNode = split( startContainer, startOffset, common ),
        frag = common.ownerDocument.createDocumentFragment(),
        next;

    // End node will be null if at end of child nodes list.
    while ( startNode !== endNode ) {
        next = startNode.nextSibling;
        frag.appendChild( startNode );
        startNode = next;
    }

    range.setStart( common, endNode ?
        indexOf.call( common.childNodes, endNode ) :
            common.childNodes.length );
    range.collapse( true );

    fixCursor( common );

    return frag;
};

var deleteContentsOfRange = function ( range ) {
    // Move boundaries up as much as possible to reduce need to split.
    moveRangeBoundariesUpTree( range );

    // Remove selected range
    extractContentsOfRange( range );

    // If we split into two different blocks, merge the blocks.
    var startBlock = getStartBlockOfRange( range ),
        endBlock = getEndBlockOfRange( range );
    if ( startBlock && endBlock && startBlock !== endBlock ) {
        mergeWithBlock( startBlock, endBlock, range );
    }

    // Ensure block has necessary children
    if ( startBlock ) {
        fixCursor( startBlock );
    }

    // Ensure body has a block-level element in it.
    var body = range.endContainer.ownerDocument.body,
        child = body.firstChild;
    if ( !child || child.nodeName === 'BR' ) {
        fixCursor( body );
        range.selectNodeContents( body.firstChild );
    }

    // Ensure valid range (must have only block or inline containers)
    var isCollapsed = range.collapsed;
    moveRangeBoundariesDownTree( range );
    if ( isCollapsed ) {
        // Collapse
        range.collapse( true );
    }
};

// ---

var insertTreeFragmentIntoRange = function ( range, frag ) {
    // Check if it's all inline content
    var allInline = true,
        children = frag.childNodes,
        l = children.length;
    while ( l-- ) {
        if ( !isInline( children[l] ) ) {
            allInline = false;
            break;
        }
    }

    // Delete any selected content
    if ( !range.collapsed ) {
        deleteContentsOfRange( range );
    }

    // Move range down into text ndoes
    moveRangeBoundariesDownTree( range );

    // If inline, just insert at the current position.
    if ( allInline ) {
        insertNodeInRange( range, frag );
        range.collapse( false );
    }
    // Otherwise, split up to body, insert inline before and after split
    // and insert block in between split, then merge containers.
    else {
        var nodeAfterSplit = split( range.startContainer, range.startOffset,
                range.startContainer.ownerDocument.body ),
            nodeBeforeSplit = nodeAfterSplit.previousSibling,
            startContainer = nodeBeforeSplit,
            startOffset = startContainer.childNodes.length,
            endContainer = nodeAfterSplit,
            endOffset = 0,
            parent = nodeAfterSplit.parentNode,
            child, node;

        while ( ( child = startContainer.lastChild ) &&
                child.nodeType === ELEMENT_NODE &&
                child.nodeName !== 'BR' ) {
            startContainer = child;
            startOffset = startContainer.childNodes.length;
        }
        while ( ( child = endContainer.firstChild ) &&
                child.nodeType === ELEMENT_NODE &&
                child.nodeName !== 'BR' ) {
            endContainer = child;
        }
        while ( ( child = frag.firstChild ) && isInline( child ) ) {
            startContainer.appendChild( child );
        }
        while ( ( child = frag.lastChild ) && isInline( child ) ) {
            endContainer.insertBefore( child, endContainer.firstChild );
            endOffset += 1;
        }

        // Fix cursor then insert block(s)
        node = frag;
        while ( node = getNextBlock( node ) ) {
            fixCursor( node );
        }
        parent.insertBefore( frag, nodeAfterSplit );

        // Remove empty nodes created by split and merge inserted containers
        // with edges of split
        node = nodeAfterSplit.previousSibling;
        if ( !nodeAfterSplit.textContent ) {
            parent.removeChild( nodeAfterSplit );
        } else {
            mergeContainers( nodeAfterSplit );
        }
        if ( !nodeAfterSplit.parentNode ) {
            endContainer = node;
            endOffset = getLength( endContainer );
        }

        if ( !nodeBeforeSplit.textContent) {
            startContainer = nodeBeforeSplit.nextSibling;
            startOffset = 0;
            parent.removeChild( nodeBeforeSplit );
        } else {
            mergeContainers( nodeBeforeSplit );
        }

        range.setStart( startContainer, startOffset );
        range.setEnd( endContainer, endOffset );
        moveRangeBoundariesDownTree( range );
    }
};

// ---

var isNodeContainedInRange = function ( range, node, partial ) {
    var nodeRange = node.ownerDocument.createRange();

    nodeRange.selectNode( node );

    if ( partial ) {
        // Node must not finish before range starts or start after range
        // finishes.
        var nodeEndBeforeStart = ( range.compareBoundaryPoints(
                END_TO_START, nodeRange ) > -1 ),
            nodeStartAfterEnd = ( range.compareBoundaryPoints(
                START_TO_END, nodeRange ) < 1 );
        return ( !nodeEndBeforeStart && !nodeStartAfterEnd );
    }
    else {
        // Node must start after range starts and finish before range
        // finishes
        var nodeStartAfterStart = ( range.compareBoundaryPoints(
                START_TO_START, nodeRange ) < 1 ),
            nodeEndBeforeEnd = ( range.compareBoundaryPoints(
                END_TO_END, nodeRange ) > -1 );
        return ( nodeStartAfterStart && nodeEndBeforeEnd );
    }
};

var moveRangeBoundariesDownTree = function ( range ) {
    var startContainer = range.startContainer,
        startOffset = range.startOffset,
        endContainer = range.endContainer,
        endOffset = range.endOffset,
        child;

    while ( startContainer.nodeType !== TEXT_NODE ) {
        child = startContainer.childNodes[ startOffset ];
        if ( !child || isLeaf( child ) ) {
            break;
        }
        startContainer = child;
        startOffset = 0;
    }
    if ( endOffset ) {
        while ( endContainer.nodeType !== TEXT_NODE ) {
            child = endContainer.childNodes[ endOffset - 1 ];
            if ( !child || isLeaf( child ) ) {
                break;
            }
            endContainer = child;
            endOffset = getLength( endContainer );
        }
    } else {
        while ( endContainer.nodeType !== TEXT_NODE ) {
            child = endContainer.firstChild;
            if ( !child || isLeaf( child ) ) {
                break;
            }
            endContainer = child;
        }
    }

    // If collapsed, this algorithm finds the nearest text node positions
    // *outside* the range rather than inside, but also it flips which is
    // assigned to which.
    if ( range.collapsed ) {
        range.setStart( endContainer, endOffset );
        range.setEnd( startContainer, startOffset );
    } else {
        range.setStart( startContainer, startOffset );
        range.setEnd( endContainer, endOffset );
    }
};

var moveRangeBoundariesUpTree = function ( range, common ) {
    var startContainer = range.startContainer,
        startOffset = range.startOffset,
        endContainer = range.endContainer,
        endOffset = range.endOffset,
        parent;

    if ( !common ) {
        common = range.commonAncestorContainer;
    }

    while ( startContainer !== common && !startOffset ) {
        parent = startContainer.parentNode;
        startOffset = indexOf.call( parent.childNodes, startContainer );
        startContainer = parent;
    }

    while ( endContainer !== common &&
            endOffset === getLength( endContainer ) ) {
        parent = endContainer.parentNode;
        endOffset = indexOf.call( parent.childNodes, endContainer ) + 1;
        endContainer = parent;
    }

    range.setStart( startContainer, startOffset );
    range.setEnd( endContainer, endOffset );
};

// Returns the first block at least partially contained by the range,
// or null if no block is contained by the range.
var getStartBlockOfRange = function ( range ) {
    var container = range.startContainer,
        block;

    // If inline, get the containing block.
    if ( isInline( container ) ) {
        block = getPreviousBlock( container );
    } else if ( isBlock( container ) ) {
        block = container;
    } else {
        block = getNodeBefore( container, range.startOffset );
        block = getNextBlock( block );
    }
    // Check the block actually intersects the range
    return block && isNodeContainedInRange( range, block, true ) ? block : null;
};

// Returns the last block at least partially contained by the range,
// or null if no block is contained by the range.
var getEndBlockOfRange = function ( range ) {
    var container = range.endContainer,
        block, child;

    // If inline, get the containing block.
    if ( isInline( container ) ) {
        block = getPreviousBlock( container );
    } else if ( isBlock( container ) ) {
        block = container;
    } else {
        block = getNodeAfter( container, range.endOffset );
        if ( !block ) {
            block = container.ownerDocument.body;
            while ( child = block.lastChild ) {
                block = child;
            }
        }
        block = getPreviousBlock( block );

    }
    // Check the block actually intersects the range
    return block && isNodeContainedInRange( range, block, true ) ? block : null;
};

var contentWalker = new TreeWalker( null,
    SHOW_TEXT|SHOW_ELEMENT,
    function ( node ) {
        return node.nodeType === TEXT_NODE ?
            notWS.test( node.data ) :
            node.nodeName === 'IMG';
    }
);

var rangeDoesStartAtBlockBoundary = function ( range ) {
    var startContainer = range.startContainer,
        startOffset = range.startOffset;

    // If in the middle or end of a text node, we're not at the boundary.
    if ( startContainer.nodeType === TEXT_NODE ) {
        if ( startOffset ) {
            return false;
        }
        contentWalker.currentNode = startContainer;
    } else {
        contentWalker.currentNode = getNodeAfter( startContainer, startOffset );
    }

    // Otherwise, look for any previous content in the same block.
    contentWalker.root = getStartBlockOfRange( range );

    return !contentWalker.previousNode();
};

var rangeDoesEndAtBlockBoundary = function ( range ) {
    var endContainer = range.endContainer,
        endOffset = range.endOffset,
        length;

    // If in a text node with content, and not at the end, we're not
    // at the boundary
    if ( endContainer.nodeType === TEXT_NODE ) {
        length = endContainer.data.length;
        if ( length && endOffset < length ) {
            return false;
        }
        contentWalker.currentNode = endContainer;
    } else {
        contentWalker.currentNode = getNodeBefore( endContainer, endOffset );
    }

    // Otherwise, look for any further content in the same block.
    contentWalker.root = getEndBlockOfRange( range );

    return !contentWalker.nextNode();
};

var expandRangeToBlockBoundaries = function ( range ) {
    var start = getStartBlockOfRange( range ),
        end = getEndBlockOfRange( range ),
        parent;

    if ( start && end ) {
        parent = start.parentNode;
        range.setStart( parent, indexOf.call( parent.childNodes, start ) );
        parent = end.parentNode;
        range.setEnd( parent, indexOf.call( parent.childNodes, end ) + 1 );
    }
};
/*jshint strict:false, undef:false, unused:false */

var instances = [];

function Squire ( doc ) {
    var win = doc.defaultView;
    var body = doc.body;
    this._win = win;
    this._doc = doc;
    this._body = body;

    this._events = {};

    this._sel = win.getSelection();
    this._lastSelection = null;

    // IE loses selection state of iframe on blur, so make sure we
    // cache it just before it loses focus.
    if ( losesSelectionOnBlur ) {
        this.addEventListener( 'beforedeactivate', this.getSelection );
    }

    this._hasZWS = false;

    this._lastAnchorNode = null;
    this._lastFocusNode = null;
    this._path = '';

    this.addEventListener( 'keyup', this._updatePathOnEvent );
    this.addEventListener( 'mouseup', this._updatePathOnEvent );

    win.addEventListener( 'focus', this, false );
    win.addEventListener( 'blur', this, false );

    this._undoIndex = -1;
    this._undoStack = [];
    this._undoStackLength = 0;
    this._isInUndoState = false;

    this.defaultBlockProperties = undefined;

    this.addEventListener( 'keyup', this._docWasChanged );

    // IE sometimes fires the beforepaste event twice; make sure it is not run
    // again before our after paste function is called.
    this._awaitingPaste = false;
    this.addEventListener( isIE8or9or10 ? 'beforecut' : 'cut', this._onCut );
    this.addEventListener( isIE8or9or10 ? 'beforepaste' : 'paste', this._onPaste );

    if ( isIE8 ) {
        this.addEventListener( 'keyup', this._ieSelAllClean );
    }
    // Opera does not fire keydown repeatedly.
    this.addEventListener( isPresto ? 'keypress' : 'keydown', this._onKey );

    // Fix IE8/9's buggy implementation of Text#splitText.
    // If the split is at the end of the node, it doesn't insert the newly split
    // node into the document, and sets its value to undefined rather than ''.
    // And even if the split is not at the end, the original node is removed
    // from the document and replaced by another, rather than just having its
    // data shortened.
    if ( hasBuggySplit( doc ) ) {
        win.Text.prototype.splitText = function ( offset ) {
            var afterSplit = this.ownerDocument.createTextNode(
                    this.data.slice( offset ) ),
                next = this.nextSibling,
                parent = this.parentNode,
                toDelete = this.length - offset;
            if ( next ) {
                parent.insertBefore( afterSplit, next );
            } else {
                parent.appendChild( afterSplit );
            }
            if ( toDelete ) {
                this.deleteData( offset, toDelete );
            }
            return afterSplit;
        };
    }
    body.setAttribute( 'contenteditable', 'true' );
    this.setHTML( '
      <h1>Nobody tells beginners...</h1>
      <h2>(I wish someone had told me.)</h2>
      <p>"All of us who do creative work, we get into it because we have good taste. But there is this gap. For the first couple years you make stuff, it’s just not that good. It’s trying to be good, it has potential, but it’s not. But your taste, the thing that got you into the game, is still killer...</p>
      <p>"And your taste is why your work disappoints you. A lot of people never get past this phase, they quit. Most people I know who do interesting, creative work went through years of this. We know our work doesn’t have this special thing that we want it to have...</p>
      <p>"And if you are just starting out or you are still in this phase, you gotta know its normal and the most important thing you can do is do a lot of work. Put yourself on a deadline so that every week you will finish one story. It is only by going through a volume of work that you will close that gap, and your work will be as good as your ambitions... It’s gonna take awhile. It’s normal to take awhile. You’ve just gotta fight your way through."</p>
      <p class="t-right">–Ira Glasswvgwerg</p>
    ' );

    // Remove Firefox's built-in controls
    try {
        doc.execCommand( 'enableObjectResizing', false, 'false' );
        doc.execCommand( 'enableInlineTableEditing', false, 'false' );
    } catch ( error ) {}

    instances.push( this );
}

var proto = Squire.prototype;

proto.createElement = function ( tag, props, children ) {
    return createElement( this._doc, tag, props, children );
};

proto.createDefaultBlock = function ( children ) {
    return fixCursor(
        this.createElement( 'DIV', this.defaultBlockProperties, children )
    );
};

proto.didError = function ( error ) {
    console.log( error );
};

proto.getDocument = function () {
    return this._doc;
};

// --- Events ---

// Subscribing to these events won't automatically add a listener to the
// document node, since these events are fired in a custom manner by the
// editor code.
var customEvents = {
    focus: 1, blur: 1,
    pathChange: 1, select: 1, input: 1, undoStateChange: 1
};

proto.fireEvent = function ( type, event ) {
    var handlers = this._events[ type ],
        i, l, obj;
    if ( handlers ) {
        if ( !event ) {
            event = {};
        }
        if ( event.type !== type ) {
            event.type = type;
        }
        // Clone handlers array, so any handlers added/removed do not affect it.
        handlers = handlers.slice();
        for ( i = 0, l = handlers.length; i < l; i += 1 ) {
            obj = handlers[i];
            try {
                if ( obj.handleEvent ) {
                    obj.handleEvent( event );
                } else {
                    obj.call( this, event );
                }
            } catch ( error ) {
                error.details = 'Squire: fireEvent error. Event type: ' + type;
                this.didError( error );
            }
        }
    }
    return this;
};

proto.destroy = function () {
    var win = this._win,
        doc = this._doc,
        events = this._events,
        type;
    win.removeEventListener( 'focus', this, false );
    win.removeEventListener( 'blur', this, false );
    for ( type in events ) {
        if ( !customEvents[ type ] ) {
            doc.removeEventListener( type, this, true );
        }
    }
    var l = instances.length;
    while ( l-- ) {
        if ( instances[l] === this ) {
            instances.splice( l, 1 );
        }
    }
};

proto.handleEvent = function ( event ) {
    this.fireEvent( event.type, event );
};

proto.addEventListener = function ( type, fn ) {
    var handlers = this._events[ type ];
    if ( !fn ) {
        this.didError({
            name: 'Squire: addEventListener with null or undefined fn',
            message: 'Event type: ' + type
        });
        return this;
    }
    if ( !handlers ) {
        handlers = this._events[ type ] = [];
        if ( !customEvents[ type ] ) {
            this._doc.addEventListener( type, this, true );
        }
    }
    handlers.push( fn );
    return this;
};

proto.removeEventListener = function ( type, fn ) {
    var handlers = this._events[ type ],
        l;
    if ( handlers ) {
        l = handlers.length;
        while ( l-- ) {
            if ( handlers[l] === fn ) {
                handlers.splice( l, 1 );
            }
        }
        if ( !handlers.length ) {
            delete this._events[ type ];
            if ( !customEvents[ type ] ) {
                this._doc.removeEventListener( type, this, false );
            }
        }
    }
    return this;
};

// --- Selection and Path ---

proto._createRange =
        function ( range, startOffset, endContainer, endOffset ) {
    if ( range instanceof this._win.Range ) {
        return range.cloneRange();
    }
    var domRange = this._doc.createRange();
    domRange.setStart( range, startOffset );
    if ( endContainer ) {
        domRange.setEnd( endContainer, endOffset );
    } else {
        domRange.setEnd( range, startOffset );
    }
    return domRange;
};

proto.setSelection = function ( range ) {
    if ( range ) {
        // iOS bug: if you don't focus the iframe before setting the
        // selection, you can end up in a state where you type but the input
        // doesn't get directed into the contenteditable area but is instead
        // lost in a black hole. Very strange.
        if ( isIOS ) {
            this._win.focus();
        }
        var sel = this._sel;
        sel.removeAllRanges();
        sel.addRange( range );
    }
    return this;
};

proto.getSelection = function () {
    var sel = this._sel,
        selection, startContainer, endContainer;
    if ( sel.rangeCount ) {
        selection  = sel.getRangeAt( 0 ).cloneRange();
        startContainer = selection.startContainer;
        endContainer = selection.endContainer;
        // FF sometimes throws an error reading the isLeaf property. Let's
        // catch and log it to see if we can find what's going on.
        try {
            // FF can return the selection as being inside an <img>. WTF?
            if ( startContainer && isLeaf( startContainer ) ) {
                selection.setStartBefore( startContainer );
            }
            if ( endContainer && isLeaf( endContainer ) ) {
                selection.setEndBefore( endContainer );
            }
        } catch ( error ) {
            this.didError({
                name: 'Squire#getSelection error',
                message: 'Starts: ' + startContainer.nodeName +
                    '\nEnds: ' + endContainer.nodeName
            });
        }
        this._lastSelection = selection;
    } else {
        selection = this._lastSelection;
    }
    if ( !selection ) {
        selection = this._createRange( this._body.firstChild, 0 );
    }
    return selection;
};

proto.getSelectedText = function () {
    return getTextContentInRange( this.getSelection() );
};

proto.getPath = function () {
    return this._path;
};

// --- Workaround for browsers that can't focus empty text nodes ---

// WebKit bug: https://bugs.webkit.org/show_bug.cgi?id=15256

proto._didAddZWS = function () {
    this._hasZWS = true;
};
proto._removeZWS = function () {
    if ( !this._hasZWS ) {
        return;
    }
    var walker = new TreeWalker( this._body, SHOW_TEXT, function () {
            return true;
        }, false ),
        node, index;
    while ( node = walker.nextNode() ) {
        while ( ( index = node.data.indexOf( '\u200B' ) ) > -1 ) {
            node.deleteData( index, 1 );
        }
    }
    this._hasZWS = false;
};

// --- Path change events ---

proto._updatePath = function ( range, force ) {
    var anchor = range.startContainer,
        focus = range.endContainer,
        newPath;
    if ( force || anchor !== this._lastAnchorNode ||
            focus !== this._lastFocusNode ) {
        this._lastAnchorNode = anchor;
        this._lastFocusNode = focus;
        newPath = ( anchor && focus ) ? ( anchor === focus ) ?
            getPath( focus ) : '(selection)' : '';
        if ( this._path !== newPath ) {
            this._path = newPath;
            this.fireEvent( 'pathChange', { path: newPath } );
        }
    }
    if ( anchor !== focus ) {
        this.fireEvent( 'select' );
    }
};

proto._updatePathOnEvent = function () {
    this._updatePath( this.getSelection() );
};

// --- Focus ---

proto.focus = function () {
    // FF seems to need the body to be focussed (at least on first load).
    // Chrome also now needs body to be focussed in order to show the cursor
    // (otherwise it is focussed, but the cursor doesn't appear).
    this._body.focus();
    this._win.focus();
    return this;
};

proto.blur = function () {
    // IE will remove the whole browser window from focus if you call
    // win.blur() or body.blur(), so instead we call top.focus() to focus
    // the top frame, thus blurring this frame. This works in everything
    // except FF, so we need to call body.blur() in that as well.
    if ( isGecko ) {
        this._body.blur();
    }
    top.focus();
    return this;
};

// --- Bookmarking ---

var startSelectionId = 'squire-selection-start';
var endSelectionId = 'squire-selection-end';

proto._saveRangeToBookmark = function ( range ) {
    var startNode = this.createElement( 'INPUT', {
            id: startSelectionId,
            type: 'hidden'
        }),
        endNode = this.createElement( 'INPUT', {
            id: endSelectionId,
            type: 'hidden'
        }),
        temp;

    insertNodeInRange( range, startNode );
    range.collapse( false );
    insertNodeInRange( range, endNode );

    // In a collapsed range, the start is sometimes inserted after the end!
    if ( startNode.compareDocumentPosition( endNode ) &
            DOCUMENT_POSITION_PRECEDING ) {
        startNode.id = endSelectionId;
        endNode.id = startSelectionId;
        temp = startNode;
        startNode = endNode;
        endNode = temp;
    }

    range.setStartAfter( startNode );
    range.setEndBefore( endNode );
};

proto._getRangeAndRemoveBookmark = function ( range ) {
    var doc = this._doc,
        start = doc.getElementById( startSelectionId ),
        end = doc.getElementById( endSelectionId );

    if ( start && end ) {
        var startContainer = start.parentNode,
            endContainer = end.parentNode,
            collapsed;

        var _range = {
            startContainer: startContainer,
            endContainer: endContainer,
            startOffset: indexOf.call( startContainer.childNodes, start ),
            endOffset: indexOf.call( endContainer.childNodes, end )
        };

        if ( startContainer === endContainer ) {
            _range.endOffset -= 1;
        }

        detach( start );
        detach( end );

        // Merge any text nodes we split
        mergeInlines( startContainer, _range );
        if ( startContainer !== endContainer ) {
            mergeInlines( endContainer, _range );
        }

        if ( !range ) {
            range = doc.createRange();
        }
        range.setStart( _range.startContainer, _range.startOffset );
        range.setEnd( _range.endContainer, _range.endOffset );
        collapsed = range.collapsed;

        moveRangeBoundariesDownTree( range );
        if ( collapsed ) {
            range.collapse( true );
        }
    }
    return range || null;
};

// --- Undo ---

proto._docWasChanged = function ( event ) {
    var code = event && event.keyCode;
    // Presume document was changed if:
    // 1. A modifier key (other than shift) wasn't held down
    // 2. The key pressed is not in range 16<=x<=20 (control keys)
    // 3. The key pressed is not in range 33<=x<=45 (navigation keys)
    if ( !event || ( !event.ctrlKey && !event.metaKey && !event.altKey &&
            ( code < 16 || code > 20 ) &&
            ( code < 33 || code > 45 ) ) )  {
        if ( this._isInUndoState ) {
            this._isInUndoState = false;
            this.fireEvent( 'undoStateChange', {
                canUndo: true,
                canRedo: false
            });
        }
        this.fireEvent( 'input' );
    }
};

// Leaves bookmark
proto._recordUndoState = function ( range ) {
    // Don't record if we're already in an undo state
    if ( !this._isInUndoState ) {
        // Advance pointer to new position
        var undoIndex = this._undoIndex += 1,
            undoStack = this._undoStack;

        // Truncate stack if longer (i.e. if has been previously undone)
        if ( undoIndex < this._undoStackLength) {
            undoStack.length = this._undoStackLength = undoIndex;
        }

        // Write out data
        if ( range ) {
            this._saveRangeToBookmark( range );
        }
        undoStack[ undoIndex ] = this._getHTML();
        this._undoStackLength += 1;
        this._isInUndoState = true;
    }
};

proto.undo = function () {
    // Sanity check: must not be at beginning of the history stack
    if ( this._undoIndex !== 0 || !this._isInUndoState ) {
        // Make sure any changes since last checkpoint are saved.
        this._recordUndoState( this.getSelection() );

        this._undoIndex -= 1;
        this._setHTML( this._undoStack[ this._undoIndex ] );
        var range = this._getRangeAndRemoveBookmark();
        if ( range ) {
            this.setSelection( range );
        }
        this._isInUndoState = true;
        this.fireEvent( 'undoStateChange', {
            canUndo: this._undoIndex !== 0,
            canRedo: true
        });
        this.fireEvent( 'input' );
    }
    return this;
};

proto.redo = function () {
    // Sanity check: must not be at end of stack and must be in an undo
    // state.
    var undoIndex = this._undoIndex,
        undoStackLength = this._undoStackLength;
    if ( undoIndex + 1 < undoStackLength && this._isInUndoState ) {
        this._undoIndex += 1;
        this._setHTML( this._undoStack[ this._undoIndex ] );
        var range = this._getRangeAndRemoveBookmark();
        if ( range ) {
            this.setSelection( range );
        }
        this.fireEvent( 'undoStateChange', {
            canUndo: true,
            canRedo: undoIndex + 2 < undoStackLength
        });
        this.fireEvent( 'input' );
    }
    return this;
};

// --- Inline formatting ---

// Looks for matching tag and attributes, so won't work
// if <strong> instead of <b> etc.
proto.hasFormat = function ( tag, attributes, range ) {
    // 1. Normalise the arguments and get selection
    tag = tag.toUpperCase();
    if ( !attributes ) { attributes = {}; }
    if ( !range && !( range = this.getSelection() ) ) {
        return false;
    }

    // If the common ancestor is inside the tag we require, we definitely
    // have the format.
    var root = range.commonAncestorContainer,
        walker, node;
    if ( getNearest( root, tag, attributes ) ) {
        return true;
    }

    // If common ancestor is a text node and doesn't have the format, we
    // definitely don't have it.
    if ( root.nodeType === TEXT_NODE ) {
        return false;
    }

    // Otherwise, check each text node at least partially contained within
    // the selection and make sure all of them have the format we want.
    walker = new TreeWalker( root, SHOW_TEXT, function ( node ) {
        return isNodeContainedInRange( range, node, true );
    }, false );

    var seenNode = false;
    while ( node = walker.nextNode() ) {
        if ( !getNearest( node, tag, attributes ) ) {
            return false;
        }
        seenNode = true;
    }

    return seenNode;
};

proto._addFormat = function ( tag, attributes, range ) {
    // If the range is collapsed we simply insert the node by wrapping
    // it round the range and focus it.
    var el, walker, startContainer, endContainer, startOffset, endOffset,
        textNode, needsFormat;

    if ( range.collapsed ) {
        el = fixCursor( this.createElement( tag, attributes ) );
        insertNodeInRange( range, el );
        range.setStart( el.firstChild, el.firstChild.length );
        range.collapse( true );
    }
    // Otherwise we find all the textnodes in the range (splitting
    // partially selected nodes) and if they're not already formatted
    // correctly we wrap them in the appropriate tag.
    else {
        // We don't want to apply formatting twice so we check each text
        // node to see if it has an ancestor with the formatting already.
        // Create an iterator to walk over all the text nodes under this
        // ancestor which are in the range and not already formatted
        // correctly.
        walker = new TreeWalker(
            range.commonAncestorContainer,
            SHOW_TEXT,
            function ( node ) {
                return isNodeContainedInRange( range, node, true );
            },
            false
        );

        // Start at the beginning node of the range and iterate through
        // all the nodes in the range that need formatting.
        startContainer = range.startContainer;
        startOffset = range.startOffset;
        endContainer = range.endContainer;
        endOffset = range.endOffset;

        // Make sure we start inside a text node.
        walker.currentNode = startContainer;
        if ( startContainer.nodeType !== TEXT_NODE ) {
            startContainer = walker.nextNode();
            startOffset = 0;
        }

        do {
            textNode = walker.currentNode;
            needsFormat = !getNearest( textNode, tag, attributes );
            if ( needsFormat ) {
                if ( textNode === endContainer &&
                        textNode.length > endOffset ) {
                    textNode.splitText( endOffset );
                }
                if ( textNode === startContainer && startOffset ) {
                    textNode = textNode.splitText( startOffset );
                    if ( endContainer === startContainer ) {
                        endContainer = textNode;
                        endOffset -= startOffset;
                    }
                    startContainer = textNode;
                    startOffset = 0;
                }
                el = this.createElement( tag, attributes );
                replaceWith( textNode, el );
                el.appendChild( textNode );
            }
        } while ( walker.nextNode() );

        // Make sure we finish inside a text node. Otherwise offset may have
        // changed.
        if ( endContainer.nodeType !== TEXT_NODE ) {
            endContainer = textNode;
            endOffset = textNode.length;
        }

        // Now set the selection to as it was before
        range = this._createRange(
            startContainer, startOffset, endContainer, endOffset );
    }
    return range;
};

proto._removeFormat = function ( tag, attributes, range, partial ) {
    // Add bookmark
    this._saveRangeToBookmark( range );

    // We need a node in the selection to break the surrounding
    // formatted text.
    var doc = this._doc,
        fixer;
    if ( range.collapsed ) {
        if ( cantFocusEmptyTextNodes ) {
            fixer = doc.createTextNode( '\u200B' );
            this._didAddZWS();
        } else {
            fixer = doc.createTextNode( '' );
        }
        insertNodeInRange( range, fixer );
    }

    // Find block-level ancestor of selection
    var root = range.commonAncestorContainer;
    while ( isInline( root ) ) {
        root = root.parentNode;
    }

    // Find text nodes inside formatTags that are not in selection and
    // add an extra tag with the same formatting.
    var startContainer = range.startContainer,
        startOffset = range.startOffset,
        endContainer = range.endContainer,
        endOffset = range.endOffset,
        toWrap = [],
        examineNode = function ( node, exemplar ) {
            // If the node is completely contained by the range then
            // we're going to remove all formatting so ignore it.
            if ( isNodeContainedInRange( range, node, false ) ) {
                return;
            }

            var isText = ( node.nodeType === TEXT_NODE ),
                child, next;

            // If not at least partially contained, wrap entire contents
            // in a clone of the tag we're removing and we're done.
            if ( !isNodeContainedInRange( range, node, true ) ) {
                // Ignore bookmarks and empty text nodes
                if ( node.nodeName !== 'INPUT' &&
                        ( !isText || node.data ) ) {
                    toWrap.push([ exemplar, node ]);
                }
                return;
            }

            // Split any partially selected text nodes.
            if ( isText ) {
                if ( node === endContainer && endOffset !== node.length ) {
                    toWrap.push([ exemplar, node.splitText( endOffset ) ]);
                }
                if ( node === startContainer && startOffset ) {
                    node.splitText( startOffset );
                    toWrap.push([ exemplar, node ]);
                }
            }
            // If not a text node, recurse onto all children.
            // Beware, the tree may be rewritten with each call
            // to examineNode, hence find the next sibling first.
            else {
                for ( child = node.firstChild; child; child = next ) {
                    next = child.nextSibling;
                    examineNode( child, exemplar );
                }
            }
        },
        formatTags = Array.prototype.filter.call(
            root.getElementsByTagName( tag ), function ( el ) {
                return isNodeContainedInRange( range, el, true ) &&
                    hasTagAttributes( el, tag, attributes );
            }
        );

    if ( !partial ) {
        formatTags.forEach( function ( node ) {
            examineNode( node, node );
        });
    }

    // Now wrap unselected nodes in the tag
    toWrap.forEach( function ( item ) {
        // [ exemplar, node ] tuple
        var el = item[0].cloneNode( false ),
            node = item[1];
        replaceWith( node, el );
        el.appendChild( node );
    });
    // and remove old formatting tags.
    formatTags.forEach( function ( el ) {
        replaceWith( el, empty( el ) );
    });

    // Merge adjacent inlines:
    this._getRangeAndRemoveBookmark( range );
    if ( fixer ) {
        range.collapse( false );
    }
    var _range = {
        startContainer: range.startContainer,
        startOffset: range.startOffset,
        endContainer: range.endContainer,
        endOffset: range.endOffset
    };
    mergeInlines( root, _range );
    range.setStart( _range.startContainer, _range.startOffset );
    range.setEnd( _range.endContainer, _range.endOffset );

    return range;
};

proto.changeFormat = function ( add, remove, range, partial ) {
    // Normalise the arguments and get selection
    if ( !range && !( range = this.getSelection() ) ) {
        return;
    }

    // Save undo checkpoint
    this._recordUndoState( range );
    this._getRangeAndRemoveBookmark( range );

    if ( remove ) {
        range = this._removeFormat( remove.tag.toUpperCase(),
            remove.attributes || {}, range, partial );
    }
    if ( add ) {
        range = this._addFormat( add.tag.toUpperCase(),
            add.attributes || {}, range );
    }

    this.setSelection( range );
    this._updatePath( range, true );

    // We're not still in an undo state
    this._docWasChanged();

    return this;
};

// --- Block formatting ---

var tagAfterSplit = {
    DIV: 'DIV',
    PRE: 'DIV',
    H1:  'DIV',
    H2:  'DIV',
    H3:  'DIV',
    H4:  'DIV',
    H5:  'DIV',
    H6:  'DIV',
    P:   'DIV',
    DT:  'DD',
    DD:  'DT',
    LI:  'LI'
};

var splitBlock = function ( block, node, offset ) {
    var splitTag = tagAfterSplit[ block.nodeName ],
        nodeAfterSplit = split( node, offset, block.parentNode );

    // Make sure the new node is the correct type.
    if ( nodeAfterSplit.nodeName !== splitTag ) {
        block = createElement( nodeAfterSplit.ownerDocument, splitTag );
        block.className = nodeAfterSplit.dir === 'rtl' ? 'dir-rtl' : '';
        block.dir = nodeAfterSplit.dir;
        replaceWith( nodeAfterSplit, block );
        block.appendChild( empty( nodeAfterSplit ) );
        nodeAfterSplit = block;
    }
    return nodeAfterSplit;
};

proto.forEachBlock = function ( fn, mutates, range ) {
    if ( !range && !( range = this.getSelection() ) ) {
        return this;
    }

    // Save undo checkpoint
    if ( mutates ) {
        this._recordUndoState( range );
        this._getRangeAndRemoveBookmark( range );
    }

    var start = getStartBlockOfRange( range ),
        end = getEndBlockOfRange( range );
    if ( start && end ) {
        do {
            if ( fn( start ) || start === end ) { break; }
        } while ( start = getNextBlock( start ) );
    }

    if ( mutates ) {
        this.setSelection( range );

        // Path may have changed
        this._updatePath( range, true );

        // We're not still in an undo state
        this._docWasChanged();
    }
    return this;
};

proto.modifyBlocks = function ( modify, range ) {
    if ( !range && !( range = this.getSelection() ) ) {
        return this;
    }

    // 1. Save undo checkpoint and bookmark selection
    if ( this._isInUndoState ) {
        this._saveRangeToBookmark( range );
    } else {
        this._recordUndoState( range );
    }

    // 2. Expand range to block boundaries
    expandRangeToBlockBoundaries( range );

    // 3. Remove range.
    var body = this._body,
        frag;
    moveRangeBoundariesUpTree( range, body );
    frag = extractContentsOfRange( range, body );

    // 4. Modify tree of fragment and reinsert.
    insertNodeInRange( range, modify.call( this, frag ) );

    // 5. Merge containers at edges
    if ( range.endOffset < range.endContainer.childNodes.length ) {
        mergeContainers( range.endContainer.childNodes[ range.endOffset ] );
    }
    mergeContainers( range.startContainer.childNodes[ range.startOffset ] );

    // 6. Restore selection
    this._getRangeAndRemoveBookmark( range );
    this.setSelection( range );
    this._updatePath( range, true );

    // 7. We're not still in an undo state
    this._docWasChanged();

    return this;
};

var increaseBlockQuoteLevel = function ( frag ) {
    return this.createElement( 'BLOCKQUOTE', [
        frag
    ]);
};

var decreaseBlockQuoteLevel = function ( frag ) {
    var blockquotes = frag.querySelectorAll( 'blockquote' );
    Array.prototype.filter.call( blockquotes, function ( el ) {
        return !getNearest( el.parentNode, 'BLOCKQUOTE' );
    }).forEach( function ( el ) {
        replaceWith( el, empty( el ) );
    });
    return frag;
};

var removeBlockQuote = function (/* frag */) {
    return this.createDefaultBlock([
        this.createElement( 'INPUT', {
            id: startSelectionId,
            type: 'hidden'
        }),
        this.createElement( 'INPUT', {
            id: endSelectionId,
            type: 'hidden'
        })
    ]);
};

var makeList = function ( self, frag, type ) {
    var walker = getBlockWalker( frag ),
        node, tag, prev, newLi;

    while ( node = walker.nextNode() ) {
        tag = node.parentNode.nodeName;
        if ( tag !== 'LI' ) {
            newLi = self.createElement( 'LI', {
                'class': node.dir === 'rtl' ? 'dir-rtl' : undefined,
                dir: node.dir || undefined
            });
            // Have we replaced the previous block with a new <ul>/<ol>?
            if ( ( prev = node.previousSibling ) &&
                    prev.nodeName === type ) {
                prev.appendChild( newLi );
            }
            // Otherwise, replace this block with the <ul>/<ol>
            else {
                replaceWith(
                    node,
                    self.createElement( type, [
                        newLi
                    ])
                );
            }
            newLi.appendChild( node );
        } else {
            node = node.parentNode.parentNode;
            tag = node.nodeName;
            if ( tag !== type && ( /^[OU]L$/.test( tag ) ) ) {
                replaceWith( node,
                    self.createElement( type, [ empty( node ) ] )
                );
            }
        }
    }
};

var makeUnorderedList = function ( frag ) {
    makeList( this, frag, 'UL' );
    return frag;
};

var makeOrderedList = function ( frag ) {
    makeList( this, frag, 'OL' );
    return frag;
};

var removeList = function ( frag ) {
    var lists = frag.querySelectorAll( 'UL, OL' ),
        i, l, ll, list, listFrag, children, child;
    for ( i = 0, l = lists.length; i < l; i += 1 ) {
        list = lists[i];
        listFrag = empty( list );
        children = listFrag.childNodes;
        ll = children.length;
        while ( ll-- ) {
            child = children[ll];
            replaceWith( child, empty( child ) );
        }
        fixContainer( listFrag );
        replaceWith( list, listFrag );
    }
    return frag;
};

var increaseListLevel = function ( frag ) {
    var items = frag.querySelectorAll( 'LI' ),
        i, l, item,
        type, newParent;
    for ( i = 0, l = items.length; i < l; i += 1 ) {
        item = items[i];
        if ( !isContainer( item.firstChild ) ) {
            // type => 'UL' or 'OL'
            type = item.parentNode.nodeName;
            newParent = item.previousSibling;
            if ( !newParent || !( newParent = newParent.lastChild ) ||
                    newParent.nodeName !== type ) {
                replaceWith(
                    item,
                    this.createElement( 'LI', [
                        newParent = this.createElement( type )
                    ])
                );
            }
            newParent.appendChild( item );
        }
    }
    return frag;
};

var decreaseListLevel = function ( frag ) {
    var items = frag.querySelectorAll( 'LI' );
    Array.prototype.filter.call( items, function ( el ) {
        return !isContainer( el.firstChild );
    }).forEach( function ( item ) {
        var parent = item.parentNode,
            newParent = parent.parentNode,
            first = item.firstChild,
            node = first,
            next;
        if ( item.previousSibling ) {
            parent = split( parent, item, newParent );
        }
        while ( node ) {
            next = node.nextSibling;
            if ( isContainer( node ) ) {
                break;
            }
            newParent.insertBefore( node, parent );
            node = next;
        }
        if ( newParent.nodeName === 'LI' && first.previousSibling ) {
            split( newParent, first, newParent.parentNode );
        }
        while ( item !== frag && !item.childNodes.length ) {
            parent = item.parentNode;
            parent.removeChild( item );
            item = parent;
        }
    }, this );
    fixContainer( frag );
    return frag;
};

// --- Clean ---

var linkRegExp = /\b((?:(?:ht|f)tps?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,}\/)(?:[^\s()<>]+|\([^\s()<>]+\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))|([\w\-.%+]+@(?:[\w\-]+\.)+[A-Z]{2,}\b)/i;

var addLinks = function ( frag ) {
    var doc = frag.ownerDocument,
        walker = new TreeWalker( frag, SHOW_TEXT,
                function ( node ) {
            return !getNearest( node, 'A' );
        }, false ),
        node, data, parent, match, index, endIndex, child;
    while ( node = walker.nextNode() ) {
        data = node.data;
        parent = node.parentNode;
        while ( match = linkRegExp.exec( data ) ) {
            index = match.index;
            endIndex = index + match[0].length;
            if ( index ) {
                child = doc.createTextNode( data.slice( 0, index ) );
                parent.insertBefore( child, node );
            }
            child = doc.createElement( 'A' );
            child.textContent = data.slice( index, endIndex );
            child.href = match[1] ?
                /^(?:ht|f)tps?:/.test( match[1] ) ?
                    match[1] :
                    'http://' + match[1] :
                'mailto:' + match[2];
            parent.insertBefore( child, node );
            node.data = data = data.slice( endIndex );
        }
    }
};

var allowedBlock = /^(?:A(?:DDRESS|RTICLE|SIDE)|BLOCKQUOTE|CAPTION|D(?:[DLT]|IV)|F(?:IGURE|OOTER)|H[1-6]|HEADER|L(?:ABEL|EGEND|I)|O(?:L|UTPUT)|P(?:RE)?|SECTION|T(?:ABLE|BODY|D|FOOT|H|HEAD|R)|UL)$/;

var fontSizes = {
    1: 10,
    2: 13,
    3: 16,
    4: 18,
    5: 24,
    6: 32,
    7: 48
};

var spanToSemantic = {
    backgroundColor: {
        regexp: notWS,
        replace: function ( doc, colour ) {
            return createElement( doc, 'SPAN', {
                'class': 'highlight',
                style: 'background-color: ' + colour
            });
        }
    },
    color: {
        regexp: notWS,
        replace: function ( doc, colour ) {
            return createElement( doc, 'SPAN', {
                'class': 'colour',
                style: 'color:' + colour
            });
        }
    },
    fontWeight: {
        regexp: /^bold/i,
        replace: function ( doc ) {
            return createElement( doc, 'B' );
        }
    },
    fontStyle: {
        regexp: /^italic/i,
        replace: function ( doc ) {
            return createElement( doc, 'I' );
        }
    },
    fontFamily: {
        regexp: notWS,
        replace: function ( doc, family ) {
            return createElement( doc, 'SPAN', {
                'class': 'font',
                style: 'font-family:' + family
            });
        }
    },
    fontSize: {
        regexp: notWS,
        replace: function ( doc, size ) {
            return createElement( doc, 'SPAN', {
                'class': 'size',
                style: 'font-size:' + size
            });
        }
    }
};

var replaceWithTag = function ( tag ) {
    return function ( node, parent ) {
        var el = createElement( node.ownerDocument, tag );
        parent.replaceChild( el, node );
        el.appendChild( empty( node ) );
        return el;
    };
};

var stylesRewriters = {
    SPAN: function ( span, parent ) {
        var style = span.style,
            doc = span.ownerDocument,
            attr, converter, css, newTreeBottom, newTreeTop, el;

        for ( attr in spanToSemantic ) {
            converter = spanToSemantic[ attr ];
            css = style[ attr ];
            if ( css && converter.regexp.test( css ) ) {
                el = converter.replace( doc, css );
                if ( newTreeBottom ) {
                    newTreeBottom.appendChild( el );
                }
                newTreeBottom = el;
                if ( !newTreeTop ) {
                    newTreeTop = el;
                }
            }
        }

        if ( newTreeTop ) {
            newTreeBottom.appendChild( empty( span ) );
            parent.replaceChild( newTreeTop, span );
        }

        return newTreeBottom || span;
    },
    STRONG: replaceWithTag( 'B' ),
    EM: replaceWithTag( 'I' ),
    STRIKE: replaceWithTag( 'S' ),
    FONT: function ( node, parent ) {
        var face = node.face,
            size = node.size,
            colour = node.color,
            doc = node.ownerDocument,
            fontSpan, sizeSpan, colourSpan,
            newTreeBottom, newTreeTop;
        if ( face ) {
            fontSpan = createElement( doc, 'SPAN', {
                'class': 'font',
                style: 'font-family:' + face
            });
            newTreeTop = fontSpan;
            newTreeBottom = fontSpan;
        }
        if ( size ) {
            sizeSpan = createElement( doc, 'SPAN', {
                'class': 'size',
                style: 'font-size:' + fontSizes[ size ] + 'px'
            });
            if ( !newTreeTop ) {
                newTreeTop = sizeSpan;
            }
            if ( newTreeBottom ) {
                newTreeBottom.appendChild( sizeSpan );
            }
            newTreeBottom = sizeSpan;
        }
        if ( colour && /^#?([\dA-F]{3}){1,2}$/i.test( colour ) ) {
            if ( colour.charAt( 0 ) !== '#' ) {
                colour = '#' + colour;
            }
            colourSpan = createElement( doc, 'SPAN', {
                'class': 'colour',
                style: 'color:' + colour
            });
            if ( !newTreeTop ) {
                newTreeTop = colourSpan;
            }
            if ( newTreeBottom ) {
                newTreeBottom.appendChild( colourSpan );
            }
            newTreeBottom = colourSpan;
        }
        if ( !newTreeTop ) {
            newTreeTop = newTreeBottom = createElement( doc, 'SPAN' );
        }
        parent.replaceChild( newTreeTop, node );
        newTreeBottom.appendChild( empty( node ) );
        return newTreeBottom;
    },
    TT: function ( node, parent ) {
        var el = createElement( node.ownerDocument, 'SPAN', {
            'class': 'font',
            style: 'font-family:menlo,consolas,"courier new",monospace'
        });
        parent.replaceChild( el, node );
        el.appendChild( empty( node ) );
        return el;
    }
};

var removeEmptyInlines = function ( root ) {
    var children = root.childNodes,
        l = children.length,
        child;
    while ( l-- ) {
        child = children[l];
        if ( child.nodeType === ELEMENT_NODE && child.nodeName !== 'IMG' ) {
            removeEmptyInlines( child );
            if ( isInline( child ) && !child.firstChild ) {
                root.removeChild( child );
            }
        }
    }
};

/*
    Two purposes:

    1. Remove nodes we don't want, such as weird <o:p> tags, comment nodes
       and whitespace nodes.
    2. Convert inline tags into our preferred format.
*/
var cleanTree = function ( node, allowStyles ) {
    var children = node.childNodes,
        i, l, child, nodeName, nodeType, rewriter, childLength,
        data, j, ll;
    for ( i = 0, l = children.length; i < l; i += 1 ) {
        child = children[i];
        nodeName = child.nodeName;
        nodeType = child.nodeType;
        rewriter = stylesRewriters[ nodeName ];
        if ( nodeType === ELEMENT_NODE ) {
            childLength = child.childNodes.length;
            if ( rewriter ) {
                child = rewriter( child, node );
            } else if ( !allowedBlock.test( nodeName ) &&
                    !isInline( child ) ) {
                i -= 1;
                l += childLength - 1;
                node.replaceChild( empty( child ), child );
                continue;
            } else if ( !allowStyles && child.style.cssText ) {
                child.removeAttribute( 'style' );
            }
            if ( childLength ) {
                cleanTree( child, allowStyles );
            }
        } else {
            if ( nodeType === TEXT_NODE ) {
                data = child.data;
                // Use \S instead of notWS, because we want to remove nodes
                // which are just nbsp, in order to cleanup <div>nbsp<br></div>
                // construct.
                if ( /\S/.test( data ) ) {
                    // If the parent node is inline, don't trim this node as
                    // it probably isn't at the end of the block.
                    if ( isInline( node ) ) {
                        continue;
                    }
                    j = 0;
                    ll = data.length;
                    if ( !i || !isInline( children[ i - 1 ] ) ) {
                        while ( j < ll && !notWS.test( data.charAt( j ) ) ) {
                            j += 1;
                        }
                        if ( j ) {
                            child.data = data = data.slice( j );
                            ll -= j;
                        }
                    }
                    if ( i + 1 === l || !isInline( children[ i + 1 ] ) ) {
                        j = ll;
                        while ( j > 0 && !notWS.test( data.charAt( j - 1 ) ) ) {
                            j -= 1;
                        }
                        if ( j < ll ) {
                            child.data = data.slice( 0, j );
                        }
                    }
                    continue;
                }
                // If we have just white space, it may still be important if it
                // separates two inline nodes, e.g. "<a>link</a> <a>link</a>".
                else if ( i && i + 1 < l &&
                        isInline( children[ i - 1 ] ) &&
                        isInline( children[ i + 1 ] ) ) {
                    child.data = ' ';
                    continue;
                }
            }
            node.removeChild( child );
            i -= 1;
            l -= 1;
        }
    }
    return node;
};

var notWSTextNode = function ( node ) {
    return node.nodeType === ELEMENT_NODE ?
        node.nodeName === 'BR' :
        notWS.test( node.data );
};
var isLineBreak = function ( br ) {
    var block = br.parentNode,
        walker;
    while ( isInline( block ) ) {
        block = block.parentNode;
    }
    walker = new TreeWalker(
        block, SHOW_ELEMENT|SHOW_TEXT, notWSTextNode );
    walker.currentNode = br;
    return !!walker.nextNode();
};

// <br> elements are treated specially, and differently depending on the
// browser, when in rich text editor mode. When adding HTML from external
// sources, we must remove them, replacing the ones that actually affect
// line breaks with a split of the block element containing it (and wrapping
// any not inside a block). Browsers that want <br> elements at the end of
// each block will then have them added back in a later fixCursor method
// call.
var cleanupBRs = function ( root ) {
    var brs = root.querySelectorAll( 'BR' ),
        brBreaksLine = [],
        l = brs.length,
        i, br, block;

    // Must calculate whether the <br> breaks a line first, because if we
    // have two <br>s next to each other, after the first one is converted
    // to a block split, the second will be at the end of a block and
    // therefore seem to not be a line break. But in its original context it
    // was, so we should also convert it to a block split.
    for ( i = 0; i < l; i += 1 ) {
        brBreaksLine[i] = isLineBreak( brs[i] );
    }
    while ( l-- ) {
        br = brs[l];
        // Cleanup may have removed it
        block = br.parentNode;
        if ( !block ) { continue; }
        while ( isInline( block ) ) {
            block = block.parentNode;
        }
        // If this is not inside a block, replace it by wrapping
        // inlines in a <div>.
        if ( !isBlock( block ) ) {
            fixContainer( block );
        }
        else {
            // If it doesn't break a line, just remove it; it's not doing
            // anything useful. We'll add it back later if required by the
            // browser. If it breaks a line, split the block or leave it as
            // appropriate.
            if ( brBreaksLine[l] ) {
                // If in a <div>, split, but anywhere else we might change
                // the formatting too much (e.g. <li> -> to two list items!)
                // so just play it safe and leave it.
                if ( block.nodeName !== 'DIV' ) {
                    continue;
                }
                split( br.parentNode, br, block.parentNode );
            }
            detach( br );
        }
    }
};

proto._ensureBottomLine = function () {
    var body = this._body,
        div = body.lastChild;
    if ( !div || div.nodeName !== 'DIV' || !isBlock( div ) ) {
        body.appendChild( this.createDefaultBlock() );
    }
};

// --- Cut and Paste ---

proto._onCut = function () {
    // Save undo checkpoint
    var range = this.getSelection();
    var self = this;
    this._recordUndoState( range );
    this._getRangeAndRemoveBookmark( range );
    this.setSelection( range );
    setTimeout( function () {
        try {
            // If all content removed, ensure div at start of body.
            self._ensureBottomLine();
        } catch ( error ) {
            self.didError( error );
        }
    }, 0 );
};

proto._onPaste = function ( event ) {
    if ( this._awaitingPaste ) { return; }

    // Treat image paste as a drop of an image file.
    var clipboardData = event.clipboardData,
        items = clipboardData && clipboardData.items,
        fireDrop = false,
        hasImage = false,
        l, type;
    if ( items ) {
        l = items.length;
        while ( l-- ) {
            type = items[l].type;
            if ( type === 'text/html' ) {
                hasImage = false;
                break;
            }
            if ( /^image\/.*/.test( type ) ) {
                hasImage = true;
            }
        }
        if ( hasImage ) {
            event.preventDefault();
                this.fireEvent( 'dragover', {
                dataTransfer: clipboardData,
                /*jshint loopfunc: true */
                preventDefault: function () {
                    fireDrop = true;
                }
                /*jshint loopfunc: false */
            });
            if ( fireDrop ) {
                this.fireEvent( 'drop', {
                    dataTransfer: clipboardData
                });
            }
            return;
        }
    }

    this._awaitingPaste = true;

    var self = this,
        body = this._body,
        range = this.getSelection(),
        startContainer = range.startContainer,
        startOffset = range.startOffset,
        endContainer = range.endContainer,
        endOffset = range.endOffset,
        startBlock = getStartBlockOfRange( range );

    // Record undo checkpoint
    self._recordUndoState( range );
    self._getRangeAndRemoveBookmark( range );

    // We need to position the pasteArea in the visible portion of the screen
    // to stop the browser auto-scrolling.
    var pasteArea = this.createElement( 'DIV', {
        style: 'position: absolute; overflow: hidden; top:' +
            ( body.scrollTop +
                ( startBlock ? startBlock.getBoundingClientRect().top : 0 ) ) +
            'px; left: 0; width: 1px; height: 1px;'
    });
    body.appendChild( pasteArea );
    range.selectNodeContents( pasteArea );
    this.setSelection( range );

    // A setTimeout of 0 means this is added to the back of the
    // single javascript thread, so it will be executed after the
    // paste event.
    setTimeout( function () {
        try {
            // Get the pasted content and clean
            var frag = empty( detach( pasteArea ) ),
                first = frag.firstChild,
                range = self._createRange(
                    startContainer, startOffset, endContainer, endOffset );

            // Was anything actually pasted?
            if ( first ) {
                // Safari and IE like putting extra divs around things.
                if ( first === frag.lastChild &&
                        first.nodeName === 'DIV' ) {
                    frag.replaceChild( empty( first ), first );
                }

                frag.normalize();
                addLinks( frag );
                cleanTree( frag, false );
                cleanupBRs( frag );
                removeEmptyInlines( frag );

                var node = frag,
                    doPaste = true;
                while ( node = getNextBlock( node ) ) {
                    fixCursor( node );
                }

                self.fireEvent( 'willPaste', {
                    fragment: frag,
                    preventDefault: function () {
                        doPaste = false;
                    }
                });

                // Insert pasted data
                if ( doPaste ) {
                    insertTreeFragmentIntoRange( range, frag );
                    self._docWasChanged();
                    range.collapse( false );
                    self._ensureBottomLine();
                }
            }

            self.setSelection( range );
            self._updatePath( range, true );

            self._awaitingPaste = false;
        } catch ( error ) {
            self.didError( error );
        }
    }, 0 );
};

// --- Keyboard interaction ---

var keys = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    32: 'space',
    37: 'left',
    39: 'right',
    46: 'delete',
    219: '[',
    221: ']'
};

var mapKeyTo = function ( method ) {
    return function ( self, event ) {
        event.preventDefault();
        self[ method ]();
    };
};

var mapKeyToFormat = function ( tag, remove ) {
    remove = remove || null;
    return function ( self, event ) {
        event.preventDefault();
        var range = self.getSelection();
        if ( self.hasFormat( tag, null, range ) ) {
            self.changeFormat( null, { tag: tag }, range );
        } else {
            self.changeFormat( { tag: tag }, remove, range );
        }
    };
};

// If you delete the content inside a span with a font styling, Webkit will
// replace it with a <font> tag (!). If you delete all the text inside a
// link in Opera, it won't delete the link. Let's make things consistent. If
// you delete all text inside an inline tag, remove the inline tag.
var afterDelete = function ( self ) {
    try {
        var range = self.getSelection(),
            node = range.startContainer,
            parent;
        if ( node.nodeType === TEXT_NODE ) {
            node = node.parentNode;
        }
        // If focussed in empty inline element
        if ( isInline( node ) && !node.textContent ) {
            do {
                parent = node.parentNode;
            } while ( isInline( parent ) &&
                !parent.textContent && ( node = parent ) );
            range.setStart( parent,
                indexOf.call( parent.childNodes, node ) );
            range.collapse( true );
            parent.removeChild( node );
            if ( !isBlock( parent ) ) {
                parent = getPreviousBlock( parent );
            }
            fixCursor( parent );
            moveRangeBoundariesDownTree( range );
            self.setSelection( range );
            self._updatePath( range );
        }
        self._ensureBottomLine();
    } catch ( error ) {
        self.didError( error );
    }
};

// If you select all in IE8 then type, it makes a P; replace it with
// a DIV.
if ( isIE8 ) {
    proto._ieSelAllClean = function () {
        var firstChild = this._body.firstChild;
        if ( firstChild.nodeName === 'P' ) {
            this._saveRangeToBookmark( this.getSelection() );
            replaceWith( firstChild, this.createDefaultBlock([
                empty( firstChild )
            ]));
            this.setSelection( this._getRangeAndRemoveBookmark() );
        }
    };
}

var keyHandlers = {
    enter: function ( self, event ) {
        // We handle this ourselves
        event.preventDefault();

        // Must have some form of selection
        var range = self.getSelection(),
            block, parent, tag, splitTag, nodeAfterSplit;
        if ( !range ) { return; }

        // Save undo checkpoint and add any links in the preceding section.
        // Remove any zws so we don't think there's content in an empty
        // block.
        self._recordUndoState( range );
        addLinks( range.startContainer );
        self._removeZWS();
        self._getRangeAndRemoveBookmark( range );

        // Selected text is overwritten, therefore delete the contents
        // to collapse selection.
        if ( !range.collapsed ) {
            deleteContentsOfRange( range );
        }

        block = getStartBlockOfRange( range );
        if ( block && ( parent = getNearest( block, 'LI' ) ) ) {
            block = parent;
        }
        tag = block ? block.nodeName : 'DIV';
        splitTag = tagAfterSplit[ tag ];

        // If this is a malformed bit of document, just play it safe
        // and insert a <br>.
        if ( !block ) {
            insertNodeInRange( range, self.createElement( 'BR' ) );
            range.collapse( false );
            self.setSelection( range );
            self._updatePath( range, true );
            self._docWasChanged();
            return;
        }

        // We need to wrap the contents in divs.
        var splitNode = range.startContainer,
            splitOffset = range.startOffset,
            replacement;
        if ( !splitTag ) {
            // If the selection point is inside the block, we're going to
            // rewrite it so our saved reference points won't be valid.
            // Pick a node at a deeper point in the tree to avoid this.
            if ( splitNode === block ) {
                splitNode = splitOffset ?
                    splitNode.childNodes[ splitOffset - 1 ] : null;
                splitOffset = 0;
                if ( splitNode ) {
                    if ( splitNode.nodeName === 'BR' ) {
                        splitNode = splitNode.nextSibling;
                    } else {
                        splitOffset = getLength( splitNode );
                    }
                    if ( !splitNode || splitNode.nodeName === 'BR' ) {
                        replacement = fixCursor( self.createElement( 'DIV' ) );
                        if ( splitNode ) {
                            block.replaceChild( replacement, splitNode );
                        } else {
                            block.appendChild( replacement );
                        }
                        splitNode = replacement;
                    }
                }
            }
            fixContainer( block );
            splitTag = 'DIV';
            if ( !splitNode ) {
                splitNode = block.firstChild;
            }
            range.setStart( splitNode, splitOffset );
            range.setEnd( splitNode, splitOffset );
            block = getStartBlockOfRange( range );
        }

        if ( !block.textContent ) {
            // Break list
            if ( getNearest( block, 'UL' ) || getNearest( block, 'OL' ) ) {
                return self.modifyBlocks( decreaseListLevel, range );
            }
            // Break blockquote
            else if ( getNearest( block, 'BLOCKQUOTE' ) ) {
                return self.modifyBlocks( removeBlockQuote, range );
            }
        }

        // Otherwise, split at cursor point.
        nodeAfterSplit = splitBlock( block, splitNode, splitOffset );

        // Focus cursor
        // If there's a <b>/<i> etc. at the beginning of the split
        // make sure we focus inside it.
        while ( nodeAfterSplit.nodeType === ELEMENT_NODE ) {
            var child = nodeAfterSplit.firstChild,
                next;

            // Don't continue links over a block break; unlikely to be the
            // desired outcome.
            if ( nodeAfterSplit.nodeName === 'A' ) {
                replaceWith( nodeAfterSplit, empty( nodeAfterSplit ) );
                nodeAfterSplit = child;
                continue;
            }

            while ( child && child.nodeType === TEXT_NODE && !child.data ) {
                next = child.nextSibling;
                if ( !next || next.nodeName === 'BR' ) {
                    break;
                }
                detach( child );
                child = next;
            }

            // 'BR's essentially don't count; they're a browser hack.
            // If you try to select the contents of a 'BR', FF will not let
            // you type anything!
            if ( !child || child.nodeName === 'BR' ||
                    ( child.nodeType === TEXT_NODE && !isPresto ) ) {
                break;
            }
            nodeAfterSplit = child;
        }
        range = self._createRange( nodeAfterSplit, 0 );
        self.setSelection( range );
        self._updatePath( range, true );

        // Scroll into view
        if ( nodeAfterSplit.nodeType === TEXT_NODE ) {
            nodeAfterSplit = nodeAfterSplit.parentNode;
        }
        var doc = self._doc,
            body = self._body;
        if ( nodeAfterSplit.offsetTop + nodeAfterSplit.offsetHeight >
                ( doc.documentElement.scrollTop || body.scrollTop ) +
                body.offsetHeight ) {
            nodeAfterSplit.scrollIntoView( false );
        }

        // We're not still in an undo state
        self._docWasChanged();
    },
    backspace: function ( self, event ) {
        self._removeZWS();
        // Record undo checkpoint.
        var range = self.getSelection();
        self._recordUndoState( range );
        self._getRangeAndRemoveBookmark( range );
        // If not collapsed, delete contents
        if ( !range.collapsed ) {
            event.preventDefault();
            deleteContentsOfRange( range );
            self._ensureBottomLine();
            self.setSelection( range );
            self._updatePath( range, true );
        }
        // If at beginning of block, merge with previous
        else if ( rangeDoesStartAtBlockBoundary( range ) ) {
            event.preventDefault();
            var current = getStartBlockOfRange( range ),
                previous = current && getPreviousBlock( current );
            // Must not be at the very beginning of the text area.
            if ( previous ) {
                // If not editable, just delete whole block.
                if ( !previous.isContentEditable ) {
                    detach( previous );
                    return;
                }
                // Otherwise merge.
                mergeWithBlock( previous, current, range );
                // If deleted line between containers, merge newly adjacent
                // containers.
                current = previous.parentNode;
                while ( current && !current.nextSibling ) {
                    current = current.parentNode;
                }
                if ( current && ( current = current.nextSibling ) ) {
                    mergeContainers( current );
                }
                self.setSelection( range );
            }
            // If at very beginning of text area, allow backspace
            // to break lists/blockquote.
            else if ( current ) {
                // Break list
                if ( getNearest( current, 'UL' ) ||
                        getNearest( current, 'OL' ) ) {
                    return self.modifyBlocks( decreaseListLevel, range );
                }
                // Break blockquote
                else if ( getNearest( current, 'BLOCKQUOTE' ) ) {
                    return self.modifyBlocks( decreaseBlockQuoteLevel, range );
                }
                self.setSelection( range );
                self._updatePath( range, true );
            }
        }
        // Otherwise, leave to browser but check afterwards whether it has
        // left behind an empty inline tag.
        else {
            self.setSelection( range );
            setTimeout( function () { afterDelete( self ); }, 0 );
        }
    },
    'delete': function ( self, event ) {
        self._removeZWS();
        // Record undo checkpoint.
        var range = self.getSelection();
        self._recordUndoState( range );
        self._getRangeAndRemoveBookmark( range );
        // If not collapsed, delete contents
        if ( !range.collapsed ) {
            event.preventDefault();
            deleteContentsOfRange( range );
            self._ensureBottomLine();
            self.setSelection( range );
            self._updatePath( range, true );
        }
        // If at end of block, merge next into this block
        else if ( rangeDoesEndAtBlockBoundary( range ) ) {
            event.preventDefault();
            var current = getStartBlockOfRange( range ),
                next = current && getNextBlock( current );
            // Must not be at the very end of the text area.
            if ( next ) {
                // If not editable, just delete whole block.
                if ( !next.isContentEditable ) {
                    detach( next );
                    return;
                }
                // Otherwise merge.
                mergeWithBlock( current, next, range );
                // If deleted line between containers, merge newly adjacent
                // containers.
                next = current.parentNode;
                while ( next && !next.nextSibling ) {
                    next = next.parentNode;
                }
                if ( next && ( next = next.nextSibling ) ) {
                    mergeContainers( next );
                }
                self.setSelection( range );
                self._updatePath( range, true );
            }
        }
        // Otherwise, leave to browser but check afterwards whether it has
        // left behind an empty inline tag.
        else {
            self.setSelection( range );
            setTimeout( function () { afterDelete( self ); }, 0 );
        }
    },
    tab: function ( self, event ) {
        self._removeZWS();
        var range = self.getSelection(),
            node, parent;
        // If no selection and in an empty block
        if ( range.collapsed &&
                rangeDoesStartAtBlockBoundary( range ) &&
                rangeDoesEndAtBlockBoundary( range ) ) {
            node = getStartBlockOfRange( range );
            // Iterate through the block's parents
            while ( parent = node.parentNode ) {
                // If we find a UL or OL (so are in a list, node must be an LI)
                if ( parent.nodeName === 'UL' || parent.nodeName === 'OL' ) {
                    // AND the LI is not the first in the list
                    if ( node.previousSibling ) {
                        // Then increase the list level
                        event.preventDefault();
                        self.modifyBlocks( increaseListLevel, range );
                    }
                    break;
                }
                node = parent;
            }
            event.preventDefault();
        }
    },
    space: function ( self ) {
        var range = self.getSelection();
        self._recordUndoState( range );
        addLinks( range.startContainer );
        self._getRangeAndRemoveBookmark( range );
        self.setSelection( range );
    },
    left: function ( self ) {
        self._removeZWS();
    },
    right: function ( self ) {
        self._removeZWS();
    }
};

// Firefox incorrectly handles Cmd-left/Cmd-right on Mac:
// it goes back/forward in history! Override to do the right
// thing.
// https://bugzilla.mozilla.org/show_bug.cgi?id=289384
if ( isMac && isGecko && win.getSelection().modify ) {
    keyHandlers[ 'meta-left' ] = function ( self, event ) {
        event.preventDefault();
        self._sel.modify( 'move', 'backward', 'lineboundary' );
    };
    keyHandlers[ 'meta-right' ] = function ( self, event ) {
        event.preventDefault();
        self._sel.modify( 'move', 'forward', 'lineboundary' );
    };
}

keyHandlers[ ctrlKey + 'b' ] = mapKeyToFormat( 'B' );
keyHandlers[ ctrlKey + 'i' ] = mapKeyToFormat( 'I' );
keyHandlers[ ctrlKey + 'u' ] = mapKeyToFormat( 'U' );
keyHandlers[ ctrlKey + 'shift-7' ] = mapKeyToFormat( 'S' );
keyHandlers[ ctrlKey + 'shift-5' ] = mapKeyToFormat( 'SUB', { tag: 'SUP' } );
keyHandlers[ ctrlKey + 'shift-6' ] = mapKeyToFormat( 'SUP', { tag: 'SUB' } );
keyHandlers[ ctrlKey + 'shift-8' ] = mapKeyTo( 'makeUnorderedList' );
keyHandlers[ ctrlKey + 'shift-9' ] = mapKeyTo( 'makeOrderedList' );
keyHandlers[ ctrlKey + '[' ] = mapKeyTo( 'decreaseQuoteLevel' );
keyHandlers[ ctrlKey + ']' ] = mapKeyTo( 'increaseQuoteLevel' );
keyHandlers[ ctrlKey + 'y' ] = mapKeyTo( 'redo' );
keyHandlers[ ctrlKey + 'z' ] = mapKeyTo( 'undo' );
keyHandlers[ ctrlKey + 'shift-z' ] = mapKeyTo( 'redo' );

// Ref: http://unixpapa.com/js/key.html
proto._onKey = function ( event ) {
    var code = event.keyCode,
        key = keys[ code ],
        modifiers = '';

    if ( !key ) {
        key = String.fromCharCode( code ).toLowerCase();
        // Only reliable for letters and numbers
        if ( !/^[A-Za-z0-9]$/.test( key ) ) {
            key = '';
        }
    }

    // On keypress, delete and '.' both have event.keyCode 46
    // Must check event.which to differentiate.
    if ( isPresto && event.which === 46 ) {
        key = '.';
    }

    // Function keys
    if ( 111 < code && code < 124 ) {
        key = 'f' + ( code - 111 );
    }

    // We need to apply the backspace/delete handlers regardless of
    // control key modifiers.
    if ( key !== 'backspace' && key !== 'delete' ) {
        if ( event.altKey  ) { modifiers += 'alt-'; }
        if ( event.ctrlKey ) { modifiers += 'ctrl-'; }
        if ( event.metaKey ) { modifiers += 'meta-'; }
    }
    // However, on Windows, shift-delete is apparently "cut" (WTF right?), so
    // we want to let the browser handle shift-delete.
    if ( event.shiftKey ) { modifiers += 'shift-'; }

    key = modifiers + key;

    if ( keyHandlers[ key ] ) {
        keyHandlers[ key ]( this, event );
    }
};

// --- Get/Set data ---

proto._getHTML = function () {
    return this._body.innerHTML;
};

proto._setHTML = function ( html ) {
    var node = this._body;
    node.innerHTML = html;
    do {
        fixCursor( node );
    } while ( node = getNextBlock( node ) );
};

proto.getHTML = function ( withBookMark ) {
    var brs = [],
        node, fixer, html, l, range;
    if ( withBookMark && ( range = this.getSelection() ) ) {
        this._saveRangeToBookmark( range );
    }
    if ( useTextFixer ) {
        node = this._body;
        while ( node = getNextBlock( node ) ) {
            if ( !node.textContent && !node.querySelector( 'BR' ) ) {
                fixer = this.createElement( 'BR' );
                node.appendChild( fixer );
                brs.push( fixer );
            }
        }
    }
    html = this._getHTML().replace( /\u200B/g, '' );
    if ( useTextFixer ) {
        l = brs.length;
        while ( l-- ) {
            detach( brs[l] );
        }
    }
    if ( range ) {
        this._getRangeAndRemoveBookmark( range );
    }
    return html;
};

proto.setHTML = function ( html ) {
    var frag = this._doc.createDocumentFragment(),
        div = this.createElement( 'DIV' ),
        child;

    // Parse HTML into DOM tree
    div.innerHTML = html;
    frag.appendChild( empty( div ) );

    cleanTree( frag, true );
    cleanupBRs( frag );

    fixContainer( frag );

    // Fix cursor
    var node = frag;
    while ( node = getNextBlock( node ) ) {
        fixCursor( node );
    }

    // Remove existing body children
    var body = this._body;
    while ( child = body.lastChild ) {
        body.removeChild( child );
    }

    // And insert new content
    body.appendChild( frag );
    fixCursor( body );

    // Reset the undo stack
    this._undoIndex = -1;
    this._undoStack.length = 0;
    this._undoStackLength = 0;
    this._isInUndoState = false;

    // Record undo state
    var range = this._getRangeAndRemoveBookmark() ||
        this._createRange( body.firstChild, 0 );
    this._recordUndoState( range );
    this._getRangeAndRemoveBookmark( range );
    // IE will also set focus when selecting text so don't use
    // setSelection. Instead, just store it in lastSelection, so if
    // anything calls getSelection before first focus, we have a range
    // to return.
    if ( losesSelectionOnBlur ) {
        this._lastSelection = range;
    } else {
        this.setSelection( range );
    }
    this._updatePath( range, true );

    return this;
};

proto.insertElement = function ( el, range ) {
    if ( !range ) { range = this.getSelection(); }
    range.collapse( true );
    if ( isInline( el ) ) {
        insertNodeInRange( range, el );
        range.setStartAfter( el );
    } else {
        // Get containing block node.
        var body = this._body,
            splitNode = getStartBlockOfRange( range ) || body,
            parent, nodeAfterSplit;
        // While at end of container node, move up DOM tree.
        while ( splitNode !== body && !splitNode.nextSibling ) {
            splitNode = splitNode.parentNode;
        }
        // If in the middle of a container node, split up to body.
        if ( splitNode !== body ) {
            parent = splitNode.parentNode;
            nodeAfterSplit = split( parent, splitNode.nextSibling, body );
        }
        if ( nodeAfterSplit ) {
            body.insertBefore( el, nodeAfterSplit );
            range.setStart( nodeAfterSplit, 0 );
            range.setStart( nodeAfterSplit, 0 );
            moveRangeBoundariesDownTree( range );
        } else {
            body.appendChild( el );
            // Insert blank line below block.
            body.appendChild( this.createDefaultBlock() );
            range.setStart( el, 0 );
            range.setEnd( el, 0 );
        }
        this.focus();
        this.setSelection( range );
        this._updatePath( range );
    }
    return this;
};

proto.insertImage = function ( src ) {
    var img = this.createElement( 'IMG', {
        src: src
    });
    this.insertElement( img );
    return img;
};

// --- Formatting ---

var command = function ( method, arg, arg2 ) {
    return function () {
        this[ method ]( arg, arg2 );
        return this.focus();
    };
};

proto.addStyles = function ( styles ) {
    if ( styles ) {
        var head = this._doc.documentElement.firstChild,
            style = this.createElement( 'STYLE', {
                type: 'text/css'
            });
        if ( style.styleSheet ) {
            // IE8: must append to document BEFORE adding styles
            // or you get the IE7 CSS parser!
            head.appendChild( style );
            style.styleSheet.cssText = styles;
        } else {
            // Everyone else
            style.appendChild( this._doc.createTextNode( styles ) );
            head.appendChild( style );
        }
    }
    return this;
};

proto.bold = command( 'changeFormat', { tag: 'B' } );
proto.italic = command( 'changeFormat', { tag: 'I' } );
proto.underline = command( 'changeFormat', { tag: 'U' } );
proto.strikethrough = command( 'changeFormat', { tag: 'S' } );
proto.subscript = command( 'changeFormat', { tag: 'SUB' }, { tag: 'SUP' } );
proto.superscript = command( 'changeFormat', { tag: 'SUP' }, { tag: 'SUB' } );

proto.removeBold = command( 'changeFormat', null, { tag: 'B' } );
proto.removeItalic = command( 'changeFormat', null, { tag: 'I' } );
proto.removeUnderline = command( 'changeFormat', null, { tag: 'U' } );
proto.removeStrikethrough = command( 'changeFormat', null, { tag: 'S' } );
proto.removeSubscript = command( 'changeFormat', null, { tag: 'SUB' } );
proto.removeSuperscript = command( 'changeFormat', null, { tag: 'SUP' } );

proto.makeLink = function ( url ) {
    var range = this.getSelection();
    if ( range.collapsed ) {
        var protocolEnd = url.indexOf( ':' ) + 1;
        if ( protocolEnd ) {
            while ( url[ protocolEnd ] === '/' ) { protocolEnd += 1; }
        }
        insertNodeInRange(
            range,
            this._doc.createTextNode( url.slice( protocolEnd ) )
        );
    }
    this.changeFormat({
        tag: 'A',
        attributes: {
            href: url
        }
    }, {
        tag: 'A'
    }, range );
    return this.focus();
};
proto.removeLink = function () {
    this.changeFormat( null, {
        tag: 'A'
    }, this.getSelection(), true );
    return this.focus();
};

proto.setFontFace = function ( name ) {
    this.changeFormat({
        tag: 'SPAN',
        attributes: {
            'class': 'font',
            style: 'font-family: ' + name + ', sans-serif;'
        }
    }, {
        tag: 'SPAN',
        attributes: { 'class': 'font' }
    });
    return this.focus();
};
proto.setFontSize = function ( size ) {
    this.changeFormat({
        tag: 'SPAN',
        attributes: {
            'class': 'size',
            style: 'font-size: ' +
                ( typeof size === 'number' ? size + 'px' : size )
        }
    }, {
        tag: 'SPAN',
        attributes: { 'class': 'size' }
    });
    return this.focus();
};

proto.setTextColour = function ( colour ) {
    this.changeFormat({
        tag: 'SPAN',
        attributes: {
            'class': 'colour',
            style: 'color: ' + colour
        }
    }, {
        tag: 'SPAN',
        attributes: { 'class': 'colour' }
    });
    return this.focus();
};

proto.setHighlightColour = function ( colour ) {
    this.changeFormat({
        tag: 'SPAN',
        attributes: {
            'class': 'highlight',
            style: 'background-color: ' + colour
        }
    }, {
        tag: 'SPAN',
        attributes: { 'class': 'highlight' }
    });
    return this.focus();
};

proto.setTextAlignment = function ( alignment ) {
    this.forEachBlock( function ( block ) {
        block.className = ( block.className
            .split( /\s+/ )
            .filter( function ( klass ) {
                return !( /align/.test( klass ) );
            })
            .join( ' ' ) +
            ' align-' + alignment ).trim();
        block.style.textAlign = alignment;
    }, true );
    return this.focus();
};

proto.setTextDirection = function ( direction ) {
    this.forEachBlock( function ( block ) {
        block.className = ( block.className
            .split( /\s+/ )
            .filter( function ( klass ) {
                return !( /dir/.test( klass ) );
            })
            .join( ' ' ) +
            ' dir-' + direction ).trim();
        block.dir = direction;
    }, true );
    return this.focus();
};

proto.increaseQuoteLevel = command( 'modifyBlocks', increaseBlockQuoteLevel );
proto.decreaseQuoteLevel = command( 'modifyBlocks', decreaseBlockQuoteLevel );

proto.makeUnorderedList = command( 'modifyBlocks', makeUnorderedList );
proto.makeOrderedList = command( 'modifyBlocks', makeOrderedList );
proto.removeList = command( 'modifyBlocks', removeList );

proto.increaseListLevel = command( 'modifyBlocks', increaseListLevel );
proto.decreaseListLevel = command( 'modifyBlocks', decreaseListLevel );

if ( top !== win ) {
    win.editor = new Squire( doc );
    if ( win.onEditorLoad ) {
        win.onEditorLoad( win.editor );
        win.onEditorLoad = null;
    }
} else {
    win.Squire = Squire;
}

}( document ) );
jQuery(document).ready(function($) {
	// new Squire([document.getElementById('stack-frame').contentWindow.document.getElementById('stack-body')]);

	//
	// Hide open interfaces and the modal mask when the mask is clicked.
	//
	var mask = '.modal-mask';
	var openInterface = '.open';
	var dHeight = $(document).height();
	$(mask).css("height", (dHeight));
	$(mask).on('click', function() {
		$(openInterface).removeClass('open');
		return false;
	});

	//
	// Hide open interfaces if escape key is pressed
	//
	$(document).keyup(function(e) {
	  if (e.keyCode == 27) { // Escape key
		$(openInterface).removeClass('open');
			return false;
	  }
	});

	//
	// Screenshot capture of a stack http://jamshidhashimi.com/2013/03/24/get-snapshot-of-a-page-section/
	//
	// $('#stackCreate').on('click', function() {
	// 	html2canvas([document.getElementById('stack-frame').contentWindow.document.getElementById('stack-body')], {   
	// 		onrendered: function(canvas) {
	// 			var img = canvas.toDataURL()
	// 			$.post(templateDir+'/save-stack-preview.php', {data: img}, function (file) {});
	// 			letterRendering = true;  
	// 		}
	// 	});         
	// });

	$('#stackCreate').on('click', function() {
		html2canvas([document.getElementById('stack-frame').contentWindow.document.getElementById('stack-body')], {   
			onrendered: function(canvas) {
				//Set hidden field's value to image data (base-64 string)
        $('#img_val').val(canvas.toDataURL("image/png"));
        //Submit the form manually
        document.getElementById("stackBuilderForm").submit();
				letterRendering = true;  
			}
		});         
	});

	// $('#stackPreview').on('click', function printDiv(div) {
	// 	alert(templateDir+'/save-stack-preview.php');        
	// });

	//
	// Dedupe an array
	//
	function unique(list) {
	 var result = [];
	 $.each(list, function(i, e) {
		  if ($.inArray(e, result) == -1) result.push(e);
	 });
	 return result;
	};
  
  //
  // Show font list when the typeface button is clicked.
  //
  $('[data-stck-switch="font-list"]').on('click', function() {
		$('#font-list').addClass('open');
		$(mask).addClass('open');
	 
		// Scroll list to active typeface
		$('#font-list').scrollTop(($('#font-list li.active').position().top) - 175);// this works, just need to get the active class applied accurately
		return false;
  });
  
  //
  // Check against font name "database" (haha, see: var fonts =[...]) and populate the font picker
  //
  if('#font-list') {
		// http://www.lalit.org/lab/javascript-css-font-detect/
		var Detector = function() {

			// a font will be compared against all the three default fonts.
			// and if it doesn't match all 3 then that font is not available.
			var baseFonts = ['monospace', 'sans-serif', 'serif'];
			
			// we use m or w because these two characters take up the maximum width.
			// And we use a LLi so that the same matching fonts can get separated
			var testString = "mmmmmmmmmmlli";
		
			//we test using 144px font size, we may use any size. I guess larger the better.
			var testSize = '144px';
			var h = document.getElementsByTagName("body")[0];
			
			// create a SPAN in the document to get the width of the text we use to test
			var s = document.createElement("span");
			s.style.fontSize = testSize;
			s.innerHTML = testString;
			var defaultWidth = {};
			var defaultHeight = {};
			for (var index in baseFonts) {
				//get the default width for the three base fonts
				s.style.fontFamily = baseFonts[index];
				h.appendChild(s);
				defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
				defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
				h.removeChild(s);
			}
			function detect(font) {
				var detected = false;
				for (var index in baseFonts) {
					s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
					h.appendChild(s);
					var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
					h.removeChild(s);
					detected = detected || matched;
				}
				return detected;
			}
			this.detect = detect;
		};
		var fonts = [
			// "Al Bayan",
			"American Typewriter",
			"Andale Mono",
			"Apple Casual",
			"Apple Chancery",
			"Apple Garamond",
			"Apple Gothic",
			"Apple LiGothic",
			"Apple LiSung",
			"Apple Myungjo",
			"Apple Symbols",
			"AquaKana",
			"Arial",
			"Arial Hebrew",
			"Ayuthaya",
			"Baghdad",
			"Baskerville",
			"Beijing",
			"BiauKai",
			"Big Caslon",
			"Brush Script",
			"Chalkboard",
			"Chalkduster",
			"Charcoal",
			"Charcoal CY",
			"Chicago",
			"Cochin",
			"Comic Sans",
			"Cooper",
			"Copperplate",
			"Corsiva Hebrew",
			"Courier",
			"Courier New",
			"DecoType Naskh",
			"Devanagari",
			"Didot",
			"Euphemia UCAS",
			"Fang Song",
			"Futura",
			"Gadget",
			"Geeza Pro",
			"Geezah",
			"Geneva",
			"Geneva CY",
			"Georgia",
			"Gill Sans",
			"Gujarati",
			"Gung Seoche",
			"Gurmukhi",
			"Hangangche",
			"HeadlineA",
			"Hei",
			"Helvetica",
			"Helvetica CY",
			"Helvetica Neue",
			"Herculanum",
			"Hiragino Kaku Gothic Pro",
			"Hiragino Kaku Gothic ProN",
			"Hiragino Kaku Gothic Std",
			"Hiragino Kaku Gothic StdN",
			"Hiragino Maru Gothic Pro",
			"Hiragino Maru Gothic ProN",
			"Hiragino Mincho Pro",
			"Hiragino Mincho ProN",
			"Hoefler Text",
			"Inai Mathi",
			"Impact",
			"Jung Gothic",
			"Kai",
			"Keyboard",
			"Krungthep",
			"KufiStandard GK",
			// "LastResort",  display issues
			"LiHei Pro",
			"LiSong Pro",
			"Lucida Grande",
			"Marker Felt",
			"Menlo",
			"Monaco",
			"Monaco CY",
			"Mshtakan",
			"Nadeem",
			"New Peninim",
			"New York",
			"NISC GB18030",
			"Optima",
			"Osaka",
			"Palatino",
			"Papyrus",
			"PC Myungjo",
			"Pilgiche",
			"Plantagenet Cherokee",
			"Raanana",
			"Sand",
			"Sathu",
			"Seoul",
			"Shin Myungjo Neue",
			"Silom",
			"Skia",
			"Song",
			"ST FangSong",
			"ST Heiti",
			"ST Kaiti",
			"ST Song",
			"Symbol",
			"Tae Graphic",
			"Tahoma",
			"Taipei",
			"Techno",
			"Textile",
			"Thonburi",
			"Times",
			"Times CY",
			"Times New Roman",
			"Trebuchet MS",
			"Verdana",
			"Zapf Chancery",
			"Zapf Dingbats",
			"Zapfinofonts",
			// Windows Fonts - http://en.wikipedia.org/wiki/List_of_Microsoft_Windows_fonts
			"Abadi MT Condensed Light",
			"Aharoni",
			"Aldhabi",
			"Andalus",
			"Angsana New",
			"AngsanaUPC",
			"Aparajita",
			"Arabic Typesetting",
			"Arial",
			"Arial Black",
			"Batang",
			"BatangChe",
			"Book Antiqua",
			"Browallia New",
			"BrowalliaUPC",
			"Calibri",
			"Calibri Light",
			"Calisto MT",
			"Cambria",
			"Cambria Math",
			"Candara",
			"Century Gothic",
			"Comic Sans MS",
			"Consolas",
			"Constantia",
			"Copperplate GothicBold",
			"Copperplate Gothic Light",
			"Corbel",
			"Cordia New",
			"CordiaUPC",
			"Courier New",
			"DaunPenh",
			"David",
			"DFKai-SB",
			"DilleniaUPC",
			"DokChampa",
			"Dotum",
			"DotumChe",
			"Ebrima",
			"Estrangelo Edessa",
			"EucrosiaUPC",
			"Euphemia",
			"FangSong",
			"Franklin Gothic Medium",
			"FrankRuehl",
			"FreesiaUPC",
			"Gabriola",
			"Gadugi",
			"Gautami",
			"Georgia",
			"Gisha",
			"Gulim",
			"GulimChe",
			"Gungsuh",
			"GungsuhChe",
			"Impact",
			"IrisUPC",
			"Iskoola Pota",
			"JasmineUPC",
			"KaiTi",
			"Kalinga",
			"Kartika",
			"Khmer UI",
			"KodchiangUPC",
			"Kokila",
			"Lao UI",
			"Latha",
			"Leelawadee",
			"Levenim MT",
			"LilyUPC",
			"Lucida Console",
			"Lucida Handwriting Italic",
			"Lucida Sans Unicode",
			"Malgun Gothic",
			"Mangal",
			"Marlett",
			"Meiryo",
			"Meiryo UI",
			"Microsoft Himalaya",
			"Microsoft JhengHei",
			"Microsoft JhengHei UI",
			"Microsoft New Tai Lue",
			"Microsoft PhagsPa",
			"Microsoft Sans Serif",
			"Microsoft Tai Le",
			"Microsoft Uighur",
			"Microsoft YaHei",
			"Microsoft YaHei UI",
			"Microsoft Yi Baiti",
			"MingLiU, PMingLiU",
			"MingLiU-ExtB, PMingLiU-ExtB",
			"MingLiU_HKSCS",
			"MingLiU_HKSCS-ExtB",
			"Miriam",
			"Mongolian Baiti",
			"MoolBoran",
			"MS Gothic, MS PGothic",
			"MS Mincho, MS PMincho",
			"MS UI Gothic",
			"MV Boli",
			"Myanmar Text",
			"Narkisim",
			"Nirmala UI",
			"News Gothic MT",
			"NSimSun",
			"Nyala",
			"Palatino Linotype",
			"Plantagenet Cherokee",
			"Raavi",
			"Rod",
			"Sakkal Majalla",
			"Segoe Print",
			"Segoe Script",
			"Segoe UI v5.00[3]",
			"Segoe UI v5.01[4]",
			"Segoe UI v5.27[5]",
			"Segoe UI Symbol",
			"Shonar Bangla",
			"Shruti",
			"SimHei",
			"SimKai",
			"Simplified Arabic",
			"SimSun",
			"SimSun-ExtB",
			"Sylfaen",
			"Symbol",
			"Tahoma",
			"Times New Roman",
			"Traditional Arabic",
			"Trebuchet MS",
			"Tunga",
			"Urdu Typesetting",
			"Utsaah",
			"Vani",
			"Verdana",
			"Vijaya",
			"Vrinda",
			"Webdings",
			"Westminster",
			"Wingdingsfonts.push",
			// Wikipedia List - http://en.wikipedia.org/wiki/List_of_typefaces
			"Adobe Jenson",
			"Adobe Text",
			"Albertus",
			"Aldus",
			"Alexandria",
			"Algerian",
			"American Typewriter",
			"Antiqua",
			"Arno",
			"Aster",
			"Aurora",
			"News 706",
			"Baskerville",
			"Bebas",
			"Bebas Neue",
			"Bell",
			"Bembo",
			"Bembo Schoolbook",
			"Berkeley Old Style",
			"Bernhard Modern",
			"Bodoni",
			"Bauer Bodoni",
			"Book Antiqua",
			"Bookman",
			"Bordeaux Roman",
			"Bulmer",
			"Caledonia",
			"Californian FB",
			"Calisto MT",
			"Cambria",
			"Capitals",
			"Cartier",
			"Caslon",
			"Wyld",
			"Caslon Antique",
			"Fifteenth Century",
			"Catull",
			"Centaur",
			"Century Old Style",
			"Century Schoolbook",
			"New Century Schoolbook",
			"Century Schoolbook Infant",
			"Chaparral",
			"Charis SIL",
			"Charter",
			"Cheltenham",
			"Clearface",
			"Cochin",
			"Colonna",
			"Computer Modern",
			"Concrete Roman",
			"Constantia",
			"Cooper Black",
			"Corona",
			"News 705",
			"DejaVu Serif",
			"Didot",
			"Droid Serif",
			"Ecotype",
			"Elephant",
			"Emerson",
			"Espy Serif",
			"Excelsior",
			"News 702",
			"Fairfield",
			"FF Scala",
			"Footlight",
			"FreeSerif",
			"Friz Quadrata",
			"Garamond",
			"Gentium",
			"Georgia",
			"Gloucester",
			"Goudy",
			"Goudy Old Style",
			"Goudy Pro Font",
			"Goudy Schoolbook",
			"Granjon",
			"Heather",
			"Hercules",
			"High Tower Text",
			"Hiroshige",
			"Hoefler Text",
			"Humana Serif",
			"Imprint",
			"Ionic No. 5",
			"News 701",
			"ITC Benguiat",
			"Janson",
			"Jenson",
			"Joanna",
			"Korinna",
			"Kursivschrift",
			"Legacy Serif",
			"Lexicon",
			"Liberation Serif",
			"Linux Libertine",
			"Literaturnaya",
			"Lucida Bright",
			"Melior",
			"Memphis",
			"Miller",
			"Minion",
			"Modern",
			"Mona Lisa",
			"Mrs Eaves",
			"MS Serif",
			"New York",
			"Nimbus Roman",
			"NPS Rawlinson Roadway",
			"OCR A Extended",
			"Palatino",
			"Book Antiqua",
			"Perpetua",
			"Plantin",
			"Plantin Schoolbook",
			"Playbill",
			"Poor Richard",
			"Renault",
			"Requiem",
			"Roman",
			"Rotis Serif",
			"Sabon",
			"Seagull",
			"Sistina",
			"Souvenir",
			"STIX",
			"Stone Informal",
			"Stone Serif",
			"Sylfaen",
			"Times New Roman",
			"Times",
			"Trajan",
			"Trinité",
			"Trump Mediaeval",
			"Utopia",
			"Vale Type",
			"Vera Serif",
			"Versailles",
			"Wanted",
			"Weiss",
			"Wide Latin",
			"Windsor",
			"XITSfonts",
			"Alexandria",
			"Apex",
			"Archer",
			"Athens",
			"Cholla Slab",
			"City",
			"Clarendon",
			"Concrete Roman",
			"Courier",
			"Egyptienne",
			"Guardian Egyptian",
			"Ionic No. 5",
			"Lexia",
			"Museo Slab",
			"Nilland",
			"Rockwell",
			"Skeleton Antique",
			"Tower",
			"Abadi",
			"Agency FB",
			"Akzidenz-Grotesk",
			"Andalé Sans",
			"Aptifer",
			"Arial",
			"Arial Unicode MS",
			"Avant Garde Gothic",
			"Avenir",
			"Bank Gothic",
			"Barmeno",
			"Bauhaus",
			"Bell Centennial",
			"Bell Gothic",
			"Benguiat Gothic",
			"Berlin Sans",
			"Beteckna",
			"Blue Highway",
			"Brandon Grotesque",
			"Cabin",
			"Cafeteria",
			"Calibri",
			"Casey",
			"Century Gothic",
			"Charcoal",
			"Chicago",
			"Clearface Gothic",
			"Clearview",
			"Co Headline",
			"Co Text",
			"Compacta",
			"Corbel",
			"DejaVu Sans",
			"Dotum",
			"Droid Sans",
			"Dyslexie",
			"Ecofont",
			"Eras",
			"Espy Sans",
			"Nu Sans[1]",
			"Eurocrat",
			"Eurostile",
			"Square 721",
			"FF Dax",
			"FF Meta",
			"FF Scala Sans",
			"Flama",
			"Formata",
			"Franklin Gothic",
			"FreeSans",
			"Frutiger",
			"Frutiger Next",
			"Futura",
			"Geneva",
			"Gill Sans",
			"Gill Sans Schoolbook",
			"Gotham",
			"Haettenschweiler",
			"Handel Gothic",
			"Denmark",
			"Hei",
			"Helvetica",
			"Helvetica Neue",
			"Swiss 721",
			"Highway Gothic",
			"Hiroshige Sans",
			"Hobo",
			"Impact",
			"Industria",
			"Interstate",
			"Johnston/New Johnston",
			"Kabel",
			"Lato",
			"ITC Legacy Sans",
			"Lexia Readable",
			"Liberation Sans",
			"Lucida Sans",
			"Meiryo",
			"Microgramma",
			"Modern",
			"Motorway",
			"MS Sans Serif",
			"Museo Sans",
			"Myriad",
			"Neutraface",
			"Neuzeit S",
			"News Gothic",
			"Nimbus Sans L",
			"Nina",
			"Open Sans",
			"Optima",
			"Parisine",
			"Pricedown",
			"Prima Sans",
			"PT Sans",
			"Rail Alphabet",
			"Revue",
			"Roboto",
			"Rotis Sans",
			"Segoe UI",
			"Skia",
			"Souvenir Gothic",
			"ITC Stone Sans",
			"Syntax",
			"Tahoma",
			"Template Gothic",
			"Thesis Sans",
			"Tiresias",
			"Trade Gothic",
			"Transport",
			"Trebuchet MS",
			"Trump Gothic",
			"Twentieth Century",
			"Ubuntu",
			"Univers",
			"Zurich",
			"Vera Sans",
			"Verdana",
			"Virtue",
			"Amsterdam Old Style",
			"Divona",
			"Nyala",
			"Portobello",
			"Rotis Semi Serif",
			"Tema Cantante",
			"Andale Mono",
			"Anonymous and Anonymous Pro",
			"Arial Monospaced",
			"Bitstream Vera",
			"Consolas",
			"Courier",
			"CourierHP",
			"Courier New",
			"CourierPS",
			"Fontcraft Courier",
			"DejaVu Sans Mono",
			"Droid Sans Mono",
			"Everson Mono",
			"Fedra Mono",
			"Fixed",
			"Fixedsys",
			"Fixedsys Excelsior",
			"HyperFont",
			"Inconsolata",
			"Letter Gothic",
			"Liberation Mono",
			"Lucida Console",
			"Lucida Sans Typewriter",
			"Lucida Typewriter",
			"Menlo",
			"MICR",
			"Miriam Fixed",
			"Monaco",
			"Monofur",
			"Monospace",
			"MS Gothic",
			"MS Mincho",
			"Nimbus Mono L",
			"OCR-A",
			"OCR-B",
			"Orator",
			"Ormaxx",
			"PragmataPro",
			"Prestige Elite",
			"ProFont",
			"Proggy programming fonts",
			"Small Fonts",
			"Sydnie",
			"Terminal",
			"Tex Gyre Cursor",
			"Trixie",
			"Ubuntu Mono",
			"UM Typewriter",
			"Vera Sans Mono",
			"William Monospace",
			"Balloon",
			"Brush Script",
			"Choc",
			"Dom Casual",
			"Dragonwick",
			"Mistral",
			"Papyrus",
			"Segoe Script",
			"Tempus Sans",
			"Utopia",
			"Amazone",
			"American Scribe",
			"AMS Euler",
			"Apple Chancery",
			"Aquiline",
			"Aristocrat",
			"Bickley Script",
			"Civitype",
			"Codex",
			"Edwardian Script",
			"Forte",
			"French Script",
			"ITC Zapf Chancery",
			"Kuenstler Script",
			"Monotype Corsiva",
			"Old English Text MT",
			"Palace Script",
			"Park Avenue",
			"Scriptina",
			"Shelley Volante",
			"Vivaldi",
			"Vladimir Script",
			"Zapfino",
			"Andy",
			"Ashley Script",
			"Cézanne",
			"Chalkboard",
			"Comic Sans MS",
			"Dom Casual",
			"Fontoon",
			"Irregularis",
			"Jefferson",
			"Kristen",
			"Lucida Handwriting",
			"Rage Italic",
			"Rufscript",
			"Scribble",
			"Soupbone",
			"Tekton",
			"Alecko",
			"Cinderella",
			"Coronet",
			"Cupola",
			"Curlz",
			"Magnificat",
			"Script",
			"Stone Informal",
			"American Text",
			"Bastard",
			"Breitkopf Fraktur",
			"Cloister Black",
			"Fette Fraktur",
			"Fletcher",
			"Fraktur",
			"Goudy Text",
			"Lucida Blackletter",
			"Old English Text",
			"Schwabacher",
			"Wedding Text",
			"Aegyptus",
			"Aharoni",
			"Aisha",
			"Amienne",
			"Batak Script",
			"Chandas",
			"Grecs du roi",
			"Hanacaraka",
			"Japanese Gothic",
			"Jomolhari",
			"Kochi",
			"Koren",
			"Lontara Script",
			"Maiola",
			"Malgun Gothic",
			"Meiryo",
			"Microsoft JhengHei",
			"Microsoft YaHei",
			"Minchō",
			"Ming",
			"Mona",
			"MS Gothic",
			"Nassim",
			"Nastaliq Navees",
			"Neacademia",
			"Perpetua Greek[2]",
			"Porson",
			"SimSun",
			"Skolar",
			"Skolar Devanagari",
			"Sundanese Unicode",
			"Sutturah",
			"Sylfaen",
			"Tai Le Valentinium",
			"Tengwar",
			"Tibetan Machine Uni",
			"Tunga",
			"Wadalab",
			"Wilson Greek",
			"Apple Symbols",
			"Asana-Math",
			"Blackboard bold",
			"Bookshelf Symbol 7",
			"Braille",
			"Cambria Math",
			"Commercial Pi",
			"Computer Modern",
			"Corel",
			"Erler Dingbats",
			"HM Phonetic",
			"Lucida Math",
			"Marlett",
			"Mathematical Pi",
			"Morse Code",
			"OpenSymbol",
			"RichStyle",
			"Symbol",
			"SymbolPS",
			"Webdings",
			"Wingdings",
			"Wingdings 2",
			"Wingdings 3",
			"Zapf Dingbats",
			"Abracadabra",
			"Ad Lib",
			"Allegro",
			"Andreas",
			"Arnold Böcklin",
			"Astur",
			"Balloon Pop Outlaw Black",
			"Banco",
			"Bauhaus",
			"Beat",
			"Braggadocio",
			"Broadway",
			"Caslon Antique",
			"Cooper Black",
			"Curlz",
			"Ellington",
			"Exablock",
			"Exocet",
			"FIG Script",
			"Forte",
			"Gabriola",
			"Gigi",
			"Harlow Solid",
			"Harrington",
			"Horizon",
			"Jim Crow",
			"Jokerman",
			"Juice",
			"Lo-Type",
			"Magneto",
			"Megadeth",
			"Neuland",
			"Peignot",
			"Ravie",
			"San Francisco",
			"Showcard Gothic",
			"Snap",
			"Stencil",
			"Umbra",
			"Westminster",
			"Willow",
			"Windsor",
			// Google Fonts - http://worknotes.scripting.com/february2012/22612ByDw/listOfGoogleFonts
			"ABeeZee",
			"Abel",
			"Abril Fatface",
			"Aclonica",
			"Acme",
			"Actor",
			"Adamina",
			"Advent Pro",
			"Aguafina Script",
			"Akronim",
			"Aladin",
			"Aldrich",
			"Alef",
			"Alegreya",
			"Alegreya Sans",
			"Alegreya Sans SC",
			"Alegreya SC",
			"Alex Brush",
			"Alfa Slab One",
			"Alice",
			"Alike",
			"Alike Angular",
			"Allan",
			"Allerta",
			"Allerta Stencil",
			"Allura",
			"Almendra",
			"Almendra Display",
			"Almendra SC",
			"Amarante",
			"Amaranth",
			"Amatic SC",
			"Amethysta",
			"Anaheim",
			"Andada",
			"Andika",
			"Angkor",
			"Annie Use Your Telescope",
			"Anonymous Pro",
			"Antic",
			"Antic Didone",
			"Antic Slab",
			"Anton",
			"Arapey",
			"Arbutus",
			"Arbutus Slab",
			"Architects Daughter",
			"Archivo Black",
			"Archivo Narrow",
			"Arimo",
			"Arizonia",
			"Armata",
			"Artifika",
			"Arvo",
			"Asap",
			"Asset",
			"Astloch",
			"Asul",
			"Atomic Age",
			"Aubrey",
			"Audiowide",
			"Autour One",
			"Average",
			"Average Sans",
			"Averia Gruesa Libre",
			"Averia Libre",
			"Averia Sans Libre",
			"Averia Serif Libre",
			"Bad Script",
			"Balthazar",
			"Bangers",
			"Basic",
			"Battambang",
			"Baumans",
			"Bayon",
			"Belgrano",
			"Belleza",
			"BenchNine",
			"Bentham",
			"Berkshire Swash",
			"Bevan",
			"Bigelow Rules",
			"Bigshot One",
			"Bilbo",
			"Bilbo Swash Caps",
			"Bitter",
			"Black Ops One",
			"Bokor",
			"Bonbon",
			"Boogaloo",
			"Bowlby One",
			"Bowlby One SC",
			"Brawler",
			"Bree Serif",
			"Bubblegum Sans",
			"Bubbler One",
			"Buda",
			"Buenard",
			"Butcherman",
			"Butterfly Kids",
			"Cabin",
			"Cabin Condensed",
			"Cabin Sketch",
			"Caesar Dressing",
			"Cagliostro",
			"Calligraffitti",
			"Cambo",
			"Candal",
			"Cantarell",
			"Cantata One",
			"Cantora One",
			"Capriola",
			"Cardo",
			"Carme",
			"Carrois Gothic",
			"Carrois Gothic SC",
			"Carter One",
			"Caudex",
			"Cedarville Cursive",
			"Ceviche One",
			"Changa One",
			"Chango",
			"Chau Philomene One",
			"Chela One",
			"Chelsea Market",
			"Chenla",
			"Cherry Cream Soda",
			"Cherry Swash",
			"Chewy",
			"Chicle",
			"Chivo",
			"Cinzel",
			"Cinzel Decorative",
			"Clicker Script",
			"Coda",
			"Coda Caption",
			"Codystar",
			"Combo",
			"Comfortaa",
			"Coming Soon",
			"Concert One",
			"Condiment",
			"Content",
			"Contrail One",
			"Convergence",
			"Cookie",
			"Copse",
			"Corben",
			"Courgette",
			"Cousine",
			"Coustard",
			"Covered By Your Grace",
			"Crafty Girls",
			"Creepster",
			"Crete Round",
			"Crimson Text",
			"Croissant One",
			"Crushed",
			"Cuprum",
			"Cutive",
			"Cutive Mono",
			"Damion",
			"Dancing Script",
			"Dangrek",
			"Dawning of a New Day",
			"Days One",
			"Delius",
			"Delius Swash Caps",
			"Delius Unicase",
			"Della Respira",
			"Denk One",
			"Devonshire",
			"Didact Gothic",
			"Diplomata",
			"Diplomata SC",
			"Domine",
			"Donegal One",
			"Doppio One",
			"Dorsa",
			"Dosis",
			"Dr Sugiyama",
			"Droid Sans",
			"Droid Sans Mono",
			"Droid Serif",
			"Duru Sans",
			"Dynalight",
			"Eagle Lake",
			"Eater",
			"EB Garamond",
			"Economica",
			"Ek Mukta",
			"Electrolize",
			"Elsie",
			"Elsie Swash Caps",
			"Emblema One",
			"Emilys Candy",
			"Engagement",
			"Englebert",
			"Enriqueta",
			"Erica One",
			"Esteban",
			"Euphoria Script",
			"Ewert",
			"Exo",
			"Exo 2",
			"Expletus Sans",
			"Fanwood Text",
			"Fascinate",
			"Fascinate Inline",
			"Faster One",
			"Fasthand",
			"Fauna One",
			"Federant",
			"Federo",
			"Felipa",
			"Fenix",
			"Finger Paint",
			"Fira Mono",
			"Fira Sans",
			"Fjalla One",
			"Fjord One",
			"Flamenco",
			"Flavors",
			"Fondamento",
			"Fontdiner Swanky",
			"Forum",
			"Francois One",
			"Freckle Face",
			"Fredericka the Great",
			"Fredoka One",
			"Freehand",
			"Fresca",
			"Frijole",
			"Fruktur",
			"Fugaz One",
			"Gabriela",
			"Gafata",
			"Galdeano",
			"Galindo",
			"Gentium Basic",
			"Gentium Book Basic",
			"Geo",
			"Geostar",
			"Geostar Fill",
			"Germania One",
			"GFS Didot",
			"GFS Neohellenic",
			"Gilda Display",
			"Give You Glory",
			"Glass Antiqua",
			"Glegoo",
			"Gloria Hallelujah",
			"Goblin One",
			"Gochi Hand",
			"Gorditas",
			"Goudy Bookletter 1911",
			"Graduate",
			"Grand Hotel",
			"Gravitas One",
			"Great Vibes",
			"Griffy",
			"Gruppo",
			"Gudea",
			"Habibi",
			"Hammersmith One",
			"Hanalei",
			"Hanalei Fill",
			"Handlee",
			"Hanuman",
			"Happy Monkey",
			"Headland One",
			"Henny Penny",
			"Herr Von Muellerhoff",
			"Hind",
			"Holtwood One SC",
			"Homemade Apple",
			"Homenaje",
			"Iceberg",
			"Iceland",
			"IM Fell Double Pica",
			"IM Fell Double Pica SC",
			"IM Fell DW Pica",
			"IM Fell DW Pica SC",
			"IM Fell English",
			"IM Fell English SC",
			"IM Fell French Canon",
			"IM Fell French Canon SC",
			"IM Fell Great Primer",
			"IM Fell Great Primer SC",
			"Imprima",
			"Inconsolata",
			"Inder",
			"Indie Flower",
			"Inika",
			"Irish Grover",
			"Istok Web",
			"Italiana",
			"Italianno",
			"Jacques Francois",
			"Jacques Francois Shadow",
			"Jim Nightshade",
			"Jockey One",
			"Jolly Lodger",
			"Josefin Sans",
			"Josefin Slab",
			"Joti One",
			"Judson",
			"Julee",
			"Julius Sans One",
			"Junge",
			"Jura",
			"Just Another Hand",
			"Just Me Again Down Here",
			"Kalam",
			"Kameron",
			"Kantumruy",
			"Karla",
			"Karma",
			"Kaushan Script",
			"Kavoon",
			"Kdam Thmor",
			"Keania One",
			"Kelly Slab",
			"Kenia",
			"Khmer",
			"Kite One",
			"Knewave",
			"Kotta One",
			"Koulen",
			"Kranky",
			"Kreon",
			"Kristi",
			"Krona One",
			"La Belle Aurore",
			"Lancelot",
			"Lato",
			"League Script",
			"Leckerli One",
			"Ledger",
			"Lekton",
			"Lemon",
			"Libre Baskerville",
			"Life Savers",
			"Lilita One",
			"Lily Script One",
			"Limelight",
			"Linden Hill",
			"Lobster",
			"Lobster Two",
			"Londrina Outline",
			"Londrina Shadow",
			"Londrina Sketch",
			"Londrina Solid",
			"Lora",
			"Love Ya Like A Sister",
			"Loved by the King",
			"Lovers Quarrel",
			"Luckiest Guy",
			"Lusitana",
			"Lustria",
			"Macondo",
			"Macondo Swash Caps",
			"Magra",
			"Maiden Orange",
			"Mako",
			"Marcellus",
			"Marcellus SC",
			"Marck Script",
			"Margarine",
			"Marko One",
			"Marmelad",
			"Marvel",
			"Mate",
			"Mate SC",
			"Maven Pro",
			"McLaren",
			"Meddon",
			"MedievalSharp",
			"Medula One",
			"Megrim",
			"Meie Script",
			"Merienda",
			"Merienda One",
			"Merriweather",
			"Merriweather Sans",
			"Metal",
			"Metal Mania",
			"Metamorphous",
			"Metrophobic",
			"Michroma",
			"Milonga",
			"Miltonian",
			"Miltonian Tattoo",
			"Miniver",
			"Miss Fajardose",
			"Modern Antiqua",
			"Molengo",
			"Molle",
			"Monda",
			"Monofett",
			"Monoton",
			"Monsieur La Doulaise",
			"Montaga",
			"Montez",
			"Montserrat",
			"Montserrat Alternates",
			"Montserrat Subrayada",
			"Moul",
			"Moulpali",
			"Mountains of Christmas",
			"Mouse Memoirs",
			"Mr Bedfort",
			"Mr Dafoe",
			"Mr De Haviland",
			"Mrs Saint Delafield",
			"Mrs Sheppards",
			"Muli",
			"Mystery Quest",
			"Neucha",
			"Neuton",
			"New Rocker",
			"News Cycle",
			"Niconne",
			"Nixie One",
			"Nobile",
			"Nokora",
			"Norican",
			"Nosifer",
			"Nothing You Could Do",
			"Noticia Text",
			"Noto Sans",
			"Noto Serif",
			"Nova Cut",
			"Nova Flat",
			"Nova Mono",
			"Nova Oval",
			"Nova Round",
			"Nova Script",
			"Nova Slim",
			"Nova Square",
			"Numans",
			"Nunito",
			"Odor Mean Chey",
			"Offside",
			"Old Standard TT",
			"Oldenburg",
			"Oleo Script",
			"Oleo Script Swash Caps",
			"Open Sans",
			"Open Sans Condensed",
			"Oranienbaum",
			"Orbitron",
			"Oregano",
			"Orienta",
			"Original Surfer",
			"Oswald",
			"Over the Rainbow",
			"Overlock",
			"Overlock SC",
			"Ovo",
			"Oxygen",
			"Oxygen Mono",
			"Pacifico",
			"Paprika",
			"Parisienne",
			"Passero One",
			"Passion One",
			"Pathway Gothic One",
			"Patrick Hand",
			"Patrick Hand SC",
			"Patua One",
			"Paytone One",
			"Peralta",
			"Permanent Marker",
			"Petit Formal Script",
			"Petrona",
			"Philosopher",
			"Piedra",
			"Pinyon Script",
			"Pirata One",
			"Plaster",
			"Play",
			"Playball",
			"Playfair Display",
			"Playfair Display SC",
			"Podkova",
			"Poiret One",
			"Poller One",
			"Poly",
			"Pompiere",
			"Pontano Sans",
			"Port Lligat Sans",
			"Port Lligat Slab",
			"Prata",
			"Preahvihear",
			"Press Start 2P",
			"Princess Sofia",
			"Prociono",
			"Prosto One",
			"PT Mono",
			"PT Sans",
			"PT Sans Caption",
			"PT Sans Narrow",
			"PT Serif",
			"PT Serif Caption",
			"Puritan",
			"Purple Purse",
			"Quando",
			"Quantico",
			"Quattrocento",
			"Quattrocento Sans",
			"Questrial",
			"Quicksand",
			"Quintessential",
			"Qwigley",
			"Racing Sans One",
			"Radley",
			"Rajdhani",
			"Raleway",
			"Raleway Dots",
			"Rambla",
			"Rammetto One",
			"Ranchers",
			"Rancho",
			"Rationale",
			"Redressed",
			"Reenie Beanie",
			"Revalia",
			"Ribeye",
			"Ribeye Marrow",
			"Righteous",
			"Risque",
			"Roboto",
			"Roboto Condensed",
			"Roboto Slab",
			"Rochester",
			"Rock Salt",
			"Rokkitt",
			"Romanesco",
			"Ropa Sans",
			"Rosario",
			"Rosarivo",
			"Rouge Script",
			"Rubik Mono One",
			"Rubik One",
			"Ruda",
			"Rufina",
			"Ruge Boogie",
			"Ruluko",
			"Rum Raisin",
			"Ruslan Display",
			"Russo One",
			"Ruthie",
			"Rye",
			"Sacramento",
			"Sail",
			"Salsa",
			"Sanchez",
			"Sancreek",
			"Sansita One",
			"Sarina",
			"Satisfy",
			"Scada",
			"Schoolbell",
			"Seaweed Script",
			"Sevillana",
			"Seymour One",
			"Shadows Into Light",
			"Shadows Into Light Two",
			"Shanti",
			"Share",
			"Share Tech",
			"Share Tech Mono",
			"Shojumaru",
			"Short Stack",
			"Siemreap",
			"Sigmar One",
			"Signika",
			"Signika Negative",
			"Simonetta",
			"Sintony",
			"Sirin Stencil",
			"Six Caps",
			"Skranji",
			"Slackey",
			"Smokum",
			"Smythe",
			"Sniglet",
			"Snippet",
			"Snowburst One",
			"Sofadi One",
			"Sofia",
			"Sonsie One",
			"Sorts Mill Goudy",
			"Source Code Pro",
			"Source Sans Pro",
			"Source Serif Pro",
			"Special Elite",
			"Spicy Rice",
			"Spinnaker",
			"Spirax",
			"Squada One",
			"Stalemate",
			"Stalinist One",
			"Stardos Stencil",
			"Stint Ultra Condensed",
			"Stint Ultra Expanded",
			"Stoke",
			"Strait",
			"Sue Ellen Francisco",
			"Sunshiney",
			"Supermercado One",
			"Suwannaphum",
			"Swanky and Moo Moo",
			"Syncopate",
			"Tangerine",
			"Taprom",
			"Tauri",
			"Teko",
			"Telex",
			"Tenor Sans",
			"Text Me One",
			"The Girl Next Door",
			"Tienne",
			"Tinos",
			"Titan One",
			"Titillium Web",
			"Trade Winds",
			"Trocchi",
			"Trochut",
			"Trykker",
			"Tulpen One",
			"Ubuntu",
			"Ubuntu Condensed",
			"Ubuntu Mono",
			"Ultra",
			"Uncial Antiqua",
			"Underdog",
			"Unica One",
			"UnifrakturCook",
			"UnifrakturMaguntia",
			"Unkempt",
			"Unlock",
			"Unna",
			"Vampiro One",
			"Varela",
			"Varela Round",
			"Vast Shadow",
			"Vibur",
			"Vidaloka",
			"Viga",
			"Voces",
			"Volkhov",
			"Vollkorn",
			"Voltaire",
			"VT323",
			"Waiting for the Sunrise",
			"Wallpoet",
			"Walter Turncoat",
			"Warnes",
			"Wellfleet",
			"Wendy One",
			"Wire One",
			"Yanone Kaffeesatz",
			"Yellowtail",
			"Yeseva One",
			"Yesteryear",
			"Zeyada"
		];

		// Dedupe matched fonts - http://stackoverflow.com/a/15868720/3361119
		var dedupedFonts = fonts.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
		var sortedFonts = dedupedFonts.sort();

		// $('header').append(cleanedFonts);
		var results = [];
		var d = new Detector();
		for (i = 0; i < sortedFonts.length; i++) {
			var result = d.detect(sortedFonts[i]);
			var num = i+1;
			if(result == true) {
				$('#font-list').append(
					'<li class="'+ sortedFonts[i].toLowerCase().replace(/ /g,"-") +'">'+
					  '<button class="typeface-selection" data-stck-typeface="'+sortedFonts[i]+'" style="font-family: '+sortedFonts[i]+'">'+
							'<span class="num">'+num+'</span>'+
							'<span class="typeface">'+sortedFonts[i]+'<\/span>'+
							'<span class="test-sentence">A quick brown fox jumps over the lazy dog.</span>'+
					  '</button>'+
					'</li>'
				);
			}
		}
	};

  $('[data-stck-button]').on('click', function() {
		$(this).next('[data-stck-content]').slideToggle(100);
		$(this).toggleClass('open');
		return false;
  });

  $('[data-stck=closeParent]').on('click', function() {
		$(this).parent().removeClass('open');
  });

  //
  // Sliders for the Metrics panel on font-stack-builder.php
  //
  // Size
  $('#font-size-slider').noUiSlider({
		start: 16,
		connect: "lower",
		range: {
		  'min': 6,
		  'max': 160
		},
		serialization: {
		  lower: [
			 $.Link({
				target: $('#font-size-input'),
				format: {
				  decimals: 0
				}
			 })
		  ]
		}
  });
  // Weight
  $('#font-weight-slider').noUiSlider({
		start: 400,
		connect: "lower",
		range: {
		  'min': 100,
		  'max': 900
		},
		step: 100,
		serialization: {
		  lower: [
			 $.Link({
				target: $('#font-weight-input'),
				format: {
				  decimals: 0
				}
			 })
		  ]
		}
  });
  // Kern
  $('#font-kerning-slider').noUiSlider({
		start: 0,
		connect: "lower",
		range: {
		  'min': -5,
		  'max': 10
		},
		serialization: {
		  lower: [
			 $.Link({
				target: $('#font-kerning-input'),
				format: {
				  decimals: 2
				}
			 })
		  ]
		}
  });
  // Line Height
  $('#line-height-slider').noUiSlider({
		start: 1.33,
		connect: "lower",
		range: {
		  'min': 0,
		  'max': 10
		},
		serialization: {
		  lower: [
			 $.Link({
				target: $('#line-height-input'),
				format: {
				  decimals: 2
				}
			 })
		  ]
		}
  });
  // Measure
  $('#measure-slider').noUiSlider({
		start: 80,
		connect: "lower",
		range: {
		  'min': 1,
		  'max': 99
		},
		serialization: {
		  lower: [
			 $.Link({
				target: $('#measure-input'),
				format: {
				  decimals: 0
				}
			 })
		  ]
		}
  });

  // Top Padding
  $('#padding-top-slider').noUiSlider({
		start: 20,
		connect: "lower",
		range: {
		  'min': 1,
		  'max': 500
		},
		serialization: {
		  lower: [
			 $.Link({
				target: $('#padding-top-input'),
				format: {
				  decimals: 0
				}
			 })
		  ]
		}
  });
  // Right Padding
  $('#padding-right-slider').noUiSlider({
		start: 20,
		connect: "lower",
		range: {
		  'min': 1,
		  'max': 700
		},
		serialization: {
		  lower: [
			 $.Link({
				target: $('#padding-right-input'),
				format: {
				  decimals: 0
				}
			 })
		  ]
		}
  });
  // Bottom Padding
  $('#padding-bottom-slider').noUiSlider({
		start: 20,
		connect: "lower",
		range: {
		  'min': 1,
		  'max': 500
		},
		serialization: {
		  lower: [
			 $.Link({
				target: $('#padding-bottom-input'),
				format: {
				  decimals: 0
				}
			 })
		  ]
		}
  });
  // Left Padding
  $('#padding-left-slider').noUiSlider({
		start: 20,
		connect: "lower",
		range: {
		  'min': 1,
		  'max': 700
		},
		serialization: {
		  lower: [
			 $.Link({
				target: $('#padding-left-input'),
				format: {
				  decimals: 0
				}
			 })
		  ]
		}
  });

});

// // Force full block element selection in the stack builder - http://stackoverflow.com/a/14816523/3361119
 //     $('#stack-content-for-capture span').click(function (){
  //     var range, selection;

  //     if (window.getSelection && document.createRange) {
  //         selection = window.getSelection();
  //         range = document.createRange();
  //         range.selectNodeContents($(this)[0]);
  //         selection.removeAllRanges();
  //         selection.addRange(range);
  //     } else if (document.selection && document.body.createTextRange) {
  //         range = document.body.createTextRange();
  //         range.moveToElementText($(this)[0]);
  //         range.select();
  //     }
  // });

  // http://stackoverflow.com/questions/10560155/getting-the-parent-node-for-selected-text-with-rangy-library
  // var sel = rangy.getSelection();
  // if (sel.rangeCount > 0) {
  //     var range = sel.getRangeAt(0);
  //     var parentElement = range.commonAncestorContainer;
  //     if (parentElement.nodeType == 3) {
  //         parentElement = parentElement.parentNode;
  //     }
  // }

  // // Selecting and deploying a typeface
  // $('#font-list').on('click', 'button', function() {
  //  // Get typeface
  //  var typefaceSelection = $(this).data("stck-typeface");
    
  //  // Add font rule to css for the selected font
  //  var typefaceClass = typefaceSelection.toLowerCase().replace(/ /g,"-");

  //  // Add typeface to preview button
  //  $('#typeface-preview-button').html(typefaceSelection + '<span class="icon-sort">').css('font-family', typefaceSelection);

  //  // Apply temp font class to selected span for jquery to target
 //   var tempCssClass = "rangyTemp_" + typefaceClass;
 //    var classApplier = rangy.createCssClassApplier(tempCssClass, true);
 //    classApplier.applyToSelection();

 //    // Add the CSS to the target and then remove the temp class
 //    $('.' + tempCssClass).css('font-family', typefaceSelection).removeClass(tempCssClass);

 //    // Close font picker list
  //  $(openInterface).removeClass('open');

  //  return false;
  // });
  
  // // Select and deploy font-size
  // $('#font-size-slider').on('slide',function() {
  //  // Get typeface
  //  var fontSizeSelection = $(this).val();
    
  //  // Apply temp font class to selected span for jquery to target
 //   var tempCssClass = "rangyTemp_" + Math.round(fontSizeSelection), // no decimals in class names
 //       classApplier = rangy.createCssClassApplier(tempCssClass, true);
 //    classApplier.applyToSelection();

 //    // Add the CSS to the target and then remove the temp class
 //    $('.' + tempCssClass).css('font-size', Math.round(fontSizeSelection) + 'px').removeClass(tempCssClass);

  //  return false;
  // });

  // // Select and deploy font-weight
  // $('#font-weight-slider').on('slide',function() {
  //  // Get font-weight
  //  var fontWeightSelection = $(this).val();

  //  // Strip off the trailing .00 decimals
  //  var fontWeightRounded = fontWeightSelection.toString().replace('.00', '');
    
  //  // Apply temp font class to selected span for jquery to target
 //   var tempCssClass = "rangyTemp_" + fontWeightRounded;
 //    var classApplier = rangy.createCssClassApplier(tempCssClass, true);
 //    classApplier.applyToSelection();

 //    // Add the CSS to the target and then remove the temp class
 //    $('.' + tempCssClass).css('font-weight', fontWeightRounded).removeClass(tempCssClass);

  //  return false;
  // });

  // // Select and deploy line-height
  // $('#line-height-slider').on('slide',function() {
  //  // Get line-height
  //  var lineHeightSelection = $(this).val();

  //  // Apply temp font class to selected span for jquery to target
 //   var tempCssClass = "rangyTemp_" + Math.round(lineHeightSelection), // no decimals in class names
 //       classApplier = rangy.createCssClassApplier(tempCssClass, true);
 //    classApplier.applyToSelection();

 //    // Add the CSS to the target and then remove the temp class
 //    $('.' + tempCssClass).css('line-height', lineHeightSelection).removeClass(tempCssClass);

  //  return false;
  // });

  // // Select and deploy measure
  // $('#measure-slider').on('slide',function() {
  //  // Get measure input
  //  var measureSelection = $(this).val(),
  //      stackWidth = $('#stack-content-for-capture').innerWidth(),
  //      measurePxConvert = (measureSelection * .01) * stackWidth,
  //      marginCalc = parseInt((stackWidth - measurePxConvert) / 2);

 //    // Adjust left and right margins
 //    $('#stack-content-for-capture').css({
 //     'padding': '',
 //     'padding-left': marginCalc + 'px',
 //     'padding-right': marginCalc + 'px',
 //    });

  //  return false;
  // });
  
  // // Show font list when the typeface button is clicked.
  // $('[data-stck-switch="font-list"]').on('click', function() {
  //  $('#font-list').addClass('open');
  //  $(mask).addClass('open');
    
  //  // Scroll list to active typeface
  //  $('#font-list').scrollTop(($('#font-list li.active').position().top) - 175);// this works, just need to get the active class applied accurately
  //  return false;
  // });

  // // Update control panel to reflect selected text properties
  // $('#editable-stack').mouseup(function() {
  //  var selection = rangy.getSelection(),
 //       range = selection.getRangeAt(0),
 //       parentElement = range.commonAncestorContainer;
 //    if (parentElement.nodeType == 3) {
 //        parentElement = parentElement.parentNode;
 //    };

 //    // Reset (aka remove) any current .active classes from all .sub-control buttons
 //    $('.subcontrol-button').removeClass('active');

 //    // Update Typeface preview
 //    var parentElementTypeface = $(parentElement).css('font-family'),
 //       parentElementTypefaceProper = parentElementTypeface.replace(/,|'|"|serif|sans-serif|serif/g,'');
 //    $('#typeface-preview-button').html(parentElementTypefaceProper + '<span class="icon-sort">').css('font-family', parentElementTypeface);

 //    // Mark Typeface as active in #font-list
 //    $('#font-list li').removeClass('active');
 //    $('li.' + parentElementTypefaceProper).addClass('active');

 //    // Font-Weight
 //    var parentElementFontWeight = $(parentElement).css('font-weight');
 //    var translatedFontWeight = parentElementFontWeight.replace('bold','700');// Trade weight names for numbers
 //    $('#font-weight-input, #font-weight-slider').val(translatedFontWeight);

 //    // Font-Size
 //    var parentElementFontSize = $(parentElement).css('font-size').replace('px','');
 //    $('#font-size-input, #font-size-slider').val(parentElementFontSize);

 //    // Line-Height
 //    var parentElementLineHeight = $(parentElement).css('line-height').replace('px',''),
 //       computedElementLineHeight = parseFloat(parentElementLineHeight).toFixed(2) / parentElementFontSize;
 //    $('#line-height-input, #line-height-slider').val(computedElementLineHeight);

 //    // Alignment
 //    var parentElementTextAlign = $(parentElement).css('text-align');
 //    $('.subcontrol-button.align-' + parentElementTextAlign).addClass('active');
 //  });
  
  // // Check against font name "database" (haha, see: var fonts =[...]) and populate the font picker
  // if('#font-list') {
  //  // http://www.lalit.org/lab/javascript-css-font-detect/
  //  var Detector = function() {
  //    // a font will be compared against all the three default fonts.
  //    // and if it doesn't match all 3 then that font is not available.
  //    var baseFonts = ['monospace', 'sans-serif', 'serif'];
  //    // we use m or w because these two characters take up the maximum width.
  //    // And we use a LLi so that the same matching fonts can get separated
  //    var testString = "mmmmmmmmmmlli";
  //    //we test using 144px font size, we may use any size. I guess larger the better.
  //    var testSize = '144px';
  //    var h = document.getElementsByTagName("body")[0];
  //    // create a SPAN in the document to get the width of the text we use to test
  //    var s = document.createElement("span");
  //    s.style.fontSize = testSize;
  //    s.innerHTML = testString;
  //    var defaultWidth = {};
  //    var defaultHeight = {};
  //    for (var index in baseFonts) {
  //      //get the default width for the three base fonts
  //      s.style.fontFamily = baseFonts[index];
  //      h.appendChild(s);
  //      defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
  //      defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
  //      h.removeChild(s);
  //    }
  //    function detect(font) {
  //      var detected = false;
  //      for (var index in baseFonts) {
  //          s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
  //          h.appendChild(s);
  //          var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
  //          h.removeChild(s);
  //          detected = detected || matched;
  //      }
  //      return detected;
  //    }
  //    this.detect = detect;
  //  };
  //  var fonts = [
  //    // "Al Bayan",
  //    "American Typewriter",
  //    "Andale Mono",
  //    "Apple Casual",
  //    "Apple Chancery",
  //    "Apple Garamond",
  //    "Apple Gothic",
  //    "Apple LiGothic",
  //    "Apple LiSung",
  //    "Apple Myungjo",
  //    "Apple Symbols",
  //    "AquaKana",
  //    "Arial",
  //    "Arial Hebrew",
  //    "Ayuthaya",
  //    "Baghdad",
  //    "Baskerville",
  //    "Beijing",
  //    "BiauKai",
  //    "Big Caslon",
  //    "Brush Script",
  //    "Chalkboard",
  //    "Chalkduster",
  //    "Charcoal",
  //    "Charcoal CY",
  //    "Chicago",
  //    "Cochin",
  //    "Comic Sans",
  //    "Cooper",
  //    "Copperplate",
  //    "Corsiva Hebrew",
  //    "Courier",
  //    "Courier New",
  //    "DecoType Naskh",
  //    "Devanagari",
  //    "Didot",
  //    "Euphemia UCAS",
  //    "Fang Song",
  //    "Futura",
  //    "Gadget",
  //    "Geeza Pro",
  //    "Geezah",
  //    "Geneva",
  //    "Geneva CY",
  //    "Georgia",
  //    "Gill Sans",
  //    "Gujarati",
  //    "Gung Seoche",
  //    "Gurmukhi",
  //    "Hangangche",
  //    "HeadlineA",
  //    "Hei",
  //    "Helvetica",
  //    "Helvetica CY",
  //    "Helvetica Neue",
  //    "Herculanum",
  //    "Hiragino Kaku Gothic Pro",
  //    "Hiragino Kaku Gothic ProN",
  //    "Hiragino Kaku Gothic Std",
  //    "Hiragino Kaku Gothic StdN",
  //    "Hiragino Maru Gothic Pro",
  //    "Hiragino Maru Gothic ProN",
  //    "Hiragino Mincho Pro",
  //    "Hiragino Mincho ProN",
  //    "Hoefler Text",
  //    "Inai Mathi",
  //    "Impact",
  //    "Jung Gothic",
  //    "Kai",
  //    "Keyboard",
  //    "Krungthep",
  //    "KufiStandard GK",
  //    // "LastResort",  display issues
  //    "LiHei Pro",
  //    "LiSong Pro",
  //    "Lucida Grande",
  //    "Marker Felt",
  //    "Menlo",
  //    "Monaco",
  //    "Monaco CY",
  //    "Mshtakan",
  //    "Nadeem",
  //    "New Peninim",
  //    "New York",
  //    "NISC GB18030",
  //    "Optima",
  //    "Osaka",
  //    "Palatino",
  //    "Papyrus",
  //    "PC Myungjo",
  //    "Pilgiche",
  //    "Plantagenet Cherokee",
  //    "Raanana",
  //    "Sand",
  //    "Sathu",
  //    "Seoul",
  //    "Shin Myungjo Neue",
  //    "Silom",
  //    "Skia",
  //    "Song",
  //    "ST FangSong",
  //    "ST Heiti",
  //    "ST Kaiti",
  //    "ST Song",
  //    "Symbol",
  //    "Tae Graphic",
  //    "Tahoma",
  //    "Taipei",
  //    "Techno",
  //    "Textile",
  //    "Thonburi",
  //    "Times",
  //    "Times CY",
  //    "Times New Roman",
  //    "Trebuchet MS",
  //    "Verdana",
  //    "Zapf Chancery",
  //    "Zapf Dingbats",
  //    "Zapfinofonts",
  //    // Windows Fonts - http://en.wikipedia.org/wiki/List_of_Microsoft_Windows_fonts
  //    "Abadi MT Condensed Light",
  //    "Aharoni",
  //    "Aldhabi",
  //    "Andalus",
  //    "Angsana New",
  //    "AngsanaUPC",
  //    "Aparajita",
  //    "Arabic Typesetting",
  //    "Arial",
  //    "Arial Black",
  //    "Batang",
  //    "BatangChe",
  //    "Book Antiqua",
  //    "Browallia New",
  //    "BrowalliaUPC",
  //    "Calibri",
  //    "Calibri Light",
  //    "Calisto MT",
  //    "Cambria",
  //    "Cambria Math",
  //    "Candara",
  //    "Century Gothic",
  //    "Comic Sans MS",
  //    "Consolas",
  //    "Constantia",
  //    "Copperplate GothicBold",
  //    "Copperplate Gothic Light",
  //    "Corbel",
  //    "Cordia New",
  //    "CordiaUPC",
  //    "Courier New",
  //    "DaunPenh",
  //    "David",
  //    "DFKai-SB",
  //    "DilleniaUPC",
  //    "DokChampa",
  //    "Dotum",
  //    "DotumChe",
  //    "Ebrima",
  //    "Estrangelo Edessa",
  //    "EucrosiaUPC",
  //    "Euphemia",
  //    "FangSong",
  //    "Franklin Gothic Medium",
  //    "FrankRuehl",
  //    "FreesiaUPC",
  //    "Gabriola",
  //    "Gadugi",
  //    "Gautami",
  //    "Georgia",
  //    "Gisha",
  //    "Gulim",
  //    "GulimChe",
  //    "Gungsuh",
  //    "GungsuhChe",
  //    "Impact",
  //    "IrisUPC",
  //    "Iskoola Pota",
  //    "JasmineUPC",
  //    "KaiTi",
  //    "Kalinga",
  //    "Kartika",
  //    "Khmer UI",
  //    "KodchiangUPC",
  //    "Kokila",
  //    "Lao UI",
  //    "Latha",
  //    "Leelawadee",
  //    "Levenim MT",
  //    "LilyUPC",
  //    "Lucida Console",
  //    "Lucida Handwriting Italic",
  //    "Lucida Sans Unicode",
  //    "Malgun Gothic",
  //    "Mangal",
  //    "Marlett",
  //    "Meiryo",
  //    "Meiryo UI",
  //    "Microsoft Himalaya",
  //    "Microsoft JhengHei",
  //    "Microsoft JhengHei UI",
  //    "Microsoft New Tai Lue",
  //    "Microsoft PhagsPa",
  //    "Microsoft Sans Serif",
  //    "Microsoft Tai Le",
  //    "Microsoft Uighur",
  //    "Microsoft YaHei",
  //    "Microsoft YaHei UI",
  //    "Microsoft Yi Baiti",
  //    "MingLiU, PMingLiU",
  //    "MingLiU-ExtB, PMingLiU-ExtB",
  //    "MingLiU_HKSCS",
  //    "MingLiU_HKSCS-ExtB",
  //    "Miriam",
  //    "Mongolian Baiti",
  //    "MoolBoran",
  //    "MS Gothic, MS PGothic",
  //    "MS Mincho, MS PMincho",
  //    "MS UI Gothic",
  //    "MV Boli",
  //    "Myanmar Text",
  //    "Narkisim",
  //    "Nirmala UI",
  //    "News Gothic MT",
  //    "NSimSun",
  //    "Nyala",
  //    "Palatino Linotype",
  //    "Plantagenet Cherokee",
  //    "Raavi",
  //    "Rod",
  //    "Sakkal Majalla",
  //    "Segoe Print",
  //    "Segoe Script",
  //    "Segoe UI v5.00[3]",
  //    "Segoe UI v5.01[4]",
  //    "Segoe UI v5.27[5]",
  //    "Segoe UI Symbol",
  //    "Shonar Bangla",
  //    "Shruti",
  //    "SimHei",
  //    "SimKai",
  //    "Simplified Arabic",
  //    "SimSun",
  //    "SimSun-ExtB",
  //    "Sylfaen",
  //    "Symbol",
  //    "Tahoma",
  //    "Times New Roman",
  //    "Traditional Arabic",
  //    "Trebuchet MS",
  //    "Tunga",
  //    "Urdu Typesetting",
  //    "Utsaah",
  //    "Vani",
  //    "Verdana",
  //    "Vijaya",
  //    "Vrinda",
  //    "Webdings",
  //    "Westminster",
  //    "Wingdingsfonts.push",
  //    // Wikipedia List - http://en.wikipedia.org/wiki/List_of_typefaces
  //    "Adobe Jenson",
  //    "Adobe Text",
  //    "Albertus",
  //    "Aldus",
  //    "Alexandria",
  //    "Algerian",
  //    "American Typewriter",
  //    "Antiqua",
  //    "Arno",
  //    "Aster",
  //    "Aurora",
  //    "News 706",
  //    "Baskerville",
  //    "Bebas",
  //    "Bebas Neue",
  //    "Bell",
  //    "Bembo",
  //    "Bembo Schoolbook",
  //    "Berkeley Old Style",
  //    "Bernhard Modern",
  //    "Bodoni",
  //    "Bauer Bodoni",
  //    "Book Antiqua",
  //    "Bookman",
  //    "Bordeaux Roman",
  //    "Bulmer",
  //    "Caledonia",
  //    "Californian FB",
  //    "Calisto MT",
  //    "Cambria",
  //    "Capitals",
  //    "Cartier",
  //    "Caslon",
  //    "Wyld",
  //    "Caslon Antique",
  //    "Fifteenth Century",
  //    "Catull",
  //    "Centaur",
  //    "Century Old Style",
  //    "Century Schoolbook",
  //    "New Century Schoolbook",
  //    "Century Schoolbook Infant",
  //    "Chaparral",
  //    "Charis SIL",
  //    "Charter",
  //    "Cheltenham",
  //    "Clearface",
  //    "Cochin",
  //    "Colonna",
  //    "Computer Modern",
  //    "Concrete Roman",
  //    "Constantia",
  //    "Cooper Black",
  //    "Corona",
  //    "News 705",
  //    "DejaVu Serif",
  //    "Didot",
  //    "Droid Serif",
  //    "Ecotype",
  //    "Elephant",
  //    "Emerson",
  //    "Espy Serif",
  //    "Excelsior",
  //    "News 702",
  //    "Fairfield",
  //    "FF Scala",
  //    "Footlight",
  //    "FreeSerif",
  //    "Friz Quadrata",
  //    "Garamond",
  //    "Gentium",
  //    "Georgia",
  //    "Gloucester",
  //    "Goudy",
  //    "Goudy Old Style",
  //    "Goudy Pro Font",
  //    "Goudy Schoolbook",
  //    "Granjon",
  //    "Heather",
  //    "Hercules",
  //    "High Tower Text",
  //    "Hiroshige",
  //    "Hoefler Text",
  //    "Humana Serif",
  //    "Imprint",
  //    "Ionic No. 5",
  //    "News 701",
  //    "ITC Benguiat",
  //    "Janson",
  //    "Jenson",
  //    "Joanna",
  //    "Korinna",
  //    "Kursivschrift",
  //    "Legacy Serif",
  //    "Lexicon",
  //    "Liberation Serif",
  //    "Linux Libertine",
  //    "Literaturnaya",
  //    "Lucida Bright",
  //    "Melior",
  //    "Memphis",
  //    "Miller",
  //    "Minion",
  //    "Modern",
  //    "Mona Lisa",
  //    "Mrs Eaves",
  //    "MS Serif",
  //    "New York",
  //    "Nimbus Roman",
  //    "NPS Rawlinson Roadway",
  //    "OCR A Extended",
  //    "Palatino",
  //    "Book Antiqua",
  //    "Perpetua",
  //    "Plantin",
  //    "Plantin Schoolbook",
  //    "Playbill",
  //    "Poor Richard",
  //    "Renault",
  //    "Requiem",
  //    "Roman",
  //    "Rotis Serif",
  //    "Sabon",
  //    "Seagull",
  //    "Sistina",
  //    "Souvenir",
  //    "STIX",
  //    "Stone Informal",
  //    "Stone Serif",
  //    "Sylfaen",
  //    "Times New Roman",
  //    "Times",
  //    "Trajan",
  //    "Trinité",
  //    "Trump Mediaeval",
  //    "Utopia",
  //    "Vale Type",
  //    "Vera Serif",
  //    "Versailles",
  //    "Wanted",
  //    "Weiss",
  //    "Wide Latin",
  //    "Windsor",
  //    "XITSfonts",
  //    "Alexandria",
  //    "Apex",
  //    "Archer",
  //    "Athens",
  //    "Cholla Slab",
  //    "City",
  //    "Clarendon",
  //    "Concrete Roman",
  //    "Courier",
  //    "Egyptienne",
  //    "Guardian Egyptian",
  //    "Ionic No. 5",
  //    "Lexia",
  //    "Museo Slab",
  //    "Nilland",
  //    "Rockwell",
  //    "Skeleton Antique",
  //    "Tower",
  //    "Abadi",
  //    "Agency FB",
  //    "Akzidenz-Grotesk",
  //    "Andalé Sans",
  //    "Aptifer",
  //    "Arial",
  //    "Arial Unicode MS",
  //    "Avant Garde Gothic",
  //    "Avenir",
  //    "Bank Gothic",
  //    "Barmeno",
  //    "Bauhaus",
  //    "Bell Centennial",
  //    "Bell Gothic",
  //    "Benguiat Gothic",
  //    "Berlin Sans",
  //    "Beteckna",
  //    "Blue Highway",
  //    "Brandon Grotesque",
  //    "Cabin",
  //    "Cafeteria",
  //    "Calibri",
  //    "Casey",
  //    "Century Gothic",
  //    "Charcoal",
  //    "Chicago",
  //    "Clearface Gothic",
  //    "Clearview",
  //    "Co Headline",
  //    "Co Text",
  //    "Compacta",
  //    "Corbel",
  //    "DejaVu Sans",
  //    "Dotum",
  //    "Droid Sans",
  //    "Dyslexie",
  //    "Ecofont",
  //    "Eras",
  //    "Espy Sans",
  //    "Nu Sans[1]",
  //    "Eurocrat",
  //    "Eurostile",
  //    "Square 721",
  //    "FF Dax",
  //    "FF Meta",
  //    "FF Scala Sans",
  //    "Flama",
  //    "Formata",
  //    "Franklin Gothic",
  //    "FreeSans",
  //    "Frutiger",
  //    "Frutiger Next",
  //    "Futura",
  //    "Geneva",
  //    "Gill Sans",
  //    "Gill Sans Schoolbook",
  //    "Gotham",
  //    "Haettenschweiler",
  //    "Handel Gothic",
  //    "Denmark",
  //    "Hei",
  //    "Helvetica",
  //    "Helvetica Neue",
  //    "Swiss 721",
  //    "Highway Gothic",
  //    "Hiroshige Sans",
  //    "Hobo",
  //    "Impact",
  //    "Industria",
  //    "Interstate",
  //    "Johnston/New Johnston",
  //    "Kabel",
  //    "Lato",
  //    "ITC Legacy Sans",
  //    "Lexia Readable",
  //    "Liberation Sans",
  //    "Lucida Sans",
  //    "Meiryo",
  //    "Microgramma",
  //    "Modern",
  //    "Motorway",
  //    "MS Sans Serif",
  //    "Museo Sans",
  //    "Myriad",
  //    "Neutraface",
  //    "Neuzeit S",
  //    "News Gothic",
  //    "Nimbus Sans L",
  //    "Nina",
  //    "Open Sans",
  //    "Optima",
  //    "Parisine",
  //    "Pricedown",
  //    "Prima Sans",
  //    "PT Sans",
  //    "Rail Alphabet",
  //    "Revue",
  //    "Roboto",
  //    "Rotis Sans",
  //    "Segoe UI",
  //    "Skia",
  //    "Souvenir Gothic",
  //    "ITC Stone Sans",
  //    "Syntax",
  //    "Tahoma",
  //    "Template Gothic",
  //    "Thesis Sans",
  //    "Tiresias",
  //    "Trade Gothic",
  //    "Transport",
  //    "Trebuchet MS",
  //    "Trump Gothic",
  //    "Twentieth Century",
  //    "Ubuntu",
  //    "Univers",
  //    "Zurich",
  //    "Vera Sans",
  //    "Verdana",
  //    "Virtue",
  //    "Amsterdam Old Style",
  //    "Divona",
  //    "Nyala",
  //    "Portobello",
  //    "Rotis Semi Serif",
  //    "Tema Cantante",
  //    "Andale Mono",
  //    "Anonymous and Anonymous Pro",
  //    "Arial Monospaced",
  //    "Bitstream Vera",
  //    "Consolas",
  //    "Courier",
  //    "CourierHP",
  //    "Courier New",
  //    "CourierPS",
  //    "Fontcraft Courier",
  //    "DejaVu Sans Mono",
  //    "Droid Sans Mono",
  //    "Everson Mono",
  //    "Fedra Mono",
  //    "Fixed",
  //    "Fixedsys",
  //    "Fixedsys Excelsior",
  //    "HyperFont",
  //    "Inconsolata",
  //    "Letter Gothic",
  //    "Liberation Mono",
  //    "Lucida Console",
  //    "Lucida Sans Typewriter",
  //    "Lucida Typewriter",
  //    "Menlo",
  //    "MICR",
  //    "Miriam Fixed",
  //    "Monaco",
  //    "Monofur",
  //    "Monospace",
  //    "MS Gothic",
  //    "MS Mincho",
  //    "Nimbus Mono L",
  //    "OCR-A",
  //    "OCR-B",
  //    "Orator",
  //    "Ormaxx",
  //    "PragmataPro",
  //    "Prestige Elite",
  //    "ProFont",
  //    "Proggy programming fonts",
  //    "Small Fonts",
  //    "Sydnie",
  //    "Terminal",
  //    "Tex Gyre Cursor",
  //    "Trixie",
  //    "Ubuntu Mono",
  //    "UM Typewriter",
  //    "Vera Sans Mono",
  //    "William Monospace",
  //    "Balloon",
  //    "Brush Script",
  //    "Choc",
  //    "Dom Casual",
  //    "Dragonwick",
  //    "Mistral",
  //    "Papyrus",
  //    "Segoe Script",
  //    "Tempus Sans",
  //    "Utopia",
  //    "Amazone",
  //    "American Scribe",
  //    "AMS Euler",
  //    "Apple Chancery",
  //    "Aquiline",
  //    "Aristocrat",
  //    "Bickley Script",
  //    "Civitype",
  //    "Codex",
  //    "Edwardian Script",
  //    "Forte",
  //    "French Script",
  //    "ITC Zapf Chancery",
  //    "Kuenstler Script",
  //    "Monotype Corsiva",
  //    "Old English Text MT",
  //    "Palace Script",
  //    "Park Avenue",
  //    "Scriptina",
  //    "Shelley Volante",
  //    "Vivaldi",
  //    "Vladimir Script",
  //    "Zapfino",
  //    "Andy",
  //    "Ashley Script",
  //    "Cézanne",
  //    "Chalkboard",
  //    "Comic Sans MS",
  //    "Dom Casual",
  //    "Fontoon",
  //    "Irregularis",
  //    "Jefferson",
  //    "Kristen",
  //    "Lucida Handwriting",
  //    "Rage Italic",
  //    "Rufscript",
  //    "Scribble",
  //    "Soupbone",
  //    "Tekton",
  //    "Alecko",
  //    "Cinderella",
  //    "Coronet",
  //    "Cupola",
  //    "Curlz",
  //    "Magnificat",
  //    "Script",
  //    "Stone Informal",
  //    "American Text",
  //    "Bastard",
  //    "Breitkopf Fraktur",
  //    "Cloister Black",
  //    "Fette Fraktur",
  //    "Fletcher",
  //    "Fraktur",
  //    "Goudy Text",
  //    "Lucida Blackletter",
  //    "Old English Text",
  //    "Schwabacher",
  //    "Wedding Text",
  //    "Aegyptus",
  //    "Aharoni",
  //    "Aisha",
  //    "Amienne",
  //    "Batak Script",
  //    "Chandas",
  //    "Grecs du roi",
  //    "Hanacaraka",
  //    "Japanese Gothic",
  //    "Jomolhari",
  //    "Kochi",
  //    "Koren",
  //    "Lontara Script",
  //    "Maiola",
  //    "Malgun Gothic",
  //    "Meiryo",
  //    "Microsoft JhengHei",
  //    "Microsoft YaHei",
  //    "Minchō",
  //    "Ming",
  //    "Mona",
  //    "MS Gothic",
  //    "Nassim",
  //    "Nastaliq Navees",
  //    "Neacademia",
  //    "Perpetua Greek[2]",
  //    "Porson",
  //    "SimSun",
  //    "Skolar",
  //    "Skolar Devanagari",
  //    "Sundanese Unicode",
  //    "Sutturah",
  //    "Sylfaen",
  //    "Tai Le Valentinium",
  //    "Tengwar",
  //    "Tibetan Machine Uni",
  //    "Tunga",
  //    "Wadalab",
  //    "Wilson Greek",
  //    "Apple Symbols",
  //    "Asana-Math",
  //    "Blackboard bold",
  //    "Bookshelf Symbol 7",
  //    "Braille",
  //    "Cambria Math",
  //    "Commercial Pi",
  //    "Computer Modern",
  //    "Corel",
  //    "Erler Dingbats",
  //    "HM Phonetic",
  //    "Lucida Math",
  //    "Marlett",
  //    "Mathematical Pi",
  //    "Morse Code",
  //    "OpenSymbol",
  //    "RichStyle",
  //    "Symbol",
  //    "SymbolPS",
  //    "Webdings",
  //    "Wingdings",
  //    "Wingdings 2",
  //    "Wingdings 3",
  //    "Zapf Dingbats",
  //    "Abracadabra",
  //    "Ad Lib",
  //    "Allegro",
  //    "Andreas",
  //    "Arnold Böcklin",
  //    "Astur",
  //    "Balloon Pop Outlaw Black",
  //    "Banco",
  //    "Bauhaus",
  //    "Beat",
  //    "Braggadocio",
  //    "Broadway",
  //    "Caslon Antique",
  //    "Cooper Black",
  //    "Curlz",
  //    "Ellington",
  //    "Exablock",
  //    "Exocet",
  //    "FIG Script",
  //    "Forte",
  //    "Gabriola",
  //    "Gigi",
  //    "Harlow Solid",
  //    "Harrington",
  //    "Horizon",
  //    "Jim Crow",
  //    "Jokerman",
  //    "Juice",
  //    "Lo-Type",
  //    "Magneto",
  //    "Megadeth",
  //    "Neuland",
  //    "Peignot",
  //    "Ravie",
  //    "San Francisco",
  //    "Showcard Gothic",
  //    "Snap",
  //    "Stencil",
  //    "Umbra",
  //    "Westminster",
  //    "Willow",
  //    "Windsor",
  //    // Google Fonts - http://worknotes.scripting.com/february2012/22612ByDw/listOfGoogleFonts
  //    "ABeeZee",
  //    "Abel",
  //    "Abril Fatface",
  //    "Aclonica",
  //    "Acme",
  //    "Actor",
  //    "Adamina",
  //    "Advent Pro",
  //    "Aguafina Script",
  //    "Akronim",
  //    "Aladin",
  //    "Aldrich",
  //    "Alef",
  //    "Alegreya",
  //    "Alegreya Sans",
  //    "Alegreya Sans SC",
  //    "Alegreya SC",
  //    "Alex Brush",
  //    "Alfa Slab One",
  //    "Alice",
  //    "Alike",
  //    "Alike Angular",
  //    "Allan",
  //    "Allerta",
  //    "Allerta Stencil",
  //    "Allura",
  //    "Almendra",
  //    "Almendra Display",
  //    "Almendra SC",
  //    "Amarante",
  //    "Amaranth",
  //    "Amatic SC",
  //    "Amethysta",
  //    "Anaheim",
  //    "Andada",
  //    "Andika",
  //    "Angkor",
  //    "Annie Use Your Telescope",
  //    "Anonymous Pro",
  //    "Antic",
  //    "Antic Didone",
  //    "Antic Slab",
  //    "Anton",
  //    "Arapey",
  //    "Arbutus",
  //    "Arbutus Slab",
  //    "Architects Daughter",
  //    "Archivo Black",
  //    "Archivo Narrow",
  //    "Arimo",
  //    "Arizonia",
  //    "Armata",
  //    "Artifika",
  //    "Arvo",
  //    "Asap",
  //    "Asset",
  //    "Astloch",
  //    "Asul",
  //    "Atomic Age",
  //    "Aubrey",
  //    "Audiowide",
  //    "Autour One",
  //    "Average",
  //    "Average Sans",
  //    "Averia Gruesa Libre",
  //    "Averia Libre",
  //    "Averia Sans Libre",
  //    "Averia Serif Libre",
  //    "Bad Script",
  //    "Balthazar",
  //    "Bangers",
  //    "Basic",
  //    "Battambang",
  //    "Baumans",
  //    "Bayon",
  //    "Belgrano",
  //    "Belleza",
  //    "BenchNine",
  //    "Bentham",
  //    "Berkshire Swash",
  //    "Bevan",
  //    "Bigelow Rules",
  //    "Bigshot One",
  //    "Bilbo",
  //    "Bilbo Swash Caps",
  //    "Bitter",
  //    "Black Ops One",
  //    "Bokor",
  //    "Bonbon",
  //    "Boogaloo",
  //    "Bowlby One",
  //    "Bowlby One SC",
  //    "Brawler",
  //    "Bree Serif",
  //    "Bubblegum Sans",
  //    "Bubbler One",
  //    "Buda",
  //    "Buenard",
  //    "Butcherman",
  //    "Butterfly Kids",
  //    "Cabin",
  //    "Cabin Condensed",
  //    "Cabin Sketch",
  //    "Caesar Dressing",
  //    "Cagliostro",
  //    "Calligraffitti",
  //    "Cambo",
  //    "Candal",
  //    "Cantarell",
  //    "Cantata One",
  //    "Cantora One",
  //    "Capriola",
  //    "Cardo",
  //    "Carme",
  //    "Carrois Gothic",
  //    "Carrois Gothic SC",
  //    "Carter One",
  //    "Caudex",
  //    "Cedarville Cursive",
  //    "Ceviche One",
  //    "Changa One",
  //    "Chango",
  //    "Chau Philomene One",
  //    "Chela One",
  //    "Chelsea Market",
  //    "Chenla",
  //    "Cherry Cream Soda",
  //    "Cherry Swash",
  //    "Chewy",
  //    "Chicle",
  //    "Chivo",
  //    "Cinzel",
  //    "Cinzel Decorative",
  //    "Clicker Script",
  //    "Coda",
  //    "Coda Caption",
  //    "Codystar",
  //    "Combo",
  //    "Comfortaa",
  //    "Coming Soon",
  //    "Concert One",
  //    "Condiment",
  //    "Content",
  //    "Contrail One",
  //    "Convergence",
  //    "Cookie",
  //    "Copse",
  //    "Corben",
  //    "Courgette",
  //    "Cousine",
  //    "Coustard",
  //    "Covered By Your Grace",
  //    "Crafty Girls",
  //    "Creepster",
  //    "Crete Round",
  //    "Crimson Text",
  //    "Croissant One",
  //    "Crushed",
  //    "Cuprum",
  //    "Cutive",
  //    "Cutive Mono",
  //    "Damion",
  //    "Dancing Script",
  //    "Dangrek",
  //    "Dawning of a New Day",
  //    "Days One",
  //    "Delius",
  //    "Delius Swash Caps",
  //    "Delius Unicase",
  //    "Della Respira",
  //    "Denk One",
  //    "Devonshire",
  //    "Didact Gothic",
  //    "Diplomata",
  //    "Diplomata SC",
  //    "Domine",
  //    "Donegal One",
  //    "Doppio One",
  //    "Dorsa",
  //    "Dosis",
  //    "Dr Sugiyama",
  //    "Droid Sans",
  //    "Droid Sans Mono",
  //    "Droid Serif",
  //    "Duru Sans",
  //    "Dynalight",
  //    "Eagle Lake",
  //    "Eater",
  //    "EB Garamond",
  //    "Economica",
  //    "Ek Mukta",
  //    "Electrolize",
  //    "Elsie",
  //    "Elsie Swash Caps",
  //    "Emblema One",
  //    "Emilys Candy",
  //    "Engagement",
  //    "Englebert",
  //    "Enriqueta",
  //    "Erica One",
  //    "Esteban",
  //    "Euphoria Script",
  //    "Ewert",
  //    "Exo",
  //    "Exo 2",
  //    "Expletus Sans",
  //    "Fanwood Text",
  //    "Fascinate",
  //    "Fascinate Inline",
  //    "Faster One",
  //    "Fasthand",
  //    "Fauna One",
  //    "Federant",
  //    "Federo",
  //    "Felipa",
  //    "Fenix",
  //    "Finger Paint",
  //    "Fira Mono",
  //    "Fira Sans",
  //    "Fjalla One",
  //    "Fjord One",
  //    "Flamenco",
  //    "Flavors",
  //    "Fondamento",
  //    "Fontdiner Swanky",
  //    "Forum",
  //    "Francois One",
  //    "Freckle Face",
  //    "Fredericka the Great",
  //    "Fredoka One",
  //    "Freehand",
  //    "Fresca",
  //    "Frijole",
  //    "Fruktur",
  //    "Fugaz One",
  //    "Gabriela",
  //    "Gafata",
  //    "Galdeano",
  //    "Galindo",
  //    "Gentium Basic",
  //    "Gentium Book Basic",
  //    "Geo",
  //    "Geostar",
  //    "Geostar Fill",
  //    "Germania One",
  //    "GFS Didot",
  //    "GFS Neohellenic",
  //    "Gilda Display",
  //    "Give You Glory",
  //    "Glass Antiqua",
  //    "Glegoo",
  //    "Gloria Hallelujah",
  //    "Goblin One",
  //    "Gochi Hand",
  //    "Gorditas",
  //    "Goudy Bookletter 1911",
  //    "Graduate",
  //    "Grand Hotel",
  //    "Gravitas One",
  //    "Great Vibes",
  //    "Griffy",
  //    "Gruppo",
  //    "Gudea",
  //    "Habibi",
  //    "Hammersmith One",
  //    "Hanalei",
  //    "Hanalei Fill",
  //    "Handlee",
  //    "Hanuman",
  //    "Happy Monkey",
  //    "Headland One",
  //    "Henny Penny",
  //    "Herr Von Muellerhoff",
  //    "Hind",
  //    "Holtwood One SC",
  //    "Homemade Apple",
  //    "Homenaje",
  //    "Iceberg",
  //    "Iceland",
  //    "IM Fell Double Pica",
  //    "IM Fell Double Pica SC",
  //    "IM Fell DW Pica",
  //    "IM Fell DW Pica SC",
  //    "IM Fell English",
  //    "IM Fell English SC",
  //    "IM Fell French Canon",
  //    "IM Fell French Canon SC",
  //    "IM Fell Great Primer",
  //    "IM Fell Great Primer SC",
  //    "Imprima",
  //    "Inconsolata",
  //    "Inder",
  //    "Indie Flower",
  //    "Inika",
  //    "Irish Grover",
  //    "Istok Web",
  //    "Italiana",
  //    "Italianno",
  //    "Jacques Francois",
  //    "Jacques Francois Shadow",
  //    "Jim Nightshade",
  //    "Jockey One",
  //    "Jolly Lodger",
  //    "Josefin Sans",
  //    "Josefin Slab",
  //    "Joti One",
  //    "Judson",
  //    "Julee",
  //    "Julius Sans One",
  //    "Junge",
  //    "Jura",
  //    "Just Another Hand",
  //    "Just Me Again Down Here",
  //    "Kalam",
  //    "Kameron",
  //    "Kantumruy",
  //    "Karla",
  //    "Karma",
  //    "Kaushan Script",
  //    "Kavoon",
  //    "Kdam Thmor",
  //    "Keania One",
  //    "Kelly Slab",
  //    "Kenia",
  //    "Khmer",
  //    "Kite One",
  //    "Knewave",
  //    "Kotta One",
  //    "Koulen",
  //    "Kranky",
  //    "Kreon",
  //    "Kristi",
  //    "Krona One",
  //    "La Belle Aurore",
  //    "Lancelot",
  //    "Lato",
  //    "League Script",
  //    "Leckerli One",
  //    "Ledger",
  //    "Lekton",
  //    "Lemon",
  //    "Libre Baskerville",
  //    "Life Savers",
  //    "Lilita One",
  //    "Lily Script One",
  //    "Limelight",
  //    "Linden Hill",
  //    "Lobster",
  //    "Lobster Two",
  //    "Londrina Outline",
  //    "Londrina Shadow",
  //    "Londrina Sketch",
  //    "Londrina Solid",
  //    "Lora",
  //    "Love Ya Like A Sister",
  //    "Loved by the King",
  //    "Lovers Quarrel",
  //    "Luckiest Guy",
  //    "Lusitana",
  //    "Lustria",
  //    "Macondo",
  //    "Macondo Swash Caps",
  //    "Magra",
  //    "Maiden Orange",
  //    "Mako",
  //    "Marcellus",
  //    "Marcellus SC",
  //    "Marck Script",
  //    "Margarine",
  //    "Marko One",
  //    "Marmelad",
  //    "Marvel",
  //    "Mate",
  //    "Mate SC",
  //    "Maven Pro",
  //    "McLaren",
  //    "Meddon",
  //    "MedievalSharp",
  //    "Medula One",
  //    "Megrim",
  //    "Meie Script",
  //    "Merienda",
  //    "Merienda One",
  //    "Merriweather",
  //    "Merriweather Sans",
  //    "Metal",
  //    "Metal Mania",
  //    "Metamorphous",
  //    "Metrophobic",
  //    "Michroma",
  //    "Milonga",
  //    "Miltonian",
  //    "Miltonian Tattoo",
  //    "Miniver",
  //    "Miss Fajardose",
  //    "Modern Antiqua",
  //    "Molengo",
  //    "Molle",
  //    "Monda",
  //    "Monofett",
  //    "Monoton",
  //    "Monsieur La Doulaise",
  //    "Montaga",
  //    "Montez",
  //    "Montserrat",
  //    "Montserrat Alternates",
  //    "Montserrat Subrayada",
  //    "Moul",
  //    "Moulpali",
  //    "Mountains of Christmas",
  //    "Mouse Memoirs",
  //    "Mr Bedfort",
  //    "Mr Dafoe",
  //    "Mr De Haviland",
  //    "Mrs Saint Delafield",
  //    "Mrs Sheppards",
  //    "Muli",
  //    "Mystery Quest",
  //    "Neucha",
  //    "Neuton",
  //    "New Rocker",
  //    "News Cycle",
  //    "Niconne",
  //    "Nixie One",
  //    "Nobile",
  //    "Nokora",
  //    "Norican",
  //    "Nosifer",
  //    "Nothing You Could Do",
  //    "Noticia Text",
  //    "Noto Sans",
  //    "Noto Serif",
  //    "Nova Cut",
  //    "Nova Flat",
  //    "Nova Mono",
  //    "Nova Oval",
  //    "Nova Round",
  //    "Nova Script",
  //    "Nova Slim",
  //    "Nova Square",
  //    "Numans",
  //    "Nunito",
  //    "Odor Mean Chey",
  //    "Offside",
  //    "Old Standard TT",
  //    "Oldenburg",
  //    "Oleo Script",
  //    "Oleo Script Swash Caps",
  //    "Open Sans",
  //    "Open Sans Condensed",
  //    "Oranienbaum",
  //    "Orbitron",
  //    "Oregano",
  //    "Orienta",
  //    "Original Surfer",
  //    "Oswald",
  //    "Over the Rainbow",
  //    "Overlock",
  //    "Overlock SC",
  //    "Ovo",
  //    "Oxygen",
  //    "Oxygen Mono",
  //    "Pacifico",
  //    "Paprika",
  //    "Parisienne",
  //    "Passero One",
  //    "Passion One",
  //    "Pathway Gothic One",
  //    "Patrick Hand",
  //    "Patrick Hand SC",
  //    "Patua One",
  //    "Paytone One",
  //    "Peralta",
  //    "Permanent Marker",
  //    "Petit Formal Script",
  //    "Petrona",
  //    "Philosopher",
  //    "Piedra",
  //    "Pinyon Script",
  //    "Pirata One",
  //    "Plaster",
  //    "Play",
  //    "Playball",
  //    "Playfair Display",
  //    "Playfair Display SC",
  //    "Podkova",
  //    "Poiret One",
  //    "Poller One",
  //    "Poly",
  //    "Pompiere",
  //    "Pontano Sans",
  //    "Port Lligat Sans",
  //    "Port Lligat Slab",
  //    "Prata",
  //    "Preahvihear",
  //    "Press Start 2P",
  //    "Princess Sofia",
  //    "Prociono",
  //    "Prosto One",
  //    "PT Mono",
  //    "PT Sans",
  //    "PT Sans Caption",
  //    "PT Sans Narrow",
  //    "PT Serif",
  //    "PT Serif Caption",
  //    "Puritan",
  //    "Purple Purse",
  //    "Quando",
  //    "Quantico",
  //    "Quattrocento",
  //    "Quattrocento Sans",
  //    "Questrial",
  //    "Quicksand",
  //    "Quintessential",
  //    "Qwigley",
  //    "Racing Sans One",
  //    "Radley",
  //    "Rajdhani",
  //    "Raleway",
  //    "Raleway Dots",
  //    "Rambla",
  //    "Rammetto One",
  //    "Ranchers",
  //    "Rancho",
  //    "Rationale",
  //    "Redressed",
  //    "Reenie Beanie",
  //    "Revalia",
  //    "Ribeye",
  //    "Ribeye Marrow",
  //    "Righteous",
  //    "Risque",
  //    "Roboto",
  //    "Roboto Condensed",
  //    "Roboto Slab",
  //    "Rochester",
  //    "Rock Salt",
  //    "Rokkitt",
  //    "Romanesco",
  //    "Ropa Sans",
  //    "Rosario",
  //    "Rosarivo",
  //    "Rouge Script",
  //    "Rubik Mono One",
  //    "Rubik One",
  //    "Ruda",
  //    "Rufina",
  //    "Ruge Boogie",
  //    "Ruluko",
  //    "Rum Raisin",
  //    "Ruslan Display",
  //    "Russo One",
  //    "Ruthie",
  //    "Rye",
  //    "Sacramento",
  //    "Sail",
  //    "Salsa",
  //    "Sanchez",
  //    "Sancreek",
  //    "Sansita One",
  //    "Sarina",
  //    "Satisfy",
  //    "Scada",
  //    "Schoolbell",
  //    "Seaweed Script",
  //    "Sevillana",
  //    "Seymour One",
  //    "Shadows Into Light",
  //    "Shadows Into Light Two",
  //    "Shanti",
  //    "Share",
  //    "Share Tech",
  //    "Share Tech Mono",
  //    "Shojumaru",
  //    "Short Stack",
  //    "Siemreap",
  //    "Sigmar One",
  //    "Signika",
  //    "Signika Negative",
  //    "Simonetta",
  //    "Sintony",
  //    "Sirin Stencil",
  //    "Six Caps",
  //    "Skranji",
  //    "Slackey",
  //    "Smokum",
  //    "Smythe",
  //    "Sniglet",
  //    "Snippet",
  //    "Snowburst One",
  //    "Sofadi One",
  //    "Sofia",
  //    "Sonsie One",
  //    "Sorts Mill Goudy",
  //    "Source Code Pro",
  //    "Source Sans Pro",
  //    "Source Serif Pro",
  //    "Special Elite",
  //    "Spicy Rice",
  //    "Spinnaker",
  //    "Spirax",
  //    "Squada One",
  //    "Stalemate",
  //    "Stalinist One",
  //    "Stardos Stencil",
  //    "Stint Ultra Condensed",
  //    "Stint Ultra Expanded",
  //    "Stoke",
  //    "Strait",
  //    "Sue Ellen Francisco",
  //    "Sunshiney",
  //    "Supermercado One",
  //    "Suwannaphum",
  //    "Swanky and Moo Moo",
  //    "Syncopate",
  //    "Tangerine",
  //    "Taprom",
  //    "Tauri",
  //    "Teko",
  //    "Telex",
  //    "Tenor Sans",
  //    "Text Me One",
  //    "The Girl Next Door",
  //    "Tienne",
  //    "Tinos",
  //    "Titan One",
  //    "Titillium Web",
  //    "Trade Winds",
  //    "Trocchi",
  //    "Trochut",
  //    "Trykker",
  //    "Tulpen One",
  //    "Ubuntu",
  //    "Ubuntu Condensed",
  //    "Ubuntu Mono",
  //    "Ultra",
  //    "Uncial Antiqua",
  //    "Underdog",
  //    "Unica One",
  //    "UnifrakturCook",
  //    "UnifrakturMaguntia",
  //    "Unkempt",
  //    "Unlock",
  //    "Unna",
  //    "Vampiro One",
  //    "Varela",
  //    "Varela Round",
  //    "Vast Shadow",
  //    "Vibur",
  //    "Vidaloka",
  //    "Viga",
  //    "Voces",
  //    "Volkhov",
  //    "Vollkorn",
  //    "Voltaire",
  //    "VT323",
  //    "Waiting for the Sunrise",
  //    "Wallpoet",
  //    "Walter Turncoat",
  //    "Warnes",
  //    "Wellfleet",
  //    "Wendy One",
  //    "Wire One",
  //    "Yanone Kaffeesatz",
  //    "Yellowtail",
  //    "Yeseva One",
  //    "Yesteryear",
  //    "Zeyada"
  //  ];
  //  var dedupedFonts = fonts.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]); // http://stackoverflow.com/a/15868720/3361119
  //  var sortedFonts = dedupedFonts.sort();
  //  // $('header').append(cleanedFonts);
  //  var results = [];
  //  var d = new Detector();
  //  for (i = 0; i < sortedFonts.length; i++) {
  //    var result = d.detect(sortedFonts[i]);
  //    var num = i+1;
  //    if(result == true) {
  //      $('#font-list').append('
  //        <li class="'+ sortedFonts[i].toLowerCase().replace(/ /g,"-") +'">
  //          <button class="typeface-selection" data-stck-typeface="'+sortedFonts[i]+'" style="font-family: '+sortedFonts[i]+'">
  //            <span class="num">'+num+'</span>
  //            <span class="typeface">'+sortedFonts[i]+'</span>
  //            <span class="test-sentence">A quick brown fox jumps over the lazy dog.</span>
  //          </button>
  //        </li>
  //      ');
  //    }
  //  }
  // };

  // $('[data-stck-button]').on('click', function() {
  //  $(this).next('[data-stck-content]').slideToggle(100);
  //  $(this).toggleClass('open');
  //  return false;
  // });

  // $('[data-stck=closeParent]').on('click', function() {
  //  $(this).parent().removeClass('open');
  // });

  // // Sliders for the Metrics panel on font-stack-builder.php
  // $('#font-size-slider').noUiSlider({
  //  start: 16,
  //  connect: "lower",
  //  range: {
  //    'min': 6,
  //    'max': 160
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#font-size-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#font-weight-slider').noUiSlider({
  //  start: 400,
  //  connect: "lower",
  //  range: {
  //    'min': 100,
  //    'max': 900
  //  },
  //  step: 100,
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#font-weight-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#font-kerning-slider').noUiSlider({
  //  start: 0,
  //  connect: "lower",
  //  range: {
  //    'min': -5,
  //    'max': 10
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#font-kerning-input'),
  //        format: {
  //          decimals: 2
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#line-height-slider').noUiSlider({
  //  start: 1.33,
  //  connect: "lower",
  //  range: {
  //    'min': 0,
  //    'max': 10
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#line-height-input'),
  //        format: {
  //          decimals: 2
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#measure-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#measure-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#padding-top-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#padding-top-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#padding-right-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#padding-right-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#padding-bottom-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#padding-bottom-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#padding-left-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#padding-left-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  
  // // Color pickers
  // $('#font-color-picker').colpick({
  //  layout:'rgbhex',
  //  submit:0,
  //  colorScheme:'dark',
  //  onChange:function(hsb,hex,rgb,el,bySetColor) {
  //    $(el).css('background-color','#'+hex);
  //    // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
  //    if(!bySetColor) $('#font-color-code').val('#'+hex);
  //  }
  // }).keyup(function(){
  //    $(this).colpickSetColor(this.value);
  // });
  // $('#background-color-picker').colpick({
  //  layout:'rgbhex',
  //  submit:0,
  //  colorScheme:'dark',
  //  onChange:function(hsb,hex,rgb,el,bySetColor) {
  //    $(el).css('background-color','#'+hex);
  //    // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
  //    if(!bySetColor) $('#background-color-code').val('#'+hex);
  //  }
  // }).keyup(function(){
  //  $(this).colpickSetColor(this.value);
  // });
