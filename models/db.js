(function() {
    "use strict";
    const util = require('util');
    const mongoose = require('mongoose');

    /*Creamos el esquema de nuestra colección*/
    const InputSchema = mongoose.Schema({
        "name": {
            type: String,
            unique: true
        },
        "content": String
    });

    /*Creamos el modelo de datos Input a partir del esquema ya creado*/
    const Input = mongoose.model("Input", InputSchema);

    /*Creamos los tres ejemplos iniciales*/
    let input1 = new Input({
        "name": "entrada1.pl0",
        "content": `const A = 4,
      B = 30;
var a, b, c;
{
  while (a<4) do {
    a = init();
    b = fact(4);
    c = chuchu(a*b, fact(3))
  };
  return c;;;
}`
    });
    let input2 = new Input({
        "name": "entrada2.pl0",
        "content": `\\\\ Ejemplo PL0 con PEGJS
const A = 4,
       B = 30, params1 = 40;

var a, b, c;
{
   b = "Esto es un String literal";
   c = "Podemos utilizar estos simbolos azAZ09!¿?{}&',;:<>/=";
   for(i = 0; i < 10; i+1) {
		a= param1 + 3;
	};
  while (a<4) do {
    a = init();
    b = fact(4);
    c = chuchu(a*b, fact(3))
  };
  return c;;;
}
`
    });
    let input3 = new Input({
        "name": "entrada3.pl0",
        "content": `\\Ejemplo Sencillo
var a = 4, n, b;
{
while(a >= 0) do {
  n =  n + 1;
  a = a - 1;
 };

 for(i = 0; i < 5; i+1) {
		n = n * 5;
	};

 if(n > 0) then  b = "Numero mayor que cero";
 if(n == 0) then  b = "Numero mayor que cero";

   return b;
}
`

    });

    /*Añadimos los ejemplos a la BD*/
    let promise1 = input1.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${input1}`);
    });

    let promise2 = input2.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${input2}`);
    });

    let promise3 = input3.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${input3}`);
    });

    /*Esperamos a que se creen los ejemplos*/
    Promise.all([promise1, promise2, promise3]).then((value) => {
        console.log("Se han creado las entradas:\n" + util.inspect(value, {
            depth: null
        }));
    }, (reason) => {
        console.log("No se han podido crear las entradas:\n" + reason);
    });

    module.exports = Input;
})();
