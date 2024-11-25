[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17141949)
## CS472-Auth-Workshop
Create a simple passwordless authentiation workflow for users to signup, signin, and request data from a protected route.

## sign-in
* client sends `{email}` to the web server
* server checks if email does not exist, ask for `{fullname}`, and save: `{email, fullname}` combination
* server checks if email exist:
  * server generates `enc_data = encode({email, fullname})`, read about [base64](https://stackoverflow.com/questions/201479/what-is-base-64-encoding-used-for)
  * server generates `hash_data = hash(enc_data, secret)`, secret is kept at server, so only server can recreate the hash
  * server sends both `{enc_data, hash_data}` to client's email

## workflow
* client saves `{enc_data, hash_data}` and is expected to send them with every future request header to server
* client can decode and read the data `decode(enc_data)`, reading `email`, and `fullname`
* server has middleware to read `{enc_data, hash_data}` from the request header, and verifies if `hash(enc_data, secret) === hash_data` before allowing access to protected routes

```typescript
import { createHmac } from 'node:crypto';

const secretKey = 'theo';
const data = JSON.stringify({ email: 'asaad@miu.edu', fullname: 'Asaad Saad' });

// Browser, you may use btoa() and atob() to convert a text to base64

// Node: encode text to base64
const base64 = Buffer.from(data).toString("base64");

// Node: decode base64 to text
const decoded_data = Buffer.from(base64, "base64").toString("utf-8");

// Node: hash using SHA256, Hash-Based Message Authentication Code
const hash = createHmac('sha256', secretKey).update(data).digest('hex');
```
