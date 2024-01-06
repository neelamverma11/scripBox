import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const predefinedTags = ['Feature', 'Tech', 'Design', 'Innovation']; //  predefined tags

const ChallengeForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        let matches = [];
        if (inputValue.length > 0) {
            matches = predefinedTags.filter((tag) =>
                tag.toLowerCase().includes(inputValue.toLowerCase())
            );
        }
    };

    const handleKeyDown = (e) => {
        const inputValue = e.target.value;
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== '') {
            const newTag = inputValue.trim();
            if (!tags.includes(newTag) && predefinedTags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            e.target.value = '';
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const addChallenge = () => {
        if (title.trim() !== '' && description.trim() !== '' && tags.length > 0) {
            const newChallenge = {
                title,
                description,
                tags,
                votes: 0,
                createdAt: new Date().toISOString(),
            };
            try {
                const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
                const updatedChallenges = [...storedChallenges, newChallenge];
                localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
                navigate('/', { replace: true })
                setSuccessMessage('Challenge added successfully.');
                setErrorMessage('');
                setTitle('');
                setDescription('');
                setTags([]);
            } catch (error) {
                setErrorMessage('Failed to add challenge. Please try again.');
                setSuccessMessage('');
            }
        } else {
            setErrorMessage('Please fill in all the fields.');
            setSuccessMessage('');
        }
    };


    return (
        <Container maxWidth="sm">
            {successMessage && <Typography variant="body1" color="success">{successMessage}</Typography>}
            {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
            <Typography variant="h4" gutterBottom>
                Add New Challenge
            </Typography>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Box display="flex" alignItems="center">
                <TextField
                    label="Tags"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                onDelete={() => handleDeleteTag(tag)}
                                variant="outlined"
                                style={{ marginRight: '5px', marginTop: '5px' }}
                            />
                        )),
                    }}
                />
            </Box>
            <Button variant="contained" color="primary" onClick={addChallenge}>
                Add Challenge
            </Button>
        </Container>
    );
};

export default ChallengeForm;
