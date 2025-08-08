import { useForm } from 'react-hook-form';
import SocialProvider from 'src/app/_components/social-provider';
import { Button } from 'src/components/ui/button';
import { Card, CardContent } from 'src/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { authClient } from 'src/lib/auth/auth-client';

function SignUpForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const handleSignin = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const response = await authClient.signUp.email(data);

      console.log(response);
    } catch (e: any) {
      alert(e?.message);
    }
  };

  return (
    <Card>
      <CardContent>
        <form
          method="POST"
          onSubmit={form.handleSubmit(handleSignin)}
          className="space-y-8"
        >
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ex. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@email.test" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password..."
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <hr />
            <SocialProvider />
          </Form>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;
