import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Chip, Box } from '@mui/material';

const predefinedTags = ['Feature', 'Tech', 'Design', 'Innovation']; // Example predefined tags

const ChallengeForm = ({ addChallenge }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState(predefinedTags);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        let matches = [];
        if (inputValue.length > 0) {
            matches = predefinedTags.filter((tag) =>
                tag.toLowerCase().includes(inputValue.toLowerCase())
            );
        }
        setSuggestions(matches);
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

    const handleSubmit = () => {
        if (title.trim() !== '' && description.trim() !== '' && tags.length > 0) {
            const newChallenge = {
                title,
                description,
                tags,
                votes: 0,
            };
            addChallenge(newChallenge);
            setTitle('');
            setDescription('');
            setTags([]);
        }
    };

    return (
        <Container maxWidth="sm">
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
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add Challenge
            </Button>
        </Container>
    );
};

export default ChallengeForm;
