/**
 * Object containing all of the options and tooltips
 * needed for rendering the PDF character sheet.
 */

class menuItem {
    constructor(name, tooltip) {
        this.name = name;
        if (tooltip) this.tooltip = tooltip;
    }
}

class Skill {
    constructor(name, tooltip) {
        this.name = name;
        this.tooltip = tooltip;
    }
}

class armorItem {
    constructor(name, tooltip) {
        this.name = name;
        this.tooltip = tooltip;
    }
}

class weaponItem {
    constructor(name, tooltip) {
        this.name = name;
        this.tooltip = tooltip;
    }
}

class gearItem {
    constructor(name) {
        this.name = name;
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
    // armor
    armorList: [
        new menuItem("light armor", "least protection, can be worn by anyone"),
        new menuItem("medium armor", "more protection, not available to Rogues or Wizards"),
        new menuItem("heavy armor", "most protection, only available to Clerics and Warriors"),
    ],
    // simple hand-to-hand weapons
    simpleMeleeWeaponList: [
        new menuItem("dagger"),
        new menuItem("hatchet"),
        new menuItem("shortsword"),
        new menuItem("staff"),
        new menuItem("spear"),
    ],
    // advanced hand-to-hand weapons
    advancedMeleeWeaponList: [
        new menuItem("longsword"),
        new menuItem("battleaxe"),
        new menuItem("warhammer"),
    ],
    // simple ranged weapons
    simpleRangeWeaponList: [
        new menuItem("slingshot"),
        new menuItem("light crossbow"),
        new menuItem("shortbow"),
    ],
    // advanced ranged weapons
    advancedRangeWeaponList: [
        new menuItem("heavy crossbow"),
        new menuItem("longbow"),
    ],
    // adventuring gear
    gearList: [
        new gearItem("ball bearings (bag of 1000)"),
        new gearItem("blanket"),
        new gearItem("chain (10 feet long)"),
        new gearItem("crowbar"),
        new gearItem("fishing rod"),
        new gearItem("glass jug and stopper (empty)"),
        new gearItem("grappling hook"),
        new gearItem("hammer & nails"),
        new gearItem("hunting trap (spring-loaded)"),
        new gearItem("lantern & oil"),
        new gearItem("magnifying glass"),
        new gearItem("mirror (polished steel)"),
        new gearItem("padlock & key"),
        new gearItem("parchment & ink"),
        new gearItem("pole (10 feet long)"),
        new gearItem("rope (50 feet long)"),
        new gearItem("shovel"),
        new gearItem("signal horn"),
        new gearItem("tinderbox"),
        new gearItem("torches (bundle of 10)"),
        new gearItem("whistle"),
    ]
    // skills: []
}