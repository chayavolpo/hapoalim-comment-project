//TODO FIX TYPE OF parentCommentId AND DELETEDAT

export interface CommentsChildrenObj {
  [k: string]: Comment[]
}

export interface Comment {
    id: number,
    parentCommentId?: number | null,
    ownerId: number,
    txt: string,
    createdAt: string,
    deletedAt?: any
    children?: Comment[]
}