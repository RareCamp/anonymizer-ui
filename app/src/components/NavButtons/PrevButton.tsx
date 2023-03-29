import React from 'react';

import Button from '@mui/material/Button';


interface PrevButtonProps {
    activeStep: number;
    handleBack(): any;
}

function PrevButton(props: PrevButtonProps) {
    const buttonTextByStep: { [id: number]: string } = {
        2: 'Back to add files',
    }

    if (!(props.activeStep in buttonTextByStep)) {
        // return null;
        return (
            <Button
                onClick={props.handleBack}
            >
                Back
            </Button>
        )
    } else {
        return (
            <Button
                onClick={props.handleBack}
            >
                { buttonTextByStep[props.activeStep] }
            </Button>
        )

    }
}

export default PrevButton;
