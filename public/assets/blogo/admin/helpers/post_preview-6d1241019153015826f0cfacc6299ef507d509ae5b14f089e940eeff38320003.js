(function() {
  var PostPreview;

  PostPreview = (function() {
    function PostPreview(buttonId, formId, postUrl, modalId) {
      this.buttonId = buttonId;
      this.formId = formId;
      this.postUrl = postUrl;
      this.modalId = modalId;
      this.button = $("#" + this.buttonId);
      this.form = $("#" + this.formId);
      this.modal = $("#" + this.modalId);
      this.iframe = this.modal.find('iframe');
    }

    PostPreview.prototype.init = function() {
      var callback, url;
      url = this.postUrl;
      callback = this.previewPost;
      return this.button.on('click', (function(_this) {
        return function(event) {
          _this.updateCKeditor();
          event.preventDefault();
          return $.ajax({
            type: "POST",
            url: url,
            data: _this.form.serialize(),
            success: function(data) {
              return _this.previewPost(data);
            }
          });
        };
      })(this));
    };

    PostPreview.prototype.previewPost = function(data) {
      this.iframe.contents().find('html').html(data);
      return document.location.hash = this.modalId;
    };

    PostPreview.prototype.updateCKeditor = function() {
      var instance, name, ref, results;
      if (typeof CKEDITOR !== "undefined" && CKEDITOR !== null) {
        ref = CKEDITOR.instances;
        results = [];
        for (name in ref) {
          instance = ref[name];
          results.push(instance.updateElement());
        }
        return results;
      }
    };

    return PostPreview;

  })();

  window.PostPreview = PostPreview;

}).call(this);
