import React from 'react'

const FormatPara = ({content}: {content: string}) => {
    
    return (
        <>
            {content.split('\n').map(eachContent =>(
                eachContent.length == 0 ? <br/> :
                <p key={eachContent}>{eachContent}</p>
            ))}
        </>
    )
}

export default FormatPara