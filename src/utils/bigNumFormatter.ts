export const bigNumsFormatter = (votes: number) => {
    if (votes<1000) {return votes};
    const formattedVoted = votes<100000 ? Math.floor(votes/100)/10 : Math.floor(votes/1000)
    return String(formattedVoted)+'k'
  }