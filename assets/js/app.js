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
    const link = '<a class="sort-link"></a>';
    sortable.not(".sorted").hover(
        function() {
            $(link).attr('href', "/user/sorted-by/" + this.dataset.field)
                .appendTo(this);
        },
        function() {
            $(this).find(".sort-link").remove();
        }
    );
    sortable.filter(".sorted").hover(
        function() {
            $(link).attr('href', "/user/sorted-by/" + this.dataset.field + "/desc")
                .appendTo(this);
        },
        function() {
            $(this).find(".sort-link").remove();
        }
    );

    const filterable = $(".filterable");
    filterable.not(".filtered").click(function() {
        console.log(this);
    });
});
