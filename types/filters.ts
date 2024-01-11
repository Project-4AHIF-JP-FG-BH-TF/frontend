export interface Filters {
    ip: string | undefined;
    regex: boolean;
    text: string | undefined;
    from: Date | undefined;
    to: Date | undefined;
    level: string | undefined;
}