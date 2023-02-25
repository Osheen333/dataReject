export const numbersFractionCalculator = (numbers: number[]) => {
    const input = {
        positives: 0,
        negative: 0,
        zeros: 0,
    }

    for (let num of numbers){
        if(num<0) input.negative++
        else if(num>0) input.positives++
        else input.zeros++
    }

    let output = {
        positives: '',
        negative: '',
        zeros: '',
    }

    output.positives = (input.positives/numbers.length).toFixed(6);
    output.negative = (input.negative/numbers.length).toFixed(6);
    output.zeros = (input.zeros/numbers.length).toFixed(6);
    return output;
};
