define([],() => {

  const bottom = 0;
  const left = 1;
  const top = 2;
  const right = 3;

  const toAscii=(src: any[][], head = "")=>{
    const blank = " ";
    return src.reduce((acc_row, cur_row) => {
      let hoge = cur_row.map((x) => (x === "" ? blank : String(x))).join("");
      return `${acc_row}${head}${hoge}\r\n`;
    }, "");
  };

  const rotation =(src: any[][], rot = 1)=> {
    if (rot > 0) {
      return rotation( rightRotation(src), rot - 1);
    } else if (rot < 0) {
      return rotation( leftRotation(src), rot + 1);
    } else {
      return src;
    }
  };

  const rightRotation = (src: any[][]) => {
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

  const leftRotation = (src: any[][]) => {
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
    bottom, left, top, right,
    toAscii,
    rotation, rightRotation, leftRotation
  };

});

