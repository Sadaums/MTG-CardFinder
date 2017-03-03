$(document).ready(function() {
    // function imgError(image) {
    //     image.onerror = "";
    //     image.src = "../photos/MTG-BackOfCard.jpg";
    //     return true;
    // }
    // $('.carousel.carousel-slider').carousel({
    //     fullWidth: true
    // });
    $('select').material_select();
    $('.collapsible').collapsible();

    $('#search-button').click(function() {
        var cardName = $('#name');
        var cardColor = $('#colorIdentity');
        var cardType = $('#types');
        var cardSubtype = $('#subtypes');
        console.log("you pressed the button!");
        $.ajax({
            method: 'GET',
            url: `https://api.magicthegathering.io/v1/cards?name=${cardName.val()}&colorIdentity=${cardColor.val()}&types=${cardType.val()}&subtypes=${cardSubtype.val()}`,
            dataType: 'json',
            success: function(data) {
                var cards = data.cards; //this gives an array of objects, each object has properties we can access.
                for (var i = 0; i < cards.length; i++) {
                    cards[i];
                    let thiscard = cards[i];
                    let picture = thiscard.imageUrl;
                    let name = thiscard.name;
                    let setName = thiscard.setName;
                    if (picture !== undefined){
                      $('#cardGrid').append(`<li class="cardSelector col s2">
                          <div class="card-image">
                              <img class="materialboxed" data-caption="${name} from ${setName}" width="200" src=${picture}>
                          </div>
                      </li>`);
                      // $('#cardGrid').append(`<li class="cardSelector col s2">
                      //     <div class="card-image">
                      //         <img class="materialboxed" data-caption='response goes here!' width="200" src="./photos/MTG-BackOfCard.jpg">
                      //     </div>
                      // </li>`);

                    }

                    console.log(picture);
                    console.log(name);
                    console.log(setName);
                }
                console.log(data.cards);
                $('.materialboxed').materialbox();
            },
            error: function() {
                console.log('error');
            },
        })
    })
    var cards = [];
    $('#cardGrid').on('click','.selectCard', function(event){
      console.log("you did a the thing");
      let cardData={
        img: $(event).closest('.activator').attr("src")
      }
      cards.push(cardData);
      localStorage.setItem("card", JSON.stringify(cards));
      console.log(cards);
    })
    $('#deckBuilder').on("click", "#deckDeleteInitial",function(){
      console.log("DELETE ITTTT");
      $('#intialDeck').remove();
      $('#deckBuilder').append(`<li id="intialDeck">
          <div class="collapsible-header row">
              <i class="material-icons light-blue-text text-accent-2 col s1">mode_edit</i>
              <input type="text" class="validate col s5" placeholder="Name This Deck!">
              <i id="deckDeleteInitial" class="material-icons red-text text-accent-2 col s1 right">replay</i>
          </div>
          <div class="collapsible-body visableText">
              <i class="material-icons light-blue-text text-accent-2">mode_edit</i>
              <input id="name" type="text" class="validate" placeholder="Discribe this Deck!">
          </div>
      </li>`)
    })
    $('#localData').click(function() {
      let cards = JSON.parse(localStorage.getItem("card"));
      console.log(cards);
    })
  // $('.addCard').append('')
})
