document.addEventListener("DOMContentLoaded", () => {

    const form =
    document.getElementById("airbnb-contact-form");

    const submitBtn =
    document.querySelector(".btn-submit");

    form.addEventListener("submit", async function(e) {

        e.preventDefault();

        // DETENER TODO
        e.stopPropagation();

        const name =
        document.getElementById("form-name").value.trim();

        const email =
        document.getElementById("form-email").value.trim();

        const subject =
        document.getElementById("form-subject").value.trim();

        const message =
        document.getElementById("form-message").value.trim();

        // VALIDACIÓN CAMPOS

        if (!name || !email || !subject || !message) {

            submitBtn.innerHTML =
            "Faltan campos";

            submitBtn.style.background =
            "#b91c1c";

            return false;
        }

        // VALIDACIÓN CAPTCHA

        const captchaResponse =
        grecaptcha.getResponse();

        if (!captchaResponse) {

            submitBtn.innerHTML =
            "Completa el captcha";

            submitBtn.style.background =
            "#b91c1c";

            return false;
        }

        try {

            submitBtn.disabled = true;

            // VALIDAR NOMBRE

            const nameRegex =
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

            if(!nameRegex.test(name)){

                submitBtn.innerHTML =
                "Nombre inválido";

                submitBtn.disabled = false;

                return;
            }

            if(message.length < 10){

                submitBtn.innerHTML =
                "Mensaje muy corto";

                submitBtn.disabled = false;

                return;
            }

            if(message.length > 1000){

                submitBtn.innerHTML =
                "Mensaje demasiado largo";

                submitBtn.disabled = false;

                return;
            }


            // AQUÍ RECIÉN DESHABILITAS

            submitBtn.innerHTML =
            "Enviando...";

            submitBtn.disabled = true;


            // ENVIAR EMAIL

            await emailjs.send(
                "service_5dbf7gb",
                "template_n4frfiv",
                {
                    name,
                    email,
                    subject,
                    message
                }
            );

            submitBtn.innerHTML =
            "Mensaje enviado";

            submitBtn.style.background =
            "#15803d";

            form.reset();

            grecaptcha.reset();

        } catch (error) {

            console.error(error);

            submitBtn.innerHTML =
            "Error al enviar";

            submitBtn.style.background =
            "#b91c1c";
        }

        setTimeout(() => {

            submitBtn.innerHTML =
            "Enviar Mensaje";

            submitBtn.disabled = false;

            submitBtn.style.background = "";

        }, 4000);

        return false;

    });

});