import * as XLSX from 'xlsx';

function s2ab(s) {
  // 字符串转字符流
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
  let s = '';

  let m = 0;
  while (n > 0) {
    m = (n % 26) + 1;
    s = String.fromCharCode(m + 64) + s;
    n = (n - m) / 26;
  }
  return s;
}
function downloadExl(json, type, name) {

  let tmpdata = json[0];
  json.unshift({});
  const keyMap = []; // 获取keys
  for (const k in tmpdata) {
    keyMap.push(k);
    json[0][k] = k;
  }
  tmpdata = []; // 用来保存转换好的json
  json
    .map((v, i) =>
      keyMap.map((k, j) =>
        Object.assign(
          {},
          {
            v: v[k],
            position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1),
          }
        )
      )
    )
    .reduce((prev, next) => prev.concat(next))
    .forEach(
      (v, i) =>
        (tmpdata[v.position] = {
          v: v.v,
        })
    );
  const outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
  const tmpWB = {
    SheetNames: ['mySheet'], // 保存的表标题
    Sheets: {
      mySheet: Object.assign(
        {},
        tmpdata, // 内容
        {
          '!ref': `${outputPos[0]}:${outputPos[outputPos.length - 1]}`, // 设置填充区域
        }
      ),
    },
  };
  const tmpDown = new Blob(
    [
      s2ab(
        XLSX.write(
          tmpWB,
          { bookType: type === undefined ? 'xlsx' : type, bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
        )
      ),
    ],
    {
      type: '',
    }
  ); // 创建二进制对象写入转换好的字节流

  const href = URL.createObjectURL(tmpDown); // 创建对象超链接
  document.getElementById('hf').download = `${name}.xlsx`;
  document.getElementById('hf').href = href; // 绑定a标签
  document.getElementById('hf').click(); // 模拟点击实现下载
  setTimeout(() => {
    // 延时释放
    URL.revokeObjectURL(tmpDown); // 用URL.revokeObjectURL()来释放这个object URL
  }, 100);
}

export { downloadExl, s2ab };
