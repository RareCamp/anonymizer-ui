import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import * as XLSX from 'xlsx';

import NextButton from '../NavButtons/NextButton';
import PrevButton from '../NavButtons/PrevButton';

import Step0ChooseFile from '../Steps/Step0ChooseFile';
import Step1ValidateFile from '../Steps/Step1ValidateFile';
import Step2AnonymizeFile from '../Steps/Step2AnonymizeFile';
import Step3SubmitAnonymizedFile from '../Steps/Step3SubmitAnonymizedFile';


function getSteps() {
    return ['Choose File', 'Validate File', 'Anonymize File'];
}

function WorkflowStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [files, setFiles] = useState<any[]>([]);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [worksheetJSON, setWorksheetJSON] = useState<any[]>([]);

    const steps = getSteps();

    const resetState = () => {
        setFiles([]);
        setValidationErrors([]);
        setWorksheetJSON([]);
    }

    useEffect(() => {
        console.log(activeStep);
        if(activeStep === 1) {
            handleValidateFiles();
        } else if(activeStep === 2) {
            handleAnonymizeFiles();
        }
    }, [activeStep]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleReset = () => {
        setActiveStep(0);
        resetState();
    }

    const handleDropFiles = (droppedFiles: any): any => {
        // add any droppedFiles to any existing files
        if(droppedFiles.length > 0) {
            console.log("dropped!");
            console.log(droppedFiles);
            setFiles(files.concat(droppedFiles));
        }
    }

    const handleValidateFiles = () => {
        const validate = async () => {
            // for(var i = 0; i < files.length; i++) {
            let validationErrors: string[] = [];

            let file = files[0];
            const buffer = await file.arrayBuffer()
            let workbook = XLSX.read(buffer);

            if (workbook.SheetNames.length != 1) {
                validationErrors.push("More than one worksheet found");
            }

            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            let newWorksheetJSON: any = XLSX.utils.sheet_to_json(worksheet);

            console.log(newWorksheetJSON);
            setWorksheetJSON(newWorksheetJSON);

            let column_names: string[] = Object.keys(newWorksheetJSON[0]);

            if (!column_names.includes('first_name')) {
                validationErrors.push("Required column 'first_name' is missing");
            }
            if (!column_names.includes('last_name')) {
                validationErrors.push("Required column 'last_name' is missing");
            }
            if (!column_names.includes('date_of_birth')) {
                validationErrors.push("Required column 'date_of_birth' is missing");
            }

            // console.log(workbook);
            // console.log(workbook.SheetNames)

            setValidationErrors(validationErrors);
            // }
        }

        validate();
    }

    const handleAnonymizeFiles = () => {
        const anonymize = async () => {
            let anonymizedWorksheetJSON: any = [];

            worksheetJSON.forEach( (row: any) => {
                let newRow: any = {};

                newRow['first_name'] = row['first_name'][0];
                newRow['last_name'] = row['last_name'][0];
                newRow['date_of_birth'] = row['date_of_birth'].toString()[0];

                anonymizedWorksheetJSON.push(newRow);
            });

            let anonymizedWorksheet: any = XLSX.utils.json_to_sheet(anonymizedWorksheetJSON);

            let anonymizedWorkbook: any = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(anonymizedWorkbook, anonymizedWorksheet, "Anonymized Data");
            XLSX.writeFile(anonymizedWorkbook, 'anonymized.xlsx');

        }

        anonymize();
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Step0ChooseFile
                        handleDropFiles={handleDropFiles}
                    />
                )
            case 1:
                return (
                    <Step1ValidateFile
                        validationErrors={validationErrors}
                    />
                )
            case 2:
                return (
                    <Step2AnonymizeFile
                    />
                )
            case 3:
                return (
                    <Step3SubmitAnonymizedFile
                    />
                )
            default:
                handleReset();
        }
    }

    return (
        <div>
            <Stepper activeStep={activeStep} sx={{ mt: '50px', mb: '16px' }}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <Paper square={true}>
                <div>
                    <div>{getStepContent(activeStep)}</div>
                </div>
            </Paper>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <PrevButton
                    activeStep={activeStep}
                    handleBack={handleBack}
                />

                <Box sx={{ flex: '1 1 auto' }} />

                <NextButton
                    activeStep={activeStep}
                    handleNext={handleNext}
                    // preflightPassed={preflightPassed}
                    // validationPassed={validationPassed}
                />
            </Box>


        </div>
    )

}

export default WorkflowStepper;
