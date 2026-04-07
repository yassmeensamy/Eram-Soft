import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactMessage",
  title: "Contact Message",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
    defineField({ name: "service", title: "Service", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Message", type: "text", rows: 6, readOnly: true }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["new", "read", "replied", "archived"], layout: "radio" },
      initialValue: "new",
    }),
  ],
  orderings: [
    { title: "Newest first", name: "submittedAtDesc", by: [{ field: "submittedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "email", status: "status" },
    prepare({ title, subtitle, status }) {
      return { title: title || "(no name)", subtitle: `${status ?? "new"} — ${subtitle ?? ""}` };
    },
  },
});
