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
        console.log(resultMap)
        return resultMap;
    }

    const displayPercentage = (result) => {
        let resultMap = countBallots(result);
        return Object.entries(resultMap).map(([k, val])=>{
            return <div>{k}: {(val/candidates.length * 100).toFixed(2)}%</div>;
        });
    }
    return(
        <span>
            <div>Result of the election:</div>
            {displayPercentage(resultData)}
            <div>Total number of votes : {candidates.length}</div>
        </span>
    )
}

export default Result;