
let createFormData = (input = 'input') => {
  let formData = {};
  $(input).each((index, input) => {
    formData[input.name] = $(input).val();
  })
  console.log(formData);
  return formData;
}

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(users => {
    for (user of users) {
      $("<div>")
        .text(user.name)
        .appendTo($("body"));
    }
  });

  $(".order-form").on("submit", function (event) {
    event.preventDefault();
    let formData = createFormData()

    $.post({
      url: '/orders',
      data: formData,
    }).then((res) => {
      $('.order-name').text(res);
      $('.modal-body').text(`Thank you for ordering with DM Burgers! You will be receiving an SMS shortly confirming your order.`);
    });
  });

  $(".add-to-cart-form").on("submit", function (event) {
    event.preventDefault();
    let formInput = $(this).children("input")

    let formData = createFormData(formInput)
    $.post({
      url: '/cart',
      data: formData,
    }).done((result) => {
      $('#submit-toast').toast('show')
      console.log("dish has been added to cart")
    }).fail((err) => {
      console.log(err)
    })



  })

  $('.carousel-slide').carousel({
    interval: 5000
  })



});


