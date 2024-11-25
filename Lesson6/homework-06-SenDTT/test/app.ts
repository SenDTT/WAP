import { pbkdf2 } from 'node:crypto';

const start_time = Date.now();

pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`1. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`2. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`3. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`4. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`5. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`6. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`7. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`8. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`9. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`10. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`11. ${Date.now() - start_time}`);
});
pbkdf2("A", "B", 100000, 512, 'sha512', () => {
    console.log(`12. ${Date.now() - start_time}`);
});

