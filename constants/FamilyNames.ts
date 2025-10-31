/*const latSlo: { [key: string ]: string} = {
    'Ducks, Geese, and Waterfowl': 'Race, gosi in ostale vodne ptice',
    'Cormorants and Shags': 'Kormorani in vranjeki',
    'Grebes': 'Ponirki',
    'Shearwaters and Petrels': 'Viharniki',
    'Boobies and Gannets': 'Strmoglavci',
    'Pelicans': 'Pelikani',
    'Skuas and Jaegers': 'Govnačke',
    'Gulls, Terns, and Skimmers': 'Galebi, čigre in škarjekljuni',
    'Sandpipers and Allies': 'Kljunači in drugi',
    'Flamingos': 'Plamenci',
    'Storks': 'Štorklje',
    'Cranes': 'Žerjavi',
    'Herons, Egrets, and Bitterns': 'Čaplje in drugi',
    'Rails, Gallinules, and Coots': 'Tukalice',
    'Pheasants, Grouse, and Allies': 'Kure',
    'Pigeons and Doves': 'Golobi in grlice',
    'Hawks, Eagles, and Kites': 'Orli',
    'Falcons and Caracaras': 'Sokoli',
    'Owls': 'Sove',
    'Nightjars and Allies': 'Podhujke',
    'Swifts': 'Hudourniki',
    'Swallows': 'Lastovke',
    'Cuckoos': 'Kukavice',
    'Cockatoos': 'Kakaduji',
    'Rollers': 'Zlatovranke',
    'Bee-eaters': 'Legati',
    'Kingfishers': 'Vodomci',
    'Hoopoes': 'Smrdokavre',
    'Woodpeckers': 'Žolne',
    'Crows, Jays, and Magpies': 'Vrane',
    'Old World Flycatchers': 'Muharji',
    'Shrikes': 'Srakoperji',
    'Thrushes and Allies': 'Drozgi',
    'Accentors': 'Pevke',
    'Dippers': 'Povodni kosi',
    'Waxwings': 'Pegami',
    'Bearded Reedling': 'Brkate sinice',
    'Penduline-Tits': 'Plašice',
    'Long-tailed Tits': 'Dolgorepke',
    'Tits, Chickadees, and Titmice': 'Sinice',
    'Nuthatches': 'Brglezi',
    'Treecreepers': 'Drevesni plezalčki',
    'Wallcreeper': 'Skalni plezalček',
    'Wrens': 'Stržki',
    'Grassbirds and Allies': 'Cvrčalci',
    'Cisticolas and Allies': 'Brškinke',
    'Bush Warblers and Allies': 'Svilnice',
    'Reed Warblers and Allies': 'Vrtniki in trstnice',
    'Sylviid Warblers and Allies': 'Penice',
    'Leaf Warblers': 'Listnice',
    'Kinglets': 'Kraljički',
    'Wagtails and Pipits': 'Pastirice in cipe',
    'Larks': 'Škrjanci',
    'Longspurs and Snow Buntings': 'Snežni strnadi',
    'Old World Buntings': 'Strnadi',
    'Old World Sparrows': 'Vrabci',
    'Finches, Euphonias, and Allies': 'Ščinkavci',
    'Old World Orioles': 'Kobilarji',
    'Starlings': 'Škorci'
}

export default latSlo;*/

