// The URIs of the REST endpoints

// URI for Image Upload Service endpoint
IUPS = "https://prod-24.northeurope.logic.azure.com:443/workflows/6bf9bf1484014d029ad13877a6704e1f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mXJ3Vv2jBiM6W1AU2K3huC5oK8ZB_zw8mXTWFIUJkn4";

// URI to Retrieve All Images endpoint
RAI = "https://prod-16.northeurope.logic.azure.com/workflows/4d11acf1da3041ebad71d99baeaa3942/triggers/manual/paths/invoke/rest/v1/images?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yB4UbSZ59BjFGTNGFDSxjlSfHA3R0rIhv_54YYzeqxA";

// URI's to Get An Image endpoint
GAI0 = "https://prod-09.northeurope.logic.azure.com/workflows/3751f56ca65b463e9119ee77c66c67b3/triggers/manual/paths/invoke/rest/v1/images/";
GAI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nsARO4CuXOiAx4yJ7uOzUC72PbfodYtUTKddP6r5Okc";

// URI to Delete An Image endpoint
DIAURI0 = "https://prod-36.northeurope.logic.azure.com/workflows/3b3b727e406f448e87fe61bcaec2f00b/triggers/manual/paths/invoke/rest/v1/images/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZNvAhSbbdrhy1SDgoJluOCUi0szgx-YFEhTqiLXM17Q";

// URI to Update An Image endpoint
UIA0 = "https://prod-29.northeurope.logic.azure.com/workflows/ea48f64df3484205a92842d6ef8a203d/triggers/manual/paths/invoke/rest/v1/images/";
UIA1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aAEbxwziNGtI8wSx1_-NGrKEuZ-fuSEop9eE1kKhYYQ";

// URI for blobstorage Account
BLOB_ACCOUNT = "https://blobstorageb00784231.blob.core.windows.net";

// Handlers for button clicks
$(document).ready(function() {

  $("#retImages").click(function(){
      // Run the getImages function
      getImages();

  }); 

  $("#getImage").click(function(){

    // Passing Image ID value into the function
    var image_id = $("#image_id").val();

    // Run the get getImageById function
    getImageById(image_id)

  }); 

   // Handler for the New Image submission button
  $("#subNewForm").click(function(){

    // Execute the submit new Imageg function
    submitNewImage();

  }); 

  $("#deleteImage").click(function(){
    
    // Passing Image ID value into the function
    var image_id = $("#image_id").val();

    // Run the get deleteImage function
    deleteImage(image_id)

  }); 

  // handler for edit asset button
  $("#subEditForm").click(function(){

    // Passing Image ID value into the function
    var image_id = $("#image_id").val();

    // Execute the Update Image function
    UpdateImage(image_id);

  }); 
});

// A function to submit a new image to the REST endpoint 
function submitNewImage(){

  // Create a form data object
  submitData = new FormData();

  // Get Form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $('#UpFile')[0].files[0]);

  // Post the form data to the endpoint
  $.ajax({
    url: IUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    
    success: function(data) {

    }
  });
}

// A function to get a list of all the images and write them to the Div with the AssetList Div
function getImages(){

  // Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><space class="sr-only">&nbsp;</span>');

  $.getJSON(RAI, function(data) {

    // Create an Array to hold all the retrieved images
    var items = [];

    // Iterate through the returned records and build HTML, with the key values of the record in the data
    $.each(data, function(key,val) {


      items.push("<img src='" + BLOB_ACCOUNT + val["filePath"] +"' width='1000'/><br/>");
      items.push("Image ID: " + val["id"] + "<br/>");
      items.push("File Name: " + val["fileName"] + "<br/>");
      items.push("Uploaded by: " + val["userName"] + "<br/>");
      items.push("User ID: " + val["userID"]+"<br/>");
      items.push("<br/><br/>");
    });

    // Clear the assetlist div
    $('#ImageList').empty();

    // Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class" : "my-new-list",
      html: items.join("")
    }).appendTo("#ImageList");
  });
 
}

function getImageById(image_id) {

  // Replace the current HTML in that div with a loading message
  $('#SingleImageList').html('<div class="spinner-border" role="status"><space class="sr-only">&nbsp;</span>');

  // Concatenate the urls with the Image ID to create a single URL
  var GAI2 = GAI0 + image_id + GAI1;
  
  $.getJSON(GAI2, function(data) {

    // Create an Array to hold the retrieved images
    var item = [];

    // Iterate through the returned records and build HTML, with the key values of the record in the data
    item.push("<br/>");
    item.push("<img src='" + BLOB_ACCOUNT + data["filePath"] + "' width='800'/><br/>");
    item.push("Image ID: " + data["id"] + "<br/>");
    item.push("File Name: " + data["fileName"] + "<br/>");
    item.push("Uploaded by: " + data["userName"] + "<br/>");
    item.push("User ID: " + data["userID"] + "<br/>");

    // Clear the SingleImageList div
    $('#SingleImageList').empty();

    // Append the contents of the items array to the SingleImageList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: item.join("")
    }).appendTo("#SingleImageList"); 
  });
}

// A function to delete an image by ID.
function deleteImage(id){

  $.ajax({

    type: "DELETE",
    url: DIAURI0 + id + DIAURI1,

  }).done(function(msg){
    // On Sucecss, update the image list
    $('#SingleImageList').empty();
    getImages();
  });

}

// A function to update / change an image by ID
function UpdateImage(image_id) {
  
  // Create a form data object
  submitData = new FormData();

  // Get Form variables and append them to the form data object
  submitData.append('FileName', $('#newFileName').val());
  submitData.append('userID', $('#newuserID').val());
  submitData.append('userName', $('#newuserName').val());
  submitData.append('File', $('#newUpFile')[0].files[0]);

  $.ajax({

    type: "PUT",
    url: UIA0 + image_id + UIA1,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false

  }).done(function(msg){
    // On Sucecss, update the image list
    $('#SingleImageList').empty();
    getImages();
  });

}
