var assert = chai.assert;

suite('Tests', function(){

test('Variables sin definir: ', function(){
    object = pl0.parse("var a, b, c; {}");
    assert.equal(object.type, "BLOCK");
    assert.equal(object.name.type, "ID");
    assert.equal(object.name.value, "$main");
    assert.equal(object.variables[0][0], "a");
    assert.equal(object.variables[0][1], null);
    assert.equal(object.variables[1][0], "b");
    assert.equal(object.variables[1][1], null);
    assert.equal(object.variables[2][0], "c");
    assert.equal(object.variables[2][1], null);
  });

  test('Resta: ', function(){
    object = pl0.parse("var x; {x = 5 - 3;}");
    assert.equal(object.type, "BLOCK");
    assert.equal(object.name.type, "ID");
    assert.equal(object.name.value, "$main");
    assert.equal(object.main.type, "COMPOUND");
    assert.equal(object.main.children[0].left.type, "ID");
    assert.equal(object.main.children[0].left.value, "x");
    assert.equal(object.main.children[0].type, "=");
    assert.equal(object.main.children[0].right.left.type, "NUM");
    assert.equal(object.main.children[0].right.left.value, "5");
    assert.equal(object.main.children[0].right.type, "-");
    assert.equal(object.main.children[0].right.right.type, "NUM");
    assert.equal(object.main.children[0].right.right.value, "3");
  });

  test('String Literal: ', function(){
    object = pl0.parse('var a; {a = "Esto es un String literal";}');
    assert.equal(object.type, "BLOCK");
    assert.equal(object.name.type, "ID");
    assert.equal(object.name.value, "$main");
    assert.equal(object.variables[0][0], "a");
    assert.equal(object.variables[0][1], null);
    assert.equal(object.main.type, "COMPOUND");
    assert.equal(object.main.children[0].left.type, "ID");
    assert.equal(object.main.children[0].left.value, "a");
    assert.equal(object.main.children[0].type, "=");
    assert.equal(object.main.children[0].right.type, "STRING");
    assert.equal(object.main.children[0].right.value, "Esto es un String literal");
  });

  test('While, functions sin/con argumento y return: ', function(){
    object = pl0.parse('var a, b, c; { while (a<4) do { a = init(); b = fact(4);}; return c;;;}');
    assert.equal(object.type, "BLOCK");
    assert.equal(object.name.type, "ID");
    assert.equal(object.name.value, "$main");
    assert.equal(object.variables[0][0], "a");
    assert.equal(object.variables[0][1], null);
    assert.equal(object.variables[1][0], "b");
    assert.equal(object.variables[1][1], null);
    assert.equal(object.variables[2][0], "c");
    assert.equal(object.variables[2][1], null);
    assert.equal(object.main.type, "COMPOUND");
    assert.equal(object.main.children[0].type, "WHILE");
    //condicion
    assert.equal(object.main.children[0].c.left.type, "ID");
    assert.equal(object.main.children[0].c.left.value, "a");
    assert.equal(object.main.children[0].c.type, "<");
    assert.equal(object.main.children[0].c.right.type, "NUM");
    assert.equal(object.main.children[0].c.right.value, "4");
    assert.equal(object.main.children[0].st.type, "COMPOUND");

    assert.equal(object.main.children[0].st.children[0].type, "=");
    assert.equal(object.main.children[0].st.children[0].left.type, "ID");
    assert.equal(object.main.children[0].st.children[0].left.value, "a");
    assert.equal(object.main.children[0].st.children[0].right.type, "CALL");
    assert.equal(object.main.children[0].st.children[0].right.func.type, "ID");
    assert.equal(object.main.children[0].st.children[0].right.func.value, "init");

    assert.equal(object.main.children[0].st.children[1].type, "=");
    assert.equal(object.main.children[0].st.children[1].left.type, "ID");
    assert.equal(object.main.children[0].st.children[1].left.value, "b");
    assert.equal(object.main.children[0].st.children[1].right.type, "CALL");
    assert.equal(object.main.children[0].st.children[1].right.func.type, "ID");
    assert.equal(object.main.children[0].st.children[1].right.func.value, "fact");
    assert.equal(object.main.children[0].st.children[1].right.arguments[0].type, "NUM");
    assert.equal(object.main.children[0].st.children[1].right.arguments[0].value, "4");

    assert.equal(object.main.children[1].children[0].type, "ID");
    assert.equal(object.main.children[1].children[0].value, "c");
    assert.equal(object.main.children[1].type, "RETURN")
  });

  test('For y String literal', function(){
    object = pl0.parse('var a, b; { b = "Podemos utilizar estos simbolos azAZ09!¿?{}&,;:<>/=`";   for(i = 0; i < 10; i+1) {		a= param1 + 3;	};  return c;;;}');
    assert.equal(object.type, "BLOCK");
    assert.equal(object.name.type, "ID");
    assert.equal(object.name.value, "$main");
    assert.equal(object.variables[0][0], "a");
    assert.equal(object.variables[1][0], "b");
    assert.equal(object.main.type, "COMPOUND");

    assert.equal(object.main.children[0].type, "=");
    assert.equal(object.main.children[0].left.type, "ID");
    assert.equal(object.main.children[0].left.value, "b");
    assert.equal(object.main.children[0].right.type, "STRING");
    assert.equal(object.main.children[0].right.value, "Podemos utilizar estos simbolos azAZ09!¿?{}&,;:<>/=`");

    assert.equal(object.main.children[1].type, "FOR");
    assert.equal(object.main.children[1].cond, "<");
    assert.equal(object.main.children[1].increment.left.type, "ID");
    assert.equal(object.main.children[1].increment.left.value, "i");
    assert.equal(object.main.children[1].increment.right.type, "NUM");
    assert.equal(object.main.children[1].increment.right.value, "1");
    assert.equal(object.main.children[1].increment.type, "+");

    assert.equal(object.main.children[1].children.type, "COMPOUND");

    assert.equal(object.main.children[2].children[0].type, "ID");
    assert.equal(object.main.children[2].children[0].value, "c");
    assert.equal(object.main.children[2].type, "RETURN")

    assert.equal(object.main.children[1].children.children[0].left.type, "ID");
    assert.equal(object.main.children[1].children.children[0].left.value, "a");
    assert.equal(object.main.children[1].children.children[0].right.type, "+");
    assert.equal(object.main.children[1].children.children[0].right.left.type, "ID");
    assert.equal(object.main.children[1].children.children[0].right.left.value, "param1");
    assert.equal(object.main.children[1].children.children[0].right.right.type, "NUM");
    assert.equal(object.main.children[1].children.children[0].right.right.value, "3");
  });

  test('If then String Literal', function(){
    object = pl0.parse('var a = 4, n, b;{ for(i = 0; i < 5; i+1) {		n = n * 5;	}; if(n > 0) then  b = "Numero mayor que cero"; if(n == 0) then  b = "Numero mayor que cero";  return b; }');
    assert.equal(object.variables[0][0], "a");
    assert.equal(object.variables[0][1].type, "NUM");
    assert.equal(object.variables[0][1].value, "4");

    console.log(object);

  });


  /*test('Division: ', function(){
    object = pl0.parse("x = 1 / 6 {}");
    console.log(object);
    assert.equal(object.block.st.right.type, "/");
  });

  test('Asociatividad de izquierda: ', function(){
    object = pl0.parse("x = 1-2-3 {}");
    console.log(object);
    assert.equal(object.block.st.right.left.type, "-");
  });

  test('Parentesis: ', function(){
    object = pl0.parse("x = (2+4) * 9 {}");
    console.log(object);
    assert.equal(object.block.st.right.left.type, "+")
  });

  test('Precedencia: ', function(){
    object = pl0.parse("x = 2+3*3 {}");
    console.log(object);
    assert.equal(object.block.st.right.left.type, "NUM");
  });

  test('Comparacion: ', function(){
    object = pl0.parse("if x == 1 then y = 3 {}");
    console.log(object);
    assert.equal(object.block.st.condition.type, "==");
  });


  test('Call: ', function(){
    object = pl0.parse("call z {}");
    console.log(object);
    assert.equal(object.block.st.type, "call");
  });


  test('While Do: ', function(){
    object = pl0.parse("while x == 3 do z = z+3 {}");
    console.log(object);
    assert.equal(object.block.st.type, "IF");
  });

  test('Begin End: ', function(){
    object = pl0.parse("begin x = 3; z = b+3 end {}");
    console.log(object);
    assert.equal(object.type, "program");
  });

  test('Error de Sintaxis: ', function(){
    assert.throws(function() { pl0.parse("x = 323 {}"); }, /Expected "."/);
  });*/

});
