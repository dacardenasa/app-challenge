import { getInputErrors, matchPasswords, validateInputs } from "./functions.js";

$("#btn-submit").on("click", function (event) {
  const email = $("#email");
  const password = $("#password");
  const matchPassword = $("#matchPassword");

  const errors = getInputErrors({ email, password, matchPassword });
  const passMatch = matchPasswords(password.val(), matchPassword.val());

  if (Object.keys(errors).length === 0 && passMatch) {
    // Clean errors tags
    validateInputs([ email, password, matchPassword ]);
    // Http request POST to server
    $.ajax({
      type: "POST",
      url: "/users/register",
      data: { email: email.val(), password: password.val() },
      dataType: "json",
      success: function (data) {
        if (data.status === 200) {
          $("#message-box p").text(data.message);
          $("#message-box").removeClass("hide-note").css({ display: "block" });
          $("#email").val("");
          $("#password").val("");
          $("#matchPassword").val("");
          $("#form-container").css({ display: "none" });
          
          // http GET request users
          $.ajax({
            type: "GET",
            url: "/users",
            dataType: "json",
            success: function(data) {
              console.log(data);
              if (data.status === 200) {
                const { users } = data;
                $.each(users, function( index, value) {
                  $("#users-table tbody").append(`<tr>
                    <td>${value.username}</td>
                  </tr>`);
                })
              }
            }
          });
          $("#users-table").css({ display: "block"});

        } else {
          $("#message-box p").text(data.message);
          $("#message-box")
            .removeClass("hide-note alert-success")
            .addClass("alert-danger")
            .css({ display: "block" });
        }
      },
    });
  } else {
    // Clean error tags
    validateInputs([ email, password, matchPassword ]);
    
    if (Object.keys(errors).length > 0) {
      for (const error in errors) {
        $(`#${error}`).addClass("is-invalid");
        $(`#${error}Help`).removeClass("hide-note").css({ display: "block" });
      }
    } else if (!passMatch) {
      $("#matchPasswordHelp").text("Password doesn't match!");
      $("#matchPassword").addClass("is-invalid");
      $("#matchPasswordHelp").removeClass("hide-note").css({ display: "block" });
    }
  }
  event.preventDefault();
});
