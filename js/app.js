

$(document).ready(function () {

    EL_ACCOMODATION_LIST = $('.accomodation_list'),
        EL_SEARCH_BOX = $('#search-box'),
        EL_CATEGORY_LIST = $('.category_list'),
        EL_CATEGORY_ITEM = $('.category_item'),
        EL_SCREEN_LINK = $('.screen_link'),
        EL_SCREEN = $('.screen'),
        EL_CHOSEN_ITEM = $('.chosen_item'),
        EL_ACCOMODATION_CHOSEN = $('.acomodation_chosen')


    let accomodationArr = [];





    function init() {
        $.getJSON('json/accomodation.json', function (data) {
            accomodationArr = data.accomodation
            displayAccomodation(accomodationArr);

        });
        $.getJSON('json/accomodation.json', function (data) {
            accomodationArr = data.accomodation
            displayChosenAccomodation(accomodationArr);

        });

        $.getJSON('json/categories.json', function (data) {
            let categoriesArr = data.categories;
            displayCategories(categoriesArr);
        })
        EL_SEARCH_BOX.on('keyup', function (event) {
            event.preventDefault();
            displayAccomodationByTitle($(this).val())
        });


    }



    function displayAccomodation(accomodation) {
        let string = "";
        $.each(accomodation, function (i, accomodation) {
            string += accomodationItemHtml(accomodation);
        });
        EL_ACCOMODATION_LIST.html(string);

        addClickListeners()

    }



    function displayCategories(categories) {
        let string = '';
        $.each(categories, function (i, category) {
            string += categoryItemHtml(category)

        });

        EL_CATEGORY_LIST.html(string);
        addCategoryListeners()
    }


    function displayChosenAccomodation(accomodation) {
        let string = "";
        $.each(accomodation, function (i, accomodation) {
            string += accomodationChosenHtml(accomodation);
        });
        EL_ACCOMODATION_CHOSEN.html(string);

 

    }


    function accomodationChosenHtml(accomodation) {
        return `<div class="acomodation_chosen" data-id='${accomodation.id}'>
        
        <div>
        <h3>${accomodation.mainTitle}</h3>
        <hr>
    </div>
    <div class="image_layout">
        <div class="image_layout1">
            <div class="hotel_img">
                <img src="image/image9.png" alt="hotel">
            </div>
            <div class="hotel_img2">
                <img src="image/image11.jpeg" alt="hotel">
            </div>

        </div>

        <div class="image_layout2">
            <img src="image/hotel.jpeg" alt="hotel">
            <img src="image/image13.png" alt="hotel">
        </div>
        <div class="image_layout3">
            <img src="image/image16.jpeg" alt="hotel">
        </div>
    </div>

    <div class="info1">
        <div class="info_text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="info_total">
            <h3>$55/night</h3>
            <p>Nov 30-Dec 21 <br>
                1 guest</p>
            <a href="#">EDIT</a>
            <hr>
            <p>55 x 5 nights $142</p>
            <h3>Total $142</h3>
            <a href="#">BOOK</a>
        </div>
    </div>
    <hr>
    <div class="food">
        <h3>Food and beverage</h3>
        <div>
            <img src="" alt="">
            <p>Tea and coffee</p>
        </div>
        <div>
            <img src="" alt="">
            <p>Tea and coffee</p>
        </div>

    </div>
        </div>`
    }



    function accomodationItemHtml(accomodation) {
        return `<div class="accomodation_item" data-id='${accomodation.id}'>
        
            <div>
            <img src="${accomodation.featuredImage}">
            </div>
            <div class="accomodation_details">
                <h3>${accomodation.featuredTitle}</h3>
                <p>${accomodation.subtitle}</p>
                <p>${accomodation.mainInfo}</p>
               
            
               
            </div>
              <div class="accomodation_deatils2">
            <div class="accomodation_price">
            <p>${accomodation.price}</p>
            </div>
            <div class="accomodation_view">
            <a class="screen_change" data-screen="info_page" href="#" data-id='${accomodation.id}'>
                <p data-id='${accomodation.id}'>VIEW</p>
            </a>
         </div>
         </div>
        </div>`
    }


    function categoryItemHtml(category) {
        return `<div class="category_item" data-category="${category.id}">
        
        <p>${category.title}</p>
     
        </div>`;
    }






    function displayAccomodationByTitle(featuredTitle) {
        let filteredAccomodation = [];
        $.each(accomodationArr, function (i, accomodation) {
            if (accomodation.featuredTitle.includes(featuredTitle)) {
                filteredAccomodation.push(accomodation);
            }
        });
        displayAccomodation(filteredAccomodation);
    }

    function addCategoryListeners() {
        $('.category_item').on('click', function () {
            let category = $(this).data('category');
            displayAccomodationBycategory(category);
        })
    }



    function displayAccomodationBycategory(category) {
        let filteredAccomodation = [];
        $.each(accomodationArr, function (i, accomodation) {
            if (parseInt(category) === accomodation.category) {
                filteredAccomodation.push(accomodation);
            }
        });
        displayAccomodation(filteredAccomodation)
    }



    function addClickListeners() {
        $('.screen_change').on("click", switchScreens);
    }


    function switchScreens() {
        EL_SCREEN.hide()
        $('#' + $(this).data('screen')).show();


    }
    EL_SCREEN_LINK.on('click', switchScreens);
    EL_SCREEN.slice(1).hide();


    init();
});