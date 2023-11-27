$(document).ready(function () {
  $("#creatTicketForm").hide();
  // Get the ticketId from the URL.
  const ticketId = getTicketIdFromUrl();

  $("#submitbtn").click(function () {
    if ($("#approve").is(":checked")) {
      $("#iframe1").hide();
      $("#creatTicketForm").show();
    }
  });

  // Send a GET request to the API.
  $.ajax({
    url: `https://glassix.consist.co.il/el-al/api/get-data/${ticketId}`,
    type: "GET",
    success: function (data) {
      // The data from the API includes all necessary fields like clientName, PNR, etc.
      handleApiResponse(data);
      $(".noIframeT").hide();
      $(".IframeT").show();
      setTimeout(function() {
        $(".noIframeT").show();
        $(".IframeT").hide();
      }, 900000); // 15 minutes = 15 * 60 * 1000 milliseconds
    },
    error: function (err) {
      // Handle error.
      console.log(err);
      $(".IframeT").hide();
      $(".noIframeT").html("הדף כבר לא זמין, אנא פנה שוב לנציג").show();
    },
  });
});

function getTicketIdFromUrl() {
  // Split the URL by '/' and get the last part
  const urlParts = window.location.pathname.split("/");
  return urlParts[urlParts.length - 1];
}

const getCurrency = (currency) => {
  switch (currency) {
    case "1":
    case 1:
      return "שקל";
    case "2":
    case 2:
      return "דולר";
    case "978":
    case 978:
      return "יורו";
    default:
      return "Unknown Currency"; // handle unknown or default case
  }
};

function handleApiResponse(data) {
  // Destructure the data.
  const { clientName, PNR, currency, sum, userName, departmentId, expiration, ticketId } = data;

  // Get additional parameters.
  const cred_type = "1";
  const tranmode = "VK";

  // Create the source URL for the iframe.
  const src = `https://direct.tranzila.com/consistelal/iframenew.php?nologo=1&clientName=${clientName}&PNR=${PNR}&expiration=${expiration}&userName=${userName}&sum=1&currency=${currency}&cred_type=${cred_type}&tranmode=${tranmode}&lang=il&ticketId=${ticketId}&departmentId=${departmentId}&tahles=${sum}&hidesum=1`;

  // Set the source of the iframe.
  $("#iframeTrzanzila").prop("src", `${src}`);
  $(".noIframeT").hide();
  $(".textClientName").html(clientName);
  $(".textPNR").html(PNR);
  $(".textCoin").html(getCurrency(currency));
  $(".textSum").html(sum);
  // // Handle the expiration.
  // if (Date.now() < expiration) {
  //   $(".IframeT").hide();
  //   $(".noIframeT").show();
  // }
}
