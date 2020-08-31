import { Resolver, Mutation, InputType, Field, Arg, Ctx, ObjectType } from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from 'src/types';
import argon2 from 'argon2';

@InputType()
class RegisterInput {
  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string
}

@InputType()
class LoginInput {
  @Field()
  username: string

  @Field()
  password: string
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UserResolver {

  @Mutation(() => User)
  async register(
    @Arg('inputs') { username, email, password }: RegisterInput,
    @Ctx() { em }: MyContext
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const user = em.create(User, {username, email, password: hashedPassword});
    await em.persistAndFlush(user);
    return user;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('inputs') { username, password }: LoginInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {

    if (typeof username === 'undefined')
      return {errors: [{ field: 'username', message: "Username has to be specified." }]};
    
    if (typeof password === 'undefined')
      return {errors: [{ field: 'password', message: "Password has to be specified." }]};
    
    const user = await em.findOne(User, {username});

    if (!user) 
      return {errors: [{ field: 'username', message: "User with this username doesn't exist." }]};
    
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid)
      return {errors: [{ field: 'password', message: "Password isn't valid." }]};
    
    return {user};
    
  }

}