import { MockupGenerator } from "../helper/mockup-helper";
import { Feedback, FeedbackResponse } from "../types/feedback-type";
import { faker } from "@faker-js/faker";

export class FeedbackMockup extends MockupGenerator<
  Feedback,
  FeedbackResponse
> {
  private generateBaseData(): FeedbackResponse {
    const createdAt = this.randomDateWithinDays(30);
    const updatedAt = faker.date
      .between({
        from: createdAt,
        to: new Date(),
      })
      .toISOString();

    return {
      id: faker.string.uuid(),
      title: faker.lorem.words(3),
      content: faker.lorem.lines(1),
      createdBy: faker.internet.username(),
      categoryId: faker.string.uuid(),
      status: faker.helpers.arrayElement([
        "suggestion",
        "planned",
        "in-progress",
        "live",
      ]),
      createdAt: createdAt.toISOString(),
      updatedAt,
      upvotes: faker.number.int({ min: 0, max: 150000 }),
      comments: faker.number.int({ min: 0, max: 100 }),
    };
  }

  generateOne(merge?: Partial<FeedbackResponse>): Feedback {
    if (merge) {
      return new Feedback({
        ...this.generateBaseData(),
        ...merge,
      });
    }

    return new Feedback(this.generateBaseData());
  }
}
