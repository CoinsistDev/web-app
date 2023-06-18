
$(document).ready(function () {
  $('.loader').css("display", "none")
  $(".alert").hide();

  $("#flight-date").datepicker({
    monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
      'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
    monthNamesShort: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יוני',
      'יולי', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
    dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    dayNamesShort: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
    dayNamesMin: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
    dateFormat: 'dd/mm/yy',
    isRTL: true,
    changeYear: true,
    changeMonth: true,
    showButtonPanel: true,
    closeText: 'סגור'
  });

  const getUrlParameter = (sParam) => {
    let sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };

  $("#submitbtn").click(function () {
    $(".alert").hide();
    $('.loader').css("display", "block")

    if ($("#flight-date").val() == "" || $("#booking-number").val() == "" || $("#reason-for-contact").val() == "" || $("#passenger-name").val() == "" || $("#phone").val() == "") {
      var errorMessage = "נא למלא את כל השדות"
      $('.alert-danger').html(errorMessage)
      $('.alert-danger').show();
      $('.loader').css("display", "none")
      setTimeout(function () { $(".alert").hide(); }, 3000);
    } else {
      const ticketIdVal = getUrlParameter('ticketId')
      const dataFlight = {
        ticketId: ticketIdVal,
        phoneNumber: $("#phone").val(),
        field2: $("#booking-number").val(),
        field4: $("#reason-for-contact").val(),
        field6: $("#passenger-name").val(),
        field7: $("#flight-date").val()
      }
      console.log(JSON.stringify(dataFlight));
      $.ajax({
        url: `https://glassix.consist.co.il/el-al/api/send-form`,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(dataFlight),
        success: function (data) {
          console.log("data " + data);
            $('.alert-success').show();
            $('.loader').css("display", "none")
        },
        error: function (data) {
          $('.alert-danger').text('אירע שגיאה');
          $('.alert-danger').show();
          $('.loader').css("display", "none")
        },
        // complete: function (data) {
        //   if (!success) {
        //     $('.alert-danger').text('אירע שגיאה');
        //     $('.alert-danger').show();
        //     $('.loader').css("display", "none")
        //   }
        //   else {
        //     $('.alert-success').show();
        //     $('.loader').css("display", "none")
        //   }
        //   $('.loader').css("display", "none")
        // }
      })
    }
  })

})