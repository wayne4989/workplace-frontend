import {
  Model
} from './model';

export class MentorModel extends Model {
	public id?: number;
	public firstName: string;
	public lastName: string;
	public expertise: string;
	public reasonForBecomingAMentor: string;
	public init (): void {}
}
