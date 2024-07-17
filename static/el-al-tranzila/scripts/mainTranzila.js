$(document).ready(function () {
    const getTicketIdAndTokenFromUrl = () => {
        const path = window.location.pathname.split("/");
        const ticketId = path[path.length - 1];
        const token = new URLSearchParams(window.location.search).get("token");
        return { ticketId, token };
    };

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
        const baseUrl = NODE_ENV === "test" ? "https://glas.consist.co.il:444" : "https://glassix.consist.co.il";
        $.ajax({
            url: `${baseUrl}/el-al/api/get-data/${ticketId}`,
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

    const getCurrency = (currency, language) => {
        const currencyMap = {
            1: { en: "Shekel", he: "שקל" },
            2: { en: "Dollar", he: "דולר" },
            978: { en: "Euro", he: "יורו" },
        };

        const lang = language === "en" ? "en" : "he";
        return currencyMap[currency] ? currencyMap[currency][lang] : "Unknown Currency";
    };

    const handleApiResponse = (data) => {
        const { clientName, PNR, currency, sum, userName, departmentId, expiration, ticketId, paymentName, language } = data;
        const tranzilaLang = language === "en" ? "us" : "il";
        const src = `https://direct.tranzila.com/consistelal/iframenew.php?nologo=1&clientName=${clientName}&PNR=${PNR}&expiration=${expiration}&userName=${userName}&sum=1&currency=${currency}&cred_type=1&tranmode=VK&lang=${tranzilaLang}&ticketId=${ticketId}&departmentId=${departmentId}&tahles=${sum}&hidesum=1`;
        $("#iframeTrzanzila").prop("src", src);
        $("#iframeTrzanzila-en").prop("src", src);
        $(".noIframeT").hide();
        $(".textClientName").text(clientName);
        $(".textPNR").text(PNR);
        $(".textCoin").text(getCurrency(currency, language));
        $(".textSum").text(sum);
        $(".textPaymentName").text(paymentName);

        if (language === "en") {
            $(".hebrew-form").hide();
            $(".english-form").show();
            // set IframeT to ltr
            $(".IframeT").css("direction", "ltr");
            startCountdown(480, document.querySelector("#time-en"));
        } else {
            $(".hebrew-form").show();
            $(".english-form").hide();
            $(".IframeT").css("direction", "rtl");
        }

        translateFooter(language);
        translateIframe1(language);
    };

    const translateFooter = (language) => {
        if (language === "en") {
            $("#footerClass")
                .html(
                    `
                Phone - 039771111<br />
                Customer Relations Department, El Al Israel Airlines Ltd.<br />
                Head Office, Ben Gurion Airport, P.O. Box 41, Postal Code 7015001<br />
                <a href="https://www.elal.com/eng/legal/ticket-cancellation" target="_blank">Go to Terms - Consumer Protection Law</a>
            `,
                )
                .attr("dir", "ltr");
            $("body").attr("dir", "ltr");
        } else {
            $("#footerClass")
                .html(
                    `
                טלפון - 039771111<br />
                מחלקת קשרי לקוחות, אל על נתיבי אוויר לישראל בע"מ<br />
                משרד ראשי, נתב"ג ת.ד. 41 מיקוד 7015001<br />
                <a href="https://www.elal.com/heb/legal/ticket-cancellation" target="_blank">מעבר לתקנון - חוק הגנת הצרכן</a>
            `,
                )
                .attr("dir", "rtl");
            $("body").attr("dir", "rtl");
        }
    };

    const translateIframe1 = (language) => {
        if (language === "en") {
            $("#iframe1")
                .html(
                    `
                <div class="row">
                    <div class="form-group col-12">
                        <div class="checkbox">
                            <br /><a href="https://www.elal.com/eng/legal/ticket-cancellation" target="_blank" style="margin-right: -22px">Go to Terms - Consumer Protection Law</a><br />
                            <label>
                                <input type="checkbox" data-toggle="toggle" data-style="ios" id="approve" data-on="" data-off="" />
                                I confirm that I have read the terms
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group" style="text-align: center">
                        <input type="button" name="submit" class="btn btn-info btn-lg" value="Confirm" id="submitbtn" />
                    </div>
                </div>
            `,
                )
                .attr("dir", "ltr");
        } else {
            $("#iframe1")
                .html(
                    `
                <div class="row">
                    <div class="form-group col-12">
                        <div class="checkbox">
                            <br /><a href="https://www.elal.com/heb/legal/ticket-cancellation" target="_blank" style="margin-right: -22px">מעבר לתקנון - חוק הגנת הצרכן</a><br />
                            <label>
                                <input type="checkbox" data-toggle="toggle" data-style="ios" id="approve" data-on="" data-off="" />
                                אני מאשר/ת כי קראתי את התקנון
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group" style="text-align: center">
                        <input type="button" name="submit" class="btn btn-info btn-lg" value="אישור" id="submitbtn" />
                    </div>
                </div>
            `,
                )
                .attr("dir", "rtl");
        }

        // Re-bind the click event for the newly created button
        $("#submitbtn").click(function () {
            if ($("#approve").is(":checked")) {
                $("#iframe1").hide();
                $("#creatTicketForm").show();
            }
        });
    };
});
