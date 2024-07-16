$(document).ready(function () {
    const { ticketId, token } = getTicketIdAndTokenFromUrl();

    $("#submitbtn").click(function () {
        if ($("#approve").is(":checked")) {
            $("#iframe1").hide();
            $("#creatTicketForm").show();
        }
    });

    const startCountdown = (duration, display) => {
        let timer = duration;
        const interval = setInterval(() => {
            const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
            const seconds = String(timer % 60).padStart(2, "0");
            display.textContent = `${minutes}:${seconds}`;

            if (--timer < 0) {
                clearInterval(interval);
                display.textContent = "Time's up";
            }
        }, 1000);
    };

    const fetchData = () => {
        $.ajax({
            url: `https://glassix.consist.co.il/el-al/api/get-data/${ticketId}`,
            headers: { Authorization: `Bearer ${token}` },
            type: "GET",
            success: function (data) {
                handleApiResponse(data);
                $(".noIframeT").hide();
                $(".IframeT").show();
                setTimeout(() => {
                    $(".noIframeT").show();
                    $(".IframeT").hide();
                }, 900000); // 15 minutes
                const display = document.querySelector("#time");
                startCountdown(480, display); // 8 minutes in seconds
            },
            error: function (err) {
                console.log(err);
                $(".IframeT").hide();
                $(".noIframeT").html("The page is no longer available, please contact the representative again.").show();
            },
        });
    };

    fetchData();
    setInterval(fetchData, 480000); // check every 8 minutes

    const getTicketIdAndTokenFromUrl = () => {
        const path = window.location.pathname.split("/");
        const ticketId = path[path.length - 1];
        const token = new URLSearchParams(window.location.search).get("token");
        return { ticketId, token };
    };

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
                return "Unknown Currency";
        }
    };

    const handleApiResponse = (data) => {
        const { clientName, PNR, currency, sum, userName, departmentId, expiration, ticketId, paymentName, language } = data;
        const src = `https://direct.tranzila.com/consistelal/iframenew.php?nologo=1&clientName=${clientName}&PNR=${PNR}&expiration=${expiration}&userName=${userName}&sum=1&currency=${currency}&cred_type=1&tranmode=VK&lang=${language}&ticketId=${ticketId}&departmentId=${departmentId}&tahles=${sum}&hidesum=1`;

        $("#iframeTrzanzila").prop("src", src);
        $(".noIframeT").hide();
        $(".textClientName").text(clientName);
        $(".textPNR").text(PNR);
        $(".textCoin").text(getCurrency(currency));
        $(".textSum").text(sum);
        $(".textPaymentName").text(paymentName);

        if (language === "en") {
            $(".hebrew-form").hide();
            $(".english-form").show();
            startCountdown(480, document.querySelector("#time-en"));
        } else {
            $(".hebrew-form").show();
            $(".english-form").hide();
        }
    };
});
