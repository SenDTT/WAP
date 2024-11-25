export interface GetParams {
    limit: number,
    offset: number,
    search: string,
    category: number,
    year: number
}

export type Color = 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink' | 'gray';