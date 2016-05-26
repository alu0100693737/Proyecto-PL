(() => {
    "use strict";

      const semantic = (tree) => {

        eachBlockPre(tree, (t, args) => {
            t.symbolTable = {
              name : t.name.value,
              constants : t.constants,
              variables : t.variables,
              functions : t.functions,
              comments : t.comentarios
            };
        }, null);

        eachBlockPre(tree, (t, args) => {
            t.functions.forEach((fun) => {
              fun.symbolTable.FATHER = t.name.value,
              fun.symbolTable.FATHER_SYMBOLTABLE = t.symbolTable
            });
        }, null);
    };

    const eachBlockPre = (tree, action, args) => {
       action(tree,args);
       tree.functions.forEach((func) => eachBlockPre(fun, action, args));
   };

    module.exports = semantic;
   })();
