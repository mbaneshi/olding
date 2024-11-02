
// test_proxy.ts
const response = await fetch("https://deno.land/std/http/server.ts");
console.log(await response.text());
