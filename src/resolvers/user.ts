import { Resolver, Mutation, InputType, Field, Arg, Ctx } from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from 'src/types';
import argon2 from 'argon2';

@InputType()
class UserInput {
  @Field(() => String)
  username: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}

@Resolver()
export class UserResolver {

  @Mutation(() => User)
  async register(
    @Arg('inputs') { username, email, password }: UserInput,
    @Ctx() { em }: MyContext
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const user = em.create(User, {username, email, password: hashedPassword});
    await em.persistAndFlush(user);
    return user;
  }

}