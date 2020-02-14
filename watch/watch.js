const watch = function (page) {
  let { data, watch } = page;
  if (watch == undefined) {
    console.error('请在当前page页面添加watch属性！');
    return
  }

  if (Object.keys(watch).length === 0) return;

  Object
    .keys(watch)
    .forEach((item) => {
      let targetData = data;
      let keys = item.split('.');
      let targetKey = keys[keys.length - 1];
      for (let i = 0; i < keys.length - 1; i++) {
        targetData = targetData[keys[i]];
      }

      let watchFun = watch[item].handler || watch[item];
      let isDeep = watch[item].deep || false;

      observe(targetKey, targetData, watchFun, isDeep, page)
    })
}

const observe = function (targetKey, targetData, watchFun, deep, page) {
  let value;
  try {
    value = targetData[targetKey];
    if (value == undefined) {
      console.log('请在data属性添加', targetKey)
      return
    }
  } catch{
    console.log('请在data属性添加', targetKey)
    return;
  }

  if (value != null && typeof value === 'object' && deep) {
    Object.keys(value).forEach((item) => {
      observe(item, value, watchFun, deep, page);
    });
  }

  

  Object.defineProperty(targetData, targetKey, {
    configurable: true,
    enumerable: true,
    set: function (newValue) {
      watchFun.call(page, newValue, value);
      value = newValue;

      if (deep) {
        observe(targetKey, targetData, watchFun, deep, page);
      }
    },
    get: function () {
      return value;
    }
  })
}

module.exports = {
  init: watch
}