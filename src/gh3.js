export const GREEN = "green"
export const RED = "red"
export const YELLOW = "yellow"
export const BLUE = "blue"
export const ORANGE = "orange"
export default class GuitarHero {
    constructor() {
        this.keys = {};
        this.highway = [];
        this.hitWindow = [];
    }
    handleFrets(event) {
        if (event.key) {
            this.keys[event.key] = true
            console.log(this.keys[event.key])
        } else {
            this.keys[event.key] = false
        }
    }
    createNote(note, length) {
        var notesTBA = []; // TBA means "To be added", as in to be added to the highway
        notesTBA.push(note);
        
    }
}













/*class Guitarhero {
    constructor() {
        this.chart = {
            loadFile: function(e) {
                var file = e.target.files[0];
                if (!file) {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function(e) {
                    Guitarhero.startSong(file);
                };
                reader.readAsText(file);
            }
        }
    }
    startSong(song) {
        var reader = new FileReader()
        reader.read
    }
}*/