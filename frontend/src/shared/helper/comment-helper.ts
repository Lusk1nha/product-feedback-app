import { CommentResponse, Comment } from "../types/comment-type";

interface CommentHelperAbstract {
  getCommentsWithReplies(comments: Comment[]): Comment[];
}

export class CommentHelper implements CommentHelperAbstract {
  constructor() {
    this.getCommentsWithReplies = this.getCommentsWithReplies.bind(this);
  }

  public factory(iterator: CommentResponse[]): Comment[] {
    return iterator.map((comment) => new Comment(comment));
  }

  public getCommentsWithReplies(comments: Comment[]): Comment[] {
    return this._groupCommentsFlat(comments);
  }

  private _buildCommentTree(
    comments: Comment[],
    parentCommentId: string | null = null
  ): Comment[] {
    return comments
      .filter((comment) => comment.parentCommentId === parentCommentId)
      .map(
        (comment) =>
          new Comment(comment, this._buildCommentTree(comments, comment.id))
      );
  }

  private _groupCommentsFlat(comments: Comment[]): Comment[] {
    if (!comments) {
      return [];
    }

    return this._buildCommentTree(comments);
  }
}
