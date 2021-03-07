/**
 * Utility method to collapse the navigation menu when the user clicks 
 * anywhere outside the toggler button 
 */
(function (global){
    var myNavBarToggler = document.getElementById('navBarToggler');
    myNavBarToggler.addEventListener('blur', function(event){
        var screenWidth = window.innerWidth;
        if (screenWidth <= 991) {
            var navigationMenu = document.getElementById('navbarSupportedContent');
            const bsCollapse = new bootstrap.Collapse(navigationMenu);
            bsCollapse.toggle();
        }
    });
})(window);

(function(global){
    //setup namespace for the project
    var fineDinning = {};

    /**
     * Utility method to insert an HTML into the main content
     * 
     * @param {*} selector the selector
     * @param {*} html HTML to be inserted
     */
    var insertHTML = function(selector, html){
        var targetElement = document.querySelector(selector);
        targetElement.innerHTML = html;
    }

    /**
     * Utility method to show the laoding GIF upon launching the web page
     * 
     * @param {*} selector the selector
     */
    var showLoading = function(selector){

        var html = "<div class='text-center'>";
        html += "<img src='../fine-dinning/resources/gifs/loading.gif'>";
        html += "</div>";

        insertHTML(selector,html);
    }

    /**
     * Utility method to insert the carousel and cards into the main content
     */
    fineDinning.loadHomePage = function(){

        var aboutPageIndicator = document.getElementById('at-about');
        aboutPageIndicator.classList.remove('active');

        var menuPageIndicator = document.getElementById('at-menu');
        menuPageIndicator.classList.remove('active');
        
        var newsPageIndicator = document.getElementById('at-news');
        newsPageIndicator.classList.remove('active');

        var contactPageIndicator = document.getElementById('at-contacts');
        contactPageIndicator.classList.remove('active');

        var homePageIndicator = document.getElementById('at-home');
        homePageIndicator.classList.add('active');

        var homeHTMLSnippet = "../fine-dinning/snippets/home-snippet.html";
        $ajaxUtils.sendGetRequest(homeHTMLSnippet, 
            function(responseText){
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false
        );
    }
    
    /**
     * Utility method to load the about contents into the main content
     */
    fineDinning.loadAboutPage = function(){

        var homePageIndicator = document.getElementById('at-home');
        homePageIndicator.classList.remove('active');

        var menuPageIndicator = document.getElementById('at-menu');
        menuPageIndicator.classList.remove('active');
        
        var newsPageIndicator = document.getElementById('at-news');
        newsPageIndicator.classList.remove('active');

        var contactPageIndicator = document.getElementById('at-contacts');
        contactPageIndicator.classList.remove('active');

        var aboutPageIndicator = document.getElementById('at-about');
        aboutPageIndicator.classList.add('active');

        var aboutHTMLSnippet = "../fine-dinning/snippets/about-snippet.html";
        $ajaxUtils.sendGetRequest(aboutHTMLSnippet, 
            function(responseText){
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false
        );
    };

    /**
     * Call the necessary methods on page load (before images or CSS) 
     */
    document.addEventListener("DOMContentLoaded", function(){
        // collapseNavigationMenuOnBlur();
        showLoading("#main-content");
        fineDinning.loadHomePage();
    });

  // Expose utility to the global object
  global.$fineDinning = fineDinning;


})(window);




