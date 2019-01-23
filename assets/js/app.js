/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

require('bootstrap');
require('../css/app.scss');

const $ = require('jquery');
const urlParams = new URLSearchParams(location.search);

$(document).ready(function() {
    const basePath = '/user/list';
    var urlPrefix = basePath + '?';
    $.each(['firstname', 'lastname', 'patname', 'status'], function(i, field) {
        const param = 'filter-by-' + field;
        if (urlParams.has(param)) {
            urlPrefix = urlPrefix + param + '=' + urlParams.get(param) + '&';
            return false;
        }
    });
    $(".clickable").click(function() {
        window.location = this.dataset.href;
    });

    const sortable = $(".sortable");
    const sortLink = '<a class="sort-link"></a>';

    sortable.not(".sorted").hover(
        function() {
            $(sortLink).attr('href', urlPrefix + 'sort-asc=' + this.dataset.field)
                .prependTo(this);
        },
        function() {
            $(this).find(".sort-link").remove();
        }
    );
    sortable.filter(".sorted").hover(
        function() {
            $(sortLink).attr('href', urlPrefix + 'sort-desc=' + this.dataset.field)
                .prependTo(this);
        },
        function() {
            $(this).find(".sort-link").remove();
        }
    );

    const options = {
        html: true,
        placement: 'top',
        trigger: 'manual',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
        content: function() {
            const field = this.parentNode.dataset.field;
            const value = this.text;
            var out = '<div class="input-group input-group-sm filter-' + field + '">';
            if (field === 'status') {
                out += '<select class="form-control filter-' + field + '-val">';
                $.each({ 1: "Первый", 2: "Второй", 3: "Третий" }, function(i, title) {
                    out += '<option value="' + i + '"';
                    if (!!value && value == i) {
                        out += ' selected';
                    }
                    out += '>' + title + '</option>';
                });
                out += '</select>';
            }
            else {
                out += '<input type="text" class="form-control filter-' + field + '-val"';
                if (!!value) {
                    out += ' value="' + value + '"';
                }
                out += '>';
            }
             out += '<div class="input-group-append">'
                 + '<button class="btn btn-outline-secondary" type="button">Найти</button>'
                 + '</div></div>';
            return out;
        },
    };
    const filterLink = '<a class="filter-link"></a>';

    $(".filterable").parents(":not(:has(.filter-link))").hover(
        function() {
            $(filterLink).popover(options).appendTo(this);
        },
        function() {
            $(this).find(".filter-link").not(".filter-up").remove();
        }
    );
    $(".filtered").popover(options);

    // @See https://jqueryhouse.com/jquery-on-method-the-issue-of-dynamically-added-elements
    $("table.users thead")
        .on("click", ".filter-link", function() {
            $(this).popover('toggle');
        })
        .on('show.bs.popover', ".filter-link", function() {
            $(".filter-up").popover('hide').removeClass("filter-up");
            $(this).addClass("filter-up");
        })
        .on('shown.bs.popover', ".filter-link", function() {
            const field = this.parentNode.dataset.field;
            const redirect = function () {
                const val = $('.filter-' + field + '-val').val();
                if (!!val) {
                    window.location = basePath + '?filter-by-' + field + '=' + val;
                }
            };
            $('.filter-' + field + ' button').click(redirect);
            $('.filter-' + field + ' input').keydown(function(e) {
                if (e.keyCode === 13) {
                    redirect();
                }
            });
        })
        .on('hidden.bs.popover', ".filter-link", function() {
            if (! $(this).hasClass("filtered")) {
                $(this).remove();
            }
        });
});
