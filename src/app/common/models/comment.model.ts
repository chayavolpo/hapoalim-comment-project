//TODO FIX TYPE OF parentCommentId AND DELETEDAT

export interface Comment {
    id: number,
    parentCommentId?: any,
    ownerId?: number,
    txt: string,
    createdAt: string,
    deletedAt?: any
}