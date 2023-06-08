/*var Song = {
    Chart: class Chart {
        constructor() {
            var Song;
            var note_count;
            var name = "";
            var SongObjectCache = {};
            SongObjectCache = function(Notes) {
                return Notes
            }
        }
        openFile(contentType, multiple) {
            var file = this.files[0];
            var reader = new FileReader();
            
            reader.onload = function(progressEvent) {
                var t = "Hi"
                var lines = this.result.split(/\r\n|\n/);
                //console.log(lines)
                for (var i in lines) {
                    var expertSingle = '[ExpertSingle]'
                    var newChart = lines[i].match(expertSingle);
                    //var g = newChart.split(/\r\n|\n/);
                    console.log(newChart);
                }
            };
            reader.readAsText(file);
        }
    }
}*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMode = exports.Chart = void 0;
var Chart = /** @class */ (function () {
    /// <summary>
    /// Creates a new chart object.
    /// </summary>
    /// <param name="song">The song to associate this chart with.</param>
    /// <param name="name">The name of the chart (easy single, expert double guitar, etc.</param>
    function Chart(song, gameMode, name) {
        if (name === void 0) { name = ""; }
        this._note_count = 0;
        this.name = "";
        this._song = song;
        this._chartObjects = new Array();
        this.chartObjects = new ReadOnlyList(this._chartObjects);
        this._gameMode = gameMode;
        this.notes = new SongObjectCache();
        this.starPower = new SongObjectCache();
        this.drumRoll = new SongObjectCache();
        this.events = new SongObjectCache();
        this._note_count = 0;
        this.name = name;
    }
    Object.defineProperty(Chart.prototype, "song", {
        /// <summary>
        /// The song this chart is connected to.
        /// </summary>
        get: function () {
            return this._song;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "gameMode", {
        /// <summary>
        /// The game mode the chart is designed for
        /// </summary>
        get: function () {
            return this._gameMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chart.prototype, "note_count", {
        /// <summary>
        /// The total amount of notes in the chart, counting chord (notes sharing the same tick position) as a single note.
        /// </summary>
        get: function () {
            return this._note_count;
        },
        enumerable: false,
        configurable: true
    });
    /// <summary>
    /// Updates all read-only values and the total note count.
    /// </summary>
    Chart.prototype.UpdateCache = function () {
        Song.UpdateCacheList(this.notes, this._chartObjects);
        Song.UpdateCacheList(this.starPower, this._chartObjects);
        Song.UpdateCacheList(this.drumRoll, this._chartObjects);
        Song.UpdateCacheList(this.events, this._chartObjects);
        this._note_count = this.GetNoteCount();
    };
    Chart.prototype.GetNoteCount = function () {
        if (this.notes.Count > 0) {
            var count = 1;
            var previousPos = this.notes[0].tick;
            for (var i = 1; i < this.notes.Count; ++i) {
                if (this.notes[i].tick > previousPos) {
                    ++count;
                    previousPos = this.notes[i].tick;
                }
            }
            return count;
        }
        else
            return 0;
    };
    Chart.prototype.SetCapacity = function (size) {
        if (size > this._chartObjects.Capacity)
            this._chartObjects.Capacity = size;
    };
    Chart.prototype.Clear = function () {
        this._chartObjects.splice(0, this._chartObjects.length);
    };
    /// <summary>
    /// Adds a series of chart objects (note, starpower, drumRoll and/or chart events) into the chart.
    /// </summary>
    /// <param name="chartObjects">Items to add.</param>
    Chart.prototype.Add = function (chartObjects) {
        for (var chartObject_index_ = 0, chartObject_source_ = chartObjects; chartObject_index_ < chartObject_source_.length; chartObject_index_++) {
            var chartObject = chartObject_source_[chartObject_index_];
            this.Add(chartObject, false);
        }
        this.UpdateCache();
    };
    /// <summary>
    /// Adds a chart object (note, starpower, drumRoll and/or chart event) into the chart.
    /// </summary>
    /// <param name="chartObject">The item to add</param>
    /// <param name="update">Automatically update all read-only arrays?
    /// If set to false, you must manually call the updateArrays() method, but is useful when adding multiple objects as it increases performance dramatically.</param>
    /// <summary>
    /// Removes a series of chart objects (note, starpower, drumRoll and/or chart events) from the chart.
    /// </summary>
    /// <param name="chartObjects">Items to add.</param>
    Chart.prototype.Remove = function (chartObjects) {
        for (var chartObject_index_ = 0, chartObject_source_ = chartObjects; chartObject_index_ < chartObject_source_.length; chartObject_index_++) {
            var chartObject = chartObject_source_[chartObject_index_];
            this.Remove(chartObject, false);
        }
        this.UpdateCache();
    };
    return Chart;
}());
exports.Chart = Chart;
var GameMode;
(function (GameMode) {
    GameMode[GameMode["Guitar"] = 0] = "Guitar";
    GameMode[GameMode["Drums"] = 1] = "Drums";
    GameMode[GameMode["GHLGuitar"] = 2] = "GHLGuitar";
    GameMode[GameMode["Unrecognised"] = 3] = "Unrecognised";
})(GameMode = exports.GameMode || (exports.GameMode = {}));
