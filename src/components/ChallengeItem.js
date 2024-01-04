// import React from 'react';
// import {
//     ListItem,
//     ListItemText,
//     ListItemSecondaryAction,
//     Typography,
//     IconButton,
// } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// const ChallengeItem = ({ challenge, index, voteForChallenge }) => {
//     const handleVote = () => {
//         voteForChallenge(index);
//     };

//     return (
//         <ListItem key={index}>
//             <ListItemText
//                 primary={challenge.title}
//                 secondary={
//                     <>
//                         <Typography variant="body2">{challenge.description}</Typography>
//                         <Typography variant="caption">Tags: {challenge.tags.join(', ')}</Typography>
//                         <Typography variant="caption">Votes: {challenge.votes}</Typography>
//                         <Typography variant="caption">
//                             Date: {new Date(challenge.createdAt).toLocaleDateString()}
//                         </Typography>
//                     </>
//                 }
//             />
//             <ListItemSecondaryAction>
//                 <IconButton onClick={handleVote}>
//                     <ThumbUpIcon />
//                 </IconButton>
//             </ListItemSecondaryAction>
//         </ListItem>
//     );
// };

// export default ChallengeItem;
