import React from 'react';

import Button from '@mui/material/Button';


interface NextButtonProps {
    activeStep: number;
    handleNext(): any;
}

function NextButton(props: NextButtonProps) {

    const buttonTextByStep: { [id: number]: string } = {
        0: "Validate file",
        1: "Anonymize file",
        2: "Submit anonymized file",
        3: "Start a new file"
    }

    let disabled = false;
    // if(props.activeStep === 1 && !props.preflightPassed) {
    //     disabled = true;
    // }
    // if(props.activeStep === 2 && !props.validationPassed) {
    //     disabled = true;
    // }

    if (props.activeStep < 3) {
        return (
            <Button
                onClick={props.handleNext}
                disabled={ disabled }
            >
                { buttonTextByStep[props.activeStep] }
            </Button>
        );
    } else {
        return (
            <Button
                onClick={props.handleNext}
            >
                { buttonTextByStep[props.activeStep] }
            </Button>
        );
    }

}

export default NextButton;
