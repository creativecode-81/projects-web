$(document).ready(function () {
    $('.calculate').on('click', function () {
        let date = $('.birth_date').val();
        if (date === '') {
            swal({
                title: "Fecha vacía",
                text: "Por favor, ingrese una fecha de nacimiento válida.",
                icon: "warning",
                button: "Aceptar",
                closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
            });
            return;
        }

        date = date.toString();
        const year = parseInt(date.slice(0, 4), 10);
        const month = parseInt(date.slice(5, 7), 10) - 1;
        const day = parseInt(date.slice(8, 10), 10);

        const birthDay = new Date(year, month, day);
        const today = new Date();

        // Validar si la fecha de nacimiento es mayor a la fecha actual
        if (birthDay > today) {
            swal({
                title: "Fecha de nacimiento inválida",
                text: "La fecha de nacimiento no puede ser mayor a la fecha actual.",
                icon: "warning",
                button: "Aceptar",
                closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
            });
            $('.birth_date').val('');
            return;
        }
        // Calcular la edad exacta
        let ageInMilliseconds = today.getTime() - birthDay.getTime();
        let yearAge = Math.floor(ageInMilliseconds / 31536000000);
        let monthAge = Math.floor((ageInMilliseconds % 31536000000) / 2629750000);
        let dayAge = Math.floor((ageInMilliseconds % 2629750000) / 86400000);


        if (today.getMonth() === birthDay.getMonth() && today.getDate() === birthDay.getDate()) {
            swal({
                title: "¡Feliz Cumpleaños!",
                text: "Que en este día tan especial, Dios te bendiga con mucha felicidad!!!",
                icon: "success",
                button: "Aceptar",
                closeOnClickOutside: false, // Evita que se cierre haciendo clic fuera del cuadro de diálogo
                content: {
                    element: "img",
                    attributes: {
                        src: "img/cake.png",
                        height: "100",
                        width: "200"
                    }
                }
            });
            $('.birth_date').val('');

        }
        $('.exact_age').text(`${yearAge} años, ${monthAge} meses y ${dayAge} días.`);
    });
});



