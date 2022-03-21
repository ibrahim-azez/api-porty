import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import { Document } from 'mongoose';

import { UserReturn } from '../core/graphql.schema';

class ISocial {
  @IsUrl()
  @IsOptional()
  github?: string;

  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @IsUrl()
  @IsOptional()
  dev?: string;
}

class IService {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  icon: string;

  @IsString()
  style: string;

  @IsBoolean()
  hrStatus: boolean;
}

class IEducation {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  place: string;
}

class ISkills {
  @IsString()
  linux: string;

  @IsString()
  html5: string;

  @IsString()
  css3: string;

  @IsString()
  javaScript: string;

  @IsString()
  typeScript: string;

  @IsString()
  graphQL: string;
  @IsString()
  express: string;

  @IsString()
  nestJS: string;

  @IsString()
  mongoDB: string;

  @IsString()
  postgreSQL: string;
}

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  jobTitle: string;

  @Prop({ type: Object, required: true })
  social: object;

  @Prop({ type: Object, required: true })
  service: object;

  @Prop({ type: [Object], required: true })
  education: object[];

  @Prop({ type: [], required: true })
  courses: [];

  @Prop({ type: Object, required: true })
  skills: object;

  @Prop({ type: String, required: true })
  footer: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserModel extends UserReturn {
  @IsString()
  _id: string;

  @IsString()
  fullName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  social: ISocial;

  @IsNotEmpty()
  service: IService;

  @IsArray()
  education: IEducation[];

  @IsArray()
  courses: [];

  @IsArray()
  skills: ISkills[];

  @IsString()
  footer: string;
}
