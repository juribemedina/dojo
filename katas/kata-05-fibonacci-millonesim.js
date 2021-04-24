
const mmultiter = (fm, counter) => {
    if(counter === 0){
        return [
            [1n,0n],
            [0n,1n]
        ];
    };

    if(counter % 2 === 0){
        let fn = mmultiter(fm, counter / 2);
        return mmult(fn,fn);
    } else {
        let fn = mmultiter(fm, counter - 1);
        return mmult(fm,fn);
    }
}

const mmult = (fm, fn) => {
    return [
        [
            ((fm[0][0] * fn[0][0]) + (fm[0][1] * fn[1][0])), 
            ((fm[0][0] * fn[0][1]) + (fm[0][1] * fn[1][1]))
        ],[
            ((fm[1][0] * fn[0][0]) + (fm[1][1] * fn[1][0])),
            ((fm[1][0] * fn[0][1]) + (fm[1][1] * fn[1][1]))
        ]
    ];
}

const fib = (n) => {
    const f = [
        [0n,1n],
        [1n,1n]
    ];
    
    let result =  mmultiter(f,Math.abs(n))[0][1];
    return n < 0 && n % 2 === 0 ? result * -1n : result;
};


console.time('potencias');
console.log(fib(-20));
console.timeEnd('potencias');

