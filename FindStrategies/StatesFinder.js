import usStates from '../us-states';

export class StatesFinder {

    constructor() {
        this._data = usStates.map(state => ({
            text: state.name,
            value: state.abbreviation
        }));
    }

    getResults(query, numOfResults) {
        if (!query) return [];

        // Filter for matching strings
        let results = this._data.filter((item) => {
            return item.text.toLowerCase().includes(query.toLowerCase());
        });

        return results.slice(0, numOfResults);
    }
}