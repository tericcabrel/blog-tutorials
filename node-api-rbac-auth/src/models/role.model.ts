import mongoose, { Schema, Model, Document } from 'mongoose';

enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

type RoleDocument = Document<string> & {
  name: RoleType;
  description: string;
};

type RoleInput = {
  name: RoleDocument['name'];
  description: RoleDocument['description'];
};

const rolesSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      enum: Object.values(RoleType),
      required: true,
      unique: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'roles',
    timestamps: true,
  },
);

const Role: Model<RoleDocument> = mongoose.model<RoleDocument>('Role', rolesSchema);

export { Role, RoleInput, RoleDocument, RoleType };
