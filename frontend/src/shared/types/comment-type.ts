export interface CommentResponse {
  id: string;
  feedbackId: string;
  parentCommentId: string | null;

  content: string;

  createdBy: string;

  createdAt: string;
  updatedAt: string;
}

export class Comment {
  private _id: string;
  private _feedbackId: string;
  private _parentCommentId: string | null;

  private _content: string;
  private _createdBy: string;
  private _createdAt: string;
  private _updatedAt: string;

  private _replies: Comment[];

  constructor(data: CommentResponse, replies: Comment[] = []) {
    this._id = data.id;
    this._feedbackId = data.feedbackId;
    this._parentCommentId = data.parentCommentId;
    this._content = data.content;
    this._createdBy = data.createdBy;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;

    this._replies = replies;

    this.getInitials = this.getInitials.bind(this);
  }

  public getInitials(): string {
    return this.createdBy
      .split(" ")
      .map((word) => word[0])
      .join("");
  }

  get id(): string {
    return this._id;
  }

  get feedbackId(): string {
    return this._feedbackId;
  }

  get parentCommentId(): string | null {
    return this._parentCommentId;
  }

  get content(): string {
    return this._content;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get updatedAt(): string {
    return this._updatedAt;
  }

  get replies(): Comment[] {
    return this._replies;
  }
}
