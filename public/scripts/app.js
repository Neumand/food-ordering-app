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
    let formData = {};
    $('input').each((index, input) => {
      console.log(input);
      formData[input.name] = $(input).val();
    })
    console.log(formData);
    $.post({
      url: '/orders',
      data: formData,
    })
      .then((res) => {
        $('.order-name').text(res);
        $('.modal-body').text(`Thank you for ordering with DM Burgers! You will be receiving an SMS shortly confirming your order.`);
      });
  });
});


