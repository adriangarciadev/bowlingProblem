import { useState } from "react";

type BowlingProps = {


}
type frame = [number, number];


enum finalFrame {
    unknown, spare, strike

}

const initialState:frame[] = [
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,5],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0]
]

export const Bowling = ()=>{

    const [state, setState] = useState<frame[]>(initialState)

    const checkFrame = (innerState : frame[], index:number)=>{

        if(innerState[index][0] === 10)
            return finalFrame.strike;
        else if(innerState[index][0] +  innerState[index][1] === 10)
            return finalFrame.spare;
        else return finalFrame.unknown;

    }

    const getScore = (index:number)=>
    {
        return Math.min(
            state[index][0] + state[index][1]
            ,10 );
    }


    const updateState = (value:number, index1:number, index2:number)=>{
        
        let copy =state.map(curr=>([...curr] as frame));
       
        copy[index1][index2] = value;

        setState(copy);

    }

    const calculateStore = ()=>{

        return state.reduce( ( prev , _curr, index ) =>{

            if(index >9)
                return prev;
            
            switch(  checkFrame(state , index) ){
                case finalFrame.strike:
                    return prev + getScore(index+1) + getScore(index+2) +10 ;
            
                case finalFrame.spare:
                    return prev +getScore(index)  + getScore(index+1) ;
                case finalFrame.unknown:
                    return prev+ getScore(index);
                default:
                        return 0;
                }
            

        } 
        
        
        
        ,0)

       
    }

    return (
        <>
            <form>
            {
                state.map((curr,index)=>

                index < (10+ checkFrame(state , 9) )?
                <div>
                    <label> Frame number { index +1 }</label>
                    
                    <input type="number"
                    min={0}
                    max={10}
                    onChange={(e)=>{updateState(e.target.valueAsNumber, index, 0)}}
                    value={curr[0]}
                    />
                    
                    <input type="number"
                    min={0}
                    max={10}
                    onChange={(e)=>{updateState(e.target.valueAsNumber, index, 1)}}
                    value={curr[1]}
                    />
                </div>
                :null
                )

            }
            </form>
            <h1>the total Score is { calculateStore() }</h1>
            <h1>Indexes {10+ checkFrame(state,9)} </h1>
            <h1> Score { calculateStore () } </h1>
        </>
     
    );
    
}