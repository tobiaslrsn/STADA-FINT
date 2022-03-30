function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

$(function () {
  $('[data-toggle="popover"]').popover();

  $("#cvc").on("click", function () {
    if ($(".cvc-preview-container").hasClass("hide")) {
      $(".cvc-preview-container").removeClass("hide");
    } else {
      $(".cvc-preview-container").addClass("hide");
    }
  });
});
