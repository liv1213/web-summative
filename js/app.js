

$(document).ready(function () {

    EL_ACCOMODATION_LIST = $('.accomodation_list'),
        EL_SEARCH_BOX = $('#searchBar'),
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


    }



    function displayCategories(categories) {
        let string = '';
        $.each(categories, function (i, category) {
            string += categoryItemHtml(category)

        });

        EL_CATEGORY_LIST.html(string);
        addCategoryListeners()
    }










    function accomodationChosenHtml(accomodation) {
        var chosenHtml =
            `<div class="acomodation_chosen" data-id='${accomodation.id}'>
        
        <div>
        <h3>${accomodation.mainTitle}</h3>
        <hr>
    </div>
    <div>`
        $.each(accomodation.images, function (i, images) {
            chosenHtml += `  <img src= "${images.image1}">`
        })


        chosenHtml += `</div>
      
            <p>${accomodation.info}</p>
        </div>
        
  
   
    <div>
        <h3>${accomodation.foodTitle}</h3>

        <div>`
        $.each(accomodation.food, function (i, food) {
            chosenHtml += `  <p>${food.foodText}</p>`
        })


        chosenHtml += `</div>
        <div>`
        $.each(accomodation.rating, function (i, rating) {
            chosenHtml += `  <p>${rating.location}</p>
            <p>${rating.stars}</p>`
        })


        chosenHtml += `</div>
       

    </div>
        </div>`
        return chosenHtml;
    }



    function accomodationItemHtml(accomodation) {
        return `
        <hr>
        <div class="accomodation_item" data-id='${accomodation.id}'>
       
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
         
   
        </div>
        `
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



    function displayChosenAccomodation(accomodation) {
        let string = "";
        $.each(accomodation, function (i, accomodation) {
            string += accomodationChosenHtml(accomodation);
        });
        EL_ACCOMODATION_CHOSEN.html(string);
        addClickListeners()


    }




    function addClickListeners() {
        $('.screen_change').on("click", function () {
            let accomodationId = $(this).data('id')
            let accomodation = getAccomodation(accomodationId);
            $.each(accomodation, function (i, accomodation) {
                accomodation
            })
        });

    }


    function getAccomodation(accomodationId) {
        for (var i = 0; i < accomodationArr.length; i++) {
            var id = accomodationArr[i].id;
            if (id === accomodationId) {
                return accomodationArr[i];
            }
        }
        return null
    }


    function switchScreens() {
        EL_SCREEN.hide()
        $('#' + $(this).data('screen')).show();


    }
    EL_SCREEN_LINK.on('click', switchScreens);
    EL_SCREEN.slice(1).hide();


    init();
});