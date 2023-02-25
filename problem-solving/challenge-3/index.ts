class cell {
  x:number;
  y:number;
  distance:number;
  constructor(x:number,y:number,distnce:number){
    this.x = x;
    this.y = y;
    this.distance = distnce;
  }
}

export const findLessCostPath = (board: number[][]): number => {
  let row = board.length;
  let column = board[0].length;
  let distance = Array.from(Array(row), ()=> Array(column).fill(0));
  for(let i =0; i<row;i++){
    for(let j=0; j<column;j++){
      distance[i][j]=10000000;
    }
  }
  let xpath = [-1,0,1,0];
  let ypath = [0,1,0,-1];

  const isInsideGrid =(i: number, j:number)=> {
    return (i >=0 && i< row && j>=0 && j<column)
  }

  let st=[];
  st.push(new cell(0,0,0));
  distance[0][0] = board[0][0];
  while(st.length!= 0){
    let k = st[0];
    st.shift();
    for(let i=0; i<4; i++){
      let x:number = k.x + xpath[i];
      let y:number= k.y +ypath[i];
      if(!isInsideGrid(x,y))
        continue;
      if(distance[x][y]>distance[k.x][k.y]+board[x][y]){
        distance[x][y] = distance[k.x][k.y] + board[x][y];
        st.push(new cell(x,y,distance[x][y]))
      }
    }
    st.sort((a,b)=>{
      if(a.distance == b.distance){
        if(a.x !=b.x)
          return (a.x-b.x);
        else
          return (a.y-b.y)
      }
      return (a.distance-b.distance)
    })
  }


  return distance[row-1][column-1]-board[row-1][column-1];
};
