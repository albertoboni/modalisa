/**
 * A simple js object to generate modals without depending on jquery-ui or injecting too much structure html.
 *
 * @project     modalisa
 * @author      Alberto Boni
 * @version     0.1.1
 * @website     https://github.com/albertoboni/modalisa#readme
 */
var Modalisa = {
    modal_selector :          '#modalisa-dialog',
    overlay_selector :        '#modalisa-overlay',
    modal_content_template :  "<div class=\"modalisa-dialog-content\">[%content%]</div>",
    screen_lock :             false,
    _modal :                  [],
    _overlay :                [],

    open : function(params) {
        if (typeof params !== 'object') {
            params = {};
        }

        this.screen_lock = params.screen_lock ? true          : false;
        this.width       = params.width       ? params.width  : 300;
        this.height      = params.height      ? params.height : 'auto';
        this.top         = params.top         ? params.top    : null;

        this._renderContent(params);
        this._renderOverlay(params);
        this._repositionModal();

        // esc to close
        $(document).keyup(this._closeShortcut);
    },

    openAjax: function(params) {
        if (!params.url) {
            return;
        }

        var method  = params.method ? params.method : 'get';
        var data    = params.data   ? params.data   : {};
        var parent  = this;

        console.log(params);

        $.ajax({
            url:      params.url,
            type:     method,
            dataType: 'json',
            data:     data,
            success: function(data){
                delete params.url;
                params.html = data.html;

                parent.open(params);
            }
        });
    },

    close: function(type) {
        if (this.screen_lock) {
            return;
        }

        this._modal.attr('style', '').hide();
        this._overlay.hide();

        $(document).unbind('keyup', this._closeShortcut);
    },

    _repositionModal: function() {
        var top = ($(window).height() - this._modal.height()) / 2;
        if (top < 50) {
            top = 50;
        }

        this._modal.css({
            'z-index' : 21,
            'top'     : (this.top              ? this.top    : ($(window).scrollTop() + top)) + 'px',
            'height'  : (this.height == 'auto' ? this.height : (this.height + 'px'))
        });

        // Only _repositionModal horizontaly if total screen real-estate is above 720px
        if ($('body').innerWidth() > 720) {
            this._modal.css({
                'left'        : '50%',
                'margin-left' : (this.width / 2 * -1) + 'px'
            });
        }
    },

    _renderContent : function(params) {
        html = params.html ? params.html : $(params.html_selector).html();

        if (this._modal.length == 0) {
            $('body').append('<div id="' + this.modal_selector.replace('#', '') + '"></div>');
            this._modal = $(this.modal_selector);
        }

        this._modal
            .css({
                'display'  : 'block',
                'position' : params.position ? params.position : 'absolute',
                'width'    : this.width,
                'height'   : this.height
            })
            .empty()
            .append(this.modal_content_template.replace('[%content%]', html));
    },

    _renderOverlay : function(params) {
        // overlay
        if (this._overlay.length == 0) {
            $('body').append('<div id="' + this.overlay_selector.replace('#', '') + '"></div>');
            this._overlay = $(this.overlay_selector);
        }

        var parent = this;
        this._overlay
            .click(function(){ parent.close(); })
            .css({
                'display'    : 'block',
                'width'      : '100%',
                'height'     : '100%',
                'opacity'    : 0.6,
                'background' : '#000000',
                'position'   : 'fixed',
                'top'        : 0,
                'left'       : 0,
                'z-index'    : 20
            });
    },

    _closeShortcut : function(e) {
        if (e.keyCode == 27) {
            Modalisa.close();
        }
    }
};
