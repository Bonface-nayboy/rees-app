import { Schema, models, model } from 'mongoose';

const CountySchema = new Schema({
  name: String,
  constituency: String,
  county: String,
});

export const County = models.County || model('County', CountySchema);
