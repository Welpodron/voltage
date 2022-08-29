export interface ITableOfContentsConfig {
  listClass?: string;
  itemClass?: string;
  linkClass?: string;
}

export class TableOfContents {
  element: HTMLElement | Element;
  tree: Array<Object>;
  observer: IntersectionObserver;
  links: Array<{ element: HTMLElement | Element; for: string | number }> = [];
  listClass?: string;
  itemClass?: string;
  linkClass?: string;

  constructor(
    element: HTMLElement | Element,
    config: ITableOfContentsConfig = {}
  ) {
    this.element = element;

    this.listClass = config.listClass;
    this.itemClass = config.itemClass;
    this.linkClass = config.linkClass;

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.links.forEach((link) => {
              if (link.for == entry.target.id) {
                link.element.setAttribute("aria-current", "true");
              } else {
                link.element.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      { rootMargin: "0px 0px -40% 0px" }
    );

    this.buildTree(this.parseTree(), <HTMLElement>this.element);
  }

  parseTree = () => {
    // Спасибо tscanlin / tocbot https://github.com/tscanlin/tocbot
    return (this.tree = [...document.querySelectorAll("h2,h3,h4,h5,h6")].reduce(
      (accumulator, currentEl) => {
        // Данная ветка может измениться позже см ниже
        // В данном случае parentBranchReference не является копией аккумулятора, а ссылкой на него
        // В связи с чем мы можем передавать туда значения
        let parentBranchReference = accumulator;

        // Для тестирования использовать: h2 h3 h3 h3 h4 h4 h6 h6 h2 h5

        const currentLeafLevel = +currentEl.tagName.replace("H", "");

        const currentLeaf = {
          id: currentEl.id,
          text: currentEl.textContent?.trim(),
          level: currentLeafLevel,
          element: currentEl,
          children: [],
        };

        let lastLeaf = parentBranchReference[parentBranchReference.length - 1];

        const lastLeafLevel = lastLeaf?.level ?? 0;

        let distance = currentLeafLevel - lastLeafLevel;

        while (distance > 0) {
          lastLeaf = parentBranchReference[parentBranchReference.length - 1];

          if (currentLeafLevel === lastLeaf?.level) {
            // Несколько подряд идущих листьев одного уровня: например h3 h3 h3 h3
            break;
          } else if (lastLeaf?.children) {
            // Меняется текущая ветка на ветку потомка
            // Меняется ссылка
            // По сути пуш теперь будет не в аккумулятор
            parentBranchReference = lastLeaf.children;
          }

          distance--;
        }

        parentBranchReference.push(currentLeaf);

        return [...accumulator];
      },
      <Array<any>>[]
    ));
  };

  buildBranch = (branch: any, container: HTMLElement) => {
    this.observer.observe(branch.element);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = branch.text;
    a.href = `#${branch.id}`;
    a.setAttribute("data-table-of-contests-link", "");
    if (this.linkClass) {
      a.classList.add(this.linkClass);
    }
    this.links.push({ element: a, for: branch.id });
    li.setAttribute("data-table-of-contests-item", "");
    if (this.itemClass) {
      li.classList.add(this.itemClass);
    }
    li.appendChild(a);
    container.appendChild(li);

    if (branch.children.length) {
      const ul = document.createElement("ul");
      ul.setAttribute("data-table-of-contests-list", "");
      if (this.listClass) {
        ul.classList.add(this.listClass);
      }
      branch.children.forEach((branch) => {
        this.buildBranch(branch, ul);
      });
      li.appendChild(ul);
    }
  };

  buildTree = (tree: Array<any>, container: HTMLElement) => {
    if (tree.length) {
      const ul = document.createElement("ul");
      ul.setAttribute("data-table-of-contests-list", "");
      if (this.listClass) {
        ul.classList.add(this.listClass);
      }
      tree.forEach((branch) => {
        this.buildBranch(branch, ul);
      });
      container.appendChild(ul);
    }
  };
}
