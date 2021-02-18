type Talk = {
    title: string
    abstract: string
    speaker: string
}



// similar properties TechEventBase

type TechEventBase = {
    title: string
    description: string
    date: Date
    capacity: number
    rsvp: number

}

// intersection types  "&"" read as "and"
type Conference = TechEventBase & {
    location: string
    price: number
    talks: Talk[]
    kind: 'conference'
}

type Meetup = TechEventBase & {
    location: string
    price: string
    talks: Talk[]
    kind: 'meetup'
}

type Webinar = TechEventBase & {
    url: string
    price?: string
    talks: Talk
    kind: 'webinar'
}

type Hackathon = TechEventBase & {
    location: string,
    price?: number,
    kind: 'hackathon'
}

// union types "|"  read as "or"

type TechEvent = Webinar | Conference | Meetup | Hackathon


function printEvent(event: TechEvent) {
    if (event.price) {
        // event exists
        if (typeof event.price === 'number') {
            // price is a number
            console.log('Price in EUR: ', event.price)
        } else {
            // price is a string
            console.log('It is free!')
        }
    }
    if (Array.isArray(event.talks)) {
        // talks is an array
        event.talks.forEach(talk => {
            console.log(talk.title)
        })
    } else {
        // talks is just a single talk
        console.log(event.talks.title)
    }
}

type EventKind = TechEvent['kind']

function getEventTeaser(event: TechEvent) {
    switch (event.kind) {
        case 'conference':
            return `${event.title} (Conference)`
        case 'meetup':
            return `${event.title} (Meetup)`
        case 'webinar':
            return `${event.title} (Webinar)`
    }
}

const script19: TechEvent = {
    title: 'ScriptConf',
    date: new Date('2021-01-02'),
    capacity: 300,
    rsvp: 289,
    description: 'The fee-good JS conference',
    kind: 'conference',
    price: 29,
    location: 'Beijing, China',
    talks: [{
        speaker: 'YuanJiwei',
        title: 'Design with Privacy in mind',
        abstract: ''
    }]
}

// vscode Ctrl + Space 触发建议
getEventTeaser(script19)


// type GroupEvents = {
//     conference: TechEvent[],
//     meetup: TechEvent[],
//     webinar: TechEvent[],
//     hackathon: TechEvent[]
// }

type GroupEvents = {
    [Kind in EventKind]: TechEvent[]
}

function groupEvents(
    events: TechEvent[]
): GroupEvents {
    const grouped = {
        conference: [],
        meetup: [],
        webinar: [],
        hackathon: []
    };
    events.forEach(event => {
        grouped[event.kind].push(event)
    })
    return grouped
}

// type maintenance is potential source of erros, dynamically updating types helps

type UserEvents = {
    watching: TechEvent[]
    rvsp: TechEvent[]
    attended: TechEvent[]
    signedout: TechEvent[]
}

type UserEventCatagory = 'watching' | 'rsvp' | 'attended' | 'signedoff'

function filterUserEvent(
    userEventList: UserEvents,
    category: keyof UserEvents,
    filterKind?: EventKind
) {
    const filterList = userEventList[category]
    if (filterKind) {
        return filterList.filter(event => event.kind === filterKind)
    }
    return filterList
}