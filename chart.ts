import { Type, Interface, TypeContainer, TypeInfo } from "@brandless/tsutility";
export class Chart {
    _song: Song;
    _chartObjects: Array<ChartObject>;
    _note_count: number = 0;
    _gameMode: GameMode;
    public name: string = ``;
    /// <summary>
    /// Read only list of notes.
    /// </summary>
    public notes: SongObjectCache;
    /// <summary>
    /// Read only list of starpower.
    /// </summary>
    public starPower: SongObjectCache;
    /// <summary>
    /// Read only list of drum rolls.
    /// </summary>
    public drumRoll: SongObjectCache;
    /// <summary>
    /// Read only list of local events.
    /// </summary>
    public events: SongObjectCache;
    /// <summary>
    /// The song this chart is connected to.
    /// </summary>
    public get song() : Song {
        return this._song;
    }
    /// <summary>
    /// The game mode the chart is designed for
    /// </summary>
    public get gameMode() : GameMode {
        return this._gameMode;
    }
    /// <summary>
    /// Read only list containing all chart notes, starpower, drumRoll and events.
    /// </summary>
    public chartObjects: ReadOnlyList;
    /// <summary>
    /// The total amount of notes in the chart, counting chord (notes sharing the same tick position) as a single note.
    /// </summary>
    public get note_count() : number {
        return this._note_count;
    }
    /// <summary>
    /// Creates a new chart object.
    /// </summary>
    /// <param name="song">The song to associate this chart with.</param>
    /// <param name="name">The name of the chart (easy single, expert double guitar, etc.</param>
    constructor(song: Song | null, gameMode: GameMode, name: string | null = ``) {
        this._song = song;
        this._chartObjects = new Array<ChartObject>();
        this.chartObjects = new ReadOnlyList(this._chartObjects);
        this._gameMode = gameMode;
        this.notes = new SongObjectCache();
        this.starPower = new SongObjectCache();
        this.drumRoll = new SongObjectCache();
        this.events = new SongObjectCache();
        this._note_count = 0;
        this.name = name;
    }
    /// <summary>
    /// Updates all read-only values and the total note count.
    /// </summary>
    public UpdateCache() : void {
        Song.UpdateCacheList(this.notes, this._chartObjects);
        Song.UpdateCacheList(this.starPower, this._chartObjects);
        Song.UpdateCacheList(this.drumRoll, this._chartObjects);
        Song.UpdateCacheList(this.events, this._chartObjects);
        this._note_count = this.GetNoteCount();
    }
    GetNoteCount() : number {
        if (this.notes.Count > 0) {
            let count: number = 1;
            let previousPos: number = this.notes[0].tick;
            for (
            let i: number = 1; i < this.notes.Count; ++i) {
                if (this.notes[i].tick > previousPos) {
                    ++count;
                    previousPos = this.notes[i].tick;
                }
            }
            return count;
        } else
        return 0;
    }
    public SetCapacity(size: number) : void {
        if (size > this._chartObjects.Capacity) this._chartObjects.Capacity = size;
    }
    public Clear() : void {
        this._chartObjects.splice(0, this._chartObjects.length);
    }
    /// <summary>
    /// Adds a series of chart objects (note, starpower, drumRoll and/or chart events) into the chart.
    /// </summary>
    /// <param name="chartObjects">Items to add.</param>
    public Add(chartObjects: Array<ChartObject> | null) : void {
        for (
        let chartObject_index_ = 0, chartObject_source_ = chartObjects; chartObject_index_ < chartObject_source_.length; chartObject_index_++) {
            let chartObject = chartObject_source_[chartObject_index_];
            this.Add(chartObject, false);
        }
        this.UpdateCache();
    }
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
    public Remove(chartObjects: Array<ChartObject> | null) : void {
        for (
        let chartObject_index_ = 0, chartObject_source_ = chartObjects; chartObject_index_ < chartObject_source_.length; chartObject_index_++) {
            let chartObject = chartObject_source_[chartObject_index_];
            this.Remove(chartObject, false);
        }
        this.UpdateCache();
    }
    /// <summary>
    /// Removes a chart object (note, starpower, drumRoll and/or chart event) from the chart.
    /// </summary>
    /// <param name="chartObject">Item to add.</param>
    /// <param name="update">Automatically update all read-only arrays?
    /// If set to false, you must manually call the updateArrays() method, but is useful when removing multiple objects as it increases performance dramatically.</param>
    /// <returns>Returns whether the removal was successful or not (item may not have been found if false).</returns>
}
export enum GameMode {
    Guitar,
    Drums,
    GHLGuitar,
    Unrecognised
}