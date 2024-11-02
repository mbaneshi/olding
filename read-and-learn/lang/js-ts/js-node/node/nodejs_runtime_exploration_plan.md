### 3. **Buffer Module** (`buffer`)

The `buffer` module in Node.js provides a way to work with raw binary data. Buffers are similar to arrays but deal directly with binary data. They are especially useful in scenarios where you need to interact with binary streams such as files, network protocols, or binary formats (e.g., image files).

#### Key Methods and Properties:

1. **Class: `Buffer`**
   - **Buffer.from(array)**: Creates a new buffer from an array or array-like object (e.g., typed arrays).
   - **Buffer.from(string[, encoding])**: Creates a new buffer containing the specified string in the given encoding (default is `utf8`).
   - **Buffer.alloc(size)**: Allocates a new buffer of a given `size`, filled with zeroes.
   - **Buffer.allocUnsafe(size)**: Allocates a buffer of the specified `size` without initializing it. This is faster but potentially unsafe, as it can contain old data.
   - **Buffer.concat(list[, totalLength])**: Combines an array of buffers into a single buffer.
   
2. **Instance Methods:**
   - **buf.write(string[, offset][, length][, encoding])**: Writes a string to the buffer at the specified `offset` using the given `encoding`.
   - **buf.toString([encoding][, start][, end])**: Decodes the buffer to a string using the specified encoding (default is `utf8`).
   - **buf.slice([start][, end])**: Returns a new buffer that references the same memory as the original buffer, but with a modified range (`start` to `end`).
   - **buf.equals(otherBuffer)**: Compares `buf` with `otherBuffer`. Returns `true` if both are identical.
   - **buf.fill(value[, offset][, end][, encoding])**: Fills the buffer with the specified value.
   
3. **Static Methods:**
   - **Buffer.isBuffer(obj)**: Returns `true` if `obj` is a buffer, otherwise `false`.
   - **Buffer.byteLength(string[, encoding])**: Returns the byte length of a string based on the specified encoding.
   
4. **Properties:**
   - **Buffer.length**: Returns the length of the buffer in bytes.
   - **Buffer.poolSize**: Specifies the size of the internal buffer pool (default is 8KB).
   
#### Example:
```js
const buf1 = Buffer.from('hello');
const buf2 = Buffer.alloc(10);
const buf3 = Buffer.concat([buf1, buf2]);

console.log(buf1.toString());    // Output: 'hello'
console.log(buf3.length);        // Output: 15
console.log(buf3.toString());    // Output: 'hello' + 10 zero-filled bytes
```

#### Use Cases:
- **Handling binary data**: Buffers are critical for working with binary streams such as reading files or network responses.
- **Interfacing with C++ Addons**: In native Node.js addons, buffers are used to interact with binary data processed by the C++ layer.

The `buffer` module is automatically loaded in all Node.js programs, so no explicit `require()` is needed.

**Next:** Type **next** to move to the fourth module, `child_process`.

```md
nodejs-buffer-module.md
```

**Timestamp**: 2024-10-14 10:55:00  
**Description**: Overview of the Node.js `buffer` module, including available methods, properties, and example usage.  
**Length**: 29 lines, 1,715 characters.  
