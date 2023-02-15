export const timeFormatter = (time: number) => {
    const timeDifferenceUnix = Date.now() - time * 1000;
    const timeDifference = new Date(timeDifferenceUnix);
    const pluralize = ( noun: string, count: number, suffix = 's') =>
    `${count} ${noun}${count !== 1 ? suffix : ''}`;
    return timeDifference.getMonth()
      ? `${pluralize("month", timeDifference.getMonth(), 's')} ago`
      : timeDifference.getDate() - 1
      ? `${pluralize("day", timeDifference.getDate(), 's')} ago`
      : timeDifference.getHours()
      ? `${pluralize("hour", timeDifference.getHours(), 's')} ago`
      : timeDifference.getMinutes()
      ? `${pluralize("minute", timeDifference.getMinutes(), 's')} ago`
      : "less than a minute ago";
  }