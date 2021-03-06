'use strict';

define([],()=>{

  const direction ={
    bottom: 0,
    left : 1,
    top : 2,
    right : 3
  }
  
  const rotationAscii = (src, formRot = 0, toRot = 0, head = "") => {
    formRot = isNaN(formRot) ? direction[String(formRot).toLowerCase()] : formRot;
    toRot = isNaN(toRot) ? direction[String(toRot).toLowerCase()] : toRot;
    return toAscii(rotation(src, toRot - formRot), head);
  };
  
  const toAscii = (src, head = "") => {
    const blank = " ";
    return src.reduce((acc_row, cur_row) => {
      let hoge = cur_row.map((x) => (x === "" ? blank : String(x))).join("");
      return `${acc_row}${head}${hoge}\r\n`;
    }, "");
  };

  const rotation = (src, rot = 1) => {
    if (rot > 0) {
      return rotation( rightRotation(src), rot - 1);
    } else if (rot < 0) {
      return rotation( leftRotation(src), rot + 1);
    } else {
      return src;
    }
  };

  const rightRotation = (src) => {
    let srcRow = src.length;
    let srcCol = src[0].length;
    let dst = createArray(srcCol, srcRow, -1);
    src.forEach((i, row) => {
      i.forEach((j, col) => {
        dst[col][srcRow - 1 - row] = j;
      });
    });
    return dst;
  };

  const leftRotation = (src) => {
    let srcRow = src.length;
    let srcCol = src[0].length;
    let dst = createArray(srcCol, srcRow, -1);
    src.forEach((i, row) => {
      i.forEach((j, col) => {
        dst[srcCol - 1 - col][row] = j;
      });
    });
    return dst;
  };

  const createArray = (row, col, fill) =>
    Array(row)
      .fill(fill)
      .map((i) => Array(col).fill(fill));

  return {
    rotationAscii : rotationAscii, 
    toAscii : toAscii,
    rotation : rotation, 
    rightRotation : rightRotation, 
    leftRotation : leftRotation
  };
  
  
  //return (()=>{console.log("A")})
});

