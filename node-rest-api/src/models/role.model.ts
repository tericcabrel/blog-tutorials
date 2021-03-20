import mongoose, { Schema, Model, Document } from 'mongoose';

type RoleDocument = Document & {
  name: string;
  description: string | null;
};

type RoleInput = {
  name: RoleDocument['name'];
  description: RoleDocument['description'];
};

const roleSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    description: {
      type: Schema.Types.String,
      default: null,
    },
  },
  {
    collection: 'roles',
    timestamps: true,
  },
);

const Role: Model<RoleDocument> = mongoose.model<RoleDocument>('Role', roleSchema);

export { Role, RoleInput, RoleDocument };
