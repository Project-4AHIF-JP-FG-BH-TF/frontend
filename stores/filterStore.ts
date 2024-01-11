import type {Classification, Filters} from "~/types/LogEntry";

export interface State {
    ip: string | undefined,
    regex: boolean | undefined,
    text: string | undefined,
    from: Date | undefined,
    to: Date | undefined,
    classification: Classification | undefined,
}

export const useFilterStore = defineStore("filter", {
    state: (): State => ({} as State),
    getters: {
        getFilter: (state): Filters => {
            return {
                date: {
                    from: state.from,
                    to: state.to,
                },
                classification: state.classification,
                text: state.text,
                regex: state.regex,
                ip: state.ip,
            }
        }
    },
    actions: {
        setFilter(filter: State) {
            this.from = filter.from;
            this.to = filter.to;
            this.classification = filter.classification;
            this.text = filter.text;
            this.regex = filter.regex;
            this.ip = filter.ip;
        }
    }
})