//三位加逗号
function toThousands(number) {
    var arr = String(number).split('.');
    var num = arr[0], result = '', counter = 0;
    for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i != 0) result = ',' + result;
    }
    return arr[1] ? result + '.' + arr[1] : result;
  }
  function toCurrencyString (num){
    return num.toFixed(2).replace(/\d(?=(?:\d{3})+\b)/g,'$&,'); // 这里看你是不是要小数
  }