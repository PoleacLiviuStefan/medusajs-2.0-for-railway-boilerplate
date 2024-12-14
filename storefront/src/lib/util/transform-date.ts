type Months = { [key: number]: string };

const getDateInfo = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");

  const months: Months = {
    0: "Ianuarie",
    1: "Februarie",
    2: "Martie",
    3: "Aprilie",
    4: "Mai",
    5: "Iunie",
    6: "Iulie",
    7: "August",
    8: "Septembrie",
    9: "Octombrie",
    10: "Noiembrie",
    11: "Decembrie",
  };

  const monthName = months[date.getMonth()];

  return `${day} ${monthName}`;
};

export default getDateInfo;
