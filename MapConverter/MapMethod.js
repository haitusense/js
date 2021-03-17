define(() => {

  const MapMethod = {
    bottom: 0,
    left: 1,
    top: 2,
    right: 3,

    toAscii(src: any[][], head = "") {
      const blank = " ";
      return src.reduce((acc_row, cur_row) => {
        let hoge = cur_row.map((x) => (x === "" ? blank : String(x))).join("");
        return `${acc_row}${head}${hoge}\r\n`;
      }, "");
    },

    rotation(src: any[][], rot = 1) {
      if (rot > 0) {
        return MapMethod.rotation(MapMethod.rightRotation(src), rot - 1);
      } else if (rot < 0) {
        return MapMethod.rotation(MapMethod.leftRotation(src), rot + 1);
      } else {
        return src;
      }
    },
    /*
      Array(Math.abs(rot)).fill(0).forEach(i => {
        if (rot > 0) {
          ary = A.rightRotation(ary);
        } else {
          ary = A.leftRotation(ary);
        }
    */

    rightRotation: (src: any[][]) => {
      let srcRow = src.length;
      let srcCol = src[0].length;
      let dst = MapMethod.createArray(srcCol, srcRow, -1);
      src.forEach((i, row) => {
        i.forEach((j, col) => {
          dst[col][srcRow - 1 - row] = j;
        });
      });
      return dst;
    },

    leftRotation: (src: any[][]) => {
      let srcRow = src.length;
      let srcCol = src[0].length;
      let dst = MapMethod.createArray(srcCol, srcRow, -1);
      src.forEach((i, row) => {
        i.forEach((j, col) => {
          dst[srcCol - 1 - col][row] = j;
        });
      });
      return dst;
    },

    createArray: (row, col, fill) => Array(row).fill(fill).map((i) => Array(col).fill(fill))

  };

  return MapMethod;
});

