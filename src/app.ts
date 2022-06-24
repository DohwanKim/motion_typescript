import { Component } from './components/component.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';

type inputCompnentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};
class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      'newImage',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url),
    );
    this.bindElementToDialog<MediaSectionInput>(
      'newVideo',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url),
    );
    this.bindElementToDialog<TextSectionInput>(
      'newNote',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body),
    );
    this.bindElementToDialog<TextSectionInput>(
      'newTodo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body),
    );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: inputCompnentConstructor<T>,
    makeSection: (input: T) => Component,
  ) {
    const element = document.getElementById(selector)! as HTMLButtonElement;

    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputComponent();

      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const inputSection = makeSection(input);

        this.page.addChild(inputSection);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.getElementById('document')! as HTMLElement, document.body);
