// options
$(function() {
  $('.custom-radio .option').click(function(event) {
    if($(this).hasClass('active')){
      $(this).removeClass('active');
    }else{
      $('.custom-radio .option').removeClass('active');
      $(this).addClass('active');
    }
    return false;
  });
});
