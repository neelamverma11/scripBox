// import React from 'react';
// import {
//     List,
//     ListItem,
//     ListItemText,
//     Typography,
//     IconButton,
//     ListItemSecondaryAction,
// } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// const ChallengeList = ({ challenges, voteForChallenge }) => {
//     const handleVote = (index) => {
//         voteForChallenge(index);
//     };
//     console.log(challenges)
//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>
//                 Challenges
//             </Typography>
//             <List>
//                 {challenges.map((challenge, index) => (
//                     <ListItem key={index}>
//                         <ListItemText
//                             primary={challenge.title}
//                             secondary={
//                                 <>
//                                     <Typography variant="body2">{challenge.description}</Typography>
//                                     <Typography variant="caption">
//                                         Tags: {challenge.tags.join(', ')}
//                                     </Typography>
//                                     <Typography variant="caption">
//                                         Votes: {challenge.votes}
//                                     </Typography>
//                                     <Typography variant="caption">
//                                         Date: {new Date(challenge.createdAt).toLocaleDateString()}
//                                     </Typography>
//                                 </>
//                             }
//                         />
//                         <ListItemSecondaryAction>
//                             <IconButton onClick={() => handleVote(index)}>
//                                 <ThumbUpIcon />
//                             </IconButton>
//                         </ListItemSecondaryAction>
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
// };

// export default ChallengeList;
