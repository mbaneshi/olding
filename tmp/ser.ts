
import { serve } from "https://deno.land/std/http/server.ts";
import { dirname, fromFileUrl } from "https://deno.land/std/path/mod.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const port = 8000;

const server = serve({ port });
console.log(`Server running at http://localhost:${port}/`);

for await (const req of server) {
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const filePath = __dirname + url.pathname;

    try {
        const file = await Deno.open(filePath);
        const fileContent = await Deno.readAll(file);
        Deno.close(file.rid);
        req.respond({ body: fileContent });
    } catch (error) {
        req.respond({ status: 404, body: "File not found" });
    }
}
