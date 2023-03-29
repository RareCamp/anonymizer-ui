import React from 'react';

import { DropzoneArea, DropzoneDialog } from 'react-mui-dropzone';

interface Step0ChooseFileProps {
    handleDropFiles(droppedFiles: any): any;
}

function Step0ChooseFile(props: Step0ChooseFileProps) {
    return (
        <DropzoneArea
            onChange={props.handleDropFiles}
            showPreviews={false}
            showPreviewsInDropzone={true}
            filesLimit={1}
            acceptedFiles={['']}
            showAlerts={['error']}
            useChipsForPreview={true}
        />
    )

}

export default Step0ChooseFile;
