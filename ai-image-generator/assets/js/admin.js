jQuery(document).ready(function ($) {
  // Toggle AI form visibility
  $("#aig-toggle-ai").on("click", function () {
    $("#aig-ai-form").slideToggle();
    $(this).toggleClass("active");
  });

  // Handle AI image generation
  $("#aig-generate-btn").on("click", function () {
    var prompt = $("#aig-prompt").val().trim();
    var style = $("#aig-style").val();
    var size = $("#aig-size").val();
    var postId = aig_ajax.post_id;

    if (!prompt) {
      alert("Please enter a description for your image.");
      return;
    }

    // Show progress
    $("#aig-progress").show();
    $("#aig-result").hide().empty();
    $("#aig-generate-btn")
      .prop("disabled", true)
      .text(aig_ajax.strings.generating);

    // Prepare form data
    var formData = {
      action: "aig_generate_image",
      nonce: aig_ajax.nonce,
      prompt: prompt,
      style: style,
      size: size,
      post_id: postId,
    };

    // AJAX request for image generation
    $.post(aig_ajax.ajax_url, formData, function (response) {
      $("#aig-progress").hide();
      $("#aig-generate-btn")
        .prop("disabled", false)
        .text("Generate & Set as Featured");

      if (response.success) {
        var data = response.data;
        // Display generated image preview
        var resultHtml = '<div class="aig-generated-preview">';
        resultHtml +=
          '<img src="' +
          data.thumbnail_url +
          '" alt="Generated image" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px;">';
        if (!aig_ajax.auto_set_featured) {
          resultHtml +=
            '<p><button class="button button-primary set-featured-ai" data-attachment-id="' +
            data.attachment_id +
            '">' +
            aig_ajax.strings.set_featured +
            "</button></p>";
        }
        resultHtml += "</div>";
        $("#aig-result").html(resultHtml).show();

        // Auto-set as featured image if setting is enabled
        if (aig_ajax.auto_set_featured) {
          $.post(
            aig_ajax.ajax_url,
            {
              action: "aig_set_featured_image",
              nonce: aig_ajax.nonce,
              post_id: postId,
              attachment_id: data.attachment_id,
            },
            function (featuredResponse) {
              if (featuredResponse.success) {
                // Refresh the meta box to show the new featured image
                location.reload();
              } else {
                $("#aig-result").append(
                  '<div class="notice notice-error"><p>Failed to set featured image: ' +
                    (featuredResponse.data || "Unknown error") +
                    "</p></div>"
                );
              }
            }
          ).fail(function () {
            $("#aig-result").append(
              '<div class="notice notice-error"><p>' +
                aig_ajax.strings.error +
                "</p></div>"
            );
          });
        }
      } else {
        $("#aig-result")
          .html(
            '<div class="notice notice-error"><p>' +
              (response.data.message || aig_ajax.strings.error) +
              "</p></div>"
          )
          .show();
      }
    }).fail(function () {
      $("#aig-progress").hide();
      $("#aig-generate-btn")
        .prop("disabled", false)
        .text("Generate & Set as Featured");
      $("#aig-result")
        .html(
          '<div class="notice notice-error"><p>' +
            aig_ajax.strings.error +
            "</p></div>"
        )
        .show();
    });
  });

  // Handle manual setting of featured image (when auto-set is disabled)
  $(document).on("click", ".set-featured-ai", function () {
    var attachmentId = $(this).data("attachment-id");
    var postId = aig_ajax.post_id;

    $.post(
      aig_ajax.ajax_url,
      {
        action: "aig_set_featured_image",
        nonce: aig_ajax.nonce,
        post_id: postId,
        attachment_id: attachmentId,
      },
      function (response) {
        if (response.success) {
          location.reload();
        } else {
          alert(response.data || "Failed to set featured image");
        }
      }
    );
  });

  // Handle default WP remove featured image
  $(".remove-image").on("click", function (e) {
    e.preventDefault();
    $("#_thumbnail_id").val("");
    $("#thumbnail-img").hide();
    $(this).hide();
    $(".button-group a").show();
  });
});
