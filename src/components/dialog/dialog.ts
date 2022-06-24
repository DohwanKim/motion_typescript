import { Composable } from './../page/page.js';
import { BaseComponent, Component } from '../component.js';

type OnCloseLisntener = () => void;
type OnSubmitLisntener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly body: string;
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  closeListener?: OnCloseLisntener;
  submitListener?: OnSubmitLisntener;

  constructor() {
    super(`
      <section class="dialog">
        <div class="dialog__container">
          <button class="close">&times;</button>
          <div id="dialogBody"></div>
          <button type="button" class="dialog__submit">ADD</button>
        </div>
      </section>
    `);

    const closeBtn = this.element.querySelector('.close')! as HTMLElement;
    const submitBtn = this.element.querySelector('.dialog__submit')! as HTMLElement;

    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }
  setOnCloseListener(listener: OnCloseLisntener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitLisntener) {
    this.submitListener = listener;
  }
  addChild(child: Component): void {
    const body = this.element.querySelector('#dialogBody')! as HTMLElement;
    child.attachTo(body);
  }
}
