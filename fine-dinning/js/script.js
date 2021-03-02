document.addEventListener("DOMContentLoaded", function(event){
    var myNavBarToggler = document.getElementById('navBarToggler');
    myNavBarToggler.addEventListener('blur', function(event){
        var screenWidth = window.innerWidth;
        //collapse the navbar when the user clicks outside
        if (screenWidth <= 991) {
            var navigationMenu = document.getElementById('navbarSupportedContent');
            const bsCollapse = new bootstrap.Collapse(navigationMenu);
            bsCollapse.toggle();
        }
    });
})