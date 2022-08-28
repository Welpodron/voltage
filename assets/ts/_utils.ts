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
  let isThrottling, savedArgs;

  const wrapper = (...args) => {
    if (isThrottling) {
      savedArgs = args;
      return;
    }

    isThrottling = true;

    func.apply(this, args);

    setTimeout(() => {
      isThrottling = false;
      if (savedArgs) {
        wrapper.apply(this, args);
        savedArgs = null;
      }
    }, delayMs);
  };

  return wrapper;
};

interface IDeferredPromise<T> extends Promise<T> {
  resolve: (value: T) => void;
  reject: (reason?: any) => void;
}

export const deferredPromise = () => {
  let resolver, rejecter;
  const promise = <IDeferredPromise<unknown>>(
    new Promise<unknown>((resolve, reject) => {
      resolver = resolve;
      rejecter = reject;
    })
  );
  promise.resolve = resolver;
  promise.reject = rejecter;
  return promise;
};

interface IAnimationState {
  completed: boolean;
  props: Record<string, number>;
}

interface IAnimationConfig {
  duration: number;
  from: Record<string, number>;
  to: Record<string, number>;
  easing?: (x: number) => number;
  before?: (state: IAnimationState) => any;
  after?: (state: IAnimationState) => any;
  step?: (state: IAnimationState) => any;
}

export class Animation {
  finished: IDeferredPromise<unknown>;
  config: IAnimationConfig;
  state: IAnimationState = { completed: false, props: {} };
  animationFrame?: number;
  prefersReducedMotion: boolean = false;
  startTime: number = 0;

  constructor(config: IAnimationConfig) {
    this.config = config;

    this.finished = deferredPromise();

    Object.keys(this.config.from).forEach((key) => {
      if (this.config.to.hasOwnProperty(key)) {
        this.state.props[key] = this.config.from[key];
      }
    });
  }

  loop = (timeStamp: number) => {
    if (!this.startTime) this.startTime = timeStamp;

    const easing =
      this.config.easing ??
      ((x: number) =>
        x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    const progressMs = timeStamp - this.startTime;
    let progress = Math.min(easing(progressMs / this.config.duration), 1);

    if (this.prefersReducedMotion) {
      progress = 1;
    }

    this.step(progress);

    if (progress < 1) {
      this.animationFrame = requestAnimationFrame(this.loop);
    } else {
      return this.stop();
    }
  };

  step = (progress: number) => {
    Object.keys(this.state.props).forEach((key) => {
      this.state.props[key] =
        this.config.from[key] +
        (this.config.to[key] - this.config.from[key]) * progress;
    });

    if (this.config.step) {
      this.config.step(this.state);
    }
  };

  start = () => {
    if (this.config.before) {
      this.config.before(this.state);
    }

    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.animationFrame = requestAnimationFrame(this.loop);
  };

  stop = (cancel = false) => {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.state.completed = true;
    this.finished.resolve(this.state);

    if (!cancel) {
      if (this.config.after) {
        this.config.after(this.state);
      }
    }
  };

  end = (progress = 1) => {
    // TODO: Fix dry
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    const simulatedState: IAnimationState = {
      completed: true,
      props: {},
    };

    Object.keys(this.state.props).forEach((key) => {
      simulatedState.props[key] =
        this.config.from[key] +
        (this.config.to[key] - this.config.from[key]) * progress;
    });

    this.state = simulatedState;

    if (this.config.step) {
      this.config.step(simulatedState);
    }

    this.finished.resolve(simulatedState);

    if (this.config.after) {
      this.config.after(simulatedState);
    }
  };

  cancel = () => {
    this.stop(true);
  };
}
