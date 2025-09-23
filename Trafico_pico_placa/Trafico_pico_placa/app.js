const picoyPlaca = {
    bogota: {
        lunes: ["1", "2"],
        martes: ["3", "4"],
        miercoles: ["5", "6"],
        jueves: ["7", "8"],
        viernes: ["9", "0"]
    },
    medellin: {
        lunes: ["1", "2"],
        martes: ["3", "4"],
        miercoles: ["5", "6"],
        jueves: ["7", "8"],
        viernes: ["9", "0"]
    },
    cali: {
        lunes: ["1", "2"],
        martes: ["3", "4"],
        miercoles: ["5", "6"],
        jueves: ["7", "8"],
        viernes: ["9", "0"]
    }
};

document.addEventListener("DOMContentLoaded", function() {

    
    const formulario = document.querySelector("form");
    const placaInput = document.getElementById("placa");
    const municipioSelect = document.getElementById("municipio");
    const diaSelect = document.getElementById("dia");
    const resultadoDiv = document.getElementById("resultado");

        // 🔍 Detectar ciudad por IP
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=349b5f17c56643df828c40755390a78e')
        .then(response => response.json())
        .then(data => {
            const ciudad = data.city.toLowerCase();

            console.log("Ciudad detectada:", ciudad);

            if (ciudad.includes("bogotá")) {
                municipioSelect.value = "bogota";
            } else if (ciudad.includes("medellín") || ciudad.includes("medellin")) {
                municipioSelect.value = "medellin";
            } else if (ciudad.includes("cali")) {
                municipioSelect.value = "cali";
            }
        })
        .catch(error => {
            console.error("Error al obtener ubicación:", error);
        });


    placaInput.addEventListener("input", () => {
        placaInput.value = placaInput.value.toUpperCase();
    });

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const placa = placaInput.value.trim();
        const municipio = municipioSelect.value.trim().toLowerCase();
        const dia = diaSelect.value.trim().toLowerCase();

        if (!placa || !municipio || !dia) {
            resultadoDiv.textContent = "Por favor, complete todos los campos.";
            resultadoDiv.style.color = "red";
            return;
        }

       
        if (!(municipio in picoyPlaca)) {
            resultadoDiv.textContent = "Municipio no válido.";
            resultadoDiv.style.color = "red";
            return;
        }

        if (!(dia in picoyPlaca[municipio])) {
            resultadoDiv.textContent = "No hay restricciones para este día.";
            resultadoDiv.style.color = "green";
            return;
        }

        const ultimoDigito = placa.slice(-1);

        const restricciones = picoyPlaca[municipio][dia];

        if (restricciones.includes(ultimoDigito)) {
            resultadoDiv.textContent = `Su vehículo con placa terminada en ${ultimoDigito} NO puede circular hoy (${capitalize(dia)}) en ${capitalize(municipio)}.`;
            resultadoDiv.style.color = "red";
        } else {
            resultadoDiv.textContent = `Su vehículo con placa terminada en ${ultimoDigito} puede circular hoy (${capitalize(dia)}) en ${capitalize(municipio)}.`;
            resultadoDiv.style.color = "green";
        }
    });

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
