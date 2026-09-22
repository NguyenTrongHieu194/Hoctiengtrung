import { WordItem, HSKLevelId } from "../../types";
import { HSK1_FULL_VOCABULARY } from "./hsk1Vocab";
import { HSK2_FULL_VOCABULARY } from "./hsk2Vocab";
import { HSK3_FULL_VOCABULARY } from "./hsk3Vocab";
import { HSK4_FULL_VOCABULARY } from "./hsk4Vocab";
import { HSK5_FULL_VOCABULARY } from "./hsk5Vocab";
import { HSK6_FULL_VOCABULARY } from "./hsk6Vocab";

export {
  HSK1_FULL_VOCABULARY,
  HSK2_FULL_VOCABULARY,
  HSK3_FULL_VOCABULARY,
  HSK4_FULL_VOCABULARY,
  HSK5_FULL_VOCABULARY,
  HSK6_FULL_VOCABULARY
};

export const ALL_HSK_VOCABULARY: WordItem[] = [
  ...HSK1_FULL_VOCABULARY,
  ...HSK2_FULL_VOCABULARY,
  ...HSK3_FULL_VOCABULARY,
  ...HSK4_FULL_VOCABULARY,
  ...HSK5_FULL_VOCABULARY,
  ...HSK6_FULL_VOCABULARY
];

export const getVocabularyByLevel = (level: HSKLevelId): WordItem[] => {
  switch (level) {
    case 'HSK1':
      return HSK1_FULL_VOCABULARY;
    case 'HSK2':
      return [...HSK1_FULL_VOCABULARY, ...HSK2_FULL_VOCABULARY];
    case 'HSK3':
      return [...HSK1_FULL_VOCABULARY, ...HSK2_FULL_VOCABULARY, ...HSK3_FULL_VOCABULARY];
    case 'HSK4':
      return [...HSK1_FULL_VOCABULARY, ...HSK2_FULL_VOCABULARY, ...HSK3_FULL_VOCABULARY, ...HSK4_FULL_VOCABULARY];
    case 'HSK5':
      return [...HSK1_FULL_VOCABULARY, ...HSK2_FULL_VOCABULARY, ...HSK3_FULL_VOCABULARY, ...HSK4_FULL_VOCABULARY, ...HSK5_FULL_VOCABULARY];
    case 'HSK6':
      return ALL_HSK_VOCABULARY;
    default:
      return HSK1_FULL_VOCABULARY;
  }
};

export const getLevelExclusiveVocabulary = (level: HSKLevelId): WordItem[] => {
  switch (level) {
    case 'HSK1':
      return HSK1_FULL_VOCABULARY;
    case 'HSK2':
      return HSK2_FULL_VOCABULARY;
    case 'HSK3':
      return HSK3_FULL_VOCABULARY;
    case 'HSK4':
      return HSK4_FULL_VOCABULARY;
    case 'HSK5':
      return HSK5_FULL_VOCABULARY;
    case 'HSK6':
      return HSK6_FULL_VOCABULARY;
    default:
      return HSK1_FULL_VOCABULARY;
  }
};
