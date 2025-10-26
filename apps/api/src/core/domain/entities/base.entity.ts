export abstract class BaseEntity {
  readonly id?: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  protected constructor(props?: {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props?.id ?? undefined;
    this.createdAt = props?.createdAt ?? new Date();
    this.updatedAt = props?.updatedAt ?? new Date();
  }
}
