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
});
