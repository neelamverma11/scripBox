import React, { useState, useEffect } from 'react';
import Login from './Login';
import ChallengeItem from './ChallengeItem';
import { Container, Typography, Grid, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const ChallengesPage = () => {
    // const history = useHistory();
    const [user, setUser] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [sortedByVotes, setSortedByVotes] = useState(false);

    useEffect(() => {
        const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
        setChallenges(storedChallenges);
    }, []);

    const handleAddChallenge = (newChallenge) => {
        newChallenge.createdAt = new Date().toISOString();
        const updatedChallenges = [...challenges, newChallenge];
        setChallenges(updatedChallenges);
        localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    };

    const handleVoteForChallenge = (index) => {
        const updatedChallenges = [...challenges];
        updatedChallenges[index].votes += 1;
        setChallenges(updatedChallenges);
        localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    };

    const handleSortByVotes = () => {
        const sortedChallenges = [...challenges].sort((a, b) => {
            if (sortedByVotes) {
                return a.votes - b.votes; // Ascending order
            } else {
                return b.votes - a.votes; // Descending order
            }
        });
        setChallenges(sortedChallenges);
        setSortedByVotes(!sortedByVotes);
    };

    const handleSortByCreationDate = () => {
        const sortedChallenges = [...challenges].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setChallenges(sortedChallenges);
        setSortedByVotes(false);
    };

    const handleFormNavigation = () => {
        // history.push('/newchallenge');
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom>
                Hack Ideas
            </Typography>
            {!user ? (
                <Login setUser={setUser} />
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Button variant="contained" onClick={handleFormNavigation} style={{ marginBottom: '16px' }}>
                            Add New Challenge
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h2" gutterBottom>
                            Challenges
                        </Typography>
                        <Button variant="outlined" onClick={handleSortByVotes}>
                            Sort by Votes {sortedByVotes ? 'Asc' : 'Desc'}
                        </Button>
                        <Button variant="outlined" onClick={handleSortByCreationDate}>
                            Sort by Creation Date
                        </Button>
                        <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Tags</TableCell>
                                        <TableCell>Votes</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {challenges.map((challenge, index) => (
                                        <ChallengeItem
                                            key={index}
                                            challenge={challenge}
                                            index={index}
                                            voteForChallenge={handleVoteForChallenge}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default ChallengesPage;
