import { faker } from "@faker-js/faker";

export abstract class MockupGenerator<T, R> {
  abstract generateOne(merge?: Partial<R>): T;

  generateMany(length: number, merge?: Partial<R>): T[] {
    return Array.from({ length }, () => this.generateOne(merge));
  }

  protected randomDateWithinDays(days: number): Date {
    const date = faker.date.recent({ days });
    return new Date(date);
  }
}

export async function delayMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
