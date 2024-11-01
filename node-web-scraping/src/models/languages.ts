import mongoose, { Model, Schema, Document } from 'mongoose';

type LanguageDocument = Document & {
  yearCategory: string;
  year: number[];
  yearConfirmed: boolean;
  name: string;
  author: string;
  predecessors: string[];
};

const languageSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    yearCategory: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    year: {
      type: [Schema.Types.Number],
      required: true,
    },
    yearConfirmed: {
      type: Schema.Types.Boolean,
      required: true,
    },
    author: {
      type: Schema.Types.String,
    },
    predecessors: {
      type: [Schema.Types.String],
      required: true,
    },
  },
  {
    collection: 'languages',
    timestamps: true,
  },
);

const Language: Model<LanguageDocument> = mongoose.model<LanguageDocument>('Language', languageSchema);

export { Language, LanguageDocument };
