$(document).ready(async function(){

    $('.loader').css("display","none")
    $('.alert').css("display","none")
    $('#phoneNumber').prop('disabled', true);
    $('#hasflyerClub').bootstrapToggle('off');
    $('#hasticketNumber').bootstrapToggle('off');
    $('#hasbookingCode').bootstrapToggle('off');
    $('#ffDiv').hide()
    $('#tnDiv').hide()
    $('#bcDiv').hide()
    let selectedCountryData = null;

    var getUrlParameter = (sParam) => {
        var sPageURL = window.location.search.substring(1),
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
    // let ticketId =""
    // let departmetId = ""

    // window.onTicketLoaded = function (ticket) {
    //     console.log("ticket: "+JSON.stringify(ticket));
    //     ticketId = ticket.id
    //     departmetId = ticket.departmentId
    //     // const client = ticket.participants.find(participant => participant.type == '1' && (participant.protocolType=="SMS" || participant.protocolType=="WhatsApp" || participant.protocolType=="PhoneCall" || participant.protocolType=="WebViaSMS"))
    //     // const phone = client ? client.identifier : ""
    //     // $("#phoneNumber").val(phone)
    // }
  $('#firstName').on('input', function () {
    var firstName = $(this).val();
    if (firstName.length > 0) {
        $('#firstNameError').hide();
    }
  })

  $('#lastName').on('input', function () {
    var lastName = $(this).val();
    if (lastName.length > 0) {
        $('#lastNameError').hide();
    }
  })

  $('#Country').change(function () {
    $('#phoneNumber').prop('disabled', false);
    $('#CountryError').css("display","none");
    $('#phoneNumber').text("")
    $('#phoneNumber').val("")
    const selectedCountryCode = $(this).val();
    
    // Find country data based on the selected country (alpha2 or alpha3)
    selectedCountryData = phoneValidationData.find(country => 
        country.alpha2 === selectedCountryCode || country.alpha3 === selectedCountryCode
    );

    if (selectedCountryData) {
      
        console.log("Selected country validation data: ", selectedCountryData);
    }
  });

  $('#phoneNumber').on('input', function () {
    $('#phoneNumberError').css("display","none");
    const phoneNumber = $(this).val().replace(/\D/g, '');  // Remove non-digit characters
    let validationMessage = '';

    if (selectedCountryData) {
        // Check if the phone number starts with the country code
        if (!phoneNumber.startsWith(selectedCountryData.country_code)) {
            validationMessage = `The area code is incorrect, it should start with: ${selectedCountryData.country_code}`;
        } else {
            // Strip off the country code from the phone number for further checks
            const numberWithoutCountryCode = phoneNumber.slice(selectedCountryData.country_code.length);
            
            // Check if the next part starts with one of the mobile_begin_with numbers
            const beginsWithValidPrefix = selectedCountryData.mobile_begin_with.some(prefix => numberWithoutCountryCode.startsWith(prefix));

            if (!beginsWithValidPrefix) {
                // validationMessage = `The number should begin with: ${selectedCountryData.mobile_begin_with.join(', ')}`;
                validationMessage = `The phone number is incorrect`;
            } else {
                // Check the phone number length (excluding the country code)
                const phoneLength = numberWithoutCountryCode.length;
                if (!selectedCountryData.phone_number_lengths.includes(phoneLength)) {
                    const validLengths = selectedCountryData.phone_number_lengths.join(' or ');
                    validationMessage = `The phone number should have at least ${validLengths} digits`;
                } else {
                    validationMessage = '';  // The phone number is valid
                }
            }
        }
    }
    // Display validation message
            if (validationMessage) {
              if ($('#phoneValidationMessage').length === 0) {
                    $('#phoneNumberError').text(validationMessage);
                    $('#phoneNumberError').css("display","block");
                //   $('<p id="phoneValidationMessage" style="color:red"></p>').insertAfter('#phoneNumber');
              }
            //   $('#phoneValidationMessage').text(validationMessage);
          } else {
            //   $('#phoneValidationMessage').remove();
              $('#phoneNumberError').css("display","none");
          }
  });

  $('#hasflyerClub').change(function () {
    if ($(this).prop('checked')) {
        // Show ffDiv if checked (Yes)
        $('#ffDiv').show();
    } else {
        // Hide ffDiv if unchecked (No)
        $('#ffDiv').hide();
    }
});
$('#hasticketNumber').change(function () {
  if ($(this).prop('checked')) {
      // Show ffDiv if checked (Yes)
      $('#tnDiv').show();
  } else {
      // Hide ffDiv if unchecked (No)
      $('#tnDiv').hide();
  }
});
$('#hasbookingCode').change(function () {
  if ($(this).prop('checked')) {
      // Show ffDiv if checked (Yes)
      $('#bcDiv').show();
  } else {
      // Hide ffDiv if unchecked (No)
      $('#bcDiv').hide();
  }
});

$('#flyerClub').on('input', function () {
  var flyerClubValue = $(this).val();
  var isNumeric = /^\d+$/.test(flyerClubValue); // Check if only digits
  var lengthValid = flyerClubValue.length >= 7 && flyerClubValue.length <= 8; // Length between 7-8 digits

  if (!isNumeric || !lengthValid) {
      $('#flyerClubError').show(); // Show error message if invalid
  } else {
      $('#flyerClubError').hide(); // Hide error message if valid
  }
});

$('#ticketNumber').on('input', function () {
  var ticketNumberValue = $(this).val();
  var isNumeric = /^\d+$/.test(ticketNumberValue); // Check if only digits
  var lengthValid = ticketNumberValue.length == 15 // Length 15 digits

  if (!isNumeric || !lengthValid) {
      $('#ticketNumberError').show(); // Show error message if invalid
  } else {
      $('#ticketNumberError').hide(); // Hide error message if valid
  }
});

$('#bookingCode').on('input', function () {
  var bookingCodeValue = $(this).val();
  var isAlphanumeric = /^[a-zA-Z0-9]+$/.test(bookingCodeValue); // Check if only alphanumeric (digits or letters)
  var lengthValid = bookingCodeValue.length >= 1 && bookingCodeValue.length <= 6; // Length between 1-6 characters

  if (!isAlphanumeric || !lengthValid) {
      $('#bookingCodeError').show(); // Show error message if invalid
  } else {
      $('#bookingCodeError').hide(); // Hide error message if valid
  }
});
// Validation functions
function validatePhoneNumber(phoneNumber, countryCodeData) {
  if (!phoneNumber.startsWith(countryCodeData.country_code)) {
      return `The phone number should start with the country code: ${countryCodeData.country_code}`;
  }

  const numberWithoutCountryCode = phoneNumber.slice(countryCodeData.country_code.length);
  const validPrefix = countryCodeData.mobile_begin_with.some(prefix => numberWithoutCountryCode.startsWith(prefix));
  if (!validPrefix) {
    //   return `The phone number should begin with one of the following prefixes: ${countryCodeData.mobile_begin_with.join(', ')}`;
      return `The phone number is incorrect`;
  }

  const validLength = countryCodeData.phone_number_lengths.includes(numberWithoutCountryCode.length);
  if (!validLength) {
      return `The phone number length should be ${countryCodeData.phone_number_lengths.join(' or ')} digits long.`;
  }

  return ''; // No error
}

function validateFlyerClub(flyerClub) {
  const isNumeric = /^\d+$/.test(flyerClub);
  const lengthValid = flyerClub.length >= 7 && flyerClub.length <= 8;
  if (!isNumeric) {
      return 'The Frequent Flyer Club Number must be 7-8 digits long.';
  }
  if (!lengthValid) {
      return 'The Frequent Flyer Club Number must be 7-8 digits long.';
  }
  return '';
}

function validateTicketNumber(ticketNumber) {
  const isNumeric = /^\d{15}$/.test(ticketNumber);
  if (!isNumeric) {
      return 'The Ticket Number must be exactly 15 digits long.';
  }
  return '';
}

function validateBookingCode(bookingCode) {
  const isAlphanumeric = /^[a-zA-Z0-9]{1,6}$/.test(bookingCode);
  if (!isAlphanumeric) {
      return 'The Booking Code must contain only letters (a-z, A-Z) or digits.';
  }
  return '';
}

// Form submission handler
$('#submitbtn').click(function () {
  let isValid = true;

  // Clear previous error messages
  $('.alert-danger').hide();
  $('.alert-success').hide();

  // First name and last name validation (required fields)
  if ($('#firstName').val() === '') {
    console.log("First Name is required");
      $('#firstNameError').css("display","block");
      isValid = false;
  } else {
    $('#firstNameError').css("display","none");
      //$('#firstName').next('p').hide();
  }

  if ($('#lastName').val() === '') {
    $('#lastNameError').css("display","block");
      isValid = false;
  } else {
    $('#lastNameError').css("display","none");
  }

  // Validate phone number based on selected country
  const selectedCountry = $('#Country option:selected').val();
  
  if (!selectedCountry || selectedCountry=="" || selectedCountry==0) {
    $('#CountryError').css("display","block");
      isValid = false;
  } else {
    $('#CountryError').css("display","none");
  }
  let phoneNumber1 = $('#phoneNumber').val()
  
  console.log("Selected phoneNumber:", phoneNumber);
  if (phoneNumber1 == "" || !phoneNumber1 || phoneNumber1.length == 0 || phoneNumber == null || phoneNumber1 == undefined) {
    console.log("Selected phoneNumber not:", phoneNumber);
      $('#phoneNumberError').text("Phone Number is required");
      $('#phoneNumberError').css("display","block");
      isValid = false;
  } else {
    phoneNumber = phoneNumber1.replace(/\D/g, '')
    const countryCodeData = phoneValidationData.find(country => country.alpha2 === selectedCountry || country.alpha3 === selectedCountry);
    if (countryCodeData) {
        const phoneNumberError = validatePhoneNumber(phoneNumber, countryCodeData);
        if (phoneNumberError) {
            $('#phoneNumberError').text(phoneNumberError);
            $('#phoneNumberError').css("display","block");
            // $('#phoneNumber').next('p').text(phoneNumberError).show();
            isValid = false;
        } else {
            $('#phoneNumberError').css("display","none");
            // $('#phoneNumber').next('p').hide();
        }
    } else {
        // $('#phoneNumber').next('p').text('Please select a valid country.').show();
        isValid = false;
    }
    }

  // Validate Frequent Flyer Club Number if field is visible
  if ($('#ffDiv').is(':visible')) {
      const flyerClub = $('#flyerClub').val();
      const flyerClubError = validateFlyerClub(flyerClub);
      if (flyerClubError) {
          $('#flyerClubError').text(flyerClubError).show();
          isValid = false;
      } else {
          $('#flyerClubError').hide();
      }
  }

  // Validate Ticket Number if field is visible
  if ($('#tnDiv').is(':visible')) {
      const ticketNumber = $('#ticketNumber').val();
      const ticketNumberError = validateTicketNumber(ticketNumber);
      if (ticketNumberError) {
          $('#ticketNumberError').text(ticketNumberError).show();
          isValid = false;
      } else {
          $('#ticketNumberError').hide();
      }
  }

  // Validate Booking Code if field is visible
  if ($('#bcDiv').is(':visible')) {
      const bookingCode = $('#bookingCode').val();
      const bookingCodeError = validateBookingCode(bookingCode);
      if (bookingCodeError) {
          $('#bookingCodeError').text(bookingCodeError).show();
          isValid = false;
      } else {
          $('#bookingCodeError').hide();
      }
  }

  if($('#referral').val() == ""){
    $('#referralError').css("display","block");
    isValid = false;
  }else{
    $('#referralError').css("display","none");
  }

  // Final validation result
  if (isValid) {
        try{
            $('.loader').css("display","display")
            const ticketId = getUrlParameter('ticketId')
            const departmetId = "865a9c18-901f-4757-b7f2-f2aa9fa2c87a"
            const data = { 
                ticketId : ticketId || "", 
                departmetId : departmetId || "",
                name: $('#firstName').val() || "", 
                familyName : $('#lastName').val() || "", 
                phoneNumber : $('#phoneNumber').val() || "", 
                cause: $('#referral').val() || "", 
                flyerClub : $('#flyerClub').val() || "", 
                ticketNumber : $('#ticketNumber').val() || "", 
                bookingCode : $('#bookingCode').val() || ""
            }
            $.ajax({
                url: `https://glas.consist.co.il/ELAL-Form/api/tickets/updateTicket`,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (data) {
                  console.log("success");          
                  $('.alert-success').show();
                  $('.loader').css("display","none") 
                },
                complete: function(data){
                  console.log("complete");
                  $('.loader').css("display","none")
                },
                error: function(data){
                  $('.alert-danger').show();
                  $('.loader').css("display","none") 
                }  
              })
        }catch(e){
            console.log(e)
        }
  } else {
      $('.alert-danger').text('Please correct the errors before submitting.').show();
  }
});


})