import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { Container, Typography, Button, TableContainer, Table, TableRow, Stack, TableCell, TableHead, TableBody, Card } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import UserListHead from './UserListHead';

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 170 },
    { id: 'tags', label: 'Tags', minWidth: 50 },
    { id: 'date', label: 'Date', minWidth: 50 },
    { id: 'vote', label: 'Votes', minWidth: 110 },
    { id: 'actions', label: 'Actions', minWidth: 50 },
];

const ChallengesPage = () => {
    const [user, setUser] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [sortedByVotes, setSortedByVotes] = useState(false);

    useEffect(() => {
        const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
        setChallenges(storedChallenges);
    }, []);

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

    const handleDelete = (id) => {
        const filteredChallenges = challenges.filter((el, ind) => ind !== id);
        setChallenges(filteredChallenges);
        localStorage.setItem('challenges', JSON.stringify(filteredChallenges));
    };

    return (
        <Container>
            {!user ? (
                <Login setUser={setUser} />
            ) : (
                <>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Hack Ideas
                        </Typography>
                        <Link to={`/challengeform`}>
                            <Button variant="contained">
                                Add Hack
                            </Button>
                        </Link>
                    </Stack>
                    <Card>
                        <TableContainer sx={{ minWidth: 600 }}>
                            <Table>
                                <UserListHead headLabel={columns} onRequestSort={handleSortByVotes} />
                                <TableBody>
                                    {challenges.map((challenge, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell align="left">{index + 1}</TableCell>
                                            <TableCell align="left">{challenge.title}</TableCell>
                                            <TableCell align="left">{challenge.description}</TableCell>
                                            {/* <TableCell align="left">{challenge.tags.join(', ')}</TableCell> */}
                                            {/* <TableCell align="left">{challenge.tags.length}</TableCell> */}
                                            {/* <TableCell align="left">
                                                {challenge.tags.map((tag, index) => `${index + 1}.${tag}`).join(', ')}
                                            </TableCell> */}
                                            <TableCell align="left">
                                                {challenge.tags.map((tag, index) => (
                                                    <div key={index}>
                                                        {`${index + 1}.${tag}`}
                                                    </div>
                                                ))}
                                            </TableCell>

                                            <TableCell align="left">{new Date(challenge.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell align="left">
                                                {challenge.votes}
                                                <ThumbUpOffAltIcon style={{ marginLeft: '5', marginTop: '2' }} onClick={() => handleVoteForChallenge(index)} />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant='contained' sx={{ mt: 1 }} onClick={() => handleDelete(index)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </>
            )}
        </Container>
    );
};

export default ChallengesPage;
