
import { serve } from "https://deno.land/std/http/server.ts";
import { extname } from "https://deno.land/std/path/mod.ts";
import { encode } from "https://deno.land/std/encoding/utf8.ts";

const port = 8000;
const server = serve({ port });

console.log(`Server running at http://localhost:${port}/`);

for await (const req of server) {
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const filePath = Deno.cwd() + url.pathname;

    try {
        const fileInfo = await Deno.stat(filePath);
        if (fileInfo.isFile) {
            const file = await Deno.open(filePath);
            const fileContent = await Deno.readAll(file);
            Deno.close(file.rid);
            const contentType = getContentType(extname(filePath));
            req.respond({ body: fileContent, headers: new Headers({ "Content-Type": contentType }) });
        } else {
            req.respond({ status: 404, body: "File not found" });
        }
    } catch (error) {
        req.respond({ status: 404, body: "File not found" });
    }
}

function getContentType(ext: string): string {
    switch (ext) {
        case '.md':
            return 'text/markdown; charset=utf-8';
        case '.html':
            return 'text/html; charset=utf-8';
        case '.txt':
            return 'text/plain; charset=utf-8';
        default:
            return 'application/octet-stream';
    }
}
