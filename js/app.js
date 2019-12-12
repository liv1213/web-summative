

$(document).ready(function () {


    EL_ACCOMODATION_LIST = $('.accomodation_list'),
        EL_SEARCH_BOX = $('#searchBar'),
        EL_CATEGORY_LIST = $('.category_list'),
        EL_CATEGORY_ITEM = $('.category_item'),
        EL_SCREEN_LINK = $('.screen_link'),
        EL_SCREEN = $('.screen'),
        EL_CHOSEN_ITEM = $('.chosen_item'),
        EL_ACCOMODATION_CHOSEN = $('.acomodation_chosen')
    EL_USER_INPUT = $('#user_input'),
        EL_USER_INPUT = $('#user_input1'),
        EL_USER_INPUT = $('#user_input2'),
        EL_INPUT_MSG = $('#input_msg'),
        EL_INPUT_MSG = $('#input_msg1'),
        EL_INPUT_MSG = $('#input_msg2'),
        EL_GO = $('#go'),
        EL_MY_FORM = $('#myform')

    let accomodationArr = [];

    $(function () {
        $("#myform").validate(
            {
                rules:
                {
                    location:
                    {
                        required: true,

                    },
                    guests:
                    {
                        required: true,
                        range: [1, 4],

                    },
                    duration:
                    {
                        required: true,
                        range: [1, 15]

                    }


                },
                messages:
                {
                    location:
                    {
                        required: "Please enter a location"
                    }
                }
            });
    });





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
        let EL_SCREEN_CHANGE = $('.screen_change')
        EL_SCREEN_CHANGE.on('click', switchScreens);
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
        let string = accomodationChosenHtml(accomodation);;



        EL_ACCOMODATION_CHOSEN.html(string);

    }


    function accomodationChosenHtml(accomodation) {
        var chosenHtml =
           `<div class="acomodation_chosen" data-id='${accomodation.id}'>
        
        <div class="detail_header">
        <h3>${accomodation.mainTitle}</h3>
        </div>

 <hr>
    <div class="detail_images">`
        $.each(accomodation.images, function (i, images) {
            chosenHtml += ` <div> <img src= "${images.image1}">
            </div>`
        })
        chosenHtml += `</div>

 
        <div class="detail_info">
      <div class="detail_text">
            <p>${accomodation.info}</p>
            </div>
            <div class="price">
            <p>${accomodation.price}</p>
            <a class="book" href="#">
            <p>BOOK</p>
        </a>
            </div>
        </div>
        
        <hr>
  
   
    <div class="menu_header">
        <h3>${accomodation.foodTitle}</h3>
        </div>


        <div class="menu_items">`
        $.each(accomodation.food, function (i, food) {
            chosenHtml += `  <div> <img src= "${food.icon}"></div>
            <div><p>${food.foodText}</p><div>`
        });
        chosenHtml += `</div>


        <div class="rating_header">
        <h3>${accomodation.ratingTitle}</h3>
       
    </div>
        <div class="rating">`
        $.each(accomodation.rating, function (i, rating) {
            chosenHtml += ` <div> <p>${rating.location}</p></div>
            
          <div>  <img src= "${rating.stars}"> </div>
        
      </div>
           `
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


function filterResults() {
   let results = filteredByGuests(accomodationArr)
   results = filteredByDuration(results)
   displayAccomodation(results)

}

function filteredByGuests(accomodationArr) {
let filteredGuests = [];
let maxGuests = $('#user_input1').val()
$.each(accomodationArr, function(i, accomodation){
if (maxGuests <= accomodation.maxGuests){
    filteredGuests.push(accomodation)
}
});
return filteredGuests
}

function filteredByDuration(results){
let filteredDuration = [];
let maxDays = $('#user_input2').val()
$.each(results, function(i, accomodation){
    if (maxDays  <= accomodation.maxDays){
        filteredDuration.push(accomodation)
    }
});
return  filteredDuration
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


    $('#go').on("click", function () {
        $('#input_msg').html($('#user_input').val());
    });

    $('#go').on("click", function () {
        $('#input_msg1').html($('#user_input1').val());
    });

    $('#go').on("click", function () {
        $('#input_msg2').html($('#user_input2').val());
    });



    function addClickListeners() {
        $('.screen_change').on("click", function () {
            let accomodationId = $(this).data('id')
            let accomodation = getAccomodation(accomodationId);
            displayChosenAccomodation(accomodation);

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
        filterResults()
    }
    EL_SCREEN_LINK.on('click', switchScreens);
    EL_SCREEN.slice(1).hide();


    

    init();
});