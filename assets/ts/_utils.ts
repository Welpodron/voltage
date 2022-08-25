interface SingletonHandler extends ProxyHandler<any> {
  instance: null;
}

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
