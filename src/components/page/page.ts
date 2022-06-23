import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseLisntener = () => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseLisntener): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseLisntener | undefined;
  constructor() {
    super(`
      <li class="page-item">
        <section class="page-item__body"></section>
        <div class="page-item__controls">
          <button type="button" class="close">&times;</button>
        </div>
      </li>
    `);

    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;

    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }
  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseLisntener) {
    this.closeListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemConstrutor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }
  addChild(section: Component) {
    const item = new this.pageItemConstrutor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
