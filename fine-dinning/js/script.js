/**
 * Utility method to collapse the navigation menu when the user clicks 
 * anywhere outside the toggler button
 */
(function (global) {
    var myNavBarToggler = document.getElementById('navBarToggler');
    myNavBarToggler.addEventListener('blur', function (event) {

        var screenWidth = window.innerWidth;
        if (screenWidth <= 991) {

            var navigationMenu = document.getElementById('navbarSupportedContent');
            const bsCollapse = new bootstrap.Collapse(navigationMenu);
            bsCollapse.toggle();
        }
    });
})(window);


(function (global) {
    //setup namespace for the project
    var fineDinning = {};

    var foodMenuDirectory = "../fine-dinning/resources/json/menu.json";

    /**
     * Call the necessary methods on page load (before images or CSS) 
     */
    document.addEventListener("DOMContentLoaded", function () {
        // collapseNavigationMenuOnBlur();
        showLoading("#main-content");
        fineDinning.loadHomePage();
    });

    /**
     * Utility method to insert an HTML into the main content
     * 
     * @param {*} selector the selector
     * @param {*} html HTML to be inserted
     */
    var insertHTML = function (selector, html) {
        var targetElement = document.querySelector(selector);
        if (targetElement !== null) {
            targetElement.innerHTML = html;
        }
    }

    /**
     * Utility method to show the laoding GIF upon launching the web page
     * 
     * @param {*} selector the selector
     */
    var showLoading = function (selector) {

        var html = "<div class='text-center'>";
        html += "<img src='../fine-dinning/resources/gifs/loading.gif'>";
        html += "</div>";

        insertHTML(selector, html);
    }

    /**
     * Utility method to insert the carousel and cards into the main content
     */
    fineDinning.loadHomePage = function () {

        activateTabAndDeactivateTheRest('at-home');

        var homeHTMLSnippet = "../fine-dinning/snippets/home-snippet.html";
        $ajaxUtils.sendGetRequest(homeHTMLSnippet,
            function (responseText) {
                insertHTML("#main-content", responseText);
                // document.querySelector("#main-content").innerHTML = responseText;
            },
            false
        );
    }

    /**
     * Utility method to load the about contents into the main content
     */
    fineDinning.loadAboutPage = function () {

        activateTabAndDeactivateTheRest('at-about');

        var aboutHTMLSnippet = "../fine-dinning/snippets/about-snippet.html";
        $ajaxUtils.sendGetRequest(aboutHTMLSnippet,
            function (responseText) {
                // document.querySelector("#main-content").innerHTML = responseText;
                insertHTML("#main-content", responseText);
            },
            false
        );
    };

    /**
     * Utility method to load the menu contents into the main content
     */
    fineDinning.loadMenuPage = function () {

        activateTabAndDeactivateTheRest('at-menu');

        var menuHTMLSnippet = "../fine-dinning/snippets/menu-snippet.html";
        $ajaxUtils.sendGetRequest(menuHTMLSnippet,
            function (responseText) {

                insertHTML("#main-content", responseText);

                $ajaxUtils.sendGetRequest(foodMenuDirectory,
                    function (responseObjects) {

                        insertHTML("#breakfastBody",
                            renderFoodCardsForSchedule("breakfast", responseObjects));
                        insertHTML("#lunchBody",
                            renderFoodCardsForSchedule("lunch", responseObjects));
                        insertHTML("#dinnerBody",
                            renderFoodCardsForSchedule("dinner", responseObjects));
                        insertHTML("#dessertBody",
                            renderFoodCardsForSchedule("dessert", responseObjects));
                        insertHTML("#drinkBody",
                            renderFoodCardsForSchedule("drink", responseObjects));
                    },
                    true
                );
            },
            false
        );
    }

    /**
     * Utility Method to retrieve the special dishes to be displayed at Specials page
     */
    fineDinning.loadSpecialsPage = function () {
        activateTabAndDeactivateTheRest('at-menu');
        var specialsHTMLSnippet = "../fine-dinning/snippets/specials-snippet.html";

        function isIndexUsed(arrayOfUsedIndices, index) {
            for (var counter = 0; counter < arrayOfUsedIndices.length; ++counter) {
                if (index === arrayOfUsedIndices[counter]) {
                    return true;
                }
            }
            return false;
        }

        $ajaxUtils.sendGetRequest(specialsHTMLSnippet,
            function (responseText) {
                insertHTML("#main-content", responseText);

                $ajaxUtils.sendGetRequest(foodMenuDirectory,
                    function (responseObjects) {

                        var choicedDishes = {
                            "breakfast": [],
                            "lunch": [],
                            "dinner": [],
                            "dessert": [],
                            "drink": []
                        };

                        for (var element in responseObjects) {

                            var usedIndex = [];
                            var count = 0;

                            while (count < 3) {
                                //get random items from food categories
                                var randomIndex = Math.floor(Math.random() * responseObjects[element].length);
                                if (!isIndexUsed(usedIndex, randomIndex)) {
                                    usedIndex.push(randomIndex);
                                }
                                count++;
                            }
                            choicedDishes[element].push(usedIndex);
                        }

                        insertHTML("#specialsBody", renderFoodCardsForSpecials(choicedDishes, responseObjects));
                    },
                    true
                );
            },
            false
        );
    }
    
    /*
    * Utility method to load the about contents into the main content
    */
   fineDinning.loadNewsPage = function () {

       activateTabAndDeactivateTheRest('at-news');

       var newsHTMLSnippet = "../fine-dinning/snippets/news-snippet.html";
       $ajaxUtils.sendGetRequest(newsHTMLSnippet,
           function (responseText) {
               // document.querySelector("#main-content").innerHTML = responseText;
               insertHTML("#main-content", responseText);
           },
           false
       );
   };

    /**
     * utility method to activate new tab and deactivate the rest
     * 
     * @param {String} tabToActivate indicates the tab to activate
     */
    var activateTabAndDeactivateTheRest = function (tabToActivate) {
        const tabs = ['at-home', 'at-about', 'at-menu', 'at-news', 'at-contacts'];
        const activeState = 'active';

        var activePageIndicator = document.getElementById(tabToActivate);
        activePageIndicator.classList.add(activeState);

        for (var counter = 0; counter < tabs.length; ++counter) {
            if (tabs[counter] !== tabToActivate) {
                var inactivePageIndicator = document.getElementById(tabs[counter]);
                inactivePageIndicator.classList.remove(activeState);
            }
        }
    }

    /**
     * utility method to generate food cards for passed schedule
     * 
     * @param {String} schedule (breakfast, lunch, dinner)
     * @param {Object} responseObjects (foods offered by the restaurant)
     * @returns HTML to be rendered
     */
    var renderFoodCardsForSchedule = function (schedule, responseObjects) {

        var foodContents = "";

        for (var element in responseObjects[schedule]) {
            foodContents += "<div>"
            foodContents += "<div class=\"card h-100\">";
            foodContents += "<img src=\"" + responseObjects[schedule][element].directory +
                "\" class=\"card-img-top\" alt=\"" +
                responseObjects[schedule][element].alt + "\">";
            foodContents += "<div class=\"card-body\">";
            foodContents += "<h5 class=\"card-title\">" + responseObjects[schedule][element].name + "</h5>";
            foodContents += "<p class=\"card-text\">" + responseObjects[schedule][element].description + "</p>";
            foodContents += "</div></div></div>";
        }

        return foodContents;
    }

    /**
     * utility method to generate random food items from the main menu to be presented as Special dishes.
     * @param {*} choicedDishes randomly selected items from food categories
     * @param {*} responseObjects food categories read from JSON file
     * @returns HTML to be rendered
     */
    var renderFoodCardsForSpecials = function (choicedDishes, responseObjects) {

        var specialsContents = "";

        for (var choicedDish in choicedDishes) {
            for (var element in choicedDishes[choicedDish]) {
                for (var index in choicedDishes[choicedDish][element]) {
                    specialsContents += "<div>"
                    specialsContents += "<div class=\"card h-100\">";
                    specialsContents += "<img src=\"" + responseObjects[choicedDish][index].directory +
                        "\" class=\"card-img-top\" alt=\"" +
                        responseObjects[choicedDish][index].alt + "\">";
                    specialsContents += "<div class=\"card-body\">";
                    specialsContents += "<h5 class=\"card-title\">" + responseObjects[choicedDish][index].name + "</h5>";
                    specialsContents += "<p class=\"card-text\">" + responseObjects[choicedDish][index].description + "</p>";
                    specialsContents += "</div></div></div>";
                }
            }
        }
        return specialsContents;
    }

    // Expose utility to the global object
    global.$fineDinning = fineDinning;


})(window);