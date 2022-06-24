import { PageComponent, PageItemComponent } from './components/page/page.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { InputDialog } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElementToDialog('newImage', MediaSectionInput, (input) => new ImageComponent(input.title, input.url));
        this.bindElementToDialog('newVideo', MediaSectionInput, (input) => new VideoComponent(input.title, input.url));
        this.bindElementToDialog('newNote', TextSectionInput, (input) => new NoteComponent(input.title, input.body));
        this.bindElementToDialog('newTodo', TextSectionInput, (input) => new TodoComponent(input.title, input.body));
    }
    bindElementToDialog(selector, InputComponent, makeSection) {
        const element = document.getElementById(selector);
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
new App(document.getElementById('document'), document.body);
