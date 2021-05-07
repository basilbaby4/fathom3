// Shorthand for $( document ).ready()
$(function () {
    console.log("ready!");
    getOneJoke();
});

var is_next = false;
var punchline = '';


function getOneJoke() {
    $("#clickLable").html('Reveal the “punchline”');
    $("#punchline").html('');
    is_next = false;
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/getOneJoke"
    }).done(function (data) {
        if (data.status == true) {
            $("#setup").html(data.data.setup);
            show_setup();
            punchline = data.data.punchline;
        }
    });
}

function pageClik() {
    if (is_next == false) {
        show_punchline();
        $("#clickLable").html('Reveal the next joke');
    } else {
        getOneJoke();
    }

}



function show_setup() {
    var textWrapper = document.querySelector('.ml2');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.ml2 .letter',
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 1000,
            delay: (el, i) => 70 * i
        });
}


function show_punchline() {
    $("#punchline").html(punchline);
    is_next = true;

    var textWrapper = document.querySelector('.ml10 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.ml10 .letter',
            rotateY: [-90, 0],
            duration: 1300,
            delay: (el, i) => 45 * i
        });
}