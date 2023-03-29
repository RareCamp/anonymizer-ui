import React from 'react';

interface Step1ValidateFileProps {
    validationErrors: string[];
}

function Step1ValidationFile(props: Step1ValidateFileProps) {
    if(Array.isArray(props.validationErrors) && props.validationErrors.length == 0) {
        return (
            <div>Validation errors:</div>
            // null
        )
    }
    else {
        return (
            <div>
            Validation errors:
            <ul>
            {/* {props.validationErrors} */}
            {props.validationErrors.map((error: string, idx: number) => {return <li key={idx}>{error}</li>})}
            </ul>
        </div>

        )

    }
}

export default Step1ValidationFile;
