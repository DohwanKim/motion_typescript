import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { PageComponent } from './components/page/page.js';
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent('Image title', 'https://picsum.photos/600/300');
        this.page.addChild(image);
        const note = new NoteComponent('Note title', 'Note body');
        this.page.addChild(note);
        const todo = new TodoComponent('Todo title', 'Todo item');
        this.page.addChild(todo);
        const video = new VideoComponent('Video title', 'https://www.youtube.com/embed/WHUvtiKy_pg');
        this.page.addChild(video);
    }
}
new App(document.getElementById('document'));
