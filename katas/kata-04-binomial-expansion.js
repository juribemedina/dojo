const expand = (ecuacion) => {
    const eqParsed = parseEquation(ecuacion)
    const eqExpanded  =  expandBinomio(eqParsed)
    const eqFormated = printEquationTxt(eqExpanded)

    return eqFormated
}

const parseEquation = (ecuacion) => {  
    let [entrada, polinomio, potencia] = ecuacion.match(/\((.*?)\)\^(\d+)$/)

    let ecuacionParseada = {
        entrada,
        polinomio,
        potencia
    }
    
    ecuacionParseada.terminos = ecuacionParseada.polinomio.split(/(?=\+|-)/).map((termino) => parseTerm(termino))
    return ecuacionParseada
}

const parseTerm = (term) => {
    const elementos = term.match(/^([\+-]?)(\d+)?([a-z])?\^?(\d+)?$/)

    let termino = {}
    termino.signo = !elementos[1] ? '+' : elementos[1]
    termino.coeficiente = isNaN(parseInt(elementos[2])) ? 1 : parseInt(elementos[2])
    if(!!elementos[3]){
        termino.variable = elementos[3]
        termino.exponente = isNaN(parseInt(elementos[4])) ? 1 : parseInt(elementos[4])
    }

    return termino
}

const expandBinomio = (ecuacion) => {
    const terminoa = ecuacion.terminos[0]
    const terminob = ecuacion.terminos[1]
    let pa = ecuacion.potencia;
    let pb = 0;

    let eqexpandida = []

    const pascal = calculaTrianguloPascal(ecuacion.potencia)
    pascal.forEach((pasc) => {
        let potTermA = calculaPotenciaTermino(terminoa, pa)
        let potTermB = calculaPotenciaTermino(terminob, pb)

        eqexpandida.push(multiplicaTerminos(potTermA, potTermB, pasc))
        pa--;
        pb++;
    })

    eqexpandida.sort((a,b) => {
        return a.exponente > (b.exponente ?? 0) ? 1 : -1
    })
    eqexpandida.reverse()
    
    return eqexpandida
}

const calculaTrianguloPascal = (potencia) => {
    let renglon = [1]; 
    let rs = []; 

    for( i=0; i<potencia; i++){
        rs = [0].concat(renglon).concat(0).map((e,i,a) =>  e + a[i+1])
        rs.splice(rs.length-1,1)
        renglon = rs
    }
    
    return renglon;
}

const calculaPotenciaTermino = (termino, potencia) => {
    let result = {}
    
    result.signo = (termino.signo === '-' && potencia % 2 !== 0) ? '-' : '+'
    result.coeficiente = Math.pow(termino.coeficiente, potencia)
    if(!!termino.variable && potencia > 0){
        result.variable = termino.variable
        result.exponente = termino.exponente * potencia
    }

    return result
}

const multiplicaTerminos = (terminoa, terminob, pascal) => {   
    if(terminoa.coeficiente === 0 || terminob.coeficiente === 0){
        return { coeficiente: 0}
    }

    let signo = (terminoa.signo === terminob.signo) ? '+' : '-'
    let coeficiente = terminoa.coeficiente * terminob.coeficiente * pascal
    let {variable, exponente} = (!!terminoa.variable) ? terminoa : terminob

    return {
        signo, 
        coeficiente,
        variable,
        exponente
    }
}

const printEquationTxt = (ecuacion) => {
    let ecuacionTexto = ''

    for(t of ecuacion){
        if(t.coeficiente === 0)
            break;
            
        ecuacionTexto += ((!ecuacionTexto && t.signo === '-') || (!!ecuacionTexto)) ? t.signo : ''
        ecuacionTexto += (t.coeficiente != 1 || !t.variable) ? t.coeficiente : ''
        ecuacionTexto += (t.variable) ? t.variable : ''
        ecuacionTexto += (t.variable && t.exponente > 1) ? '^' + t.exponente : ''
    }

    return ecuacionTexto
}

module.exports = { expand }