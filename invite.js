// ── RSVP Invite Generation
    function generateInvite() {
        const name = document.getElementById("guestName").value.trim();
        if (!name) return alert("Please enter your name.");

        const inviteId = "PK26-" + Math.floor(1000 + Math.random() * 9000);

        document.getElementById("displayName").innerText = name;
        document.getElementById("inviteId").innerText = "Invite ID: " + inviteId;

        document.getElementById("outerWrapper").style.display = "block";
        document.body.style.overflow = 'hidden'; // stop background scroll when invite modal is open

        document.getElementById("qrcode").innerHTML = "";

        new QRCode(document.getElementById("qrcode"), {
            text: `Guest: ${name}\nInvite ID: ${inviteId}\n#PK26LoveStory\n20 August 2026`,
            width: 100,
            height: 100
        });

        document.getElementById("invite").scrollIntoView({ behavior: "smooth" });
    }

    // function downloadImage() {
    //     html2canvas(document.getElementById("inviteCard"), { scale: 2 }).then(canvas => {
    //         const link = document.createElement("a");
    //         link.download = "PK26LoveMix-GuestPass.png";
    //         link.href = canvas.toDataURL();
    //         link.click();
    //     });
    // }

    function closeInvite() {
        document.getElementById("outerWrapper").style.display = "none";
        document.body.style.overflow = '';  // restore scroll
        document.getElementById("invite").scrollIntoView({ behavior: "smooth" });
    }

    function downloadImage() {
      const card = document.getElementById("inviteCard");

      // Wait for fonts to fully load
      document.fonts.ready.then(() => {
          html2canvas(card, {
              scale: 3, // ultra HD
              useCORS: true,
              backgroundColor: null
          }).then(canvas => {
              const link = document.createElement("a");
              link.download = "PK26LoveMix-GuestPass.png";
              link.href = canvas.toDataURL("image/png");
              link.click();
          });
      });
      
    //   document.getElementById("inviteWrapper").style.display = "none";
    }

    function shareWhatsApp() {
        const name = document.getElementById("displayName").innerText;
        const text = `I will be attending #PK26LoveStory 💍\nSeat Reserved For: ${name}\n20th August 2026\nJ and C Events Centre, Ibadan`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }