declare module 'country-state-city' {
    export interface ICountry {
        isoCode: string;
        name: string;
    }

    export interface IState {
        isoCode: string;
        name: string;
        countryIsoCode: string;
    }

    export interface ICity {
        name: string;
        stateCode: string;
        countryCode: string;
    }

    export class Country {
        static getAllCountries(): ICountry[];
    }

    export class State {
        static getStatesOfCountry(countryIsoCode: string): IState[];
    }

    export class City {
        static getCitiesOfState(countryIsoCode: string, stateIsoCode: string): ICity[];
    }
}
