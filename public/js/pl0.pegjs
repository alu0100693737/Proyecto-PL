/*
 * PEGjs for a "Pl-0" like language
 * Used in ULL PL Grado de Informática classes
 */

{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

program
  = b:block {
    b.name = {
    type: 'ID',
    value: "$main"
    };
    b.params = [];
    return b;
  }

block
  = cm:comentarios* cD:constantDeclaration? vD:varDeclaration? fD:functionDeclaration* st:st {
    let constants = cD? cD : [];
    let variables = vD? vD : [];
    return {
      type: 'BLOCK',
      comentarios: cm,
      constants: constants,
      variables: variables,
      functions: fD,
      main: st
    };
  }

comentarios
 = COMMENT cm:COMENTARIO {
   return {
     type: 'COMENTARIO',
     value: cm.value
   }
 }

constantDeclaration
  = CONST id:ID ASSIGN n:NUMBER rest:(COMMA ID ASSIGN NUMBER)* SC {
    let r = rest.map( ([_, id, __, nu]) => [id.value, nu.value] );
    return [[id.value, n.value]].concat(r)
}

//asignacion de valor a las variables
varDeclaration = VAR id:ID ASSIGN? val1:factor? rest:(COMMA ID ASSIGN? val2:factor?)* SC {
  let r = rest.map( ([_, id, __, val2]) => [id.value, val2] );
  return [[id.value, val1]].concat(r)
}

functionDeclaration = FUNCTION id:ID LEFTPAR !COMMA p1:ID? r:(COMMA ID)* RIGHTPAR SC b:block SC {
  let params = p1? [p1] : [];
  if(param1) /* Si existe el primer parámetro */
      params = params.concat(rest.map(([_, p]) => p)); /* Concatenamos con el primer parámetro anterior el resto, si los hubiese (ignoramos comas) */
    let ret = undefined; /* Contemplamos la posibilidad de que no exista el return */
    let i = b.main.length - 1; /* Almacenamos la posición del último elemento, que se debería corresponder con el return si existe */
    if(b.main[i].type = 'RETURN'); /* Si existe el return */
      ret = b.main[i].children;
  //delete b.type;
  return Object.assign({
    type: 'FUNCTION',
    name: id,
    params: params,
  }, b);
}

st

= CL s1:st? r:(SC st)* SC* CR {
  //console.log(location()) /* atributos start y end */
  let t = [];
  if (s1)
    t.push(s1);
    return {
       type: 'COMPOUND', // Chrome supports destructuring
       children: t.concat(r.map( ([_, st]) => st ))
     };
  }

  / IF e:assign THEN st:st ELSE sf:st {
      return {
        type: 'IFELSE',
        c:  e,
        st: st,
        sf: sf,
      };
  }

  / IF e:assign THEN st:st {
      return {
        type: 'IF',
        c:  e,
        st: st
      };
  }

  / WHILE a:assign DO st:st {
      return {
        type: 'WHILE',
        c: a,
        st: st
      };
  }

  / FOR LEFTPAR i:assign SC cn:cond SC inc:st RIGHTPAR s:st {
      return {
          type: 'FOR',
          index: i.left,
          cond: cn.type,
          increment: inc,
          children: s
      };
    }

  / RETURN a:assign? {
      return {
        type: 'RETURN',
        children: a? [a] : [] };
  }

  / assign
    assign
      = i:ID ASSIGN e:cond {
        return {
          type: '=',
          left: i,
          right: e
        };
      }

      / i:ID ASSIGN s:string {
           return {
             type: '=',
             left: i,
             right: s
           }
       }

  / cond

  cond
      = l:exp op:COMP r:exp {
        return {
          type: op,
          left: l,
          right: r
        }
    }

  / exp

  exp    =
      t:term
      r:(ADD term)*   {
        return tree(t,r);
      }

      term   =
        f:factor r:(MUL factor)* {
          return tree(f,r);
        }

  factor
    =  NUMBER

    / f:ID LEFTPAR a:assign? r:(COMMA assign)* RIGHTPAR {
           let t = [];
           if (a) t.push(a);
           return {
             type: 'CALL',
             func: f,
             arguments: t.concat(r.map(([_, exp]) => exp))
           }
         }

    / ID

    / LEFTPAR t:assign RIGHTPAR   { return t; }

    /* Asignaciones string del tipo a = "HOLA";  */
  string
  = COMILLAS value:STRING? COMILLAS {
    return {
      type: 'STRING',
      value: value
    }
  }

_ = $[ \t\n\r]*
ASSIGN   = _ op:'=' _  { return op; }
ADD      = _ op:[+-] _ { return op; }
MUL      = _ op:[*/] _ { return op; }
LEFTPAR  = _"("_
RIGHTPAR = _")"_
CL       = _"{"_
CR       = _"}"_
SC       = _";"_
COMMA    = _","_
COMILLAS   = _'"'_
COMP     = _ op:("=="/"!="/"<="/">="/"<"/">") _ {
               return op;
            }
IF       = _ "if" _
THEN     = _ "then" _
ELSE     = _ "else" _
FOR      = _ "for" _
WHILE    = _ "while" _
DO       = _ "do" _
SWITCH   = _ "switch" _
CASE     = _ "case" _
RETURN   = _ "return" _
VAR      = _ "var" _
CONST    = _ "const" _
FUNCTION = _ "function" _
STRING   = _ str:([ a-zA-Z_0-9!¿?{}&',;:<>/=`]*)_ { return str.join(""); }
COMMENT = _ id:$"\\" _
COMENTARIO = _ cm:$('\\'[ a-zA-Z_0-9!¿?{}&',;:<>/=`]*) _
            {
              cm = cm.replace('\\', "");
              return { type: 'COMENTARIO', value: cm };
            }

ID       = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _
            {
              return { type: 'ID', value: id };
            }

NUMBER   = _ digits:$[0-9]+ _
            {
              return { type: 'NUM', value: parseInt(digits, 10) };
            }
