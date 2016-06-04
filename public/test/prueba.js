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
      expect(object.main.type).to.be.equal("COMPOUND");
      expect(object.main.children[0].left.type).to.be.equal("ID");
      expect(object.main.children[0].left.value).to.be.equal("x");
      expect(object.main.children[0].type).to.be.equal("=");
      expect(object.main.children[0].right.left.type).to.be.equal("NUM");
      expect(object.main.children[0].right.left.value).to.be.equal("5");
      expect(object.main.children[0].right.type).to.be.equal("-");
      expect(object.main.children[0].right.right.type).to.be.equal("NUM");
      expect(object.main.children[0].right.right.value).to.be.equal("3");
    });


});
