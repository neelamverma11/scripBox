import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { Container, Typography, Grid, TableCell, Button, Table, Stack, Card, TableContainer, TableHead, TableRow, TableBody, Paper } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import UserListHead from './UserListHead';

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 170 },
    { id: 'tags', label: 'Tags', minWidth: 50 },
    { id: 'vote', label: 'Votes', minWidth: 110 },
    { id: 'date', label: 'Date', minWidth: 50 },];

const ChallengesPage = () => {
    const [user, setUser] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [sortedByVotes, setSortedByVotes] = useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('vote');

    const handleVote = (index) => {
        // voteForChallenge(index);
    };

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

    return (
        <Container>
            {!user ? (
                <Login setUser={setUser} />
            ) : (
                <><Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Hack Ideas
                    </Typography>
                    <Link to={`/challengeform`}>
                        <Button variant="contained">
                            Add Hack
                        </Button>
                    </Link>
                </Stack><Card>
                        <TableContainer sx={{ minWidth: 600 }}>
                            <Table>
                                <UserListHead
                                    // key={countries.id}
                                    // order={order}
                                    // orderBy={orderBy}
                                    headLabel={columns}
                                    // rowCount={countries.length}
                                    onRequestSort={handleSortByVotes} />
                                <TableBody>
                                    {challenges
                                        .map((challenge, index) => (
                                            <TableRow hover key={index}>
                                                <TableCell align="left">{index + 1}</TableCell>
                                                <TableCell align="left">{challenge.title}</TableCell>
                                                <TableCell align="left">{challenge.description}</TableCell>
                                                <TableCell align="left">{challenge.tags.join(', ')}</TableCell>
                                                <TableCell align="left">{challenge.votes}</TableCell>
                                                <TableCell align="left">{new Date(challenge.createdAt).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card></>
            )}
        </Container>
    );
};

export default ChallengesPage; 
