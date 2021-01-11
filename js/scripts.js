$(window).on("load", function() {
    "use strict";

  //  ============= PRELOADER  =============== 

  $(".page-loading").fadeOut();

  //  ============= CONTACT FORM  =============== 

  if($('#contact-form').length){
    $('#submit').on("click", function(){
      var form = '#contact-form';
      var name = $('#contact-form .name').val();
      var email = $('#contact-form .email').val();
      if(name == '' || email == '')
      {
        $('#contact-form .response').html('<div class="failed">Porfavor, complete los campos de nombre y correo electrónico.</div>');
        return false;
      }
      $.ajax({
        url:"/sendemail.php",
        method:"POST",
        data: $(form).serialize(),
        beforeSend:function(){
            $('#contact-form .response').html('<div class="text-info"><img src="/img/preloader.gif"> Enviando...</div>');
        },
        success:function(data){
            $('form').trigger("reset");
            $('#contact-form .response').fadeIn().html(data);
            setTimeout(function(){
                $('#contact-form .response').fadeOut("slow");
            }, 5000);
        },
        error:function(){
            $('#contact-form .response').fadeIn().html(data);
        }
      });
    });
  }
 
});
