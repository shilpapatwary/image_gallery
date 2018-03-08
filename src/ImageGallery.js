(function(jq){
  var elems = {
    imageModal:".imageModal"
    ,slidesTemplate:"#slidesTemplate"
    ,thumbnailTemplate:"#thumbnailTemplate"
    ,mySlides:".mySlides"
    ,numbertext:".numbertext"
    ,slideImage:".slideImage"
    ,caption:".caption"
    ,thumbnailImage:".thumbnailImage"
    ,modalContent:".modalContent"
    ,thumbnailColumn:".thumbnailColumn"
    ,next:".next"
    ,prev:".prev"
    ,imageTitle:".imageTitle"
  },
  slideIndex = 1;
  function ImageGallery(){

  }
  ImageGallery.prototype.openImageModal = function(itemIndex){
     var title = data.items[itemIndex].title;
    jq(elems.imageModal).dialog({
            modal: true,
            autoOpen: false,
            title: title,
            width: 650,
            height: 500
        });
        jq(elems.imageModal).dialog('open');
  }
  ImageGallery.prototype.showSlides = function(currentSlide){
    var slides = jq(elems.mySlides);
    slideIndex = currentSlide;
       if (currentSlide > slides.length) {slideIndex = 1;}
       if (currentSlide < 1) {slideIndex = slides.length;}
       slides.hide();
       slides.parent().find("[data-id="+slideIndex+"]").show();
       jq(elems.imageTitle).hide();
       slides.parent().find("[text-id="+slideIndex+"]").show();

       jq(elems.thumbnailImage).removeClass('active');
       jq(elems.thumbnailColumn).find("[thumbnail-id="+slideIndex+"]").addClass('active');
}
  ImageGallery.prototype.populateImageModal = function (itemIndex){
    var slidesTemplate = jq(jq(elems.slidesTemplate).text()),
        thumbnailTemplate = jq(jq(elems.thumbnailTemplate).text()),
        slidesList = [],
        thumbnailsList = [],
        i=1;
        var images = data.items[itemIndex].images;
        images.forEach(function(image){

          slidesTemplate.find(elems.mySlides).attr("data-id",i);
          slidesTemplate.find(elems.numbertext).html(i +"/" +images.length);
          slidesTemplate.find(elems.slideImage).attr("src",image.url).attr("alt",image.image_alt);
          slidesTemplate.find(elems.caption).html(image.description);
          slidesTemplate.find(elems.next).attr("current-id",i);
          slidesTemplate.find(elems.imageTitle).attr("text-id",i);
          slidesTemplate.find(elems.prev).attr("current-id",i);

          slidesList.push(slidesTemplate.html());

          thumbnailTemplate.find(elems.thumbnailImage).attr("thumbnail-id",i).attr("src",image.url);
          thumbnailsList.push(thumbnailTemplate.html());
          i++;
        });
        jq(elems.modalContent).html(slidesList).append(thumbnailsList);
        this.showSlides(slideIndex);

  }
  ImageGallery.prototype.bindEvents = function(){
    var self = this;
    jq(elems.thumbnailImage).on("click", function(){
        var index = $(this).attr('thumbnail-id');
        self.showSlides(index);
        });
        jq(elems.next).on("click", function(){
          var currentId = jq(elems.thumbnailImage+".active").attr('thumbnail-id');
          self.showSlides(Number(currentId) + 1);
        });
      jq(elems.prev).on("click", function(){
        var currentId = jq(elems.thumbnailImage+".active").attr('thumbnail-id');
          self.showSlides(Number(currentId) - 1);
        });
  }

  window.ImageGallery = ImageGallery;
})(jQuery);