// we now actually also need english names on key
const latSlo: { [key: number ]: {slo: string, eng: string}} = {
    1: {
        slo: 'Race, gosi in ostali', eng: 'Ducks, Geese, and Waterfowl'
    },
    2: {
        slo: 'Kormorani in vranjeki', eng: 'Cormorants and Shags'
    },
    3: {
        slo: 'Slapniki', eng: 'Loons'
    },
    4: {
        slo: 'Ponirki', eng: 'Greebes'
    },
    9: {
        slo: 'Viharniki', eng: 'Shearwaters and Petrels'
    },
    12: {
        slo: 'Strmoglavci', eng: 'Boobies and Gannets'
    },
    13: {
        slo: 'Pelikani', eng: 'Pelicans'
    },
    14: {
        slo: 'Govnačke', eng: 'Skuas and Jaegers'
    },
    15: {
        slo: 'Galebi, čigre in škarjekljuni', eng: 'Gulls, Terns, and Skimmers'
    },
    16: {
        slo: 'Kljunači in drugi', eng: 'Sandpipers and Allies'
    },
    17: {
        slo: 'Plamenci', eng: 'Flamingos'
    },
    20: {
        slo: 'Štorklje', eng: 'Storks'
    },
    21: {
        slo: 'Žerjavi', eng: 'Cranes'
    },
    22: {
        slo: 'Čaplje in drugi', eng: 'Herons, Egrets, and Bitterns'
    },
    25: {
        slo: 'Tukalice', eng: 'Rails, Gallinules, and Coots'
    },
    39: {
        slo: 'Kure', eng: 'Pheasants, Grouse, and Allies'
    },
    41: {
        slo: 'Golobi in grlice', eng: 'Pigeons and Doves'
    },
    42: {
        slo: 'Orli', eng: 'Hawks, Eagles, and Kites'
    },
    43: {
        slo: 'Sokoli', eng: 'Falcons and Caracaras'
    },
    44: {
        slo: 'Sove', eng: 'Owls'
    },
    48: {
        slo: 'Podhujke', eng: 'Nightjars and Allies'
    },
    50: {
        slo: 'Hudourniki', eng: 'Swifts'
    },
    52: {
        slo: 'Lastovke', eng: 'Swallows'
    },
    56: {
        slo: 'Kukavice', eng: 'Cuckoos'
    },
    58: {
        slo: 'Kakaduji', eng: 'Cockatoos'
    },
    61: {
        slo: 'Zlatovranke', eng: 'Rollers'
    },
    65: {
        slo: 'Legati (čebelarji)', eng: 'Bee-eaters'
    },
    66: {
        slo: 'Vodomci', eng: 'Kingfishers'
    },
    67: {
        slo: 'Smrdokavre', eng: 'Hoopoes'
    },
    73: {
        slo: 'Žolne', eng: 'Woodpeckers'
    },
    76: {
        slo: 'Vrane', eng: 'Crows, Jays, and Magpies'
    },
    100: {
        slo: 'Muharji', eng: 'Old World Flycatchers'
    },
    119: {
        slo: 'Srakoperji', eng: 'Shrikes'
    },
    121: {
        slo: 'Drozgi', eng: 'Thrushes and Allies'
    },
    122: {
        slo: 'Pevke', eng: 'Accentors'
    },
    123: {
        slo: 'Povodni kosi', eng: 'Dippers'
    },
    124: {
        slo: 'Pegami', eng: 'Waxwings'
    },
    154: {
        slo: 'Brkate sinice', eng: 'Bearded Reedling'
    },
    155: {
        slo: 'Plašice', eng: 'Penduline-Tits'
    },
    156: {
        slo: 'Dolgorepke', eng: 'Long-tailed Tits'
    },
    157: {
        slo: 'Sinice', eng: 'Tits, Chickadees, and Titmice'
    },
    159: {
        slo: 'Brglezi', eng: 'Nuthatches'
    },
    164: {
        slo: 'Drevesni plezalčki', eng: 'Treecreepers'
    },
    165: {
        slo: 'Skalni plezalček', eng: 'Wallcreeper'
    },
    167: {
        slo: 'Stržki', eng: 'Wrens'
    },
    174: {
        slo: 'Cvrčalci', eng: 'Grassbirds and Allies'
    },
    175: {
        slo: 'Brškinke', eng: 'Cisticolas and Allies'
    },
    176: {
        slo: 'Svilnice', eng: 'Bush Warblers and Allies'
    },
    178: {
        slo: 'Vrtniki in trstnice', eng: 'Reed Warblers and Allies'
    },
    179: {
        slo: 'Penice', eng: 'Sylviid Warblers and Allies'
    },
    180: {
        slo: 'Listnice', eng: 'Leaf Warblers'
    },
    183: {
        slo: 'Kraljički', eng: 'Kinglets'
    },
    195: {
        slo: 'Pastirice in cipe', eng: 'Wagtails and Pipits'
    },
    196: {
        slo: 'Škrjanci', eng: 'Larks'
    },
    197: {
        slo: 'Snežni strnadi', eng: 'Longspurs and Snow Buntings'
    },
    199: {
        slo: 'Strnadi', eng: 'Old World Buntings'},
    200: {
        slo: 'Vrabci', eng: 'Old World Sparrows'
    },
    205: {
        slo: 'Ščinkavci', eng: 'Finches, Euphonias, and Allies'
    },
    215: {
        slo: 'Kobilarji', eng: 'Old World Orioles'
    },
    216: {
        slo: 'Škorci', eng: 'Starlings'
    }
}

export default latSlo;