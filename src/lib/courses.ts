// Single source of truth for courses. Used by cards, modal AND server routes.
// The server always takes the price from here, never from the browser.
// One-time payment, per person, per course.
export const COURSES = {
  "english-language-design": { title: "English Language Design", priceInr: 3333 },
  "one-day-vocabulary": { title: "One Day Vocabulary", priceInr: 3333 },
  "one-day-grammar-rules": { title: "One Day Grammar Rules", priceInr: 3333 },
  "one-day-rc": { title: "One Day RC", priceInr: 1 },
  "essential-math-skills": { title: "Essential Math Skills", priceInr: 3333 },
} as const;

export type CourseSlug = keyof typeof COURSES;

export const isCourseSlug = (s: unknown): s is CourseSlug =>
  typeof s === "string" && s in COURSES;