var expect = require('chai').expect;
const PEG = require("../js/pl0.js");

  describe("pl0", function() {
    it("Variables sin definir", function() {
      var object = PEG.parse("var a, b, c; {}");
      expect(object.type).to.be.equal("BLOCK");
      expect(object.name.type).to.be.equal("ID");
      expect(object.variables[0][0]).to.be.equal("a");
      expect(object.variables[0][1]).to.be.equal(null);
      expect(object.variables[1][0]).to.be.equal("b");
      expect(object.variables[1][1]).to.be.equal(null);
      expect(object.variables[2][0]).to.be.equal("c");
      expect(object.variables[2][1]).to.be.equal(null);
    });
    it("Resta", function() {
      var object = PEG.parse("var x; {x = 5 - 3;}");
      expect(object.type).to.be.equal("BLOCK");
      expect(object.name.type).to.be.equal("ID");
      expect(object.name.value).to.be.equal("$main");
      expect(object.main.type).to.be.equal("COMPOUND");
      expect(object.main.children[0].left.type).to.be.equal("ID");
      expect(object.main.children[0].left.value).to.be.equal("x");
      expect(object.main.children[0].type).to.be.equal("=");
      expect(object.main.children[0].right.left.type).to.be.equal("NUM");
      expect(object.main.children[0].right.left.value).to.be.equal(5);
      expect(object.main.children[0].right.type).to.be.equal("-");
      expect(object.main.children[0].right.right.type).to.be.equal("NUM");
      expect(object.main.children[0].right.right.value).to.be.equal(3);
    });
    it("String Literal", function() {
      var object = PEG.parse('var a; {a = "Esto es un String literal";}');
      expect(object.type).to.be.equal("BLOCK");
      expect(object.name.type).to.be.equal("ID");
      expect(object.name.value).to.be.equal("$main");
      expect(object.variables[0][0]).to.be.equal("a");
      expect(object.variables[0][1]).to.be.equal(null);
      expect(object.main.type).to.be.equal("COMPOUND");
      expect(object.main.children[0].left.type).to.be.equal("ID");
      expect(object.main.children[0].left.value).to.be.equal("a");
      expect(object.main.children[0].type).to.be.equal("=");
      expect(object.main.children[0].right.type).to.be.equal("STRING");
      expect(object.main.children[0].right.value).to.be.equal("Esto es un String literal");
    });
    it("While, functions sin/con argumento y return:", function() {
      var object = PEG.parse('var a, b, c; { while (a<4) do { a = init(); b = fact(4);}; return c;;;}');
      expect(object.type).to.be.equal("BLOCK");
      expect(object.name.type).to.be.equal("ID");
      expect(object.name.value).to.be.equal("$main");
      expect(object.variables[0][0]).to.be.equal("a");
      expect(object.variables[0][1]).to.be.equal(null);
      expect(object.variables[1][0]).to.be.equal("b");
      expect(object.variables[1][1]).to.be.equal(null);
      expect(object.variables[2][0]).to.be.equal("c");
      expect(object.variables[2][1]).to.be.equal(null);
      expect(object.main.type).to.be.equal("COMPOUND");
      expect(object.main.children[0].type).to.be.equal("WHILE");
      expect(object.main.children[0].c.left.type).to.be.equal("ID");
      expect(object.main.children[0].c.left.value).to.be.equal("a");
      expect(object.main.children[0].c.type).to.be.equal("<");
      expect(object.main.children[0].c.right.type).to.be.equal("NUM");
      expect(object.main.children[0].c.right.value).to.be.equal(4);
      expect(object.main.children[0].st.type).to.be.equal("COMPOUND");
      expect(object.main.children[0].st.children[0].type).to.be.equal("=");
      expect(object.main.children[0].st.children[0].left.type).to.be.equal("ID");
      expect(object.main.children[0].st.children[0].left.value).to.be.equal("a");
      expect(object.main.children[0].st.children[0].right.type).to.be.equal("CALL");
      expect(object.main.children[0].st.children[0].right.func.type).to.be.equal("ID");
      expect(object.main.children[0].st.children[0].right.func.value).to.be.equal("init");

      expect(object.main.children[0].st.children[1].type).to.be.equal("=");
      expect(object.main.children[0].st.children[1].left.type).to.be.equal("ID");
      expect(object.main.children[0].st.children[1].left.value).to.be.equal("b");
      expect(object.main.children[0].st.children[1].right.type).to.be.equal("CALL");
      expect(object.main.children[0].st.children[1].right.func.type).to.be.equal("ID");
      expect(object.main.children[0].st.children[1].right.func.value).to.be.equal("fact");
      expect(object.main.children[0].st.children[1].right.arguments[0].type).to.be.equal("NUM");
      expect(object.main.children[0].st.children[1].right.arguments[0].value).to.be.equal(4);

      expect(object.main.children[1].children[0].type).to.be.equal("ID");
      expect(object.main.children[1].children[0].value).to.be.equal("c");
      expect(object.main.children[1].type).to.be.equal("RETURN");
    });
    it("For y String Literal", function() {
      var object = PEG.parse('var a, b; { b = "Podemos utilizar estos simbolos azAZ09!¿?{}&,;:<>/=`";   for(i = 0; i < 10; i+1) {		a= param1 + 3;	};  return c;;;}');
      expect(object.type).to.be.equal("BLOCK");
      expect(object.name.type).to.be.equal("ID");
      expect(object.name.value).to.be.equal("$main");
      expect(object.variables[0][0]).to.be.equal("a");
      expect(object.variables[1][0]).to.be.equal("b");
      expect(object.main.type).to.be.equal("COMPOUND");

      expect(object.main.children[0].type).to.be.equal("=");
      expect(object.main.children[0].left.type).to.be.equal("ID");
      expect(object.main.children[0].left.value).to.be.equal("b");
      expect(object.main.children[0].right.type).to.be.equal("STRING");
      expect(object.main.children[0].right.value).to.be.equal("Podemos utilizar estos simbolos azAZ09!¿?{}&,;:<>/=`");

      expect(object.main.children[1].type).to.be.equal("FOR");
      expect(object.main.children[1].cond).to.be.equal("<");
      expect(object.main.children[1].increment.left.type).to.be.equal("ID");
      expect(object.main.children[1].increment.left.value).to.be.equal("i");
      expect(object.main.children[1].increment.right.type).to.be.equal("NUM");
      expect(object.main.children[1].increment.right.value).to.be.equal(1);
      expect(object.main.children[1].increment.type).to.be.equal("+");
      expect(object.main.children[1].children.type).to.be.equal("COMPOUND");

      expect(object.main.children[2].children[0].type).to.be.equal("ID");
      expect(object.main.children[2].children[0].value).to.be.equal("c");
      expect(object.main.children[2].type).to.be.equal("RETURN");

      expect(object.main.children[1].children.children[0].left.type).to.be.equal("ID");
      expect(object.main.children[1].children.children[0].left.value).to.be.equal("a");
      expect(object.main.children[1].children.children[0].right.type).to.be.equal("+");
      expect(object.main.children[1].children.children[0].right.left.type).to.be.equal("ID");
      expect(object.main.children[1].children.children[0].right.left.value).to.be.equal("param1");
      expect(object.main.children[1].children.children[0].right.right.type).to.be.equal("NUM");
      expect(object.main.children[1].children.children[0].right.right.value).to.be.equal(3);
    });


});
