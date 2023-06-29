/**
 * Object containing all of the options and tooltips
 * needed for rendering the PDF character sheet.
 */

class menuItem {
    constructor(name, tooltip, fieldName) {
        this.name = name;
        this.fieldName = name;

        if (tooltip) this.tooltip = tooltip;
        if (fieldName) this.fieldName = fieldName;
    }
}

class Skill {
    constructor(name, tooltip, ability, fieldName) {
        this.name = name;
        this.fieldName = name;
        this.ability = ability;

        if (tooltip) this.tooltip = tooltip;
        if (fieldName) this.fieldName = fieldName;
    }
}

class armorItem {
    constructor(name, tooltip) {
        this.name = name;
        this.tooltip = tooltip;
    }
}

// hmm...
class Weapon {
    constructor(name, description, isSimple, attackAbility, damageDice, properties = []) {
        this.name = name;
        this.description = description;
        this.isSimple = isSimple;
        this.attackAbility = attackAbility;
        this.damageDice = damageDice;
        this.properties = properties;
    }
}

class gearItem {
    constructor(name) {
        this.name = name;
    }
}

class heroItem {
    constructor(name, tooltip, savingThrows) {
        this.name = name;
        this.tooltip = tooltip;
        this.savingThrows = savingThrows;
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
        new heroItem("cleric", "front-line fighter who also channels healing magic", ["str", "cha"]),
        new heroItem("druid", "magic-user who embodies the primal power of nature", ["dex", "wis"]),
        new heroItem("ranger", "long-range fighter with superior wildnerness skills", ["dex", "con"]),
        new heroItem("rogue", "shadowy figure with a talent for sneaking and subterfuge", ["dex", "cha"]),
        new heroItem("warrior", "front-line fighter who can inspire their allies", ["str", "con"]),
        new heroItem("wizard", "magic-user with a broad variety of arcane skills", ["int", "wis"]),
    ],
    // skills and their tooltips
    skillList: [
        new Skill("acrobatics", "balancing, tumbling", "dex"),
        new Skill("athletics", "climbing, jumping, swimming", "str"),
        new Skill("brawn", "lifting, pushing, breaking", "str"),
        new Skill("deception", "misleading, conning, lying", "cha"),
        new Skill("insight", "reading someone's intentions", "wis"),
        new Skill("intimidation", "threatening, convincing", "str"),
        new Skill("investigation", "searching, making deductions", "int"),
        new Skill("medicine", "diagnosing, applying first aid", "int"),
        new Skill("nature & survival", "tracking, hunting, navigating", "wis", "natureSurvival"),
        new Skill("perception", "detecting, noticing, sensing", "wis"),
        new Skill("performance", "entertaining, mimicking", "cha"),
        new Skill("persuasion", "influencing, negotiating", "cha"),
        new Skill("recollection", "remembering facts about the world", "int"),
        new Skill("sleight of hand", "picking pockets, or locks", "dex", "sleightOfHand"),
        new Skill("stealth", "sneaking, hiding", "dex"),
    ],


    // armor
    armorList: [
        new menuItem("light armor", "least protection, can be worn by anyone"),
        new menuItem("medium armor", "more protection, not available to Rogues or Wizards"),
        new menuItem("heavy armor", "most protection, only available to Clerics and Warriors"),
    ],

    // weapons
    weaponList: [
        // simple melee weapons
        new Weapon("dagger", "", true, "str", "1d6"),
        new Weapon("shortsword", "", true, "str", "1d6"),
        new Weapon("staff", "", true, "str", "1d6"),
        // advanced melee weapons
        new Weapon("battleaxe", "", false, "str", "1d8"),
        new Weapon("longsword", "", false, "str", "1d8"),
        new Weapon("warhammer", "", false, "str", "1d8"),
        // simple ranged weapons
        new Weapon("light crossbow", "", true, "dex", "1d6"),
        new Weapon("shortbow", "", true, "dex", "1d6"),
        new Weapon("slingshot", "", true, "dex", "1d6"),
        // advanced ranged weapons
        new Weapon("heavy crossbow", "", false, "dex", "1d8"),
        new Weapon("longbow", "", false, "dex", "1d8"),
    ],

    // simple hand-to-hand weapons
    // simpleMeleeWeaponList: [
    //     new Weapon("dagger", "", true, "str", "1d6"),
    //     new Weapon("hatchet", "", true, "str", "1d6"),
    //     new Weapon("shortsword", "", true, "str", "1d6"),
    //     new Weapon("staff", "", true, "str", "1d6"),
    //     new Weapon("spear", "", true, "str", "1d6"),
    // ],
    // // advanced hand-to-hand weapons
    // advancedMeleeWeaponList: [
    //     new Weapon("longsword", "", false, "str", "1d8"),
    //     new Weapon("battleaxe", "", false, "str", "1d8"),
    //     new Weapon("warhammer", "", false, "str", "1d8"),
    // ],
    // // simple ranged weapons
    // simpleRangeWeaponList: [
    //     new Weapon("slingshot", "", true, "dex", "1d6"),
    //     new Weapon("light crossbow", "", true, "dex", "1d6"),
    //     new Weapon("shortbow", "", true, "dex", "1d6"),
    // ],
    // // advanced ranged weapons
    // advancedRangeWeaponList: [
    //     new Weapon("heavy crossbow", "", false, "dex", "1d8"),
    //     new Weapon("longbow", "", false, "dex", "1d8"),
    // ],



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