function getInputErros(data) {
  let inputErrors = {};
  for (const input in data) {
    if ( data[input].length === 0 ) {
      inputErrors[input] = true;
    }
  }
  return inputErrors;
}

function matchPasswords(firstPass, secondPass) {
  if (firstPass === secondPass) { return true }
  return false;
}

$("#btn-submit").on("click", function(event){
  const email = $("#email").val();
  const password = $("#password").val();
  const matchPassword = $("#matchPassword").val();

  const errors = getInputErros({ email, password, matchPassword });
  const passMatch = matchPasswords(password, matchPassword);

  if ( Object.keys(errors).length === 0 && passMatch ) {
    const user = {
      email,
      password
    }
    
    $.ajax({
      type: "POST",
      url: "/",
      data: user,
      dataType: "json",
      success: function(data) {
        if (data.status === 200) {
          $("#message-box p").text(data.message);
          $("#message-box").removeClass("hide-note").css({ "display": "block" });
          $("#email").val('');
          $("#password").val('');
          $("#matchPassword").val('');
        } else {
          console.log(data.message)
          $("#message-box p").text(data.message);
          $("#message-box").removeClass("hide-note alert-success").addClass("alert-danger").css({ "display": "block" });
        }
      },
    })

  } else {
    for (const error in errors) {
      $(`#${error}`).addClass("is-invalid");
      $(`#${error}Help`).removeClass("hide-note").css({ "display": "block" });
    }
  }
  event.preventDefault();
});