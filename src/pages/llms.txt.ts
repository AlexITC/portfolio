import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import bio from "../data/bio.md?raw";
import extras from "../data/extras.md?raw";

export const GET: APIRoute = async () => {
  const experience = (await getCollection("experience")).sort((a, b) =>
    (b.data.start || "").localeCompare(a.data.start || ""),
  );
  const projects = (await getCollection("projects")).sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    return a.data.name.localeCompare(b.data.name);
  });
  const testimonials = await getCollection("testimonials");

  const lines: string[] = [];
  lines.push(bio.trim());
  lines.push("");
  lines.push(extras.trim());
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("# Experience");
  lines.push("");
  for (const e of experience) {
    const d = e.data;
    lines.push(`## ${d.title} — ${d.company}${d.period ? ` (${d.period})` : ""}`);
    const body = (e.body ?? "").trim();
    if (body) lines.push(body);
    if (d.environment?.length) lines.push(`- Environment: ${d.environment.join(", ")}`);
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push("# Projects & engagements");
  lines.push("");
  lines.push(
    `${projects.length} projects across employment, consulting, personal and open-source work. Private clients are shown generically.`,
  );
  lines.push("");
  for (const p of projects) {
    const d = p.data;
    lines.push(`## ${d.name}${d.featured ? " (featured)" : ""}`);
    if (d.tagline) lines.push(d.tagline);
    const meta: string[] = [];
    if (d.type) meta.push(`type: ${d.type}`);
    if (d.role) meta.push(`role: ${d.role}`);
    if (d.company) meta.push(`company: ${d.company}`);
    if (d.years && d.years !== "TBD") meta.push(`years: ${d.years}`);
    if (meta.length) lines.push(`- ${meta.join(" | ")}`);
    if (d.industries?.length) lines.push(`- Industries: ${d.industries.join(", ")}`);
    if (d.themes?.length) lines.push(`- Themes: ${d.themes.join(", ")}`);
    if (d.technologies?.length) lines.push(`- Tech: ${d.technologies.join(", ")}`);
    if (d.metrics) lines.push(`- Impact: ${d.metrics}`);
    const body = (p.body ?? "").trim();
    if (body) lines.push(body);
    if (d.links?.length) lines.push(`- Links: ${d.links.join(" , ")}`);
    lines.push("");
  }

  if (testimonials.length) {
    lines.push("---");
    lines.push("");
    lines.push("# Testimonials");
    lines.push("");
    for (const t of testimonials) {
      const body = (t.body ?? "").trim().replace(/\s*\n\s*/g, " ");
      if (body) lines.push(`> ${body}`);
      lines.push(`— ${t.data.author}${t.data.position ? `, ${t.data.position}` : ""}`);
      lines.push("");
    }
  }

  lines.push("---");
  lines.push("Full picture at https://alexitc.com/projects — contact alexis@alexitc.com");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
