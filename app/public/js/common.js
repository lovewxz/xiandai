/* eslint-disable */
$(function() {
  setTimeout(function() {
    $('.mask').fadeIn(600)
  }, 20000)

  function swtOpen() {
    $('.mask').fadeIn(600)
  }

  $('.swt-close').on('click', function() {
    $('.mask')
      .fadeOut(600)
      .delay(20000)
      .fadeIn(function() {
        swtOpen()
      })
  })

  $('body').on('click', '.index_menu,.close-btn', function() {
    var menuWrapper = $('.menu-wrapper')
    if (!menuWrapper.hasClass('show')) {
      menuWrapper.addClass('show')
    } else {
      menuWrapper.removeClass('show')
    }
  })

  $('body').on('click', '.menu-left li', function() {
    var index = $(this).index()
    $(this)
      .addClass('on')
      .siblings()
      .removeClass('on')
    $('.menu-content')
      .eq(index)
      .show()
      .siblings()
      .hide()
  })
})
