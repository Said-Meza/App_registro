let container = document.querySelector(".contenedor"),
    qrInput   = document.querySelector(".form input"),
    instituto = document.querySelector(".form-x1"),
    correo    = document.querySelector(".form-x2"),
    semestre  = document.querySelector(".form-x3"),
    ocupacion = document.querySelector(".form-x4"),
    telefono  = document.querySelector(".form-x5"),
    boton     = document.querySelector(".form button"),
    qrimg     = document.querySelector(".qr_code img"),
    descargar = document.querySelector("#descargar"),
    img       = document.querySelector("img");
    aceptado  = 'Aceptado';    

    function registrar( qrInput,instituto,correo,semestre, ocupacion,telefono){

    }

    boton.addEventListener("click", () => {
        let qrvalue = qrInput.value;
//parece que ya jalo
        fetch('https://apiposgresql-production.up.railway.app/users',
        {
            method:'POST',
            headers: 
                {
                    'access-control-allow-origin': '*',
                    'content-type': 'application/json'
                 
                },
            body:JSON.stringify
            (
                {
                    nombre: qrvalue,
                    telefono:telefono.value,
                    instituto:instituto.value,
                    correo: correo.value,
                    ocupacion:ocupacion.value,
                    niveledu:semestre.value
                }
            )//datos
        })
        
        if (!qrvalue) return;
        boton.innerHTML="Generando codigo QR..!";
        qrimg.src= `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=  Gracias por Visitarnos el dia de hoy| ${qrvalue} | ${instituto.value} | ${correo.value} | ${telefono.value} | ${ocupacion.value} | ${semestre.value}`;
        

        qrimg.addEventListener("load", () => {
            container.classList.add("active");
            boton.innerHTML ="Generar codigo QR";
       
        })
        
    });

    

    qrInput.addEventListener("keyup",() => {
        if (!qrInput.value) {
            container.classList.remove("active");
        }
    })

    

    descargar.addEventListener("click", () => {
        let imgPath = img.getAttribute("src");
        let nombreArchivo = getFileName(imgPath);
       // console.log(nombreArchivo);
        let codigo = "codigo de registro";

        saveAs(imgPath,codigo);
    })

    function getFileName(str){
        return str.substr(str.lastIndexOf('/') + 1)
    }
