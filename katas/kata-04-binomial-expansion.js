const expand = (ecuacion) => {
    const eqParsed = parseEquation(ecuacion);
    const eqExpanded  =  expandBinomio(eqParsed);
    const eqFormated = printEquationTxt(eqExpanded);
    
    return eqFormated;
};

const parseEquation = (ecuacion) => {  
    let [, binomio, potencia] = ecuacion.match(/\((.*?)\)\^(\d+)$/);

    let terminos = binomio.split(/(?=\+|-)/).map(
        (termino) => {
            let [, signo = '+', coeficiente = 1, variable, exponente = 1] = termino.match(/^([\+-]?)(\d+)?([a-z])?\^?(\d+)?$/);

            signo = !signo ? '+' : signo;
            coeficiente = parseInt(coeficiente);
            exponente = !!variable ? parseInt(exponente) : undefined;

            return { signo, coeficiente, variable, exponente };
    });

    return { potencia, terminos };
};

const expandBinomio = (ecuacion) => {
    const [terminoa, terminob] = ecuacion.terminos;
    let pota = ecuacion.potencia;
    let potb = 0;

    let eqexpandida = calculaTrianguloPascal(ecuacion.potencia)
        .map((coefPasc) => {
            const potTermA = calculaPotenciaTermino(terminoa, pota);
            const potTermB = calculaPotenciaTermino(terminob, potb);

            pota--;
            potb++;
            return multiplicaTerminos(potTermA, potTermB, coefPasc); 
    });

    eqexpandida.sort((a,b) => a.exponente > (b.exponente ?? 0) ? 1 : -1);
    eqexpandida.reverse();
    
    return eqexpandida;
};

const calculaTrianguloPascal = (potencia) => {
    let renglon = [1]; 
    let rsiguiente = []; 

    for( i=0; i<potencia; i++){
        rsiguiente = [0, ...renglon, 0].map((e,i,a) =>  e + a[i+1])
        rsiguiente.splice(rsiguiente.length-1,1)
        renglon = rsiguiente
    }
    
    return renglon;
};

const calculaPotenciaTermino = (termino, potencia) => {
    let result = {};
    
    result.signo = (termino.signo === '-' && potencia % 2 !== 0) ? '-' : '+';
    result.coeficiente = Math.pow(termino.coeficiente, potencia);
    if(!!termino.variable && potencia > 0){
        result.variable = termino.variable;
        result.exponente = termino.exponente * potencia;
    }

    return result;
};

const multiplicaTerminos = (terminoa, terminob, pascal) => {   
    if(terminoa.coeficiente === 0 || terminob.coeficiente === 0){
        return { coeficiente: 0};
    }

    let signo = (terminoa.signo === terminob.signo) ? '+' : '-';
    let coeficiente = terminoa.coeficiente * terminob.coeficiente * pascal;
    let {variable, exponente} = (!!terminoa.variable) ? terminoa : terminob;

    return {
        signo, 
        coeficiente,
        variable,
        exponente
    };
};

const printEquationTxt = (ecuacion) => {
    let ecuacionTexto = '';

    for(t of ecuacion){
        if(t.coeficiente === 0)
            continue;
            
        ecuacionTexto += ((!ecuacionTexto && t.signo === '-') || (!!ecuacionTexto)) ? t.signo : '';
        ecuacionTexto += (t.coeficiente != 1 || !t.variable) ? t.coeficiente : '';
        ecuacionTexto += (t.variable) ? t.variable : '';
        ecuacionTexto += (t.variable && t.exponente > 1) ? '^' + t.exponente : '';
    }

    return ecuacionTexto;
}

module.exports = { expand };