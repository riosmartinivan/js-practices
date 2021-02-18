const dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo",];

for (var i in dias) {
    if (i === "6") {
        alert("Dia 7 encontrado!");
    }
    
    if (i%2 === 1) {
        console.log("El dia " + dias[i] + " es par");
    }
}

/* Forma 2
for (var i = 0; i < dias.length; i++) {
    if (i === 6) {
        alert("Dia 7 encontrado!");
    }
    
    if (i%2 === 1) {
        console.log("El dia " + dias[i] + " es par");
    }
}
*/