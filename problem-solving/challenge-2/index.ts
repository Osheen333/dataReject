export const diceFacesCalculator = (
  dice1: number,
  dice2: number,
  dice3: number
): number => {
  let num = 0;
  if(!isValid(dice1)||!isValid(dice2)||!isValid(dice3)){
    throw("Dice out of number range")
  }

  if(dice1==dice2){
    if(dice1 == dice3){
      num = dice1*3;
    }
    else {
      num = dice1 *2;
    }
  }else if(dice2 == dice3){
    num = dice2*2;
  }else if(dice1 == dice3){
    num = dice1 *2
  }else{
    num = Math.max(dice1,dice2,dice3)
  }
  return num;
};

const isValid = (num : number):boolean => {
  if(num<=6 && num>0){
    return true;
  }
  return false;
}

