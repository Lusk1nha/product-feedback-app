export abstract class BaseEntity {
  public readonly id?: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected constructor(params?: {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params?.id;
    this.createdAt = params?.createdAt ?? new Date();
    this.updatedAt = params?.updatedAt ?? this.createdAt;
  }
}
