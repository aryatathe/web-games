const images=["","images/zero.png","images/cross.png"];
const turnNames=[["Your turn", "Computer is playing..."],["Player 1's turn", "Player 2's turn"]];
const results=[["You win!", "Computer wins!"],["Player 1 wins!", "Player 2 wins!"]];

const check=(grid)=>{
    for(let i=0; i<3; i++){
        let a=[...new Set(grid.slice(i*3,(i+1)*3))];
        let b=[...new Set(grid.filter((e,index)=>(index-i)%3==0))];
        if(a.length==1 && !a.includes(0)){
            return a[0];
        }
        if(b.length==1 && !b.includes(0)){
            return b[0];
        }
    }
    let x=[...new Set(grid.filter((e,i)=>(i%3)+(parseInt(i/3))==2))];
    let y=[...new Set(grid.filter((e,i)=>(i%3)==(parseInt(i/3))))];
    if(x.length==1 && !x.includes(0)){
        return x[0];
    }
    if(y.length==1 && !y.includes(0)){
        return y[0];
    }
    console.log(!grid.includes(0));
    if(!grid.includes(0)){
        return 3;
    }
    return false;
}

const gridChange=(grid, n1, n2)=>{
    for(let i=0; i<3; i++){
        let a=grid.slice(i*3,(i+1)*3);
        let b=grid.filter((e,index)=>(index-i)%3==0);
        if(a.filter(x=>x==n2).length==2 && a.includes(n1)){
            return [...grid.slice(0,(i*3)+a.indexOf(0)), 2, ...grid.slice((i*3)+a.indexOf(0)+1,9)];
        }
        if(b.filter(x=>x==n2).length==2 && b.includes(n1)){
            return [...grid.slice(0,i+(3*b.indexOf(0))), 2, ...grid.slice(i+(3*b.indexOf(0))+1,9)];
        }
    }
    let x=grid.filter((e,i)=>(i%3)+(parseInt(i/3))==2);
    let y=grid.filter((e,i)=>(i%3)==(parseInt(i/3)));
    if(x.filter(x=>x==n2).length==2 && x.includes(n1)){
        return [...grid.slice(0,2*(1+x.indexOf(0))), 2, ...grid.slice(2*(1+x.indexOf(0))+1,9)];
    }
    if(y.filter(x=>x==n2).length==2 && y.includes(n1)){
        return [...grid.slice(0,4*y.indexOf(0)), 2, ...grid.slice(4*y.indexOf(0)+1,9)];
    }
    return false;
}

const computerTurn=(grid)=>{
    let ans;
    ans=gridChange(grid, 0, 2);
    if(ans) return ans;
    ans=gridChange(grid, 0, 1);
    if(ans) return ans;
    ans=gridChange(grid, 2, 0);
    if(ans) return ans;
    while(true){
        let i=Math.floor(9*Math.random());
        if(grid[i]==0)
            return [...grid.slice(0,i), 2, ...grid.slice(i+1,9)];
    }
}

const WelcomeScreen=({setMode})=>{
    return(
        <div id="welcome-screen">
            <h2>Choose Game Mode</h2>
            <button className="option-button" onClick={()=>setMode(1)}>One Player</button>
            <button className="option-button" onClick={()=>setMode(2)}>Two Player</button>
        </div>
    );
}

const GameHeader=({turn, over, mode, nextGame})=>{
    return(
        <div id="player-header">
            <h3>{mode==1?"One":"Two"} Player Game</h3>
            {over
                    ?over==3?<h2>Draw</h2>:<h2>{results[mode-1][over-1]}</h2>
                    :<h2>{turnNames[mode-1][turn-1]}</h2>
            }
        </div>
    );
}

const Main=()=>{

    const [mode, setMode]=React.useState(0);
    const [grid, setGrid]=React.useState([0,0,0,0,0,0,0,0,0]);
    const [turn, setTurn]=React.useState(1);
    const [over, setOver]=React.useState(false);


    if(check(grid) && !over){
        setOver(check(grid));
        console.log(over);
    }

    React.useEffect(()=>{



        if(mode==1 && turn==2 && !over){
            const timer = setTimeout(() => {
                setGrid(computerTurn(grid));
                console.log("computer played");
                setTurn(3-turn);
                }, 1000);
            return () => clearTimeout(timer);
        }
    });


    const nextGame=(x)=>{
        setMode(x);
        setGrid([0,0,0,0,0,0,0,0,0]);
        setTurn(1);
        setOver(false)
    }

    return(
        <div id="main">
            <header>
                <h1>Tic Tac Toe</h1>
            </header>
            {mode
                ?<GameHeader turn={turn} over={over} mode={mode} nextGame={nextGame}/>
                :<WelcomeScreen setMode={setMode}/>
            }
            {mode?[<div id="grid">
                {grid.map((x,i)=>(x==0
                                        ?<button key={i} className="grid-button" onClick={()=>{
                                                                                if(over || (turn==2 && mode==1)){
                                                                                    console.log("escaped");
                                                                                    return;
                                                                                }
                                                                                setGrid([...grid.slice(0,i), turn, ...grid.slice(i+1,9)]);
                                                                                setTurn(3-turn);
                                                                                }
                                                                            }>
                                                    {(!over && (turn!=2 || mode!=1))?<img key={i} className="grid-back-image" id={i+1} src={images[turn]} />:null}
                                                </button>
                                        :<img key={i} className="grid-image" id={i+1} src={images[x]}></img>))
                            }
                </div>,
                <div id="button-area">
                    <button className="option-button" id="reset" onClick={()=>nextGame(0)}>Change Game Mode</button>
                    <button className="option-button" id="continue" onClick={()=>nextGame(mode)}>Play Again</button></div>]
                :null}
        </div>
    );
}

ReactDOM.render(<Main />, document.getElementById("root"));
