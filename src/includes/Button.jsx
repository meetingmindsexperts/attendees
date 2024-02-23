import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SendIcon from '@mui/icons-material/Send';

function FormButton({ onClick }) {
    const [loading, setLoading] = React.useState(false);

    // Define handleClick function to trigger onClick and set loading state
    function handleClick() {
        onClick(); // Trigger the onClick function passed from the parent
        setLoading(true); // Set loading state to true
    }

    return (
        <div>
            <FormControlLabel
                sx={{
                    display: 'none',
                }}
                control={
                    <Switch
                        checked={loading}
                        onChange={() => setLoading(!loading)}
                        name="loading"
                        color="primary"
                    />
                }
                label="Loading"
            />
            <Box sx={{ '& > button': { m: 1 } }}>
                <LoadingButton
                    onClick={handleClick} // Use handleClick instead of directly setting loading to true
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                >
                    <span>Submit</span>
                </LoadingButton>
            </Box>
        </div>
    );
}
export default FormButton;