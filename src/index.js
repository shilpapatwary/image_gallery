(function(jq,ImageGallery){
  var elems = {
    cardTemplate : '#cardTemplate'
    ,itemCard : '.itemCard'
    ,cardTitle: '.cardTitle'
    ,cardAuthor: '.cardAuthor'
    ,cardAbstract: '.cardAbstract'
    ,cardContainer: '.cardContainer'
    ,clickForImages:".clickForImages"
    ,cardImage:".cardImage img"
  }
  function ItemGallery(){

  }
  ItemGallery.prototype.init = function(){
    console.log(data);
  this.paintImages(data);
  this.bindEvents();
  }


  ItemGallery.prototype.paintImages = function(data){
    var template = jq(jq(elems.cardTemplate).text()),
        listData = [];

   data.items.forEach(function(item){
     template.find(elems.itemCard).attr('data-id', item.id);
     template.find(elems.cardTitle).html(item.title);
     template.find(elems.cardImage).attr("src",item.images[0].url);
     template.find(elems.cardAuthor).html(item.author);
     template.find(elems.cardAbstract).html(item.abstract);
     listData.push(template.html());
   });
   console.log(listData);
   jq(elems.cardContainer).html(listData);
  }
  ItemGallery.prototype.handleError = function(){
   //console.log(requestObj);
  }


  ItemGallery.prototype.bindEvents = function () {
    var self = this;
    jq(elems.clickForImages).on("click", function(){
        var cardId = jq(this).parents(elems.itemCard).attr("data-id");
        var itemIndex = data.items.map(function (item) {
           return ""+item.id;
         }).indexOf(cardId);
        imageGallery.populateImageModal(itemIndex);
        jq(elems.cardContainer).fadeIn('slow');
        imageGallery.openImageModal(itemIndex);
        imageGallery.bindEvents();
    });
  }
  var gallery = new ItemGallery();
  var imageGallery = new ImageGallery();
  gallery.init();

})(jQuery,ImageGallery)
