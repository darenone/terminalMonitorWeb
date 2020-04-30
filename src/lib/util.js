if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;
  
    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
  
      var result = [];
  
      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }
  
      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
}
// 处理空数据
export function handleEmpty(val, mark) {
  if ( typeof val === "undefined" || val === null || val === '' && val !== 0 || val === "null" || val === "--") { 
    return '--'; 
  }
  if (mark) { 
    return val + mark;
  } else { 
    return val; 
  }
}
// 保留2位小数
export function toFixed2 (value) {
	if(!value && value !== 0 || value === 'null') return null;
	if (typeof value == 'number') {
    return handleNumber(value);
	} else if (typeof value == 'string' && isNumber(value)) {
    return handleNumber(value);
  } else {
      return value;
  }
  // 判读是否为字符串数字
  function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
  }
  function handleNumber(value) {
    var f = parseFloat(value);
    f = Math.round(value * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  }
}