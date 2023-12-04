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

  
function startCountdown(duration, display) {
  var timer = duration, minutes, seconds;

  // Updating the timer every second
  var interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // Displaying the time
      display.textContent = minutes + ":" + seconds;

      // When the timer is over, clear the interval
      if (--timer < 0) {
          clearInterval(interval);
          display.textContent = "תם הזמן";
      }
  }, 1000);
}

  // Send a GET request to the API.
  let interval
  function fetchData() {
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
        const timeInSeconds = 60 * 8 // 8 minutes in seconds
        const display = document.querySelector('#time'); // Assuming you have an element with id 'time'
        startCountdown(timeInSeconds, display)
      },
      error: function (err) {
        // Handle error.
        console.log(err);
        $(".IframeT").hide();
        $(".noIframeT").html("הדף כבר לא זמין, אנא פנה שוב לנציג").show();
        clearInterval(interval);
      },
    });
  }
  fetchData()
  interval = setInterval(fetchData, 480000); // check every 8 minutes
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

