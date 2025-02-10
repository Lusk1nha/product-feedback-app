export type FeedbackStatusType =
  | "suggestion"
  | "planned"
  | "in-progress"
  | "live";

export interface FeedbackResponse {
  id: string;
  title: string;
  content: string;

  createdBy: string;
  categoryId: string;

  status: FeedbackStatusType;
  upvotes?: number;
  comments?: number;

  createdAt: string;
  updatedAt: string;
}

export class Feedback {
  private _id: string;
  private _title: string;
  private _content: string;
  private _createdBy: string;
  private _categoryId: string;
  private _upvotes: number;
  private _comments: number;
  private _status: FeedbackStatusType;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(data: FeedbackResponse) {
    if (!data.id) throw new Error("ID is required");
    if (!data.title) throw new Error("Title is required");
    if (!data.content) throw new Error("Content is required");
    if (!data.createdBy) throw new Error("CreatedBy is required");
    if (!data.categoryId) throw new Error("CategoryId is required");
    if (!data.status) throw new Error("Status is required");
    if (!data.createdAt) throw new Error("CreatedAt is required");
    if (!data.updatedAt) throw new Error("UpdatedAt is required");

    this._id = data.id;
    this._title = data.title;
    this._content = data.content;
    this._createdBy = data.createdBy;
    this._categoryId = data.categoryId;
    this._status = data.status;
    this._upvotes = data.upvotes ?? 0;
    this._comments = data.comments ?? 0;
    this._createdAt = new Date(data.createdAt);
    this._updatedAt = new Date(data.updatedAt);
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  get status(): FeedbackStatusType {
    return this._status;
  }

  get upvotes(): number {
    return this._upvotes;
  }

  get comments(): number {
    return this._comments;
  }

  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  get updatedAt(): Date {
    return new Date(this._updatedAt);
  }

  get raw(): FeedbackResponse {
    return {
      id: this._id,
      title: this._title,
      content: this._content,
      createdBy: this._createdBy,
      categoryId: this._categoryId,
      status: this._status,
      upvotes: this._upvotes,
      comments: this._comments,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    };
  }

  public upvote(): Feedback {
    const updatedData: FeedbackResponse = {
      ...this.raw,
      upvotes: this._upvotes + 1,
      updatedAt: new Date().toISOString(),
    };

    return new Feedback(updatedData);
  }

  public changeStatus(newStatus: FeedbackStatusType): Feedback {
    const updatedData: FeedbackResponse = {
      ...this.raw,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    return new Feedback(updatedData);
  }

  public isActive(): boolean {
    return this._status === "in-progress" || this._status === "live";
  }
}
