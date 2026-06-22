export function parseRoadmapData(raw: unknown) {
    if (!raw) return null;
    let text = typeof raw === "string" ? raw : String(raw);

    // Remove triple-backtick fences and optional language (```json)
    text = text.replace(/^\s*```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "");
    // Remove stray single backticks
    text = text.replace(/`/g, "");

    // Try direct parse first
    try {
        return JSON.parse(text);
    } catch {}

    // Fallback: extract the first JSON object/array-like substring
    const firstObj = text.indexOf("{");
    const firstArr = text.indexOf("[");
    if (firstObj === -1 && firstArr === -1) return null;
    const start = (firstObj === -1) ? firstArr : (firstArr === -1 ? firstObj : Math.min(firstObj, firstArr));
    const lastObj = text.lastIndexOf("}");
    const lastArr = text.lastIndexOf("]");
    const end = (lastObj === -1) ? lastArr : (lastArr === -1 ? lastObj : Math.max(lastObj, lastArr));
    if (start === -1 || end === -1 || end < start) return null;
    const candidate = text.slice(start, end + 1);

    try {
        return JSON.parse(candidate);
    } catch (e) {
        console.error("parseRoadmapData failed to parse candidate JSON", e);
        return null;
    }
}