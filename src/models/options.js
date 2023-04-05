/**
 * Object containing all of the options and tooltips
 * needed for rendering the PDF character sheet.
 */

class Skill {
    constructor(name, tooltip) {
        this.name = name;
        this.tooltip = tooltip;
    }
}

class heroItem {
    constructor(name, tooltip) {
        this.name = name;
        this.tooltip = tooltip;
    }
}

export const options = {
    // the six ability labels and their tooltips
    abilityLabels: ['str', 'dex', 'con', 'int', 'wis', 'cha'],
    abilityTooltips: [
        "STRENGTH: bodily power, physical force, gross motor skills",
        "DEXTERITY: agility, reflexes, fine motor skills",
        "CONSTITUTION: health, vitality, stamina, endurance",
        "INTELLIGENCE: mental acuity, accuracy of recall, reasoning",
        "WISDOM: intuition, attunement, situational awareness",
        "CHARISMA: confidence, charm, eloquence, personality",
    ],
    // character classes and their tooltips
    classList: [
        new heroItem("cleric", "front-line fighter who also channels healing magic"),
        new heroItem("druid", "magic-user who embodies the primal power of nature"),
        new heroItem("ranger", "long-range fighter with superior wildnerness skills"),
        new heroItem("rogue", "shadowy figure with a talent for sneaking and subterfuge"),
        new heroItem("warrior", "front-line fighter who can inspire their allies"),
        new heroItem("wizard", "magic-user with a broad variety of arcane skills"),
    ],
    // skills and their tooltips
    skillList: [
        new Skill("acrobatics", "balancing, tumbling"),
        new Skill("athletics", "climbing, jumping, swimming"),
        new Skill("brawn", "lifting, pushing, breaking"),
        new Skill("deception", "misleading, conning, lying"),
        new Skill("insight", "reading someone's intentions"),
        new Skill("intimidation", "threatening, convincing"),
        new Skill("investigation", "searching, making deductions"),
        new Skill("medicine", "diagnosing, applying first aid"),
        new Skill("nature & survival", "tracking, hunting, navigating"),
        new Skill("perception", "detecting, noticing, sensing"),
        new Skill("performance", "entertaining, mimicking"),
        new Skill("persuasion", "influencing, negotiating"),
        new Skill("recollection", "remembering facts about the world"),
        new Skill("sleight of hand", "picking pockets, or locks"),
        new Skill("stealth", "sneaking, hiding"),
    ],
    // skills: []
}