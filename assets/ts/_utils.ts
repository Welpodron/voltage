interface SingletonHandler extends ProxyHandler<any> {
  instance: null;
}

// Warning! be aware of THIS

export const singleton = (className) => {
  return new Proxy(className.prototype.constructor, {
    instance: null,
    // Use function because of `this` crap
    construct: function (target, argumentsList) {
      if (!this.instance) this.instance = new target(...argumentsList);
      return this.instance;
    },
  } as SingletonHandler);
};

export const throttle = (func: Function, delayMs: number) => {
  let isThrotting, savedArgs;

  const wrapper = (...args) => {
    if (isThrotting) {
      savedArgs = args;
      return;
    }

    isThrotting = true;

    func.apply(this, args);

    setTimeout(() => {
      isThrotting = false;
      if (savedArgs) {
        wrapper.apply(this, args);
        savedArgs = null;
      }
    }, delayMs);
  };

  return wrapper;
};
