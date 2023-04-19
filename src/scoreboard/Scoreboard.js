const Random = require("../utils/Random");

const CreteriaNames = require("./types/CreteriaNames");
const DisplaySlots = require("./types/DisplaySlots");
const EntryTypes = require("./types/EntryTypes");
const ScoreActions = require("./types/ScoreActions");

const ServerScoreboardObjectivePacket = require("../network/packets/ServerSetDisplayObjectivePacket");
const ServerSetScorePacket = require("../network/packets/ServerSetScorePacket");
const ServerRemoveObjectivePacket = require("../network/packets/ServerRemoveObjectivePacket");

const Frog = require("../Frog");

const { getKey } = require("../utils/Language");

/**
 * Represents a scoreboard that can be displayed to a player.
 */
class Scoreboard {
    constructor() {
        /** @type {string} - The display name of the scoreboard. */
        this.displayName = getKey("scoreboard.name.default");

        /** @type {DisplaySlots} - The display slot of the scoreboard. */
        this.displaySlot = DisplaySlots.SIDEBAR;

        /** @type {CreteriaNames} - The criteria name of the scoreboard. */
        this.criteriaName = CreteriaNames.DUMMY;

        /** 
         * @type {string} 
         * The name of the scoreboard objective. 
         * A random string is generated by default.
         */
        this.objectiveName = new Random().generateRandomString(5);

        /** @type {number} - The sort order of the scoreboard. */
        this.sortOrder = 1;

        /** @type {Client} - The player to whom the scoreboard will be displayed. */
        this.player;
    }

    /**
     * Sends the scoreboard to the player.
     * 
     * 
     */
    sendScoreboard() {
        let shouldCreateScoreboard = true
        
        Frog.eventEmitter.emit('scoreboardCreation', {
            server: require("../Server"),
            scoreboard: this,
            cancel() {
                shouldCreateScoreboard = false
            }
        })

        if (!shouldCreateScoreboard) return

        const scoreboard = new ServerScoreboardObjectivePacket();
        scoreboard.setCriteriaName(this.criteriaName);
        scoreboard.setDisplayName(this.displayName);
        scoreboard.setDisplaySlot(this.displaySlot);
        scoreboard.setObjectiveName(this.objectiveName);
        scoreboard.setSortOrder(this.sortOrder);
        scoreboard.writePacket(this.player);
    }

    /**
     * Sets a score on the scoreboard.
     *
     * @param {number} score - The score to set.
     * @param {string} text - The text to display alongside the score.
     * @param {ScoreActions} [action=ScoreActions.UPDATE] - The action to perform when setting the score.
     * @param {EntryTypes} [entry_type=EntryTypes.TEXT] - The type of the score entry.
     * @param {number} [entity_unique_id] - The unique ID of the entity associated with the score.
     * 
     * 
     */
    setScore(score, text, entry_type = EntryTypes.TEXT, entity_unique_id = undefined) {
        let shouldSetScore = true
        
        Frog.eventEmitter.emit('scoreboardSetScore', {
            server: require("../Server"),
            scoreboard: this,
            cancel() {
                shouldSetScore = false
            }
        })

        if (!shouldSetScore) return

        const setScorePacket = new ServerSetScorePacket()
        setScorePacket.setAction(ScoreActions.UPDATE)
        setScorePacket.setEntries([
            {
                scoreboard_id: 1n,
                objective_name: this.objectiveName,
                score: score,
                entry_type: entry_type,
                entity_unique_id: entity_unique_id,
                custom_name: text
            }
        ])
        setScorePacket.writePacket(this.player)
    }

    /**
     * Deletes a score on the scoreboard.
     *
     * @param {number} score - The score to set.
     * 
     */
    deleteScore(score) {
        let shouldDeleteScore = true
        
        Frog.eventEmitter.emit('scoreboardScoreDelete', {
            server: require("../Server"),
            scoreboard: this,
            cancel() {
                shouldDeleteScore = false
            }
        })

        if (!shouldDeleteScore) return

        const setScorePacket = new ServerSetScorePacket()
        setScorePacket.setAction(ScoreActions.REMOVE)
        setScorePacket.setEntries([
            {
                scoreboard_id: 1n,
                objective_name: this.objectiveName,
                score: score,
                entry_type: EntryTypes.TEXT,
                entity_unique_id: undefined,
                custom_name: ""
            }
        ])
        setScorePacket.writePacket(this.player)
    }

    /**
     * Deletes the scoreboard.
     * 
     * 
     */
    deleteScoreboard() {
        let shouldDelete = true
        
        Frog.eventEmitter.emit('scoreboardDelete', {
            server: require("../Server"),
            scoreboard: this,
            cancel() {
                shouldDelete = false
            }
        })

        if (!shouldDelete) return

        const removeScoreboard = new ServerRemoveObjectivePacket()
        removeScoreboard.setObjectiveName(this.objectiveName)
        removeScoreboard.writePacket(this.player)
    }
}

module.exports = Scoreboard