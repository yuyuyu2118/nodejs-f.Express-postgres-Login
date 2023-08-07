const form = $("#signin-form");

form.on("submit", (e) => {
  e.preventDefault();
  const username = $("#username").val();
  const password = $("#password").val();
  const data = {
    username: username,
    password: password,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost:60180/login",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json",
  })
    .done((data) => {
      console.log(data);
      alert("ログインしました");
      window.location.href = "http://localhost:60180/";
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      alert("ログインに失敗しました");
    });
});
