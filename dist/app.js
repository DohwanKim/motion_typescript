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
        this.page.addChild(new ImageComponent('01 - Image Title', 'https://picsum.photos/800/400'));
        this.page.addChild(new VideoComponent('02 - Video Title', 'https://www.youtube.com/watch?v=sIVQWeGK9s8'));
        this.page.addChild(new NoteComponent('03 - Note Title', '나는 메모한다. 메모 할거.'));
        this.page.addChild(new TodoComponent('04 - Todo Title', '나는 한다. 강력한 기능 구현.'));
        this.page.addChild(new ImageComponent('05 - Image Title', 'https://picsum.photos/800/400'));
        this.page.addChild(new VideoComponent('06 - Video Title', 'https://www.youtube.com/watch?v=gVZuRKFNKe4'));
        this.page.addChild(new NoteComponent('07 - Note Title', '나는 메모한다. 기억 할거.'));
        this.page.addChild(new TodoComponent('08 - Todo Title', '나는 한다. 파멸적인 기능 구현.'));
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
