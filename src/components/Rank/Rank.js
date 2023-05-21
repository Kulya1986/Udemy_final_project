import React from 'react';


const Rank = ({userName, userRank}) => {
    return (
       <div>
            <div className='f2 white'>
                {`${userName}, your current number of entries is ...`}
            </div>
            <div className='f1 white'>
                {userRank}
            </div>
       </div>
    );
}

export default Rank;