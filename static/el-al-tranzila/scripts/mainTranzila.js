$(document).ready(function () {
  // Get the ticketId from the URL.
  const ticketId = getTicketIdFromUrl();
  
  // Send a GET request to the API.
  $.ajax({
    url: `https://glassix.consist.co.il/el-al/api/get-data/${ticketId}`,
    type: "GET",
    success: function(data) {
      // The data from the API includes all necessary fields like clientName, PNR, etc.
      handleApiResponse(data);
    },
    error: function(err) {
      // Handle error.
      console.log(err);
      $("#iframeTrzanzila").hide();
      $(".noIframeT").html("הדף כבר לא זמין, אנא דבר שוב עם הנציג").show();
    }
  });
});


function getTicketIdFromUrl() {
  // Split the URL by '/' and get the last part
  const urlParts = window.location.pathname.split('/');
  return urlParts[urlParts.length - 1];
}

function handleApiResponse(data) {
  // Destructure the data.
  const {
    clientName,
    PNR,
    currency,
    sum,
    userName,
    departmentId,
    expiration,
    ticketId,
  } = data;

  // Get additional parameters.
  const cred_type = '1';
  const tranmode = 'VK';

  // Create the source URL for the iframe.
  const src = `https://direct.tranzila.com/consistelal/iframenew.php?nologo=1&clientName=${clientName}&PNR=${PNR}&expiration=${expiration}&userName=${userName}&sum=1&currency=${currency}&cred_type=${cred_type}&tranmode=${tranmode}&lang=il&ticketId=${ticketId}&departmentId=${departmentId}&tahles=${sum}`;

  // Set the source of the iframe.
  $("#iframeTrzanzila").prop("src", `${src}`);
  $(".noIframeT").hide();

  // // Handle the expiration.
  // if (Date.now() < expiration) {
  //   $(".IframeT").hide();
  //   $(".noIframeT").show();
  // }
}
