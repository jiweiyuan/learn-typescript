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
    kind: string
}

// intersection types  "&"" read as "and"
type Conference = TechEventBase & {
    location: string
    price: number
    talks: Talk[]
}

type Meetup = TechEventBase & {
    location: string
    price: string
    talks: Talk[]
}

type Webinar = TechEventBase & {
    url: string
    price?: string
    talks: Talk
}

// union types "|"  read as "or"

type TechEvent = Webinar | Conference | Meetup


function printEvent(event: TechEvent) {
    if(event.price) {
        // event exists
        if(typeof event.price === 'number') {
            // price is a number
            console.log('Price in EUR: ', event.price)
        } else {
            // price is a string
            console.log('It is free!')
        }
    }
    if(Array.isArray(event.talks)) {
        // talks is an array
        event.talks.forEach(talk => {
            console.log(talk.title)
        })
    } else {
        // talks is just a single talk
        console.log(event.talks.title)
    }
}

type EventKind = 'webinar' | 'conference' | 'meetup'