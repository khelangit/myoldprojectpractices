jQuery(document).ready(function ($) {
  $("#afig_generate").on("click", function (e) {
    e.preventDefault();
    var prompt = $("#afig_prompt").val();
    var size = $("#afig_size").val();
    var post_id = $("#afig_post_id").val();
    if (!prompt) {
      $("#afig_status").text("Please enter a prompt");
      return;
    }

    $("#afig_spinner").show();
    $("#afig_status").text("");

    var data = {
      action: "afig_generate_image",
      nonce: afig_ajax.nonce,
      prompt: prompt,
      size: size,
      post_id: post_id,
    };

    $.post(
      afig_ajax.ajax_url,
      data,
      function (resp) {
        $("#afig_spinner").hide();
        if (!resp) {
          $("#afig_status").text("No response from server");
          return;
        }
        if (resp.success) {
          $("#afig_status").text("Image generated and saved.");
          $("#afig_preview").html(
            '<a href="' +
              resp.data.url +
              '" target="_blank"><img src="' +
              resp.data.url +
              '" style="max-width:100%;height:auto;border:1px solid #ddd;padding:4px"/></a>'
          );
        } else {
          $("#afig_status").text("Error: " + (resp.data || "Unknown"));
        }
      },
      "json"
    ).fail(function (xhr) {
      $("#afig_spinner").hide();
      $("#afig_status").text("Request failed: " + xhr.statusText);
    });
  });
});
