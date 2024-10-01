interface SchufaSDK {
  getSchufaScore(customerId: string): SchufaScore;
}

export function createSchufaSDK(): SchufaSDK {
  return {
    getSchufaScore: (customerId: string): SchufaScore => {
      // Generate a random SCHUFA score from the predefined scores
      const randomIndex = Math.floor(Math.random() * SchufaScore.length);
      return SchufaScore[randomIndex];
    },
  };
}

export const PassSchufaScore = ['A', 'B', 'C'] as const;

export const SchufaScore = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
] as const;
export type SchufaScore = (typeof SchufaScore)[number];
