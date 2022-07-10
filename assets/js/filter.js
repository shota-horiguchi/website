var years, categories, filterByYear;

function keywordSearch(text, query) {
  var i;
  var queries = query.split(' ');
  for (i = 0; i < queries.length; i++) {
    if (text.indexOf(queries[i]) <= -1) {
      return false;
    }
  }
  return true;
}

function filter() {
  var currentScrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  $('html, body').animate({
    'scrollTop': Math.min($('header').offset().top + $('header').outerHeight(true), currentScrollPosition)
  }, 0);

  var query = $('#filter-search').val().toLowerCase();
  var pubtype = $('#filter-pubtype').val();
  var year = $('#filter-year').val();

  $(".year-all").hide();
  $(".year-all").find('li').hide();
  $(year).show();

  $(".pubtype-all").hide();
  $(year + " " + pubtype).show();
  $(year + " " + pubtype).find('li').show();

  if (query.length > 0) {
    $(".year-all li:visible").filter(function () {
      !$(this).toggle(keywordSearch($(this).text().toLowerCase(), query))
    }).hide();
  }
  $(".year-all li:visible").hide().fadeIn(200);

  $(".year-all").each(function (index, value) {
    if ($(this).find("li:visible").length == 0)
      $(this).hide();
  });
}

window.onload = function () {
  $('#filter-search').keypress($.debounce(500, filter));
  $('#filter-search').keyup($.debounce(500, function (e) {
    if (e.keyCode == 46 || e.keyCode == 8)
      filter();
  }));
  $('#filter-search').on("search", filter);
  $('#filter-pubtype').change(filter);
  $('#filter-year').change(filter);
};