import './Result.css';

function Result(props){
    const candidates = props.candidates;
    const resultData = props.resultData;
    const countBallots = (result) => {
        let resultMap = {};
        for(var i = 0; i< candidates.length;i++){
            resultMap[candidates[i]] = 0;
        }
        for(var i = 0; i< result.length;i++){
           resultMap[result[i]['Vote']]  = resultMap[result[i]['Vote']] +1;
        }
        return resultMap;
    }

    const displayPercentage = (result) => {
        let resultMap = countBallots(result);
        const sortedResultMap =Object.fromEntries(Object.entries(resultMap).sort(function([,a],[,b]){return b-a}));
        return <ol>{Object.entries(sortedResultMap).map(([k, val])=>{
            return <li className='percentage' key={k}>{k}: {(val/result.length * 100).toFixed(2)}%</li>;
        })}</ol>;
    }
    return(
        <span>
            <div className='result-title'>Result of the election:</div>
            {displayPercentage(props.resultData)}
            <div className = 'number-votes'>Total number of votes : {resultData.length}</div>
        </span>
    )
}

export default Result;