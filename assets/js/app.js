/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

require('bootstrap');
require('../css/app.scss');

const $ = require('jquery');

$(document).ready(function() {
    $(".clickable").click(function() {
        window.location = $(this).data("href");
    });

    const sortable = $(".sortable");
    const sortLink = '<a class="sort-link"></a>';
    sortable.not(".sorted").hover(
        function() {
            $(sortLink).attr('href', "/user/sorted-by/" + this.dataset.field)
                .appendTo(this);
        },
        function() {
            $(this).find(".sort-link").remove();
        }
    );
    sortable.filter(".sorted").hover(
        function() {
            $(sortLink).attr('href', "/user/sorted-by/" + this.dataset.field + "/desc")
                .appendTo(this);
        },
        function() {
            $(this).find(".sort-link").remove();
        }
    );

    const options = {
        title: "Test",
        placement: "top",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
        html: true,
        content: function() {
            const field = this.parentNode.dataset.field;
            var out = '<div class="input-group input-group-sm filter-' + field + '">';
            if (field == 'status') {
                out = out + '<select class="form-control filter-' + field + '-val">';
                $.each({ 1: "Первый", 2: "Второй", 3: "Третий" }, function(i, title) {
                    out = out + '<option value="' + i + '">' + title + '</option>';
                });
                out = out + '</select>';
            }
            else {
                out = out + '<input type="text" class="form-control filter-' + field + '-val">';
            }
             out = out + '<div class="input-group-append">'
                 + '<button class="btn btn-outline-secondary" type="button">Найти</button>'
                 + '</div></div>';
            return out;
        },
        trigger: 'click focus',
    }
    $(".filterable").popover(options)
        .on('show.bs.popover', function() {
            $(".filterable").popover('hide').removeClass("filtered");
            $(this).addClass("filtered");
        })
        .on('shown.bs.popover', function() {
            const field = this.parentNode.dataset.field;
            $(".filter-" + field + " button").click(function() {
                const val = $(".filter-" + field + "-val").val();
            });
        });

});
