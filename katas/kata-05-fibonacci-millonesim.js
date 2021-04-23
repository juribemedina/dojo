const fib = (n) => {
    if(n <= 2)
        return BigInt(1);

    let a = 1n, b = 1n, c = 0n;

    for(i=3;i<=n;i++){
        c = a + b;
        [a,b] = [b,c];
    }

    return c;
};

const n = 2000000;

console.time('iterativo')
console.log(fib(n));
console.timeEnd('iterativo');