import { defineType, defineField } from "sanity";

export default defineType({
  name: "clientInfo",
  title: "Client Info",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "services", title: "Services", type: "array", of: [{ type: "string" }] }),
  ],
});
