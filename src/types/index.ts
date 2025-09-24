export interface Card {
    id : string
    title : string
    description : string
    status : "todo" | "in-progress" | "done"
    createAt: string;
}


export interface Board {
    id:string
    title:string
    cards: Card[]
}

export interface RootState {
    boards:{
        items : Record<string , Board>;
        loading : boolean;
        error : string | null;
    }
}

export interface BoardsState {
    items: Record<string, Board>;
    loading: boolean;
    error: string | null;
}