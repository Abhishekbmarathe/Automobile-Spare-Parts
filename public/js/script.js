jQuery(document).ready(function ($) {
    "use strict";
    $('#customers-testimonials').owlCarousel({
        loop: false, // Set loop to false
        center: true,
        items: 3,
        margin: 30,
        autoplay: true,
        dots: false,
        nav: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        stopOnHover: true,
        smartSpeed: 850,
        navText: ['<i class="fa fa-arrow-alt-circle-left" style="font-size:30px;color:blue"></i>', '<i class="fa fa-arrow-alt-circle-right" style="font-size:30px;color:blue"></i>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    });
});


// navigatingto nextpage when clicked on images

// const img = document.querySelectorAll('.items img');
// img.forEach(element => {
//     element.addEventListener("click", () => {
//         const form = document.querySelector("form");
//         form.submit();
//     })
// });



// script for handling my orders navigation

function submitForm() {
    const form = document.getElementById("myOrders");
    const userId = localStorage.getItem("userId");

    // Set the action and method of the form
    form.setAttribute("action", "/myorders");
    form.setAttribute("method", "post");

    // Create a hidden input field to pass the userId
    const userIdInput = document.createElement("input");
    userIdInput.type = "hidden";
    userIdInput.name = "userId";
    userIdInput.value = userId;

    // Append the hidden input field to the form
    form.appendChild(userIdInput);

    // Submit the form
    form.submit();
}

// Add event listener to the form submission
document.getElementById("my_orders").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission
    submitForm(); // Call the submitForm function
});