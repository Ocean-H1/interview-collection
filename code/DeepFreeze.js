function DeepFreeze(obj) {
  const propNames = Reflect.ownKeys(obj);

  Object.freeze(obj);

  // 递归冻结所有嵌套对象
  propNames.forEach(name => {
    const value = obj[name];

    if (value && typeof value === 'object') {
      DeepFreeze(value);
    }
  });
  return obj;
}