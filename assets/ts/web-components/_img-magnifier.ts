export class ImgMagnifier extends HTMLElement {
  containerEl: HTMLDivElement;

  imgEl: HTMLImageElement;
  imgSize: { width: number; height: number } = { width: 0, height: 0 };

  lenseEl: HTMLDivElement;
  lenseZoom: number;
  lenseSize: number;
  // lenseBorderSize: number;

  static get observedAttributes() {
    return ["data-img", "data-lense-zoom", "data-lense-size"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    this.containerEl = document.createElement("div");
    this.containerEl.setAttribute("data-magnifier", "");

    this.containerEl.style.position = "relative";

    this.lenseEl = document.createElement("div");
    this.lenseEl.setAttribute("data-magnifier-lense", "");

    this.lenseZoom =
      parseInt(<string>this.getAttribute("data-lense-zoom")) || 2;
    this.lenseSize =
      parseInt(<string>this.getAttribute("data-lense-size")) || 200;
    // TODO: lenseBorderSize
    // this.lenseBorderSize = parseInt(getComputedStyle(this.lenseEl).borderWidth);

    this.imgEl = document.createElement("img");
    this.imgEl.setAttribute("data-magnifier-img", "");
    this.imgEl.src = <string>this.getAttribute("data-img");
    // this.imgEl.src = "lel.png";
    this.imgEl.addEventListener("load", this.handleImgLoad, { once: true });

    this.containerEl.appendChild(this.imgEl);
    this.containerEl.appendChild(this.lenseEl);

    shadow.appendChild(this.containerEl);
  }

  attributeChangedCallback(
    attrName: string,
    oldValue: null | string,
    newValue: null | string
  ) {
    switch (attrName) {
      case "data-img":
        if (!oldValue || !newValue || oldValue === newValue) return;
        this.imgEl.src = <string>newValue;
        this.imgEl.addEventListener("load", this.handleImgLoad, { once: true });
        break;
      case "data-lense-zoom":
        this.lenseZoom = parseInt(<string>newValue);
        // TODO: Maybe move some styles to another function to do less changes ?
        this.initLenseStyles();
        break;
      case "data-lense-size":
        this.lenseSize = parseInt(<string>newValue);
        this.initLenseStyles();
        break;
      default:
        break;
    }
  }

  initLenseStyles = () => {
    this.lenseEl.style.top = "0";
    this.lenseEl.style.left = "0";
    this.lenseEl.style.display = "none";
    this.lenseEl.style.position = "absolute";
    this.lenseEl.style.pointerEvents = "none";
    this.lenseEl.style.backgroundRepeat = "no-repeat";
    this.lenseEl.style.width = `${this.lenseSize}px`;
    this.lenseEl.style.height = `${this.lenseSize}px`;
    this.lenseEl.style.backgroundImage = `url(${this.imgEl.src})`;
    this.lenseEl.style.backgroundSize = `${
      this.imgSize.width * this.lenseZoom
    }px ${this.imgSize.height * this.lenseZoom}px`;
  };

  init = () => {
    this.initLenseStyles();
    // TODO: Maybe do not manipulate image events?
    this.destroyEventListeners();
    this.initEventListeners();
  };

  initEventListeners = () => {
    this.imgEl.addEventListener("mouseover", this.handleImgMouseOver);
    this.imgEl.addEventListener("mouseleave", this.handleImgMouseLeave);
    this.imgEl.addEventListener("mousemove", this.handleImgMouseMove);
    this.imgEl.addEventListener("click", this.handleImgClick);
    this.imgEl.addEventListener("touchstart", this.handleImgTouchStart);
  };

  destroyEventListeners = () => {
    this.imgEl.removeEventListener("mouseover", this.handleImgMouseOver);
    this.imgEl.removeEventListener("mouseleave", this.handleImgMouseLeave);
    this.imgEl.removeEventListener("mousemove", this.handleImgMouseMove);
    this.imgEl.removeEventListener("click", this.handleImgClick);
    this.imgEl.removeEventListener("touchstart", this.handleImgTouchStart);
  };

  handleImgLoad = (evt: Event) => {
    const { width: imgWidth, height: imgHeight } =
      this.imgEl.getBoundingClientRect();

    this.imgSize.width = imgWidth;
    this.imgSize.height = imgHeight;

    this.init();
  };

  handleImgClick = (evt: MouseEvent) => {
    evt.preventDefault();
  };

  handleImgTouchStart = (evt: TouchEvent) => {
    evt.preventDefault();
  };

  handleImgMouseOver = (evt: MouseEvent) => {
    const { offsetX, offsetY } = evt;

    this.lenseEl.style.display = "block";

    this.changeLensePosition(offsetX, offsetY);
  };

  handleImgMouseLeave = (evt: MouseEvent) => {
    this.lenseEl.style.display = "none";
  };

  handleImgMouseMove = (evt: MouseEvent) => {
    const { offsetX, offsetY } = evt;

    this.changeLensePosition(offsetX, offsetY);
  };

  changeLensePosition = (x: number, y: number) => {
    this.lenseEl.style.transform = `translate(${x + 5}px, ${y + 5}px)`;

    this.lenseEl.style.backgroundPosition = `-${
      x * this.lenseZoom - this.lenseSize / 2 /*+this.lenseBorderSize*/
    }px -${
      y * this.lenseZoom - this.lenseSize / 2 /*+this.lenseBorderSize*/
    }px`;
  };
}
