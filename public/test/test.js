var assert = chai.assert;

suite('Tests', function(){

  test('Variables sin definir: ', function(){
    object = pl0.parse("var a, b, c; {}");
    assert.equal(object.type, "BLOCK");
    assert.equal(object.name.type, "ID");
    assert.equal(object.name.value, "$main");
    /*assert.equal(object.block.st.left.type, "ID")
    assert.equal(object.block.st.left.value, "x")
    assert.equal(object.block.st.right.type, "NUM")
    assert.equal(object.block.st.right.value, "9")*/
  });

  test('Suma: ', function(){
    object = pl0.parse("var x; {x = 5 - 3;}");
    console.log(object);
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

  test('Multiplicacion: ', function(){
    object = pl0.parse("x = 4 * 1 {}");
    console.log(object);
    assert.equal(object.block.st.right.type, "*");
  });

  test('Division: ', function(){
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
  });

});
