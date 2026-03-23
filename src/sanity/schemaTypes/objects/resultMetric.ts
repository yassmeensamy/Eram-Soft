import { defineType, defineField } from "sanity";

export default defineType({
  name: "resultMetric",
  title: "Result Metric",
  type: "object",
  fields: [
    defineField({ name: "metric", title: "Metric", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string" }),
  ],
});
