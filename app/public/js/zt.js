/* eslint-disable */
document.writeln("<script src='//m.mei120.com/js/common.js'></script>")
document.writeln(
  "<script language='javascript' src='http://swtmei.modern120.com/JS/LsJS.aspx?siteid=LNV66049960&float=1&lng=cn'></script>"
)
if (window.location.href.indexOf('special') > 0) {
  $.get('/', function(res) {
    var html = $.parseHTML(res)
    $.each(html, function(i, el) {
      el.nodeName === 'HEADER' ? $('.zt-main').before(el.outerHTML) : ''
      if (window.location.href.indexOf('4yue') < 0) {
        el.nodeName === 'FOOTER' ? $('.zt-main').after(el.outerHTML) : ''
      }
    })
  })
}
