/*import GuitarHero, {GREEN, RED, YELLOW, BLUE, ORANGE} from "./src/gh3.js";
import "./src/chart.js";
const gh = new GuitarHero()
*/

const selectedFile = document.getElementById("input").files[0];
function handleFiles() {
    console.log(selectedFile)
}
var i = document.getElementById("input");
i.addEventListener("change", handleFiles)


